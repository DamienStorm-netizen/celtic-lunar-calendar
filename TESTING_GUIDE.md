# Celtic Calendar App - Testing Guide

## 🧪 **Testing Infrastructure Overview**

This guide covers the complete testing setup for the Celtic Calendar App, including unit tests, integration tests, and continuous integration. Our testing strategy ensures code quality, prevents regressions, and maintains the security and performance standards of the application.

---

## 🚀 **Quick Start**

### **Run Tests**
```bash
# Run all tests in watch mode (development)
npm test

# Run all tests once (CI/production)
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Open test UI (visual test runner)
npm run test:ui
```

### **Test Structure**
```
src/
├── utils/
│   ├── security.js
│   ├── security.test.js     ← Unit tests
│   ├── api.js
│   ├── api.test.js         ← Integration tests
│   └── dateUtils.test.js   ← Unit tests
└── test/
    ├── setup.js            ← Test configuration
    └── helpers.js          ← Test utilities
```

---

## 🏗️ **Testing Framework**

### **Core Technologies**
- **🧪 Vitest**: Fast test runner (Vite-native)
- **🌐 jsdom**: Browser environment simulation
- **📚 Testing Library**: DOM testing utilities
- **🎭 Fetch Mock**: API call mocking
- **📊 V8 Coverage**: Code coverage reporting

### **Configuration Files**
- **`vitest.config.js`** - Main test configuration
- **`src/test/setup.js`** - Global test setup
- **`package.json`** - Test scripts and dependencies

---

## 🔬 **Test Categories**

### **1. Unit Tests** 
**Purpose:** Test individual functions in isolation  
**Location:** `*.test.js` files next to source files  
**Coverage:** Utility functions, data transformations, calculations

**Example:**
```javascript
describe('escapeHtml', () => {
  it('prevents XSS attacks', () => {
    const malicious = '<script>alert("xss")</script>'
    const result = escapeHtml(malicious)
    expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;')
  })
})
```

### **2. Integration Tests**
**Purpose:** Test component interactions and API communication  
**Location:** `api.test.js`, component test files  
**Coverage:** API clients, data flow, error handling

**Example:**
```javascript
describe('API Integration', () => {
  it('handles API failures gracefully', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'))
    
    // Should fall back to localStorage
    const events = await fetchCustomEvents()
    expect(events).toBeDefined()
  })
})
```

### **3. Security Tests**
**Purpose:** Verify XSS protection and input validation  
**Location:** `security.test.js`  
**Coverage:** All user input handling, HTML sanitization

**Example:**
```javascript
describe('XSS Prevention', () => {
  it('sanitizes dangerous HTML attributes', () => {
    const dangerous = 'value"onclick="alert(1)"'
    const safe = sanitizeForAttribute(dangerous)
    expect(safe).not.toContain('onclick')
  })
})
```

---

## 🛠️ **Writing Tests**

### **Test Structure Pattern**
```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { functionToTest } from './module.js'

describe('Module Name', () => {
  beforeEach(() => {
    // Reset mocks, clear localStorage, etc.
  })

  describe('functionToTest', () => {
    it('handles normal input correctly', () => {
      const result = functionToTest('normal input')
      expect(result).toBe('expected output')
    })

    it('handles edge cases', () => {
      expect(functionToTest('')).toBe(null)
      expect(functionToTest(null)).toBe(null)
    })

    it('throws errors appropriately', () => {
      expect(() => functionToTest('invalid')).toThrow('Error message')
    })
  })
})
```

### **Mocking Strategies**

#### **API Calls**
```javascript
import { vi } from 'vitest'

// Mock fetch globally
fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }))

// Mock specific API functions
vi.mock('./api.js', () => ({
  api: {
    celticDate: vi.fn(() => Promise.resolve({ month: 'Lugh' }))
  }
}))
```

#### **DOM Elements**
```javascript
import { createMockElement, mockDocumentElements } from '@test/helpers.js'

// Mock specific elements
const mockButton = createMockElement('button', { id: 'test-btn' })
const cleanup = mockDocumentElements({
  'test-btn': mockButton
})

// Clean up after test
cleanup()
```

#### **localStorage**
```javascript
import { mockLocalStorage } from '@test/helpers.js'

const { mockStorage, store } = mockLocalStorage({
  'customEvents': '[{"title":"Test Event"}]'
})

// Now localStorage.getItem('customEvents') returns the mock data
```

---

## 📊 **Coverage Requirements**

### **Coverage Thresholds**
```javascript
// vitest.config.js
coverage: {
  thresholds: {
    global: {
      branches: 70,    // Control flow coverage
      functions: 80,   // Function call coverage  
      lines: 80,       // Line execution coverage
      statements: 80   // Statement coverage
    }
  }
}
```

### **Priority Coverage Areas**
1. **🔒 Security functions** - 95%+ coverage required
2. **🧮 Date utilities** - 90%+ coverage required  
3. **🌐 API client** - 85%+ coverage required
4. **📝 Event validation** - 90%+ coverage required
5. **🎨 UI components** - 70%+ coverage target

### **Coverage Exclusions**
- Service worker registration
- Development-only code
- External library integrations
- Build configuration files

---

## 🤖 **Continuous Integration**

### **GitHub Actions Workflow**
**File:** `.github/workflows/test.yml`

**Pipeline Stages:**
1. **🧪 Test Suite** - Run all tests on Node.js 18, 20, 21
2. **🧹 Code Quality** - Lint, format, security audit
3. **🏗️ Build Check** - Verify production build works
4. **🔗 Integration** - Test API interactions
5. **🔒 Security Scan** - Check for vulnerabilities
6. **🌐 Compatibility** - Browser compatibility checks
7. **⚡ Performance** - Bundle size analysis

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

### **Quality Gates**
Tests must pass before code can be merged:
- ✅ All unit tests pass
- ✅ Coverage thresholds met
- ✅ No security vulnerabilities
- ✅ Build succeeds
- ✅ Bundle size within limits

---

## 🐛 **Debugging Tests**

### **Common Issues**

#### **Test Fails Locally But Passes in CI**
```bash
# Ensure same Node.js version
node --version  # Should match CI

# Clear all caches
rm -rf node_modules
npm ci
npm test
```

#### **Mock Not Working**
```javascript
// Check mock is called before function
vi.mock('./module.js', () => ({ ... }))
import { functionToTest } from './module.js' // Import after mock

// Verify mock setup
expect(vi.isMockFunction(functionToTest)).toBe(true)
```

#### **Async Test Issues**
```javascript
// Always return promises in async tests
it('async test', async () => {
  const result = await asyncFunction()
  expect(result).toBeDefined()
})

// Or use waitFor for timing
import { waitFor } from '@test/helpers.js'
await waitFor(100) // Wait 100ms
```

### **Debugging Tools**

#### **Test UI**
```bash
npm run test:ui
# Opens browser-based test interface
# Visual test runner with debugging tools
```

#### **Console Debugging**
```javascript
// Add debugging output
console.log('Debug value:', variable)

// Use debugger breakpoints
debugger; // Pauses execution in dev tools

// Pretty print objects
expect(complexObject).toMatchSnapshot() // Creates snapshot for comparison
```

#### **Coverage Analysis**
```bash
npm run test:coverage
# Generates HTML report in coverage/ directory
# Open coverage/index.html to see detailed coverage
```

---

## 🎯 **Test-Driven Development (TDD)**

### **TDD Workflow**
1. **🔴 Red** - Write failing test first
2. **🟢 Green** - Write minimal code to make test pass  
3. **🔄 Refactor** - Improve code while keeping tests green

### **Example TDD Session**
```javascript
// 1. Red - Write failing test
describe('convertCelticDate', () => {
  it('converts Lugh 15 to July date', () => {
    const result = convertCelticDate('Lugh', 15, 2024)
    expect(result).toBe('2024-07-22') // This will fail initially
  })
})

// 2. Green - Implement minimal function
export function convertCelticDate(month, day, year) {
  if (month === 'Lugh' && day === 15 && year === 2024) {
    return '2024-07-22'
  }
  return null // Minimal implementation
}

// 3. Refactor - Add full implementation
export function convertCelticDate(month, day, year) {
  // Full Celtic date conversion logic
  const monthOffset = CELTIC_MONTHS.indexOf(month) * 28
  // ... complete implementation
}
```

---

## 📝 **Best Practices**

### **Test Naming**
```javascript
// ✅ Good - Descriptive test names
describe('User Event Validation', () => {
  it('rejects events with XSS attempts in title', () => {
    // Test XSS prevention
  })
  
  it('accepts valid events with all required fields', () => {
    // Test happy path
  })
})

// ❌ Bad - Vague test names  
describe('Events', () => {
  it('works', () => {
    // What does "works" mean?
  })
})
```

### **Assertion Quality**
```javascript
// ✅ Good - Specific assertions
expect(result.isValid).toBe(false)
expect(result.errors).toContain('Title is required')
expect(result.sanitized.title).toBe('Safe Title')

// ❌ Bad - Vague assertions
expect(result).toBeTruthy() // What exactly should be true?
```

### **Test Independence**
```javascript
// ✅ Good - Each test is independent
beforeEach(() => {
  localStorage.clear()
  fetchMock.resetMocks()
})

// ❌ Bad - Tests depend on each other
let globalState = {}
it('sets up state', () => {
  globalState.value = 'test' // Next test depends on this
})
```

### **Mock Sparingly**
```javascript
// ✅ Good - Mock external dependencies
vi.mock('./api.js')  // External API calls
vi.mock('localStorage') // Browser APIs

// ❌ Bad - Mock internal logic
vi.mock('./dateUtils.js') // Testing should verify this works
```

---

## 🚀 **Performance Testing**

### **Bundle Size Testing**
```bash
# Check bundle size after build
npm run build
du -sh dist/

# Analyze what's in the bundle
npx vite build --mode analyze
```

### **Memory Leak Testing**
```javascript
describe('Memory Management', () => {
  it('cleans up event listeners', () => {
    const component = createComponent()
    const initialListeners = getEventListenerCount()
    
    component.destroy()
    
    expect(getEventListenerCount()).toBe(initialListeners)
  })
})
```

---

## 🔐 **Security Testing**

### **XSS Prevention Tests**
```javascript
describe('XSS Prevention', () => {
  const xssPayloads = [
    '<script>alert("xss")</script>',
    '<img src=x onerror="alert(1)">',
    'javascript:alert(1)',
    '<svg onload="alert(1)">'
  ]

  xssPayloads.forEach(payload => {
    it(`blocks XSS payload: ${payload.substring(0, 20)}...`, () => {
      const safe = sanitizeInput(payload)
      expect(safe).not.toContain('<script>')
      expect(safe).not.toContain('javascript:')
      expect(safe).not.toContain('onerror')
      expect(safe).not.toContain('onload')
    })
  })
})
```

### **Input Validation Tests**
```javascript
describe('Input Validation', () => {
  const maliciousInputs = [
    '../../../etc/passwd',    // Path traversal
    'DROP TABLE users;',      // SQL injection
    '${process.env.SECRET}',  // Template injection
    'eval(malicious_code)'    // Code injection
  ]

  maliciousInputs.forEach(input => {
    it(`sanitizes malicious input: ${input}`, () => {
      const result = validateEventData({ title: input, date: '2024-01-01' })
      expect(result.sanitized.title).not.toBe(input)
    })
  })
})
```

---

## 📈 **Test Metrics & Reporting**

### **Coverage Reports**
- **HTML Report**: `coverage/index.html` - Visual coverage explorer
- **LCOV Report**: `coverage/lcov.info` - For CI integration
- **JSON Report**: `coverage/coverage.json` - Programmatic access

### **Test Results**
- **JUnit XML**: For CI integration
- **Console Output**: Real-time test results
- **GitHub Actions**: Automated PR status checks

### **Quality Metrics**
- **Test Count**: Total number of tests
- **Coverage %**: Code coverage percentage
- **Performance**: Test execution time
- **Security**: Vulnerability scan results

---

## 🤝 **Contributing to Tests**

### **Adding New Tests**
1. **Create test file** alongside source file (`module.test.js`)
2. **Follow naming conventions** - descriptive test names
3. **Include edge cases** - null, empty, invalid inputs
4. **Mock external dependencies** - APIs, localStorage, DOM
5. **Run tests locally** before committing

### **Updating Existing Tests**
1. **Run affected tests** after code changes
2. **Update test snapshots** if UI changes
3. **Maintain test coverage** - don't reduce coverage
4. **Fix failing tests** - don't skip or ignore

---

**Testing is a crucial part of maintaining the Celtic Calendar App's quality and security. Well-tested code is more reliable, easier to refactor, and provides confidence for future development.**

---

**Last Updated:** December 2024  
**Next Review:** March 2025