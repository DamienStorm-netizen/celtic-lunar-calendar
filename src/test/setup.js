/**
 * @fileoverview Test setup and global configuration
 * Runs before all tests to configure the testing environment
 */

import '@testing-library/jest-dom'
import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

// Set up fetch mocking
const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

// Mock environment variables
vi.stubEnv('VITE_API_BASE', 'http://localhost:8000')

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
vi.stubGlobal('localStorage', localStorageMock)

// Mock window.location for router tests
delete window.location
window.location = {
  ...window.location,
  hash: '#home',
  pathname: '/',
  search: '',
  origin: 'http://localhost:5173'
}

// Mock console methods to reduce noise in tests (optional)
// vi.stubGlobal('console', {
//   ...console,
//   warn: vi.fn(),
//   error: vi.fn()
// })

// Global test helpers
global.mockApiResponse = (endpoint, response) => {
  fetchMocker.mockResponseOnce(JSON.stringify(response))
}

global.mockApiError = (endpoint, status = 500, statusText = 'Internal Server Error') => {
  fetchMocker.mockRejectOnce(new Error(`${status} ${statusText}`))
}

// Mock DOM methods that aren't available in jsdom
window.scrollTo = vi.fn()
window.alert = vi.fn()

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock crypto for secure ID generation
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: vi.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    })
  }
})

console.log('🧪 Test environment configured successfully')