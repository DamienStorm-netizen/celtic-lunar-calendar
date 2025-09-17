# Celtic Calendar App - API Documentation

## 🌐 **API Overview**

The Celtic Calendar App communicates with a **Python FastAPI backend** that provides Celtic calendar calculations, lunar data, festivals, and user event management. The API follows RESTful conventions and returns JSON responses.

---

## 🔧 **Base Configuration**

### **Environment Setup**
```javascript
// Development (Vite proxy)
VITE_API_BASE="" // Uses localhost:8000 via proxy

// Production (Render.com)  
VITE_API_BASE="https://your-api-render.com"
```

### **Request Headers**
```javascript
// All requests include:
{
  "Accept": "application/json",
  "Cache-Control": "no-store" // Prevents caching issues
}

// POST requests additionally include:
{
  "Content-Type": "application/json"
}
```

---

## 📋 **API Endpoints**

### **🏥 Health & System**

#### `GET /api/healthz`
**Purpose:** Service health check and status  
**Authentication:** None required  
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-09T10:30:00Z",
  "version": "1.0.0"
}
```

---

### **📅 Calendar & Date Information**

#### `GET /api/calendar-data`
**Purpose:** Get static calendar configuration and month data  
**Authentication:** None required  
**Response:**
```json
{
  "months": {
    "Nivis": {
      "name": "Nivis", 
      "tagline": "The month of snow and reflection",
      "thumbnail": "/assets/images/months/nivis-thumbnail.png",
      "background": "/assets/images/months/nivis-bg.png"
    }
    // ... 12 more months
  },
  "config": {
    "daysPerMonth": 28,
    "monthsPerYear": 13,
    "leapDayMonth": "Mirabilis"
  }
}
```

#### `GET /api/celtic-date`
**Purpose:** Get current Celtic date with lunar calculations  
**Authentication:** None required  
**Response:**
```json
{
  "celticDate": "15th of Lugh, Cycle of the Silver Moon",
  "gregorianDate": "2024-07-22",
  "month": "Lugh",
  "day": 15,
  "cycle": "Silver Moon",
  "weekday": "Aquae",
  "lunarPhase": {
    "name": "Waxing Gibbous",
    "illumination": 0.73
  }
}
```

#### `GET /api/dynamic-moon-phases`
**Purpose:** Get moon phases for specific date range  
**Authentication:** None required  
**Query Parameters:**
- `start_date` (required): Start date in YYYY-MM-DD format
- `end_date` (required): End date in YYYY-MM-DD format

**Example Request:**
```
GET /api/dynamic-moon-phases?start_date=2024-07-01&end_date=2024-07-31
```

**Response:**
```json
[
  {
    "date": "2024-07-05",
    "phase": "New Moon",
    "illumination": 0.02,
    "celticDate": "9th of Lugh",
    "significance": "Time for new beginnings and intentions"
  },
  {
    "date": "2024-07-13",
    "phase": "First Quarter", 
    "illumination": 0.50,
    "celticDate": "17th of Lugh",
    "significance": "Decision making and commitment"
  }
  // ... more phases
]
```

---

### **🎉 Events & Festivals**

#### `GET /api/festivals`
**Purpose:** Get Celtic festivals and celebrations  
**Authentication:** None required  
**Response:**
```json
[
  {
    "id": "samhain",
    "name": "Samhain",
    "date": "31st of Samhain",
    "gregorianEquivalent": "October 31st",
    "description": "Celtic new year and harvest celebration",
    "category": "Major Festival",
    "traditions": ["Bonfires", "Ancestor honoring", "Divination"],
    "significance": "Thinning of the veil between worlds"
  },
  {
    "id": "imbolc",
    "name": "Imbolc",
    "date": "15th of Brigid", 
    "gregorianEquivalent": "February 1st-2nd",
    "description": "Festival of lights and Brigid's day",
    "category": "Cross-Quarter Day",
    "traditions": ["Candle lighting", "Craft work", "Poetry"],
    "significance": "Return of light and creativity"
  }
  // ... more festivals
]
```

#### `GET /api/eclipse-events`
**Purpose:** Get eclipse data and Celtic interpretations  
**Authentication:** None required  
**Response:**
```json
[
  {
    "id": "solar_eclipse_2024",
    "type": "Solar Eclipse",
    "date": "2024-04-08",
    "celticDate": "12th of Ostara",
    "visibility": "North America",
    "duration": "4m28s",
    "significance": "Transformation and new cycles",
    "description": "A powerful time for releasing old patterns",
    "zodiacInfluence": "Hazel"
  }
  // ... more eclipses
]
```

#### `GET /api/national-holidays`
**Purpose:** Get national holidays mapped to Celtic dates  
**Authentication:** None required  
**Response:**
```json
[
  {
    "name": "New Year's Day",
    "gregorianDate": "2024-01-01", 
    "celticDate": "5th of Janus",
    "country": "Global",
    "significance": "Beginning of Gregorian year"
  }
  // ... more holidays
]
```

---

### **👤 User Events (Custom Events)**

#### `GET /api/custom-events`
**Purpose:** Get all user-created events  
**Authentication:** None required (stored per-device)  
**Query Parameters:**
- `t` (automatic): Cache-busting timestamp

**Response:**
```json
[
  {
    "id": "evt_1234567890",
    "title": "Birthday Party",
    "type": "custom-event",
    "category": "🎉 Celebration", 
    "date": "2024-07-15",
    "celticDate": "19th of Lugh",
    "notes": "Annual birthday celebration with friends",
    "recurring": true,
    "created": "2024-01-15T10:30:00Z",
    "modified": "2024-01-15T10:30:00Z"
  }
  // ... more events
]
```

#### `POST /api/custom-events`
**Purpose:** Create a new user event  
**Authentication:** None required  
**Request Body:**
```json
{
  "title": "Important Meeting",
  "category": "💼 Work",
  "date": "2024-07-20", 
  "notes": "Quarterly review with team",
  "recurring": false
}
```

**Response:**
```json
{
  "id": "evt_1234567891",
  "title": "Important Meeting", 
  "type": "custom-event",
  "category": "💼 Work",
  "date": "2024-07-20",
  "celticDate": "24th of Lugh",
  "notes": "Quarterly review with team",
  "recurring": false,
  "created": "2024-06-15T14:22:00Z",
  "modified": "2024-06-15T14:22:00Z"
}
```

#### `PUT /api/custom-events/{id}`
**Purpose:** Update existing user event  
**Authentication:** None required  
**Path Parameters:**
- `id`: Event ID to update

**Request Body:** (same as POST, partial updates supported)
```json
{
  "title": "Updated Meeting Title",
  "notes": "Modified meeting notes"
}
```

**Response:** Updated event object (same format as POST response)

#### `DELETE /api/custom-events/{id}`
**Purpose:** Delete user event  
**Authentication:** None required  
**Path Parameters:**
- `id`: Event ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully",
  "deletedId": "evt_1234567891"
}
```

---

## 🔄 **Data Flow Patterns**

### **Application Startup Flow**
```
1. App initializes → GET /api/celtic-date
2. Home component loads → Multiple parallel API calls:
   - GET /api/festivals
   - GET /api/custom-events  
   - GET /api/dynamic-moon-phases
3. Data rendered → Cached for subsequent access
```

### **User Event Management Flow**
```
CREATE:
Form Submit → Validation → POST /api/custom-events → Update localStorage → Refresh UI

READ: 
Page Load → GET /api/custom-events → Merge with localStorage → Display

UPDATE:
Edit Form → Validation → PUT /api/custom-events/{id} → Update localStorage → Refresh UI

DELETE:
Delete Click → Confirmation → DELETE /api/custom-events/{id} → Remove from localStorage → Refresh UI
```

### **Error Handling Pattern**
```
API Call → Success: Use Data
         → Failure: Check localStorage
                  → Found: Use Cached Data + Warning
                  → Not Found: Show Default/Empty State + Error
```

---

## ⚡ **Performance Optimizations**

### **Caching Strategy**
- **API responses:** 5-minute memory cache (`apiCache.js`)
- **Static data:** Browser cache (festivals, calendar config)
- **User events:** localStorage persistence + API sync
- **Images:** Lazy loading + browser cache

### **Request Optimization** 
- **Batch calls:** Multiple endpoints called in parallel
- **Cache-busting:** Automatic timestamps for custom events
- **Debounced requests:** Prevent rapid-fire API calls
- **Fallback strategy:** localStorage when API unavailable

---

## 🛡️ **Security Considerations**

### **Input Validation**
All user inputs are validated client-side before API calls:
```javascript
// Example validation before POST /api/custom-events
const validation = validateEventData(userInput);
if (!validation.isValid) {
  // Show error, don't make API call
  return;
}
```

### **XSS Protection**
- User content is sanitized before display
- API responses are trusted (backend-controlled)
- No `eval()` or dynamic code execution

### **Rate Limiting**
- Client-side rate limiting (60 requests/minute)
- Server-side limits handled gracefully
- Exponential backoff on failures

---

## 🧪 **Testing API Endpoints**

### **Development Testing**
```bash
# Health check
curl http://localhost:8000/api/healthz

# Get Celtic date
curl http://localhost:8000/api/celtic-date

# Create event
curl -X POST http://localhost:8000/api/custom-events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Event","date":"2024-07-15","category":"Test"}'
```

### **Production Testing**
```bash
# Health check
curl https://your-api-render.com/healthz

# Get festivals (no /api prefix in production)
curl https://your-api-render.com/festivals
```

---

## 📝 **Error Response Format**

All errors follow consistent format:
```json
{
  "error": true,
  "message": "Descriptive error message",
  "code": "ERROR_TYPE",
  "timestamp": "2024-12-09T10:30:00Z",
  "details": {
    "field": "Specific validation error"
  }
}
```

### **Common Error Codes**
- `VALIDATION_ERROR`: Invalid input data
- `NOT_FOUND`: Requested resource doesn't exist  
- `RATE_LIMITED`: Too many requests
- `INTERNAL_ERROR`: Server-side error

---

## 🔮 **Future API Enhancements**

### **Planned Endpoints**
- `GET /api/zodiac-compatibility` - Celtic zodiac matching
- `GET /api/dream-journal` - Dream interpretation features
- `POST /api/user-preferences` - Cross-device settings sync
- `GET /api/meditation-guides` - Guided Celtic meditations

### **Authentication (Future)**
When user accounts are added:
- JWT token-based authentication
- User-specific event storage
- Cross-device synchronization
- Privacy controls

---

**Last Updated:** December 2024  
**API Version:** 1.0  
**Next Review:** March 2025