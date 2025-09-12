/**
 * Centralized Error Handling Utility
 * Provides consistent error logging and user feedback across the Celtic Calendar App
 */

// Error types for consistent categorization
export const ErrorTypes = {
  VALIDATION: 'validation',
  API_ERROR: 'api_error', 
  NETWORK: 'network',
  DATA_LOAD: 'data_load',
  USER_ACTION: 'user_action'
};

// User-friendly error messages
const USER_MESSAGES = {
  [ErrorTypes.VALIDATION]: "Please check your input and try again.",
  [ErrorTypes.API_ERROR]: "Oops! Something went wrong. Please try again.",
  [ErrorTypes.NETWORK]: "Connection issue. Please check your internet and retry.",
  [ErrorTypes.DATA_LOAD]: "Unable to load data. The app will use cached information.",
  [ErrorTypes.USER_ACTION]: "Action couldn't be completed. Please try again."
};

/**
 * Standardized error handling function
 * @param {Error} error - The error object
 * @param {string} context - Where the error occurred (e.g., "adding event", "loading calendar")
 * @param {string} type - Error type from ErrorTypes
 * @param {boolean} showAlert - Whether to show user alert (default: true for user actions)
 * @param {function} fallback - Optional fallback function to call
 */
export function handleError(error, context, type = ErrorTypes.API_ERROR, options = {}) {
  const { 
    showAlert = true, 
    fallback = null,
    customMessage = null,
    silent = false
  } = options;

  // Consistent logging format with emoji and context
  const logMessage = `🚨 Error ${context}:`;
  
  if (type === ErrorTypes.VALIDATION) {
    console.warn(`⚠️ Validation error ${context}:`, error);
  } else {
    console.error(logMessage, error);
  }

  // Show user-friendly message if not silent
  if (showAlert && !silent) {
    const message = customMessage || USER_MESSAGES[type];
    alert(message);
  }

  // Execute fallback if provided
  if (fallback && typeof fallback === 'function') {
    try {
      fallback();
    } catch (fallbackError) {
      console.warn('⚠️ Fallback function failed:', fallbackError);
    }
  }
}

/**
 * Wrapper for API calls with consistent error handling
 * @param {function} apiCall - The API function to call
 * @param {string} context - Description of the operation
 * @param {function} fallback - Optional fallback function
 */
export async function withErrorHandling(apiCall, context, fallback = null) {
  try {
    return await apiCall();
  } catch (error) {
    handleError(error, context, ErrorTypes.API_ERROR, { 
      fallback,
      showAlert: false // Let calling code decide on user alerts
    });
    throw error; // Re-throw so calling code can handle as needed
  }
}

/**
 * Validation helper with consistent error handling
 * @param {boolean} condition - Validation condition
 * @param {string} message - Error message to show user
 * @param {string} context - Where validation failed
 */
export function validateInput(condition, message, context = 'input validation') {
  if (!condition) {
    handleError(new Error(message), context, ErrorTypes.VALIDATION, {
      customMessage: message
    });
    return false;
  }
  return true;
}

/**
 * Silent error logger for background operations
 * @param {Error} error - The error
 * @param {string} context - Operation context  
 */
export function logError(error, context) {
  handleError(error, context, ErrorTypes.DATA_LOAD, { 
    silent: true, 
    showAlert: false 
  });
}