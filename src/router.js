import { renderHome, fetchCelticDate, fetchCelticZodiac, fetchDynamicMoonPhase, fetchPoemAndUpdate, fetchComingEvents } from './components/home.js';

import { renderCalendar, setupCalendarEvents } from './components/calendar.js';

import { renderInsights} from './components/insights.js';
import { initInsightsView } from './utils/insightsInit.js';

import {renderSettings } from './components/settings.js';
import {initSettingsView } from './utils/settingsInit.js';

import {renderFaq, initFaq} from './components/faq.js';

import {renderAbout} from './components/about.js';
import {renderPrivacy} from './components/privacy.js';


const routes = {
    home: renderHome,
    calendar: renderCalendar,
    insights: renderInsights,
    faq: renderFaq,
    settings: renderSettings,
    about: renderAbout,
    privacy: renderPrivacy
};

// Hover Effects on Nav icons
function highlightNav() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
      }
    });
}

function navigateTo(hash) {
  try {
    const routeKey = hash.replace('#', '');
    const appContainer = document.getElementById('app');
  
    switch (routeKey) {
      case 'home':
        appContainer.innerHTML = renderHome();
        // 🌟 Now kickstart the dynamic magic!
        fetchCelticDate();
        fetchCelticZodiac();
        fetchDynamicMoonPhase();
        fetchPoemAndUpdate();
        fetchComingEvents(); // (fetches and fills the carousel!)
        break;
      case 'insights':
        appContainer.innerHTML = renderInsights();
        initInsightsView(); // ✨ Clean and self-contained
        break;
      case 'calendar':
        appContainer.innerHTML = renderCalendar();
        setupCalendarEvents();
        break;
      case 'faq':
        appContainer.innerHTML = renderFaq();
        initFaq();
        break;
      case 'settings':
        appContainer.innerHTML = renderSettings();
        initSettingsView(); // ✨ Clean and self-contained
        break;
      case 'about':
        appContainer.innerHTML = renderAbout();
        break;
      case 'privacy':
        appContainer.innerHTML = renderPrivacy();
        break;
        
      default:
        console.error('Page not found:', hash);
        appContainer.innerHTML = `<p class="error-message">Oops! Page not found.</p>`;
    }
  } catch (error) {
    console.error("⚡ Router Error:", error);

        const app = document.getElementById("app");
        if (app) {
            app.innerHTML = `
                <div class="error-screen">
                    <h1>🌑 Oops, something mystical went wrong!</h1>
                    <p>${error.message}</p>
                    <button id="retry-button" class="retry-button">🔄 Retry</button>
                </div>
            `;

            const retryButton = document.getElementById("retry-button");
            if (retryButton) {
                retryButton.addEventListener("click", () => {
                    console.log("🔄 Retrying to load page...");
                    loadPage(page || "home"); // try again!
                });
            }
        }
  }
}


// Call highlightNav whenever the hash changes
window.addEventListener('hashchange', highlightNav);
window.addEventListener('load', highlightNav);

// Listen for hash changes
window.addEventListener('hashchange', () => navigateTo(location.hash));
window.addEventListener('load', () => navigateTo(location.hash || '#home'));