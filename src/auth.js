/**
 * Authentication utilities for Cloudflare Workers with D1
 * Handles user registration, login, password hashing, and JWT tokens
 */

import { sign, verify } from '@tsndr/cloudflare-worker-jwt';

/**
 * Hash password using Web Crypto API
 */
export async function hashPassword(password, salt = null) {
  if (!salt) {
    salt = crypto.getRandomValues(new Uint8Array(16));
  } else if (typeof salt === 'string') {
    salt = new TextEncoder().encode(salt);
  }

  const passwordBuffer = new TextEncoder().encode(password);

  // Use PBKDF2 for password hashing
  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    key,
    256
  );

  return {
    hash: Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''),
    salt: Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')
  };
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password, hash, salt) {
  const saltBytes = new Uint8Array(salt.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const { hash: newHash } = await hashPassword(password, saltBytes);
  return newHash === hash;
}

/**
 * Generate JWT token
 */
export async function generateJWT(payload, secret, expiresIn = '24h') {
  const expirationTime = expiresIn === '24h' ?
    Math.floor(Date.now() / 1000) + (24 * 60 * 60) :
    Math.floor(Date.now() / 1000) + parseInt(expiresIn);

  const token = await sign({
    ...payload,
    exp: expirationTime,
    iat: Math.floor(Date.now() / 1000)
  }, secret);

  return token;
}

/**
 * Verify JWT token
 */
export async function verifyJWT(token, secret) {
  try {
    const isValid = await verify(token, secret);
    if (!isValid) return null;

    // Decode payload manually since @tsndr/cloudflare-worker-jwt doesn't include decode
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));

    // Check expiration
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decodedPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

/**
 * Generate secure random ID
 */
export function generateId(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(randomBytes).map(byte => chars[byte % chars.length]).join('');
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate username
 */
export function validateUsername(username) {
  const errors = [];

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long');
  }

  if (username.length > 30) {
    errors.push('Username must be no more than 30 characters long');
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Create user session
 */
export async function createSession(db, userId, request) {
  const sessionId = generateId(32);
  const token = generateId(64);
  const { hash: tokenHash } = await hashPassword(token);

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour sessions

  const ipAddress = request.headers.get('CF-Connecting-IP') ||
                   request.headers.get('X-Forwarded-For') ||
                   'unknown';
  const userAgent = request.headers.get('User-Agent') || 'unknown';

  await db.prepare(`
    INSERT INTO user_sessions (id, user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(sessionId, userId, tokenHash, expiresAt.toISOString(), ipAddress, userAgent).run();

  return { sessionId, token };
}

/**
 * Verify session token
 */
export async function verifySession(db, sessionId, token) {
  const session = await db.prepare(`
    SELECT s.*, u.id as user_id, u.username, u.email, u.is_active
    FROM user_sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ? AND s.expires_at > datetime('now')
  `).bind(sessionId).first();

  if (!session) return null;

  const { hash: tokenHash } = await hashPassword(token, session.token_hash.slice(0, 32));
  if (tokenHash !== session.token_hash.slice(32)) return null;

  if (!session.is_active) return null;

  return {
    sessionId: session.id,
    userId: session.user_id,
    username: session.username,
    email: session.email
  };
}

/**
 * Clean up expired sessions
 */
export async function cleanExpiredSessions(db) {
  await db.prepare(`
    DELETE FROM user_sessions
    WHERE expires_at < datetime('now')
  `).run();
}

/**
 * Authentication middleware
 */
export async function requireAuth(request, env, ctx) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.substring(7);
  const user = await verifyJWT(token, env.JWT_SECRET);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Add user to request context
  request.user = user;
  return null; // Continue to next middleware/handler
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  constructor(env) {
    this.env = env;
  }

  async isRateLimited(key, limit = 10, windowMs = 60000) {
    // Use Cloudflare KV for rate limiting if available
    // For now, we'll implement a simple in-memory rate limiter
    // In production, you'd want to use Durable Objects or KV storage

    const now = Date.now();
    const windowStart = now - windowMs;

    // This is a simplified version - in production you'd use KV storage
    return false; // Allow all requests for now
  }
}