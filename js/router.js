import {renderHome, fetchCelticDate, fetchDynamicMoonPhase, fetchCelticZodiac, fetchPoemAndUpdate, fetchComingEvents, fetchFestivals, fetchMoonPhases, fetchEclipses, getRandomEclipseDescription, fetchCustomEvents,  populateComingEventsCarousel, initializeCarouselNavigation, getMonthNumber, convertGregorianToCeltic} from './components/home.js';
import {renderCalendar} from './components/calendar.js';
import {renderInsights, initializeTabbedNav, initializeCelticZodiac, initializeFestivalCarousel, initializeMoonPoetry } from './components/insights.js';
import {renderSettings, setupSettingsEvents } from './components/settings.js';
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

// Handle navigation changes
function handleNavigation() {
  const hash = window.location.hash || '#home'; // Default to home
  const page = routes[hash.replace('#', '')];
  if (page) {
    document.getElementById('app').innerHTML = page();
  } else {
    console.error('Page not found:', hash);
  }
}

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
        appContainer.innerHTML = 
        renderHome();
        fetchCelticDate(); // Fetch dynamic date for the home page
        fetchDynamicMoonPhase(); // Fetch dynamic moon phase
        fetchCelticZodiac(); // Fetch Celtic Zodiac sign
        fetchPoemAndUpdate(); // Fetch Moon poem and update
        fetchComingEvents(); // Fetch upcoming events for the next 3 days
        fetchFestivals();
        fetchMoonPhases();
        fetchEclipses();
        getRandomEclipseDescription();
        fetchCustomEvents();
        populateComingEventsCarousel(); // Display coming events
        initializeCarouselNavigation();
        getMonthNumber();
        convertGregorianToCeltic();
        break;
      case 'insights':
        appContainer.innerHTML = 
        renderInsights();
        initializeTabbedNav();
        initializeCelticZodiac();
        initializeFestivalCarousel();
        initializeMoonPoetry();
        break;
      case 'calendar':
        appContainer.innerHTML = "";
        renderCalendar();
        break;
      case 'about':
        appContainer.innerHTML = renderAbout();
        break;
      case 'settings':
        appContainer.innerHTML = renderSettings();
        setupSettingsEvents();
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