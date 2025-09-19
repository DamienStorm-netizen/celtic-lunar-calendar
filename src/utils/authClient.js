/**
 * Frontend Authentication Client
 * Handles user authentication with Cloudflare D1 backend
 */

const AUTH_BASE_URL = 'https://lunar-almanac-auth.west-coast-tantra-institute-account.workers.dev'; // Update with your worker URL
const TOKEN_KEY = 'lunar_auth_token';
const USER_KEY = 'lunar_user_data';

/**
 * Auth client class for managing authentication state
 */
export class AuthClient {
  constructor() {
    this.token = localStorage.getItem(TOKEN_KEY);
    this.user = this.token ? JSON.parse(localStorage.getItem(USER_KEY) || '{}') : null;
    this.authStateListeners = [];
  }

  /**
   * Add listener for auth state changes
   */
  onAuthStateChange(callback) {
    this.authStateListeners.push(callback);
    // Immediately call with current state
    callback(this.user, this.token);
  }

  /**
   * Notify all listeners of auth state change
   */
  notifyAuthStateChange() {
    this.authStateListeners.forEach(callback => {
      callback(this.user, this.token);
    });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.user;
  }

  /**
   * Get auth token
   */
  getToken() {
    return this.token;
  }

  /**
   * Register new user
   */
  async register(username, email, password) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (data.success && data.token && data.user) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem(TOKEN_KEY, this.token);
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
        this.notifyAuthStateChange();
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(username, password) {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.token && data.user) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem(TOKEN_KEY, this.token);
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
        this.notifyAuthStateChange();
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      if (this.token) {
        await fetch(`${AUTH_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      this.notifyAuthStateChange();
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${AUTH_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password change failed');
      }

      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  /**
   * Get user profile
   */
  async getProfile() {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${AUTH_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      // Update local user data
      if (data.user) {
        this.user = data.user;
        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Make authenticated API request
   */
  async authenticatedFetch(url, options = {}) {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // If unauthorized, clear auth state
      if (response.status === 401) {
        this.logout();
        throw new Error('Session expired. Please login again.');
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  }

  /**
   * Validate password strength
   */
  validatePassword(password) {
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
   * Validate email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate username
   */
  validateUsername(username) {
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
}

// Create and export a singleton instance
export const authClient = new AuthClient();

// Export helper functions
export const {
  isAuthenticated,
  getCurrentUser,
  getToken,
  register,
  login,
  logout,
  changePassword,
  getProfile,
  authenticatedFetch,
  onAuthStateChange,
  validatePassword,
  validateEmail,
  validateUsername
} = authClient;