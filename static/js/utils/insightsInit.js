// components/insightsInit.js

import {
    initializeTabbedNav,
    initializeCelticZodiac,
    initializeFestivalCarousel,
    initializeMoonPoetry,
    revealZodiacOnScroll // ✨ New import
  } from '../components/insights.js';
  
  export function initInsightsView() {
    initializeTabbedNav();
    initializeCelticZodiac();
    initializeFestivalCarousel();
    initializeMoonPoetry();
    revealZodiacOnScroll(); // 🌟 Add this here
  }