/**
 * Security Utility Functions for Celtic Calendar App
 * Provides XSS protection and input sanitization
 */

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - HTML-escaped text
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') {
    return String(text || '');
  }
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Sanitize text for use in HTML attributes
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text safe for attributes
 */
export function sanitizeForAttribute(text) {
  if (typeof text !== 'string') {
    return String(text || '');
  }
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Create safe HTML content using template literals
 * Automatically escapes interpolated values
 * @param {TemplateStringsArray} strings - Template string parts
 * @param {...any} values - Values to interpolate (will be escaped)
 * @returns {string} - Safe HTML string
 */
export function safeHtml(strings, ...values) {
  let result = strings[0];
  
  for (let i = 0; i < values.length; i++) {
    result += escapeHtml(values[i]) + strings[i + 1];
  }
  
  return result;
}

/**
 * Create safe HTML attributes
 * @param {Object} attributes - Object with attribute names and values
 * @returns {string} - Safe attribute string
 */
export function safeAttributes(attributes) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${sanitizeForAttribute(value)}"`)
    .join(' ');
}

/**
 * Validate and sanitize user input
 * @param {string} input - User input to validate
 * @param {Object} options - Validation options
 * @returns {Object} - Validation result with sanitized value
 */
export function validateInput(input, options = {}) {
  const {
    maxLength = 1000,
    minLength = 0,
    allowHtml = false,
    required = false,
    pattern = null
  } = options;

  const result = {
    isValid: true,
    errors: [],
    sanitized: input
  };

  // Check if input is provided when required
  if (required && (!input || input.trim().length === 0)) {
    result.isValid = false;
    result.errors.push('This field is required');
    return result;
  }

  // Convert to string and trim
  const stringInput = String(input || '').trim();
  
  // Check length constraints
  if (stringInput.length < minLength) {
    result.isValid = false;
    result.errors.push(`Minimum length is ${minLength} characters`);
  }
  
  if (stringInput.length > maxLength) {
    result.isValid = false;
    result.errors.push(`Maximum length is ${maxLength} characters`);
  }

  // Check pattern if provided
  if (pattern && !pattern.test(stringInput)) {
    result.isValid = false;
    result.errors.push('Invalid format');
  }

  // Sanitize HTML if not allowed
  if (!allowHtml) {
    result.sanitized = escapeHtml(stringInput);
  } else {
    result.sanitized = stringInput;
  }

  return result;
}

/**
 * Safe DOM element creation with escaped content
 * @param {string} tagName - HTML tag name
 * @param {Object} options - Element options
 * @returns {HTMLElement} - Created element
 */
export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);
  
  const { 
    textContent, 
    className, 
    attributes = {}, 
    children = [] 
  } = options;

  // Set text content safely (auto-escapes)
  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  // Set class name
  if (className) {
    element.className = className;
  }

  // Set attributes safely
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, sanitizeForAttribute(value));
  }

  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
}

/**
 * Safe innerHTML replacement using DocumentFragment
 * @param {HTMLElement} container - Container element
 * @param {string} htmlString - HTML string (should be pre-sanitized)
 */
export function safeSetInnerHTML(container, htmlString) {
  // Clear container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Create document fragment from HTML
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  
  // Append the fragment
  container.appendChild(template.content);
}

/**
 * Remove potentially dangerous attributes from HTML elements
 * @param {HTMLElement} element - Element to clean
 */
export function sanitizeElement(element) {
  const dangerousAttributes = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus',
    'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect',
    'onkeydown', 'onkeyup', 'onkeypress'
  ];

  dangerousAttributes.forEach(attr => {
    if (element.hasAttribute(attr)) {
      element.removeAttribute(attr);
      console.warn(`Removed dangerous attribute: ${attr}`);
    }
  });

  // Recursively clean child elements
  Array.from(element.children).forEach(child => {
    sanitizeElement(child);
  });
}

/**
 * Validate event data before saving
 * @param {Object} eventData - Event data to validate
 * @returns {Object} - Validation result
 */
export function validateEventData(eventData) {
  const result = {
    isValid: true,
    errors: [],
    sanitized: {}
  };

  // Validate title
  const titleValidation = validateInput(eventData.title, {
    required: true,
    maxLength: 100,
    minLength: 1
  });
  
  if (!titleValidation.isValid) {
    result.isValid = false;
    result.errors.push(...titleValidation.errors.map(e => `Title: ${e}`));
  } else {
    result.sanitized.title = titleValidation.sanitized;
  }

  // Validate notes
  if (eventData.notes) {
    const notesValidation = validateInput(eventData.notes, {
      maxLength: 500
    });
    
    if (!notesValidation.isValid) {
      result.isValid = false;
      result.errors.push(...notesValidation.errors.map(e => `Notes: ${e}`));
    } else {
      result.sanitized.notes = notesValidation.sanitized;
    }
  }

  // Validate date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(eventData.date)) {
    result.isValid = false;
    result.errors.push('Invalid date format');
  } else {
    result.sanitized.date = eventData.date;
  }

  // Copy other safe properties
  result.sanitized.category = eventData.category || 'General';
  result.sanitized.type = 'custom-event';
  result.sanitized.recurring = Boolean(eventData.recurring);

  return result;
}

/**
 * Generate secure random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
export function generateSecureId(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Use crypto.getRandomValues if available (more secure)
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.warn('Using fallback random generation - less secure');
  }
  
  return result;
}

/**
 * Rate limiting for API calls
 */
export class RateLimiter {
  constructor(maxRequests = 60, windowMs = 60000) { // 60 requests per minute
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(key = 'default') {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get requests for this key
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const keyRequests = this.requests.get(key);
    
    // Remove old requests outside the window
    while (keyRequests.length > 0 && keyRequests[0] < windowStart) {
      keyRequests.shift();
    }
    
    // Check if under limit
    if (keyRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add this request
    keyRequests.push(now);
    return true;
  }

  getRemainingRequests(key = 'default') {
    const keyRequests = this.requests.get(key) || [];
    return Math.max(0, this.maxRequests - keyRequests.length);
  }
}

// Export a default rate limiter instance
export const defaultRateLimiter = new RateLimiter();