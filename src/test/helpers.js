/**
 * @fileoverview Test helper functions and utilities
 * Common functions used across multiple test files
 */

import { vi } from 'vitest'

/**
 * Create a mock DOM element with basic properties
 * @param {string} tagName - HTML tag name
 * @param {Object} options - Element options
 * @returns {Object} Mock DOM element
 */
export function createMockElement(tagName = 'div', options = {}) {
  const element = {
    tagName: tagName.toUpperCase(),
    className: options.className || '',
    id: options.id || '',
    textContent: options.textContent || '',
    innerHTML: options.innerHTML || '',
    style: {},
    dataset: {},
    attributes: new Map(),
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(() => false),
      toggle: vi.fn()
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    getAttribute: vi.fn(),
    setAttribute: vi.fn(),
    hasAttribute: vi.fn(() => false),
    removeAttribute: vi.fn(),
    click: vi.fn(),
    focus: vi.fn(),
    blur: vi.fn()
  }
  
  return element
}

/**
 * Mock document.getElementById for specific IDs
 * @param {Object} elementMap - Map of ID to mock elements
 */
export function mockDocumentElements(elementMap) {
  const originalGetElementById = document.getElementById
  
  document.getElementById = vi.fn((id) => {
    return elementMap[id] || null
  })
  
  // Return cleanup function
  return () => {
    document.getElementById = originalGetElementById
  }
}

/**
 * Create mock event object
 * @param {string} type - Event type
 * @param {Object} options - Event options
 * @returns {Object} Mock event
 */
export function createMockEvent(type = 'click', options = {}) {
  return {
    type,
    target: options.target || createMockElement(),
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    ...options
  }
}

/**
 * Mock API responses for testing
 * @param {Object} responses - Map of endpoints to responses
 */
export function mockApiResponses(responses) {
  const mockFetch = vi.fn((url) => {
    const endpoint = new URL(url).pathname
    const response = responses[endpoint]
    
    if (response) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(response)
      })
    }
    
    return Promise.reject(new Error(`No mock response for ${endpoint}`))
  })
  
  vi.stubGlobal('fetch', mockFetch)
  return mockFetch
}

/**
 * Mock localStorage with specific data
 * @param {Object} data - Initial localStorage data
 */
export function mockLocalStorage(data = {}) {
  const store = { ...data }
  
  const mockStorage = {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    })
  }
  
  vi.stubGlobal('localStorage', mockStorage)
  return { mockStorage, store }
}

/**
 * Wait for async operations to complete
 * @param {number} ms - Milliseconds to wait
 */
export function waitFor(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Create mock Celtic date data
 * @param {Object} overrides - Properties to override
 * @returns {Object} Mock Celtic date object
 */
export function createMockCelticDate(overrides = {}) {
  return {
    celticDate: '15th of Lugh, Cycle of Silver Moon',
    gregorianDate: '2024-07-22',
    month: 'Lugh',
    day: 15,
    cycle: 'Silver Moon',
    weekday: 'Aquae',
    lunarPhase: {
      name: 'Waxing Gibbous',
      illumination: 0.73
    },
    ...overrides
  }
}

/**
 * Create mock event data
 * @param {Object} overrides - Properties to override
 * @returns {Object} Mock event object
 */
export function createMockEvent(overrides = {}) {
  return {
    id: 'evt_123456789',
    title: 'Test Event',
    type: 'custom-event',
    category: '💡 General',
    date: '2024-07-15',
    notes: 'Test event notes',
    recurring: false,
    created: '2024-01-01T00:00:00Z',
    modified: '2024-01-01T00:00:00Z',
    ...overrides
  }
}

/**
 * Simulate user input on form elements
 * @param {Object} element - Mock element
 * @param {string} value - Value to input
 */
export function simulateInput(element, value) {
  element.value = value
  const inputEvent = createMockEvent('input', { target: element })
  element.dispatchEvent?.(inputEvent)
}

/**
 * Create a promise that resolves after specified time
 * Useful for testing async behavior
 * @param {any} value - Value to resolve with
 * @param {number} delay - Delay in milliseconds
 */
export function delayedPromise(value, delay = 100) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), delay)
  })
}