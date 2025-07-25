// components/homeInit.js

import {
    renderHome,
    fetchCelticDate,
    fetchDynamicMoonPhase,
    fetchCelticZodiac,
    fetchPoemAndUpdate,
    fetchComingEvents,
    fetchFestivals,
    fetchMoonPhases,
    fetchEclipses,
    getEclipseDescription,
    fetchCustomEvents,
    populateComingEventsCarousel,
    initializeCarouselNavigation,
    getMonthNumber,
    convertGregorianToCeltic,
  } from '../components/home.js';
  
  export function initHomeView() {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = renderHome(); // ✨ Move the rendering here
  
    // Everything else stays the same:
    fetchCelticDate();
    fetchDynamicMoonPhase();
    fetchCelticZodiac();
    fetchPoemAndUpdate();
    fetchComingEvents();
    fetchFestivals();
    fetchMoonPhases();
    fetchEclipses();
    fetchCustomEvents();
    populateComingEventsCarousel();
    initializeCarouselNavigation();
    getMonthNumber();
    convertGregorianToCeltic();
  }
  