import {renderHome} from './components/home.js';
import {renderCalendar} from './components/calendar.js';
import {renderInsights} from './components/insights.js';
import {renderSettings} from './components/settings.js';

const routes = {
    home: renderHome,
    calendar: renderCalendar,
    insights: renderInsights,
    settings: renderSettings,
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

export function navigateTo(hash) {
    const view = routes[hash.replace('#', '')] || Home;
    document.getElementById('app').innerHTML = view();
}

// Listen for hash changes
window.addEventListener('hashchange', () => navigateTo(location.hash));
window.addEventListener('load', () => navigateTo(location.hash || '#home'));