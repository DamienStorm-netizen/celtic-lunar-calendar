// components/insightsInit.js

import {
    initializeTabbedNav,
    initializeCelticZodiac,
    initializeFestivalCarousel,
    initializeMoonPoetry
  } from './insights.js';
  
  export function initInsightsView() {
    initializeTabbedNav();
    initializeCelticZodiac();
    initializeFestivalCarousel();
    initializeMoonPoetry();
  }