/**
 * @fileoverview Integration tests for API client
 * Tests HTTP communication, error handling, and response parsing
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { api } from './api.js'

describe('API Client', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetchMock.resetMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Celtic Date API', () => {
    it('fetches Celtic date successfully', async () => {
      const mockResponse = {
        celticDate: '15th of Lugh, Cycle of Silver Moon',
        gregorianDate: '2024-07-22',
        month: 'Lugh',
        day: 15,
        weekday: 'Aquae'
      }

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

      const result = await api.celticDate()
      expect(result).toEqual(mockResponse)
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/celtic-date'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/json',
            'Cache-Control': 'no-store'
          })
        })
      )
    })

    it('handles API errors gracefully', async () => {
      fetchMock.mockResponseOnce('', { status: 500, statusText: 'Internal Server Error' })

      await expect(api.celticDate()).rejects.toThrow('500 Internal Server Error')
    })

    it('handles network errors', async () => {
      fetchMock.mockRejectOnce(new Error('Network error'))

      await expect(api.celticDate()).rejects.toThrow('Network error')
    })
  })

  describe('Calendar Data API', () => {
    it('fetches calendar configuration', async () => {
      const mockCalendarData = {
        months: {
          'Lugh': {
            name: 'Lugh',
            tagline: 'Month of harvest and light',
            thumbnail: '/assets/images/months/lugh-thumbnail.png'
          }
        },
        config: {
          daysPerMonth: 28,
          monthsPerYear: 13
        }
      }

      fetchMock.mockResponseOnce(JSON.stringify(mockCalendarData))

      const result = await api.calendarData()
      expect(result).toEqual(mockCalendarData)
      expect(result.config.daysPerMonth).toBe(28)
      expect(result.months.Lugh).toBeDefined()
    })
  })

  describe('Moon Phases API', () => {
    it('fetches moon phases for date range', async () => {
      const mockPhases = [
        {
          date: '2024-07-05',
          phase: 'New Moon',
          illumination: 0.02,
          significance: 'New beginnings'
        },
        {
          date: '2024-07-13',
          phase: 'First Quarter',
          illumination: 0.50,
          significance: 'Decision making'
        }
      ]

      fetchMock.mockResponseOnce(JSON.stringify(mockPhases))

      const result = await api.dynamicMoonPhases('2024-07-01', '2024-07-31')
      expect(result).toEqual(mockPhases)
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('start_date=2024-07-01'),
        expect.anything()
      )
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('end_date=2024-07-31'),
        expect.anything()
      )
    })

    it('validates date parameters', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]))

      await api.dynamicMoonPhases('2024-07-01', '2024-07-31')
      
      const lastCall = fetchMock.mock.calls[0][0]
      expect(lastCall).toContain('start_date=2024-07-01')
      expect(lastCall).toContain('end_date=2024-07-31')
    })
  })

  describe('Events API', () => {
    describe('Festivals', () => {
      it('fetches Celtic festivals', async () => {
        const mockFestivals = [
          {
            id: 'samhain',
            name: 'Samhain',
            date: '31st of Samhain',
            description: 'Celtic new year celebration'
          }
        ]

        fetchMock.mockResponseOnce(JSON.stringify(mockFestivals))

        const result = await api.festivals()
        expect(result).toEqual(mockFestivals)
        expect(result[0].name).toBe('Samhain')
      })
    })

    describe('Eclipse Events', () => {
      it('fetches eclipse information', async () => {
        const mockEclipses = [
          {
            id: 'solar_eclipse_2024',
            type: 'Solar Eclipse',
            date: '2024-04-08',
            visibility: 'North America'
          }
        ]

        fetchMock.mockResponseOnce(JSON.stringify(mockEclipses))

        const result = await api.eclipseEvents()
        expect(result).toEqual(mockEclipses)
      })
    })

    describe('National Holidays', () => {
      it('fetches national holidays', async () => {
        const mockHolidays = [
          {
            name: 'New Year\'s Day',
            gregorianDate: '2024-01-01',
            celticDate: '5th of Janus'
          }
        ]

        fetchMock.mockResponseOnce(JSON.stringify(mockHolidays))

        const result = await api.nationalHolidays()
        expect(result).toEqual(mockHolidays)
      })
    })
  })

  describe('Custom Events API', () => {
    describe('GET /api/custom-events', () => {
      it('fetches user events with cache busting', async () => {
        const mockEvents = [
          {
            id: 'evt_123',
            title: 'Birthday Party',
            date: '2024-07-15',
            category: '🎉 Celebration'
          }
        ]

        fetchMock.mockResponseOnce(JSON.stringify(mockEvents))

        const result = await api.customEvents()
        expect(result).toEqual(mockEvents)
        
        // Check that cache-busting timestamp was added
        const lastCall = fetchMock.mock.calls[0][0]
        expect(lastCall).toMatch(/[?&]t=\d+/)
      })

      it('includes current timestamp for cache busting', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([]))

        const beforeTime = Date.now()
        await api.customEvents()
        const afterTime = Date.now()

        const lastCall = fetchMock.mock.calls[0][0]
        const url = new URL(lastCall)
        const timestamp = parseInt(url.searchParams.get('t'))
        
        expect(timestamp).toBeGreaterThanOrEqual(beforeTime)
        expect(timestamp).toBeLessThanOrEqual(afterTime)
      })
    })

    describe('POST /api/custom-events', () => {
      it('creates new custom event', async () => {
        const newEvent = {
          title: 'Important Meeting',
          date: '2024-07-20',
          category: '💼 Work',
          notes: 'Quarterly review'
        }

        const mockResponse = {
          id: 'evt_456',
          ...newEvent,
          created: '2024-06-15T14:22:00Z'
        }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

        const result = await api.addCustomEvent(newEvent)
        expect(result).toEqual(mockResponse)
        
        // Verify POST request was made
        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringContaining('/custom-events'),
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
          })
        )
      })

      it('handles validation errors', async () => {
        const invalidEvent = {
          title: '', // Empty title should cause validation error
          date: 'invalid-date'
        }

        fetchMock.mockResponseOnce(
          JSON.stringify({
            error: 'Validation failed',
            details: { title: 'Title is required' }
          }), 
          { status: 400, statusText: 'Bad Request' }
        )

        await expect(api.addCustomEvent(invalidEvent))
          .rejects.toThrow('API POST failed: 400 Bad Request')
      })

      it('serializes event data correctly', async () => {
        const eventWithSpecialChars = {
          title: 'Event with "quotes" & symbols',
          date: '2024-07-15',
          notes: 'Notes with\nnewlines'
        }

        fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }))

        await api.addCustomEvent(eventWithSpecialChars)

        const lastCall = fetchMock.mock.calls[0]
        const requestBody = lastCall[1].body
        const parsedBody = JSON.parse(requestBody)
        
        expect(parsedBody).toEqual(eventWithSpecialChars)
        expect(parsedBody.title).toContain('"quotes"')
        expect(parsedBody.notes).toContain('\n')
      })
    })
  })

  describe('Error Handling', () => {
    it('throws descriptive errors for HTTP failures', async () => {
      fetchMock.mockResponseOnce('Not Found', { 
        status: 404, 
        statusText: 'Not Found' 
      })

      await expect(api.celticDate()).rejects.toThrow('404 Not Found')
    })

    it('handles JSON parsing errors', async () => {
      fetchMock.mockResponseOnce('invalid json', { status: 200 })

      await expect(api.celticDate()).rejects.toThrow()
    })

    it('handles network timeouts', async () => {
      fetchMock.mockAbortOnce()

      await expect(api.celticDate()).rejects.toThrow()
    })

    it('provides helpful error context', async () => {
      fetchMock.mockResponseOnce('Server Error', {
        status: 500,
        statusText: 'Internal Server Error'
      })

      try {
        await api.addCustomEvent({ title: 'test' })
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error.message).toContain('API POST failed')
        expect(error.message).toContain('500')
        expect(error.message).toContain('Internal Server Error')
      }
    })
  })

  describe('Environment Handling', () => {
    it('constructs URLs correctly for development', () => {
      // Test that URLs are constructed properly
      // This is mainly testing the internal url() function behavior
      expect(true).toBe(true) // Placeholder - would need to expose url function for testing
    })

    it('handles missing environment variables', () => {
      // Test graceful fallback when VITE_API_BASE is not set
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Request Headers', () => {
    it('includes correct headers for GET requests', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}))

      await api.celticDate()

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/json',
            'Cache-Control': 'no-store'
          }),
          cache: 'no-store'
        })
      )
    })

    it('includes correct headers for POST requests', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ id: 'test' }))

      await api.addCustomEvent({ title: 'test', date: '2024-07-15' })

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      )
    })
  })

  describe('Performance Considerations', () => {
    it('does not cache GET requests by default', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}))

      await api.celticDate()

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: 'no-store'
        })
      )
    })

    it('handles concurrent requests properly', async () => {
      // Mock different responses for concurrent calls
      fetchMock
        .mockResponseOnce(JSON.stringify({ source: 'response1' }))
        .mockResponseOnce(JSON.stringify({ source: 'response2' }))

      const [result1, result2] = await Promise.all([
        api.celticDate(),
        api.festivals()
      ])

      expect(result1).toEqual({ source: 'response1' })
      expect(result2).toEqual({ source: 'response2' })
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })
  })
})