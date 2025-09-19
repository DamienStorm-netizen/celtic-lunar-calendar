# Celtic Calendar App - Architecture Documentation

## 🏛️ **System Overview**

The Celtic Calendar App is a **Progressive Web Application (PWA)** that provides users with a comprehensive Celtic lunar calendar system. Built with **vanilla JavaScript** and following **modern web standards**, the app delivers a rich, interactive experience for tracking Celtic dates, zodiac signs, moon phases, festivals, and personal events.

---

## 📋 **Table of Contents**

1. [Architecture Overview](#architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Data Flow](#data-flow)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Security Architecture](#security-architecture)
8. [Performance Considerations](#performance-considerations)
9. [Development Workflow](#development-workflow)

---

## 🏗️ **Architecture Overview**

### **Architecture Pattern: Component-Based SPA**
```
┌─────────────────────────────────────────────────────────┐
│                    Browser Layer                        │
├─────────────────────────────────────────────────────────┤
│  PWA Shell (index.html + Service Worker + Manifest)    │
├─────────────────────────────────────────────────────────┤
│                 Application Layer                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │   Router    │ │ Components  │ │    Utilities    │   │
│  │  (Hash)     │ │  (Views)    │ │   (Shared)      │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                   Data Layer                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │     API     │ │ LocalStorage│ │     Cache       │   │
│  │   Client    │ │    Store    │ │    System       │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                 Backend Services                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Python FastAPI + Celtic Calendar Logic        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Cloudflare Workers + D1 Database              │   │
│  │  (Authentication & User Data)                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### **Key Architectural Decisions:**

- **Vanilla JavaScript**: No heavy frameworks, optimal performance
- **Component Architecture**: Modular, reusable view components
- **Hash-based Routing**: Simple client-side navigation
- **Progressive Enhancement**: Works offline with cached data
- **API-First Design**: Clean separation of frontend/backend

---

## 📁 **Directory Structure**

```
celtic_calendar/
├── public/
│   ├── assets/
│   │   ├── images/           # Static images (months, zodiac, icons)
│   │   ├── icons/           # App icons and navigation
│   │   └── fonts/           # Custom fonts
│   ├── manifest.webmanifest # PWA configuration
│   └── favicon.ico
├── src/
│   ├── components/          # View components
│   │   ├── home.js         # Home dashboard
│   │   ├── calendar.js     # Interactive calendar
│   │   ├── insights.js     # Zodiac and mystical insights
│   │   ├── settings.js     # User preferences and events
│   │   ├── faq.js          # Frequently asked questions
│   │   ├── about.js        # About page
│   │   ├── privacy.js      # Privacy policy
│   │   ├── auth.js         # Authentication UI components
│   │   └── eventsAPI.js    # Event management API calls
│   ├── utils/              # Shared utilities
│   │   ├── api.js          # API client and endpoints
│   │   ├── dateUtils.js    # Celtic date conversions
│   │   ├── localStorage.js # Local storage management
│   │   ├── modalOverlay.js # Modal system
│   │   ├── lazyLoader.js   # Image lazy loading
│   │   ├── apiCache.js     # API response caching
│   │   ├── security.js     # Input sanitization & XSS protection
│   │   ├── errorHandler.js # Centralized error handling
│   │   ├── swipeHandler.js # Touch gesture handling
│   │   ├── mysticalSettings.js # User preferences
│   │   └── preloader.js    # App initialization
│   ├── constants/          # Static data
│   │   ├── mysticalMessages.js # Random wisdom quotes
│   │   └── starField.js    # SVG star patterns
│   ├── styles/             # Styling
│   │   ├── styles.css      # Main stylesheet
│   │   └── moonveil-theme.css # Flatpickr custom theme
│   ├── main.js             # Application entry point
│   ├── router.js           # Client-side routing
│   └── registerSW.js       # Service Worker registration
├── index.html              # Main HTML shell
├── package.json            # Dependencies and scripts
├── vite.config.js          # Build configuration
└── README.md               # Project overview
```

---

## 🧩 **Core Components**

### **1. Router System (`router.js`)**
**Purpose:** Manages client-side navigation and component loading
**Key Features:**
- Hash-based routing (`#home`, `#calendar`, etc.)
- Lazy component initialization
- Error boundary for route failures
- Navigation highlighting

**API:**
```javascript
navigateTo(hash) // Navigate to specific route
highlightNav()   // Update active navigation state
```

### **2. Component Architecture**

Each component follows a consistent pattern:
```javascript
// Component Structure Pattern
export function renderComponent() {
  return `<!-- HTML template -->`; 
}

export function initComponent() {
  // Initialize event listeners
  // Fetch required data  
  // Setup component-specific behavior
}

export async function componentSpecificFunction() {
  // Component business logic
}
```

#### **Home Component (`home.js`)**
- **Purpose:** Dashboard with current Celtic date, moon phase, zodiac
- **Features:** Birthday calculator, coming events carousel, mystical insights
- **Data Sources:** Celtic date API, moon phases, zodiac data

#### **Calendar Component (`calendar.js`)**  
- **Purpose:** Interactive Celtic calendar with month/day views
- **Features:** Month thumbnails, day modals, event management
- **Complex Logic:** Date conversions, event overlays, modal system

#### **Insights Component (`insights.js`)**
- **Purpose:** Celtic zodiac information and mystical content
- **Features:** Zodiac carousel, festival information, tabbed navigation
- **Interactions:** Modal overlays, scroll animations

#### **Settings Component (`settings.js`)**
- **Purpose:** User preferences and custom event management
- **Features:** CRUD operations for events, mystical preferences, date converter
- **Security:** Input validation, XSS protection

### **3. Utility Systems**

#### **API Client (`api.js`)**
```javascript
// Centralized API interface
export const api = {
  calendarData: () => get('/api/calendar-data'),
  celticDate: () => get('/api/celtic-date'),
  customEvents: () => get('/api/custom-events'),
  addCustomEvent: (evt) => post('/api/custom-events', evt)
};
```

#### **Date Utilities (`dateUtils.js`)**
```javascript
// Celtic ↔ Gregorian date conversions
convertGregorianToCeltic(gregorianDate) 
convertCelticToGregorian(celticMonth, celticDay, year)
getCelticWeekday(celticDay)
getMonthRangeISO(celticMonth, cycle)
```

#### **Modal System (`modalOverlay.js`)**
```javascript
// Unified modal management
showCelticModal(content, options)
hideCelticModal(modalId)
showOverlay() / hideOverlay()
```

---

## 🌊 **Data Flow**

### **Application Initialization:**
```
1. index.html loads → main.js executes
2. Router initializes → navigates to #home  
3. Home component renders → API calls initiated
4. Data flows: API → Component → DOM
5. PWA features activate (service worker, manifest)
```

### **User Interaction Flow:**
```
User Action → Event Handler → Data Processing → API Call (if needed) → State Update → DOM Update
```

### **Example: Adding an Event**
```
1. User fills form in Settings
2. Form submission triggers handleAddEventSubmit()
3. Input validation & sanitization (security.js)
4. API call to backend (/api/custom-events POST)  
5. Local storage update (fallback/cache)
6. UI refresh with new event
7. Success feedback to user
```

---

## 🔗 **API Integration**

### **Backend Architecture**
- **Primary Backend:** Python FastAPI (Render.com)
  - Celtic calendar calculations, lunar data, festivals
- **Authentication Backend:** Cloudflare Workers + D1 Database
  - User authentication, custom events storage
- **Database:** Cloudflare D1 (SQLite-based edge database)
  - Cross-device data synchronization

### **API Endpoints:**

#### **Celtic Calendar API (FastAPI)**
```javascript
GET  /api/healthz              // Service health check
GET  /api/calendar-data        // Static calendar data
GET  /api/celtic-date          // Current Celtic date
GET  /api/dynamic-moon-phases  // Moon phases for date range
GET  /api/festivals           // Celtic festivals
GET  /api/eclipse-events      // Eclipse data with real astronomical calculations
GET  /api/national-holidays   // Holiday information
```

#### **Authentication API (Cloudflare Workers)**
```javascript
POST /api/auth/register        // User registration
POST /api/auth/login          // User login
POST /api/auth/logout         // User logout
GET  /api/auth/profile        // Get user profile
PUT  /api/auth/profile        // Update user profile
GET  /api/auth/custom-events  // Get user's custom events
POST /api/auth/custom-events  // Create user custom event
PUT  /api/auth/custom-events/{id}   // Update user custom event
DELETE /api/auth/custom-events/{id} // Delete user custom event
```

### **Environment Configuration:**
```javascript
// Development: Vite proxy to localhost:8000
// Production: Direct API calls to Render backend
const API_BASE = import.meta.env.VITE_API_BASE || window.location.origin;
```

### **Error Handling Strategy:**
```javascript
// Graceful degradation: API → localStorage → defaults
try {
  data = await api.customEvents();
} catch (error) {
  console.warn('API failed, using localStorage');
  data = loadCustomEvents() || [];
}
```

---

## 🏪 **State Management**

### **Local Storage Schema:**
```javascript
// User preferences
"mysticalPrefs": {
  showHolidays: boolean,
  showCustomEvents: boolean,
  showMoons: boolean,
  showEclipses: boolean,
  showPastEvents: boolean,
  mysticalSuggestions: boolean
}

// Custom events
"customEvents": [
  {
    id: string,
    title: string,
    type: "custom-event",
    category: string,
    date: "YYYY-MM-DD",
    notes: string,
    recurring: boolean
  }
]
```

### **Cache Strategy:**
- **API responses** cached for 5 minutes (apiCache.js)
- **Static data** (festivals, zodiac) cached longer
- **User events** stored in localStorage + synced to API
- **Images** lazy-loaded with browser caching

### **Data Synchronization:**
```javascript
// Merge strategy: Backend data takes precedence
const mergedEvents = [...backendEvents, ...localOnlyEvents];
// Deduplicate by ID or composite key
const uniqueEvents = deduplicateById(mergedEvents);
```

---

## 🔐 **Authentication System**

### **Cloudflare D1 Database Schema:**
```sql
-- Users table with secure authentication
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Custom events tied to user accounts
CREATE TABLE custom_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    type TEXT DEFAULT 'custom-event',
    category TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- User sessions for JWT token management
CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
```

### **Authentication Flow:**
```
1. User registers/logs in → Cloudflare Worker validates credentials
2. Password hashed with PBKDF2 + random salt
3. JWT token generated and stored in session table
4. Frontend stores JWT in localStorage
5. Authenticated API calls include JWT in Authorization header
6. Worker validates JWT and extracts user_id for database operations
```

### **Data Synchronization Strategy:**
- **Primary Source:** Cloudflare D1 database (authenticated users)
- **Fallback:** localStorage (guest users/offline mode)
- **Merge Logic:** Database events take precedence over local events
- **Cross-device Sync:** Automatic when user logs in on new device

---

## 🛡️ **Security Architecture**

### **Input Validation Pipeline:**
```
User Input → validateEventData() → sanitizeForAttribute() → escapeHtml() → Safe DOM
```

### **XSS Protection:**
- **No innerHTML with user data** - Use textContent/createElement
- **Content Security Policy** - Strict script/style sources
- **Input sanitization** - All user inputs validated and escaped
- **Subresource Integrity** - External scripts hash-verified

### **API Security:**
- **Client-side rate limiting** - Prevent API abuse
- **Input validation** - Validate before API calls
- **Error handling** - No sensitive data in error messages
- **HTTPS only** - All external resources

### **Authentication Security:**
- **Password Hashing:** PBKDF2 with 100,000 iterations + random salt
- **JWT Tokens:** Secure token generation with expiration
- **Session Management:** Database-tracked sessions with cleanup
- **Authorization:** Bearer token validation on protected endpoints
- **Edge Security:** Cloudflare's built-in DDoS and bot protection

---

## ⚡ **Performance Considerations**

### **Bundle Optimization:**
- **Vanilla JS** - No framework overhead (~436KB total)
- **Dynamic imports** - Route-based code splitting possible
- **Tree shaking** - Unused code eliminated by Vite
- **Minification** - Production builds optimized

### **Image Strategy:**
- **Lazy loading** - Images load on scroll (lazyLoader.js)
- **WebP format** - Modern format for smaller sizes  
- **Responsive images** - Multiple sizes for different screens
- **Critical path** - Above-fold images preloaded

### **Caching Strategy:**
```
Static Assets: Browser cache (1 year)
API Responses: Memory cache (5 minutes)  
User Data: localStorage (persistent)
Images: Lazy load + browser cache
```

### **Runtime Performance:**
- **Event delegation** - Minimize event listeners
- **Debounced API calls** - Prevent excessive requests
- **Virtual scrolling** - For large data lists (if needed)
- **Intersection Observer** - Efficient visibility detection

---

## 🔄 **Development Workflow**

### **Local Development:**
```bash
npm run dev        # Start development server
npm run backend    # Start Python API server
npm run dev:both   # Run frontend + backend concurrently
```

### **Build Process:**
```bash
npm run build      # Production build with Vite
npm run preview    # Preview production build
```

### **Code Organization Principles:**
1. **Single Responsibility** - Each function has one clear purpose
2. **DRY (Don't Repeat Yourself)** - Shared utilities for common tasks
3. **Error Boundaries** - Graceful error handling at component level
4. **Security First** - Input validation and XSS protection built-in
5. **Performance Conscious** - Lazy loading and caching strategies

### **Naming Conventions:**
- **Files:** kebab-case (`date-utils.js`)
- **Functions:** camelCase (`convertGregorianToCeltic`)
- **Classes:** PascalCase (`ApiCache`)  
- **Constants:** UPPER_SNAKE_CASE (`FULL_MOONS`)
- **CSS Classes:** kebab-case with BEM methodology

---

## 📈 **Scalability Considerations**

### **Current Architecture Supports:**
- ✅ **Multiple users** (localStorage per user)
- ✅ **Additional components** (modular system)
- ✅ **New API endpoints** (centralized API client)
- ✅ **Enhanced features** (plugin-like utilities)

### **Future Enhancements:**
- ✅ **User Authentication** - Implemented with Cloudflare D1
- ✅ **Cloud Sync** - Cross-device event synchronization active
- **Enhanced Offline Mode** - Improved PWA capabilities
- **Internationalization** - Multiple languages
- **Theming System** - User-customizable themes
- **Social Features** - Share events and insights
- **Advanced Analytics** - Personal lunar patterns and insights

---

## 📝 **Maintenance Guidelines**

### **Adding New Components:**
1. Create component file in `/src/components/`
2. Follow render/init pattern
3. Add route in `router.js`
4. Update navigation in `index.html`
5. Add initialization in respective `*Init.js` file

### **Adding New API Endpoints:**
1. Add method to `api.js`
2. Update error handling strategy
3. Add caching if appropriate
4. Document in this architecture guide

### **Security Updates:**
1. Regular dependency updates
2. CSP policy reviews
3. Input validation audits
4. XSS prevention testing

This architecture documentation should be updated whenever significant changes are made to the system structure or major features are added.

---

**Last Updated:** December 2024  
**Next Review:** March 2025