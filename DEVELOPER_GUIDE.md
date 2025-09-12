# Celtic Calendar App - Developer Onboarding Guide

## 👋 **Welcome to the Celtic Calendar Project!**

This guide will get you up and running with the Celtic Calendar App, a sophisticated **Progressive Web Application** built with vanilla JavaScript and backed by a Python FastAPI server. Whether you're contributing features, fixing bugs, or just exploring the codebase, this guide has everything you need.

---

## 🚀 **Quick Start (5 Minutes)**

### **Prerequisites**
- **Node.js** 16+ and npm
- **Python** 3.8+ (for backend)
- **Git** for version control
- Code editor (VS Code recommended)

### **Get Running**
```bash
# 1. Clone the repository
git clone [repository-url]
cd celtic_calendar

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies (one-time setup)
npm run backend:install

# 4. Start both frontend and backend
npm run dev:both

# ✨ App should be running at http://localhost:5173
```

### **Verify Installation**
- Frontend: http://localhost:5173 (Celtic Calendar App)
- Backend: http://localhost:8000/healthz (API health check)
- If both respond, you're ready to develop! 🎉

---

## 📁 **Project Structure Deep Dive**

```
celtic_calendar/
├── 📁 public/              # Static assets served directly
│   ├── 🖼️ assets/         # Images, icons, fonts
│   ├── 📄 manifest.webmanifest  # PWA configuration
│   └── 🔍 favicon.ico
│
├── 📁 src/                 # Source code (the heart of the app)
│   ├── 🧩 components/      # View components (main features)
│   ├── 🛠️ utils/          # Shared utilities and helpers
│   ├── 📊 constants/       # Static data and configurations
│   ├── 🎨 styles/         # CSS stylesheets
│   ├── 🚪 router.js       # Client-side routing
│   └── 🎯 main.js         # Application entry point
│
├── 📋 package.json         # Dependencies and scripts
├── ⚙️ vite.config.js      # Build tool configuration
└── 📚 README.md           # Project overview
```

### **Key Directories Explained**

#### **`/src/components/` - The Main Features**
Each file represents a major app section:
- **`home.js`** - Dashboard with current Celtic date and insights
- **`calendar.js`** - Interactive calendar with month/day views  
- **`insights.js`** - Celtic zodiac and mystical content
- **`settings.js`** - User preferences and event management
- **`eventsAPI.js`** - API calls for event CRUD operations

#### **`/src/utils/` - Shared Functionality**
Reusable utilities that multiple components use:
- **`api.js`** - HTTP client for backend communication
- **`dateUtils.js`** - Celtic ↔ Gregorian date conversions
- **`modalOverlay.js`** - Modal system for popups
- **`security.js`** - XSS protection and input validation
- **`lazyLoader.js`** - Performance optimization for images

#### **`/public/assets/` - Visual Assets**  
- **`images/months/`** - Celtic month thumbnails and backgrounds
- **`images/zodiac/`** - Celtic zodiac sign images
- **`icons/`** - Navigation and app icons

---

## 🏗️ **Architecture Overview**

### **Frontend Architecture Pattern**
The app follows a **Component-Based SPA** pattern:

```
User Interaction
      ↓
 Event Handlers
      ↓
   Business Logic
      ↓
    API Calls (if needed)
      ↓
   State Update
      ↓  
   DOM Update
```

### **Component Lifecycle**
Every component follows this pattern:

```javascript
// 1. Render function - Returns HTML template
export function renderComponent() {
  return `<div>HTML template</div>`;
}

// 2. Init function - Sets up behavior
export function initComponent() {
  // Add event listeners
  // Fetch data
  // Initialize component state
}

// 3. Helper functions - Business logic
function handleUserAction() {
  // Process user input
  // Make API calls
  // Update DOM
}
```

### **Data Flow**
```
Backend API → Frontend Cache → Component State → DOM Display
     ↑              ↓
localStorage ← Error Fallback
```

---

## 🛠️ **Development Workflow**

### **Daily Development**
```bash
# Start dev environment
npm run dev:both        # Frontend + Backend together
# OR separately:
npm run dev            # Just frontend (port 5173)
npm run backend        # Just backend (port 8000)

# Check API health
npm run backend:health  # Should return {"status": "healthy"}
```

### **Code Organization Rules**

#### **File Naming**
- **kebab-case** for files: `date-utils.js`, `modal-overlay.js`
- **camelCase** for functions: `convertGregorianToCeltic()`
- **PascalCase** for classes: `ApiCache`, `RateLimiter`
- **UPPER_SNAKE_CASE** for constants: `CELTIC_MONTHS`

#### **Import/Export Style**
```javascript
// ✅ Good - Named exports for utilities
export function convertDate() { ... }
export const MONTHS = [...];

// ✅ Good - Default export for large objects
export default {
  method1: () => {},
  method2: () => {}
};

// ❌ Avoid - Mixed default + named in same file
```

#### **Function Documentation**
Always use JSDoc for public functions:
```javascript
/**
 * Convert Gregorian date to Celtic calendar format
 * @param {string} gregorianDate - Date in YYYY-MM-DD format
 * @returns {string} Celtic date like "15th of Lugh, Cycle of Silver Moon"
 * @throws {Error} If date format is invalid
 * @example
 * convertGregorianToCeltic("2024-07-22") // "15th of Lugh"
 */
export function convertGregorianToCeltic(gregorianDate) {
  // Implementation...
}
```

---

## 🔍 **Debugging & Troubleshooting**

### **Common Issues & Solutions**

#### **🐛 Frontend Won't Start**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### **🐛 Backend Connection Issues**
```bash
# Check if backend is running
curl http://localhost:8000/healthz

# If not, check Python environment
cd ../Backend_Files/lunar-almanac-backend
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
python -m uvicorn prod_server.main:app --reload
```

#### **🐛 API Calls Failing**
1. Check browser Network tab for error details
2. Verify API endpoint in `src/utils/api.js`
3. Check backend logs for errors
4. Test endpoint directly with curl

#### **🐛 Modal/UI Issues**
1. Check for JavaScript errors in Console
2. Verify CSS classes are loaded
3. Test modal system: `showCelticModal("Test content")`

### **Debugging Tools**

#### **Browser DevTools**
```javascript
// Available in development console:
window.api.celticDate()    // Test API calls
window.location.hash = "#settings"  // Navigate programmatically
```

#### **API Testing**
```bash
# Test backend directly
curl http://localhost:8000/api/celtic-date
curl http://localhost:8000/api/festivals
```

#### **Performance Monitoring**
```javascript
// Check cache statistics
import { apiCache } from './src/utils/apiCache.js';
console.log(apiCache.getStats());
```

---

## 🎯 **Contributing Guidelines**

### **Before Making Changes**
1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Understand the component**: Read existing code and JSDoc comments  
3. **Check security**: Use utilities from `src/utils/security.js`
4. **Test thoroughly**: Both desktop and mobile browsers

### **Code Quality Standards**

#### **✅ Do's**
- Use JSDoc comments for public functions
- Sanitize all user input with `security.js` utilities
- Handle API errors gracefully with fallbacks
- Follow existing naming conventions
- Add loading states for async operations
- Test on mobile devices

#### **❌ Don'ts**
- Never use `innerHTML` with user data (XSS risk)
- Don't hardcode API URLs (use `api.js`)
- Avoid inline event handlers in HTML
- Don't commit secrets or API keys
- Don't break existing error handling patterns

### **Adding New Features**

#### **New Component Checklist**
```bash
# 1. Create component file
src/components/my-feature.js

# 2. Add route in router.js
case 'my-feature':
  appContainer.innerHTML = renderMyFeature();
  initMyFeature();
  break;

# 3. Add navigation link in index.html
<a href="#my-feature" class="nav-link">My Feature</a>

# 4. Create init utility if needed
src/utils/myFeatureInit.js

# 5. Update this documentation
```

#### **New API Endpoint Checklist**
```bash
# 1. Add method to api.js
myNewEndpoint: () => get('/api/my-endpoint'),

# 2. Add error handling
try {
  const data = await api.myNewEndpoint();
} catch (error) {
  // Fallback strategy
}

# 3. Update API_DOCUMENTATION.md
# 4. Add JSDoc comments
# 5. Test with curl
```

---

## 🧪 **Testing Strategy**

### **Manual Testing Checklist**
Before submitting changes:

#### **Functionality Tests**
- [ ] All navigation links work
- [ ] Forms submit and validate properly  
- [ ] Modals open/close correctly
- [ ] API calls handle errors gracefully
- [ ] Data persists in localStorage

#### **Security Tests**
- [ ] User input is sanitized (try `<script>alert('xss')</script>`)
- [ ] No console errors about CSP violations
- [ ] External scripts load with integrity checks

#### **Performance Tests**  
- [ ] Images lazy load properly
- [ ] No memory leaks in long sessions
- [ ] API responses are cached appropriately
- [ ] App works offline (PWA features)

#### **Cross-Device Tests**
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome
- [ ] Touch gestures work properly

### **Automated Testing (Future)**
Currently manual testing, but we plan to add:
- Unit tests for utility functions
- Integration tests for API calls
- E2E tests for critical user flows

---

## 📊 **Performance Guidelines**

### **Image Optimization**
```javascript
// ✅ Use lazy loading for non-critical images
<img data-src="/assets/large-image.png" class="lazy-load">

// ✅ Preload critical images
preloadImages(['/assets/critical-image.png']);
```

### **API Optimization**
```javascript
// ✅ Use caching for repeated calls
const cachedData = await cachedFetch('/api/festivals');

// ✅ Batch related API calls
const [festivals, events, phases] = await Promise.all([
  api.festivals(),
  api.customEvents(), 
  api.dynamicMoonPhases(start, end)
]);
```

### **Bundle Size Management**
- Keep external dependencies minimal (currently only 3)
- Use dynamic imports for non-critical features
- Optimize images (WebP format when possible)

---

## 🔐 **Security Best Practices**

### **Input Handling**
```javascript
// ✅ Always validate and sanitize
import { validateEventData, escapeHtml } from '../utils/security.js';

const validation = validateEventData(userInput);
if (!validation.isValid) {
  alert('Invalid input: ' + validation.errors.join(', '));
  return;
}
```

### **DOM Manipulation**
```javascript
// ✅ Safe - Use textContent
element.textContent = userInput;

// ✅ Safe - Use createElement
const div = createElement('div', {
  textContent: userInput,
  className: 'safe-class'
});

// ❌ DANGEROUS - Never do this
element.innerHTML = userInput; // XSS vulnerability!
```

### **API Security**
```javascript
// ✅ Rate limiting
import { defaultRateLimiter } from '../utils/security.js';

if (!defaultRateLimiter.isAllowed('api-call')) {
  console.warn('Rate limit exceeded');
  return;
}
```

---

## 📚 **Learning Resources**

### **Celtic Calendar Concepts**
- The app uses a 13-month lunar calendar
- Each month has 28 days (364 total + 1 leap day)
- Month names: Nivis, Eira, Brigid, Ostara, Maia, Juno, Lugh, Terra, Autumna, Samhain, Aether, Mirabilis, Janus

### **Technical References**
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript reference
- [Vite Guide](https://vitejs.dev/guide/) - Build tool documentation
- [PWA Guide](https://web.dev/progressive-web-apps/) - Progressive Web App concepts
- [FastAPI Docs](https://fastapi.tiangolo.com/) - Backend API framework

### **Code Organization Patterns**
- **Module Pattern**: Each component is a self-contained module
- **Utility Pattern**: Shared functions in `/utils` directory
- **Observer Pattern**: Event-driven architecture with DOM events
- **Fallback Pattern**: Graceful degradation when APIs fail

---

## 🤝 **Getting Help**

### **Documentation Files**
- **`ARCHITECTURE.md`** - Detailed system architecture
- **`API_DOCUMENTATION.md`** - Complete API reference  
- **`SECURITY_AUDIT_REPORT.md`** - Security guidelines
- **`PERFORMANCE_OPTIMIZATION_GUIDE.md`** - Performance tips

### **Code Examples**
Look at existing components for patterns:
- **Simple component**: `src/components/about.js`
- **Complex component**: `src/components/calendar.js`
- **API integration**: `src/components/eventsAPI.js`
- **Utility functions**: `src/utils/dateUtils.js`

### **Common Questions**

**Q: How do I add a new Celtic month?**  
A: Update the `CELTIC_MONTHS` array in `dateUtils.js` and add corresponding assets.

**Q: How do I add a new modal?**  
A: Use `showCelticModal(content, options)` from `modalOverlay.js`.

**Q: How do I make API calls?**  
A: Import from `api.js`: `const data = await api.celticDate();`

**Q: How do I handle user input safely?**  
A: Use `validateEventData()` and `escapeHtml()` from `security.js`.

---

## 🎯 **Next Steps**

Now that you're set up:

1. **Explore the app** - Click through all features to understand functionality
2. **Read the code** - Start with `src/main.js` and follow the flow  
3. **Make a small change** - Add a console.log and see it work
4. **Check out issues** - Look for "good first issue" labels
5. **Ask questions** - The team is here to help!

---

**Welcome to the team! 🌟 Happy coding!**

---

**Last Updated:** December 2024  
**Next Review:** March 2025