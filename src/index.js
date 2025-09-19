// src/index.js - Lunar Almanac Cloudflare Worker with Authentication
import {
  hashPassword,
  verifyPassword,
  generateJWT,
  verifyJWT,
  validateEmail,
  validatePassword,
  validateUsername,
  generateId,
  requireAuth,
  createSession,
  verifySession,
  cleanExpiredSessions
} from './auth.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
      // Authentication routes
      if (path === '/auth/register' && request.method === 'POST') {
        return await handleRegister(request, env);
      }

      if (path === '/auth/login' && request.method === 'POST') {
        return await handleLogin(request, env);
      }

      if (path === '/auth/logout' && request.method === 'POST') {
        return await handleLogout(request, env);
      }

      if (path === '/auth/profile' && request.method === 'GET') {
        return await handleProfile(request, env);
      }

      if (path === '/auth/change-password' && request.method === 'POST') {
        return await handleChangePassword(request, env);
      }

      // Custom events routes (protected)
      if (path.startsWith('/api/custom-events')) {
        return await handleCustomEventsAPI(request, env, path);
      }

      // Health check
      if (path === '/health') {
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      // Default response
      return new Response('Not Found', {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  async scheduled(event, env, ctx) {
    // Keep Render backend alive
    ctx.waitUntil(fetch("https://lunar-almanac-backend.onrender.com/health", { cache: "no-store" }));

    // Clean up expired sessions
    ctx.waitUntil(cleanExpiredSessions(env.DB));
  }
};

// Authentication handlers
async function handleRegister(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const { username, email, password } = await request.json();

    // Validate input
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      return new Response(JSON.stringify({
        error: 'Invalid username',
        details: usernameValidation.errors
      }), { status: 400, headers: corsHeaders });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400, headers: corsHeaders
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return new Response(JSON.stringify({
        error: 'Invalid password',
        details: passwordValidation.errors
      }), { status: 400, headers: corsHeaders });
    }

    // Check if user already exists
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE username = ? OR email = ?'
    ).bind(username, email).first();

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Username or email already exists' }), {
        status: 409, headers: corsHeaders
      });
    }

    // Hash password
    const { hash, salt } = await hashPassword(password);

    // Create user - let SQLite auto-generate the ID
    const result = await env.DB.prepare(`
      INSERT INTO users (username, email, password_hash, salt, created_at, is_active)
      VALUES (?, ?, ?, ?, datetime('now'), 1)
    `).bind(username, email, hash, salt).run();

    const userId = result.meta.last_row_id;

    // Generate JWT
    const token = await generateJWT(
      { userId, username, email },
      env.JWT_SECRET,
      '24h'
    );

    return new Response(JSON.stringify({
      success: true,
      token,
      user: { id: userId, username, email }
    }), { status: 201, headers: corsHeaders });

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), {
      status: 500, headers: corsHeaders
    });
  }
}

async function handleLogin(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const { username, password } = await request.json();

    // Find user by username or email
    const user = await env.DB.prepare(`
      SELECT id, username, email, password_hash, salt, is_active
      FROM users
      WHERE (username = ? OR email = ?) AND is_active = 1
    `).bind(username, username).first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401, headers: corsHeaders
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash, user.salt);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401, headers: corsHeaders
      });
    }

    // Update last login
    await env.DB.prepare(
      'UPDATE users SET last_login = datetime(\'now\') WHERE id = ?'
    ).bind(user.id).run();

    // Generate JWT
    const token = await generateJWT(
      { userId: user.id, username: user.username, email: user.email },
      env.JWT_SECRET,
      '24h'
    );

    return new Response(JSON.stringify({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email }
    }), { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500, headers: corsHeaders
    });
  }
}

async function handleLogout(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  return new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
    status: 200, headers: corsHeaders
  });
}

async function handleProfile(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Check authentication
  const authResult = await requireAuth(request, env);
  if (authResult) return authResult;

  const user = request.user;
  return new Response(JSON.stringify({
    user: { id: user.userId, username: user.username, email: user.email }
  }), { status: 200, headers: corsHeaders });
}

async function handleChangePassword(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Check authentication
  const authResult = await requireAuth(request, env);
  if (authResult) return authResult;

  try {
    const { currentPassword, newPassword } = await request.json();
    const user = request.user;

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return new Response(JSON.stringify({
        error: 'Invalid new password',
        details: passwordValidation.errors
      }), { status: 400, headers: corsHeaders });
    }

    // Get current user data
    const userData = await env.DB.prepare(
      'SELECT password_hash, salt FROM users WHERE id = ?'
    ).bind(user.userId).first();

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, userData.password_hash, userData.salt);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
        status: 400, headers: corsHeaders
      });
    }

    // Hash new password
    const { hash, salt } = await hashPassword(newPassword);

    // Update password
    await env.DB.prepare(
      'UPDATE users SET password_hash = ?, salt = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind(hash, salt, user.userId).run();

    return new Response(JSON.stringify({ success: true, message: 'Password changed successfully' }), {
      status: 200, headers: corsHeaders
    });

  } catch (error) {
    console.error('Change password error:', error);
    return new Response(JSON.stringify({ error: 'Failed to change password' }), {
      status: 500, headers: corsHeaders
    });
  }
}

// Custom events API handlers
async function handleCustomEventsAPI(request, env, path) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  // Check authentication for all custom events operations
  const authResult = await requireAuth(request, env);
  if (authResult) return authResult;

  const user = request.user;
  const url = new URL(request.url);

  try {
    if (path === '/api/custom-events' && request.method === 'GET') {
      // List user's custom events
      const events = await env.DB.prepare(`
        SELECT id, date, title, type, category, notes, recurring, created_at, updated_at
        FROM custom_events
        WHERE user_id = ?
        ORDER BY date ASC, title ASC
      `).bind(user.userId).all();

      return new Response(JSON.stringify(events.results || []), {
        status: 200, headers: corsHeaders
      });
    }

    if (path === '/api/custom-events' && request.method === 'POST') {
      // Create new custom event
      const eventData = await request.json();
      const eventId = eventData.id || generateId();

      // Validate required fields
      if (!eventData.date || !eventData.title) {
        return new Response(JSON.stringify({ error: 'Date and title are required' }), {
          status: 400, headers: corsHeaders
        });
      }

      await env.DB.prepare(`
        INSERT INTO custom_events (id, user_id, date, title, type, category, notes, recurring, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(
        eventId,
        user.userId,
        eventData.date,
        eventData.title,
        eventData.type || 'custom-event',
        eventData.category || null,
        eventData.notes || null,
        eventData.recurring ? 1 : 0
      ).run();

      return new Response(JSON.stringify({ success: true, id: eventId }), {
        status: 201, headers: corsHeaders
      });
    }

    // Handle individual event operations (PUT, DELETE)
    const eventIdMatch = path.match(/^\/api\/custom-events\/(.+)$/);
    if (eventIdMatch) {
      const eventId = eventIdMatch[1];

      if (request.method === 'PUT') {
        // Update event
        const eventData = await request.json();

        await env.DB.prepare(`
          UPDATE custom_events
          SET date = ?, title = ?, type = ?, category = ?, notes = ?, recurring = ?, updated_at = datetime('now')
          WHERE id = ? AND user_id = ?
        `).bind(
          eventData.date,
          eventData.title,
          eventData.type || 'custom-event',
          eventData.category || null,
          eventData.notes || null,
          eventData.recurring ? 1 : 0,
          eventId,
          user.userId
        ).run();

        return new Response(JSON.stringify({ success: true }), {
          status: 200, headers: corsHeaders
        });
      }

      if (request.method === 'DELETE') {
        // Delete event
        const result = await env.DB.prepare(
          'DELETE FROM custom_events WHERE id = ? AND user_id = ?'
        ).bind(eventId, user.userId).run();

        if (result.changes === 0) {
          return new Response(JSON.stringify({ error: 'Event not found' }), {
            status: 404, headers: corsHeaders
          });
        }

        return new Response(null, { status: 204, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404, headers: corsHeaders
    });

  } catch (error) {
    console.error('Custom events API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500, headers: corsHeaders
    });
  }
}