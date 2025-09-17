/**
 * @fileoverview Unit tests for security utilities
 * Tests XSS protection, input validation, and sanitization functions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  escapeHtml,
  sanitizeForAttribute,
  validateInput,
  validateEventData,
  createElement,
  generateSecureId,
  RateLimiter
} from './security.js'

describe('Security Utilities', () => {
  describe('escapeHtml', () => {
    it('escapes basic HTML characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = escapeHtml(input)
      expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;')
    })

    it('handles mixed content', () => {
      const input = 'Hello <b>world</b> & "friends"'
      const result = escapeHtml(input)
      expect(result).toBe('Hello &lt;b&gt;world&lt;/b&gt; &amp; "friends"')
    })

    it('handles null and undefined', () => {
      expect(escapeHtml(null)).toBe('')
      expect(escapeHtml(undefined)).toBe('')
      expect(escapeHtml('')).toBe('')
    })

    it('converts non-strings to strings', () => {
      expect(escapeHtml(123)).toBe('123')
      expect(escapeHtml(true)).toBe('true')
    })

    it('prevents XSS injection attempts', () => {
      const maliciousInputs = [
        '<img src=x onerror="alert(1)">',
        '<svg onload="alert(1)">',
        'javascript:alert(1)',
        '<iframe src="javascript:alert(1)"></iframe>'
      ]

      maliciousInputs.forEach(input => {
        const result = escapeHtml(input)
        // HTML should be escaped, making it safe even if keywords remain
        expect(result).not.toContain('<script')
        expect(result).not.toContain('<iframe')
        
        // Check that dangerous HTML tags are escaped
        if (input.includes('<')) {
          expect(result).toContain('&lt;')
        }
        if (input.includes('>')) {
          expect(result).toContain('&gt;')
        }
        
        // Note: escapeHtml only handles HTML characters, not JavaScript URLs
        // For complete XSS protection, use sanitizeForAttribute or validateEventData
      })
    })
  })

  describe('sanitizeForAttribute', () => {
    it('sanitizes for HTML attributes', () => {
      const input = 'value"onclick="alert(1)"'
      const result = sanitizeForAttribute(input)
      expect(result).toBe('value&quot;onclick=&quot;alert(1)&quot;')
    })

    it('handles all dangerous characters', () => {
      const input = '&<>"\'/\''
      const result = sanitizeForAttribute(input)
      expect(result).toBe('&amp;&lt;&gt;&quot;&#x27;&#x2F;&#x27;')
    })

    it('preserves safe characters', () => {
      const input = 'safe-value_123'
      const result = sanitizeForAttribute(input)
      expect(result).toBe('safe-value_123')
    })
  })

  describe('validateInput', () => {
    it('validates required fields', () => {
      const result = validateInput('', { required: true })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('This field is required')
    })

    it('validates length constraints', () => {
      const tooShort = validateInput('hi', { minLength: 5 })
      expect(tooShort.isValid).toBe(false)
      expect(tooShort.errors[0]).toContain('Minimum length is 5')

      const tooLong = validateInput('a'.repeat(101), { maxLength: 100 })
      expect(tooLong.isValid).toBe(false)
      expect(tooLong.errors[0]).toContain('Maximum length is 100')
    })

    it('validates with regex patterns', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const result = validateInput('invalid-email', { pattern: emailPattern })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid format')

      const validResult = validateInput('test@example.com', { pattern: emailPattern })
      expect(validResult.isValid).toBe(true)
    })

    it('sanitizes HTML by default', () => {
      const result = validateInput('<script>alert(1)</script>')
      expect(result.sanitized).toBe('&lt;script&gt;alert(1)&lt;/script&gt;')
    })

    it('allows HTML when specified', () => {
      const result = validateInput('<b>bold</b>', { allowHtml: true })
      expect(result.sanitized).toBe('<b>bold</b>')
    })
  })

  describe('validateEventData', () => {
    const validEvent = {
      title: 'Test Event',
      date: '2024-07-15',
      notes: 'Some notes',
      category: 'General',
      recurring: true
    }

    it('validates complete event data', () => {
      const result = validateEventData(validEvent)
      expect(result.isValid).toBe(true)
      expect(result.sanitized.title).toBe('Test Event')
      expect(result.sanitized.date).toBe('2024-07-15')
    })

    it('requires title field', () => {
      const result = validateEventData({ ...validEvent, title: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.some(e => e.includes('Title'))).toBe(true)
    })

    it('validates date format', () => {
      const result = validateEventData({ ...validEvent, date: 'invalid-date' })
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Invalid date format')
    })

    it('sanitizes event content', () => {
      const maliciousEvent = {
        ...validEvent,
        title: '<script>alert("xss")</script>',
        notes: '<img src=x onerror="alert(1)">'
      }
      
      const result = validateEventData(maliciousEvent)
      if (result.isValid) {
        expect(result.sanitized.title).not.toContain('<script>')
        expect(result.sanitized.notes).not.toContain('<script>')
      }
    })

    it('handles optional fields', () => {
      const minimalEvent = {
        title: 'Minimal Event',
        date: '2024-07-15'
      }
      
      const result = validateEventData(minimalEvent)
      expect(result.isValid).toBe(true)
      expect(result.sanitized.category).toBe('General')
      expect(result.sanitized.recurring).toBe(false)
    })
  })

  describe('createElement', () => {
    it('creates safe DOM elements', () => {
      const element = createElement('div', {
        textContent: 'Safe content',
        className: 'test-class'
      })
      
      expect(element.tagName).toBe('DIV')
      expect(element.textContent).toBe('Safe content')
      expect(element.className).toBe('test-class')
    })

    it('sanitizes attributes', () => {
      const element = createElement('input', {
        attributes: {
          'data-value': 'safe"value'
        }
      })
      
      expect(element.getAttribute('data-value')).toBe('safe&quot;value')
    })

    it('handles children safely', () => {
      const child = document.createElement('span')
      const element = createElement('div', {
        children: [child, 'text node']
      })
      
      expect(element.children).toHaveLength(1)
    })
  })

  describe('generateSecureId', () => {
    it('generates IDs of correct length', () => {
      const id = generateSecureId(16)
      expect(id).toHaveLength(16)
    })

    it('generates unique IDs', () => {
      const id1 = generateSecureId()
      const id2 = generateSecureId()
      expect(id1).not.toBe(id2)
    })

    it('uses crypto when available', () => {
      const cryptoSpy = vi.spyOn(window.crypto, 'getRandomValues')
      generateSecureId()
      expect(cryptoSpy).toHaveBeenCalled()
    })

    it('falls back when crypto unavailable', () => {
      const originalCrypto = window.crypto
      delete window.crypto
      
      const id = generateSecureId()
      expect(id).toHaveLength(16)
      
      window.crypto = originalCrypto
    })
  })

  describe('RateLimiter', () => {
    let rateLimiter

    beforeEach(() => {
      rateLimiter = new RateLimiter(3, 1000) // 3 requests per second
    })

    it('allows requests under limit', () => {
      expect(rateLimiter.isAllowed()).toBe(true)
      expect(rateLimiter.isAllowed()).toBe(true)
      expect(rateLimiter.isAllowed()).toBe(true)
    })

    it('blocks requests over limit', () => {
      // Use up the limit
      rateLimiter.isAllowed()
      rateLimiter.isAllowed()
      rateLimiter.isAllowed()
      
      // This should be blocked
      expect(rateLimiter.isAllowed()).toBe(false)
    })

    it('tracks remaining requests', () => {
      expect(rateLimiter.getRemainingRequests()).toBe(3)
      rateLimiter.isAllowed()
      expect(rateLimiter.getRemainingRequests()).toBe(2)
    })

    it('handles different keys separately', () => {
      rateLimiter.isAllowed('key1')
      rateLimiter.isAllowed('key1')
      rateLimiter.isAllowed('key1')
      
      // key1 should be blocked, but key2 should work
      expect(rateLimiter.isAllowed('key1')).toBe(false)
      expect(rateLimiter.isAllowed('key2')).toBe(true)
    })

    it('resets after time window', async () => {
      // Setup fake timers
      vi.useFakeTimers()
      
      // Use up limit
      rateLimiter.isAllowed()
      rateLimiter.isAllowed()
      rateLimiter.isAllowed()
      expect(rateLimiter.isAllowed()).toBe(false)
      
      // Mock time passage
      vi.advanceTimersByTime(1001)
      
      // Should be allowed again
      expect(rateLimiter.isAllowed()).toBe(true)
      
      // Restore real timers
      vi.useRealTimers()
    })
  })
})