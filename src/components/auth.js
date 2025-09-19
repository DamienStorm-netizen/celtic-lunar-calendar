/**
 * Authentication Components
 * Login, Register, and Profile management UI
 */

import { authClient } from '../utils/authClient.js';
import { showCelticModal, hideCelticModal } from '../utils/modalOverlay.js';
import { escapeHtml, validateInput } from '../utils/security.js';

let authStateCallback = null;

/**
 * Initialize authentication system
 */
export function initAuth() {
  // Listen for auth state changes
  authClient.onAuthStateChange((user, token) => {
    updateAuthUI(user, token);
    if (authStateCallback) {
      authStateCallback(user, token);
    }
  });

  // Update UI immediately with current state
  updateAuthUI(authClient.getCurrentUser(), authClient.getToken());
}

/**
 * Set callback for auth state changes
 */
export function onAuthStateChange(callback) {
  authStateCallback = callback;
}

/**
 * Update UI based on authentication state
 */
function updateAuthUI(user, token) {
  const authButton = document.getElementById('auth-button');
  const userInfo = document.getElementById('user-info');

  if (user && token) {
    // User is logged in
    if (authButton) {
      authButton.textContent = 'Logout';
      authButton.onclick = handleLogout;
    }

    if (userInfo) {
      userInfo.innerHTML = `
        <span class="user-greeting">Welcome, ${escapeHtml(user.username)}!</span>
        <button id="profile-button" class="profile-btn" title="Profile Settings">⚙️</button>
      `;

      const profileBtn = document.getElementById('profile-button');
      if (profileBtn) {
        profileBtn.onclick = showProfileModal;
      }
    }
  } else {
    // User is not logged in
    if (authButton) {
      authButton.textContent = 'Login';
      authButton.onclick = showLoginModal;
    }

    if (userInfo) {
      userInfo.innerHTML = '<span class="auth-prompt">Please log in to save your events</span>';
    }
  }

  // Update custom events functionality
  updateCustomEventsVisibility(!!user);
}

/**
 * Update custom events visibility based on auth state
 */
function updateCustomEventsVisibility(isAuthenticated) {
  const customEventsSection = document.getElementById('custom-events-settings');
  const addEventButton = document.getElementById('add-event-button');

  if (customEventsSection) {
    if (isAuthenticated) {
      customEventsSection.style.display = 'block';
    } else {
      customEventsSection.style.display = 'none';
    }
  }

  // Show auth prompt if not authenticated
  if (!isAuthenticated) {
    const eventListContainer = document.getElementById('event-list-container');
    if (eventListContainer) {
      eventListContainer.innerHTML = `
        <div class="auth-required-message">
          <p>🔐 Please log in to create and manage custom events</p>
          <button class="settings-btn" onclick="document.getElementById('auth-button').click()">
            Login / Register
          </button>
        </div>
      `;
    }
  }
}

/**
 * Show login modal
 */
export function showLoginModal() {
  const modalContent = `
    <h2 class="goldenTitle">✨ Welcome to the Lunar Almanac</h2>

    <div class="auth-tabs">
      <button id="login-tab" class="auth-tab active">Login</button>
      <button id="register-tab" class="auth-tab">Register</button>
    </div>

    <!-- Login Form -->
    <form id="login-form" class="auth-form" style="display: block;">
      <div class="auth-field">
        <label for="login-username">Username or Email:</label>
        <input type="text" id="login-username" required class="celtic-form-input"
               placeholder="Enter your username or email" />
      </div>

      <div class="auth-field">
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" required class="celtic-form-input"
               placeholder="Enter your password" />
      </div>

      <div class="auth-actions">
        <button type="submit" class="settings-btn auth-submit-btn">Login</button>
        <button type="button" class="settings-btn" id="cancel-auth">Cancel</button>
      </div>

      <div id="login-error" class="auth-error" style="display: none;"></div>
    </form>

    <!-- Register Form -->
    <form id="register-form" class="auth-form" style="display: none;">
      <div class="auth-field">
        <label for="register-username">Username:</label>
        <input type="text" id="register-username" required class="celtic-form-input"
               placeholder="Choose a username (3-30 characters)" />
        <small class="field-help">Letters, numbers, underscores, and hyphens only</small>
      </div>

      <div class="auth-field">
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" required class="celtic-form-input"
               placeholder="Enter your email address" />
      </div>

      <div class="auth-field">
        <label for="register-password">Password:</label>
        <input type="password" id="register-password" required class="celtic-form-input"
               placeholder="Create a strong password" />
        <small class="field-help">At least 8 characters with uppercase, lowercase, number, and special character</small>
      </div>

      <div class="auth-field">
        <label for="register-password-confirm">Confirm Password:</label>
        <input type="password" id="register-password-confirm" required class="celtic-form-input"
               placeholder="Confirm your password" />
      </div>

      <div class="auth-actions">
        <button type="submit" class="settings-btn auth-submit-btn">Register</button>
        <button type="button" class="settings-btn" id="cancel-auth-register">Cancel</button>
      </div>

      <div id="register-error" class="auth-error" style="display: none;"></div>
    </form>

    <div class="auth-footer">
      <p class="auth-note">🌙 Your account will keep your custom events synchronized across devices</p>
    </div>
  `;

  const modal = showCelticModal(modalContent, { id: 'auth-modal' });

  // Wire up tab switching
  const loginTab = modal.querySelector('#login-tab');
  const registerTab = modal.querySelector('#register-tab');
  const loginForm = modal.querySelector('#login-form');
  const registerForm = modal.querySelector('#register-form');

  loginTab.onclick = () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  };

  registerTab.onclick = () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  };

  // Wire up form submissions
  loginForm.onsubmit = handleLoginSubmit;
  registerForm.onsubmit = handleRegisterSubmit;

  // Wire up cancel buttons
  modal.querySelector('#cancel-auth').onclick = () => hideCelticModal('auth-modal');
  modal.querySelector('#cancel-auth-register').onclick = () => hideCelticModal('auth-modal');
}

/**
 * Handle login form submission
 */
async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('.auth-submit-btn');
  const errorDiv = form.querySelector('#login-error');

  // Get form values
  const username = form.querySelector('#login-username').value.trim();
  const password = form.querySelector('#login-password').value;

  // Basic validation
  if (!username || !password) {
    showAuthError(errorDiv, 'Please fill in all fields');
    return;
  }

  setBusy(submitBtn, true);
  hideAuthError(errorDiv);

  try {
    await authClient.login(username, password);
    hideCelticModal('auth-modal');

    // Show success message
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Welcome back!',
        text: 'You have successfully logged in.',
        icon: 'success',
        customClass: {
          popup: 'celestial-toast'
        },
        timer: 2000,
        showConfirmButton: false
      });
    }
  } catch (error) {
    showAuthError(errorDiv, error.message || 'Login failed');
  } finally {
    setBusy(submitBtn, false);
  }
}

/**
 * Handle register form submission
 */
async function handleRegisterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('.auth-submit-btn');
  const errorDiv = form.querySelector('#register-error');

  // Get form values
  const username = form.querySelector('#register-username').value.trim();
  const email = form.querySelector('#register-email').value.trim();
  const password = form.querySelector('#register-password').value;
  const passwordConfirm = form.querySelector('#register-password-confirm').value;

  // Validate inputs
  const usernameValidation = authClient.validateUsername(username);
  if (!usernameValidation.isValid) {
    showAuthError(errorDiv, usernameValidation.errors.join(', '));
    return;
  }

  if (!authClient.validateEmail(email)) {
    showAuthError(errorDiv, 'Please enter a valid email address');
    return;
  }

  const passwordValidation = authClient.validatePassword(password);
  if (!passwordValidation.isValid) {
    showAuthError(errorDiv, passwordValidation.errors.join(', '));
    return;
  }

  if (password !== passwordConfirm) {
    showAuthError(errorDiv, 'Passwords do not match');
    return;
  }

  setBusy(submitBtn, true);
  hideAuthError(errorDiv);

  try {
    await authClient.register(username, email, password);
    hideCelticModal('auth-modal');

    // Show success message
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Welcome to the Lunar Almanac!',
        text: 'Your account has been created successfully.',
        icon: 'success',
        customClass: {
          popup: 'celestial-toast'
        },
        timer: 3000,
        showConfirmButton: false
      });
    }
  } catch (error) {
    showAuthError(errorDiv, error.message || 'Registration failed');
  } finally {
    setBusy(submitBtn, false);
  }
}

/**
 * Handle logout
 */
async function handleLogout() {
  try {
    await authClient.logout();

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Logged out',
        text: 'You have been logged out successfully.',
        icon: 'info',
        customClass: {
          popup: 'celestial-toast'
        },
        timer: 2000,
        showConfirmButton: false
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Show profile modal
 */
function showProfileModal() {
  const user = authClient.getCurrentUser();
  if (!user) return;

  const modalContent = `
    <h2 class="goldenTitle">👤 Profile Settings</h2>

    <div class="profile-info">
      <div class="profile-field">
        <label>Username:</label>
        <span class="profile-value">${escapeHtml(user.username)}</span>
      </div>

      <div class="profile-field">
        <label>Email:</label>
        <span class="profile-value">${escapeHtml(user.email)}</span>
      </div>

      <div class="profile-field">
        <label>Member since:</label>
        <span class="profile-value">${user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span>
      </div>
    </div>

    <div class="profile-actions">
      <button id="change-password-btn" class="settings-btn">Change Password</button>
      <button id="logout-btn" class="settings-btn">Logout</button>
      <button id="close-profile-btn" class="settings-btn">Close</button>
    </div>

    <!-- Change Password Form (initially hidden) -->
    <form id="change-password-form" class="auth-form" style="display: none; margin-top: 20px;">
      <h3>Change Password</h3>

      <div class="auth-field">
        <label for="current-password">Current Password:</label>
        <input type="password" id="current-password" required class="celtic-form-input" />
      </div>

      <div class="auth-field">
        <label for="new-password">New Password:</label>
        <input type="password" id="new-password" required class="celtic-form-input" />
        <small class="field-help">At least 8 characters with uppercase, lowercase, number, and special character</small>
      </div>

      <div class="auth-field">
        <label for="new-password-confirm">Confirm New Password:</label>
        <input type="password" id="new-password-confirm" required class="celtic-form-input" />
      </div>

      <div class="auth-actions">
        <button type="submit" class="settings-btn">Update Password</button>
        <button type="button" id="cancel-password-change" class="settings-btn">Cancel</button>
      </div>

      <div id="password-change-error" class="auth-error" style="display: none;"></div>
    </form>
  `;

  const modal = showCelticModal(modalContent, { id: 'profile-modal' });

  // Wire up buttons
  const changePasswordBtn = modal.querySelector('#change-password-btn');
  const logoutBtn = modal.querySelector('#logout-btn');
  const closeBtn = modal.querySelector('#close-profile-btn');
  const passwordForm = modal.querySelector('#change-password-form');
  const cancelPasswordBtn = modal.querySelector('#cancel-password-change');

  changePasswordBtn.onclick = () => {
    passwordForm.style.display = 'block';
    changePasswordBtn.style.display = 'none';
  };

  cancelPasswordBtn.onclick = () => {
    passwordForm.style.display = 'none';
    changePasswordBtn.style.display = 'inline-block';
    passwordForm.reset();
    hideAuthError(passwordForm.querySelector('#password-change-error'));
  };

  logoutBtn.onclick = async () => {
    hideCelticModal('profile-modal');
    await handleLogout();
  };

  closeBtn.onclick = () => hideCelticModal('profile-modal');

  // Wire up password change form
  passwordForm.onsubmit = async (event) => {
    event.preventDefault();

    const submitBtn = passwordForm.querySelector('button[type="submit"]');
    const errorDiv = passwordForm.querySelector('#password-change-error');

    const currentPassword = passwordForm.querySelector('#current-password').value;
    const newPassword = passwordForm.querySelector('#new-password').value;
    const newPasswordConfirm = passwordForm.querySelector('#new-password-confirm').value;

    // Validate new password
    const passwordValidation = authClient.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      showAuthError(errorDiv, passwordValidation.errors.join(', '));
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      showAuthError(errorDiv, 'New passwords do not match');
      return;
    }

    setBusy(submitBtn, true);
    hideAuthError(errorDiv);

    try {
      await authClient.changePassword(currentPassword, newPassword);
      hideCelticModal('profile-modal');

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Password Changed',
          text: 'Your password has been updated successfully.',
          icon: 'success',
          customClass: {
            popup: 'celestial-toast'
          },
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      showAuthError(errorDiv, error.message || 'Password change failed');
    } finally {
      setBusy(submitBtn, false);
    }
  };
}

/**
 * Show authentication error
 */
function showAuthError(errorDiv, message) {
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

/**
 * Hide authentication error
 */
function hideAuthError(errorDiv) {
  if (errorDiv) {
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
  }
}

/**
 * Set button busy state
 */
function setBusy(button, isBusy) {
  if (!button) return;

  button.disabled = isBusy;
  button.setAttribute('aria-busy', String(isBusy));

  if (isBusy) {
    button.dataset.originalText = button.textContent;
    button.textContent = 'Loading...';
    button.classList.add('loading');
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.classList.remove('loading');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return authClient.isAuthenticated();
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return authClient.getCurrentUser();
}

/**
 * Get auth token for API requests
 */
export function getAuthToken() {
  return authClient.getToken();
}

/**
 * Make authenticated fetch request
 */
export function authenticatedFetch(url, options = {}) {
  return authClient.authenticatedFetch(url, options);
}