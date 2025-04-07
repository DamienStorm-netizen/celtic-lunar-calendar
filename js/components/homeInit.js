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
    getRandomEclipseDescription,
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
    getRandomEclipseDescription();
    fetchCustomEvents();
    populateComingEventsCarousel();
    initializeCarouselNavigation();
    getMonthNumber();
    convertGregorianToCeltic();
  }
  