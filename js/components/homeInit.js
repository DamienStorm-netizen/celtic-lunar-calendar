// components/homeInit.js

import {
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
    convertGregorianToCeltic
  } from './home.js';
  
  export function initHomeView() {
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
  