/**
 * Clean Modal Overlay System
 * A simple, reliable overlay that works consistently across all components
 */

let overlayElement = null;

// Initialize the overlay element if it doesn't exist
function initOverlay() {
  if (overlayElement) return overlayElement;
  
  overlayElement = document.createElement('div');
  overlayElement.className = 'celtic-overlay';
  overlayElement.id = 'celtic-overlay';
  
  // Add click handler to close modals when clicking overlay
  overlayElement.addEventListener('click', (e) => {
    if (e.target === overlayElement) {
      hideAllCelticModals(); // This will also hide the overlay
      
      // Dispatch custom event so components can listen and close their modals
      document.dispatchEvent(new CustomEvent('celtic-overlay-click'));
    }
  });
  
  document.body.appendChild(overlayElement);
  return overlayElement;
}

// Show the overlay
export function showOverlay() {
  const overlay = initOverlay();
  overlay.classList.add('active');
  document.body.classList.add('modal-open');
}

// Hide the overlay
export function hideOverlay() {
  const overlay = initOverlay();
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// Check if overlay is currently active
export function isOverlayActive() {
  const overlay = initOverlay();
  return overlay.classList.contains('active');
}

// Clean up - useful for testing or component unmounting
export function destroyOverlay() {
  if (overlayElement && overlayElement.parentNode) {
    overlayElement.parentNode.removeChild(overlayElement);
    overlayElement = null;
  }
  document.body.classList.remove('modal-open');
}

/**
 * Complete Modal System
 * Creates and manages clean modal windows
 */

// Show a modal with content
export function showCelticModal(content, options = {}) {
  const modalId = options.id || 'celtic-modal';
  
  // Remove any existing modal with same ID
  const existingModal = document.getElementById(modalId);
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal HTML
  const modal = document.createElement('div');
  modal.id = modalId;
  modal.className = 'celtic-modal';
  modal.innerHTML = `
    <button class="celtic-modal-close" aria-label="Close">✦</button>
    <div class="celtic-modal-content">
      <div class="celtic-modal-body">
        ${content}
      </div>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(modal);
  
  // Show overlay
  showOverlay();
  
  // Show modal with animation
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  
  // Wire up close button
  const closeBtn = modal.querySelector('.celtic-modal-close');
  closeBtn.addEventListener('click', () => hideCelticModal(modalId));
  
  return modal;
}

// Hide a specific modal
export function hideCelticModal(modalId = 'celtic-modal') {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    hideOverlay();
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }
}

// Hide all modals
export function hideAllCelticModals() {
  const modals = document.querySelectorAll('.celtic-modal');
  modals.forEach(modal => {
    modal.classList.remove('active');
    setTimeout(() => {
      if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  });
  hideOverlay();
}