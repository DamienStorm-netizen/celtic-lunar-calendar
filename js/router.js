import { renderHome } from './components/home.js';
import { initHomeView } from './components/homeInit.js';

import {renderCalendar} from './components/calendar.js';

import {renderInsights} from './components/insights.js';
import { initInsightsView } from './components/insightsInit.js';

import {renderSettings } from './components/settings.js';
import { initSettingsView } from './components/settingsInit.js';

import {renderAbout} from './components/about.js';
import {renderPrivacy} from './components/privacy.js';

const routes = {
    home: renderHome,
    calendar: renderCalendar,
    insights: renderInsights,
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
    const routeKey = hash.replace('#', '');
    const appContainer = document.getElementById('app');
  
    switch (routeKey) {
      case 'home':
        appContainer.innerHTML = renderHome();
        initHomeView(); // ✨ Clean and self-contained
        break;
      case 'insights':
        appContainer.innerHTML = renderInsights();
        initInsightsView(); // ✨ Clean and self-contained
        break;
      case 'calendar':
        appContainer.innerHTML = "";
        renderCalendar();
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
}


// Call highlightNav whenever the hash changes
window.addEventListener('hashchange', highlightNav);
window.addEventListener('load', highlightNav);

// Listen for hash changes
window.addEventListener('hashchange', () => navigateTo(location.hash));
window.addEventListener('load', () => navigateTo(location.hash || '#home'));