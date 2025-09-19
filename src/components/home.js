import { initSwipe } from "../utils/swipeHandler.js";
import { getEventIcon } from "../utils/eventUtils.js";
import { showOverlay, hideOverlay, showCelticModal, hideCelticModal } from "../utils/modalOverlay.js";

import { getMysticalPrefs } from "../utils/mysticalSettings.js";
import { mysticalMessages } from "../constants/mysticalMessages.js";
import { slugifyCharm } from "../utils/slugifyCharm.js";
import { api } from "../utils/api.js";
import { saveCustomEvents, loadCustomEvents } from "../utils/localStorage.js";
import { showDayModal, showModal, getNamedMoonForDate } from "./calendar.js";
import { starFieldSVG } from "../constants/starField.js";
import { fetchCustomEvents, createCustomEvent } from "./eventsAPI.js";

import {
  getCelticWeekday,
  convertCelticToGregorian,
  convertGregorianToCeltic,
  getCelticWeekdayFromGregorian
} from "../utils/dateUtils.js";

// Normalize many possible inputs into a strict ISO date string (YYYY-MM-DD)
function toISODate(input) {
  if (!input) return null;

  if (input instanceof Date) {
    // Use local time methods to get the user's actual local date
    const y = input.getFullYear();
    const m = String(input.getMonth() + 1).padStart(2, "0");
    const d = String(input.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  if (typeof input === "string") {
    // Accept plain YYYY-MM-DD or a full ISO timestamp
    const m = input.match(/^(\d{4}-\d{2}-\d{2})/);
    return m ? m[1] : null;
  }

  if (typeof input === "object") {
    // Support shapes like { year, month, day } or { gregorianYear, gregorianMonth, gregorianDay }
    const y = input.year ?? input.y ?? input.gregorianYear;
    const m = input.month ?? input.m ?? input.gregorianMonth;
    const d = input.day ?? input.d ?? input.gregorianDay;
    if (y && m && d) {
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  return null;
}

// Format an ISO date "YYYY-MM-DD" as "Month D" (e.g., "August 14")
function formatMonthDay(iso) {
  if (!iso) return "";
  try {
    const [y, m, d] = iso.split("-").map(Number);
    // Use UTC to avoid off-by-one shifts in some time zones
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso; // fallback
  }
}

// Ensure the Calendar-style modal exists on the Home screen
function ensureCalendarModalOnHome() {
  let modalContainer = document.getElementById("modal-container");
  if (!modalContainer) {
    // Inject a minimal calendar-compatible modal shell
    const shell = document.createElement("div");
    shell.id = "modal-container";
    shell.className = "calendar-modal hidden";
    shell.innerHTML = `
        <div id="modal-content">
          <div id="constellation-layer">
            <svg class="constellation-stars" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
              ${starFieldSVG}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <!-- Example Orion Constellation -->
              <circle cx="100" cy="120" r="2" fill="#f7e98c" filter="url(#glow)" />
              <circle cx="140" cy="160" r="2" fill="#f7e98c" filter="url(#glow)" />
              <circle cx="180" cy="200" r="2" fill="#f7e98c" filter="url(#glow)" />
              <polyline points="100,120 140,160 180,200" stroke="#ffd700" stroke-width="0.5" fill="none" />
            </svg>
          </div>
          <button id="close-modal" class="mystical-close">✦</button>
          <div id="modal-details"></div>
        </div>
      `;
    document.body.appendChild(shell);
    modalContainer = shell;
  }
  // Wire up close behaviors for the calendar modal
  const closeBtn = modalContainer.querySelector("#close-modal");
  if (closeBtn && !closeBtn.__wired) {
    closeBtn.addEventListener("click", () => {
      modalContainer.classList.add("hidden");
      modalContainer.classList.remove("show");
      hideOverlay();
    });
    closeBtn.__wired = true;
  }
  
  // Listen for overlay clicks to close calendar modal
  if (!modalContainer.__overlayWired) {
    document.addEventListener('celtic-overlay-click', () => {
      if (modalContainer.classList.contains("show")) {
        modalContainer.classList.add("hidden");
        modalContainer.classList.remove("show");
        
        // Also clean up the temporary old overlay if it exists
        const tempOverlay = document.getElementById("modal-overlay");
        if (tempOverlay) {
          tempOverlay.classList.remove("show");
          tempOverlay.classList.add("hidden");
        }
      }
    });
    modalContainer.__overlayWired = true;
  }
  return modalContainer;
}

// Given an ISO 'YYYY-MM-DD' and an array of zodiac objects ({name,start_date,end_date}),
// return the matching sign name (or 'Unknown').
function findZodiacByGregorian(isoDate, zodiacArray) {
  if (!isoDate || !Array.isArray(zodiacArray)) return "Unknown";
  const [, m, d] = isoDate.split("-").map(Number);

  const match = zodiacArray.find(sign => {
    const [, sMonth, sDay] = sign.start_date.split("-").map(Number);
    const [, eMonth, eDay] = sign.end_date.split("-").map(Number);

    const afterStart = (m > sMonth) || (m === sMonth && d >= sDay);
    const beforeEnd  = (m < eMonth) || (m === eMonth && d <= eDay);

    // Handle ranges that wrap the year end (e.g., Nov 25 – Jan 1)
    return (sMonth < eMonth || (sMonth === eMonth && sDay <= eDay))
      ? (afterStart && beforeEnd)
      : (afterStart || beforeEnd);
  });

  return match?.name || "Unknown";
}

export function renderHome() {
    // Return the HTML and then in the next tickß attach overlay & swipe
    const html = `
        <section class="home fade-in">
            <div class="celtic-date"></div>
            <div class="celtic-info-container">

            <!--- *** MOON & CELTIC ZODIAC *** --->
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic"></div>
                          <h4 class="moon-phase-name"></h4>
                    </div>
                </div>
                <!-- Celtic Zodiac Column -->
                <div class="zodiac-column">
                    <div class="celtic-zodiac">
                        <p class="goldenTitle">Celtic Zodiac</p>
                        <div class="celtic-zodiac-details">
                            <h4 class="zodiac-sign"></h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tree-of-life">

                <!--- *** MOON POEM *** --->
                <div class="poem-container">
                    <blockquote class="moon-poem">Fetching poetic wisdom...</blockquote>
                </div>

                <!-- What's Happening! Carousel -->
                <div id="coming-events-container">
                    <h3 class="coming-events-header">The Journey Unfolds</h3>
                    <button class="coming-events-carousel-prev">
                      <img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev">
                    </button>
                    <div id="coming-events-carousel" class="coming-events-carousel-container">
                        <div class="coming-events-slide active">
                            <p>Loading events...</p>
                        </div>
                    </div>
                    <button class="coming-events-carousel-next">
                      <img src="/assets/images/decor/moon-crescent-next.png" alt="Next">
                    </button>
                </div>

                <!-- *** CELTIC BIRTHDAY SECTION *** -->
            <section class="celtic-birthday" style="background-image: url('/assets/images/decor/moon-circle.png'); background-repeat: no-repeat; background-position: center top; background-size: 250px;">
                <h2 class="celtic-birthday-header">What is my Lunar Birthday?</h2>
                <p>Enter your birthdate and discover your Celtic Zodiac sign and lunar date:</p>
                
                <input type="date" id="birthdateInput" class="flatpickr-input" />

                <button id="revealZodiac" class="gold-button">Reveal My Celtic Sign</button>

                <div id="birthdayResults" class="birthday-results hidden">
                <p><strong>Your Lunar Birthday is </strong> <span id="lunarDateOutput"></span></p>
                <img class="birthdayZodiacImage" src="" alt="" style="display:none;" />
                <p><strong>Your Celtic Zodiac Sign:</strong> <span id="celticSignOutput"></span></p>
                <p id="traitsParagraph" class="hidden">
                  <strong>Zodiac Traits:</strong>
                  <span id="traitsOutput"></span>
                </p>

                <button id="addBirthdayEvent" class="gold-button">Add to My Calendar</button>
                </div>
            </section>

            <!--- Modal is now created dynamically by the clean modal system --->
        </section>
    `;
    // After the HTML is injected into the DOM, attach overlay handler and swipe listener
    setTimeout(() => {
        // The new modal system handles overlay clicks automatically

        // Step 1: Swipe listener sanity check
        requestAnimationFrame(() => {
          const swipeTarget = document.getElementById("coming-events-carousel");
          if (swipeTarget) {
            initSwipe(swipeTarget, {
              onSwipeLeft:  () => document.querySelector('.coming-events-carousel-next')?.click(),
              onSwipeRight: () => document.querySelector('.coming-events-carousel-prev')?.click()
            });
            // alert("✅ Swipe listener attached to home carousel");
            console.log("Swipe listener attached to home carousel");
          } else {
            // alert("⚠️ coming-events-carousel element not found for swipe init");
            console.warn("coming-events-carousel element not found for swipe init");
          }
        });

        // *** CELTIC BIRTHDAY INTERACTIONS ***
        const birthdateInput = document.getElementById("birthdateInput");
        const revealBtn = document.getElementById("revealZodiac");
        const resultsBox = document.getElementById("birthdayResults");
        //const imageSlugZodiac = slugifyCharm(zodiacSign.name); // Convert to slugified

        // Load zodiac data and build traits map
        let zodiacTraits = {};
        
        api.calendarData()
          .then(data => {
            // Keep the full zodiac array around for later lookups
            window.__ALL_ZODIAC = data.zodiac;
            data.zodiac.forEach(sign => {
              zodiacTraits[sign.name.trim().toLowerCase()] = sign.symbolism;
            });
          })
          .catch(err => console.error("Failed to load zodiac data:", err));

        // On click, compute lunar date and Celtic sign
        revealBtn.addEventListener("click", async () => {
          if (!birthdateInput.value) return;
          const isoDate = birthdateInput.value; // "YYYY-MM-DD"

          // Lunar date using our existing utility
          let lunarDate = convertGregorianToCeltic(isoDate);
          if (!lunarDate || /unknown/i.test(lunarDate)) {
            lunarDate = computeCelticFromGregorianLoose(isoDate);
          }

          // Fetch all signs and pick matching by month/day
          let signName = "";
         try {
            const zodiacArray = (window.__ALL_ZODIAC || (await api.calendarData()).zodiac);
            window.__ALL_ZODIAC = zodiacArray;

            signName = findZodiacByGregorian(isoDate, zodiacArray);
          } catch (e) {
            console.error("Zodiac lookup error:", e);
          }
          
          const lookupKey = (signName || "").trim().toLowerCase();
          if (!zodiacTraits[lookupKey]) {
            console.warn(`⚠️ Traits for ${signName} not found in initial load. ` +
                        `Either the sign name is wrong or the JSON lacks that entry.`);
          }

          const traits = zodiacTraits[lookupKey] || "No traits found.";
          document.getElementById("lunarDateOutput").textContent = lunarDate;
          document.getElementById("celticSignOutput").textContent = signName;
          document.getElementById("traitsOutput").textContent = traits;
          resultsBox.classList.remove("hidden");
          // Set birthday zodiac image now that we know the sign
          const imgEl = document.querySelector(".birthdayZodiacImage");
          if (imgEl && signName) {
            const slug = slugifyCharm(signName).toLowerCase();
            imgEl.src = `/assets/images/zodiac/zodiac-${slug}.png`;
            imgEl.alt = signName;
            imgEl.style.removeProperty("display");
          }
        });

        // Hook up Add to Calendar button
        document.getElementById("addBirthdayEvent")?.addEventListener("click", () => {
            const isoDate = birthdateInput.value;
            console.log("Add Bday button is clicked: ", isoDate);
            const event = {
              id: Date.now().toString(),
              date: isoDate,
              title: `Celtic Birthday`,
              type: "custom-event",
              category: "🎂 Birthday",
              notes: `Lunar: ${document.getElementById("lunarDateOutput").textContent}, Sign: ${document.getElementById("celticSignOutput").textContent}`,
              recurring: true
            };
            // Save locally
            const existing = loadCustomEvents();
            saveCustomEvents([...existing, event]);
            // Send to backend using the authenticated API
            createCustomEvent(event)
            .then(() => {
              // Refresh home carousel to include the new birthday
              fetchComingEvents();
              // SweetAlert2 confirmation instead of alert
              const wd    = getCelticWeekdayFromGregorian(isoDate);
              const lunarAttempt = convertGregorianToCeltic(isoDate);
              const lunar = (!lunarAttempt || /unknown/i.test(lunarAttempt))
                ? computeCelticFromGregorianLoose(isoDate)
                : lunarAttempt;
                
              if (typeof Swal !== "undefined" && Swal.fire) {
                Swal.fire({
                  icon: 'success',
                  title: `Event saved for ${wd}, ${lunar}`,
                  showCancelButton: true,
                  confirmButtonText: 'View Event',
                  cancelButtonText: 'Cancel'
                })
                .then(result => {
                  if (result.isConfirmed) {
                    document.querySelector('.nav-link#nav-calendar').click();
                    setTimeout(() => {
                      const [monthName, dayStr] = lunar.split(' ');
                      showDayModal(parseInt(dayStr, 10), monthName, isoDate);
                    }, 300);
                  }
                });
              }
            })
            .catch(err => {
              console.error("Error adding birthday event:", err);
              if (typeof Swal !== "undefined" && Swal.fire) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops! Could not add your birthday event.'
                });
              }
            });
        });

        // Initialize flatpickr for birthday input with better error handling
        const initBirthdayPicker = () => {
            const birthdayInput = document.getElementById("birthdateInput");
            if (birthdayInput && typeof flatpickr === "function") {
                // Destroy any existing instance first
                if (birthdayInput._flatpickr) {
                    birthdayInput._flatpickr.destroy();
                }

                flatpickr(birthdayInput, {
                    altInput: true,
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    theme: "moonveil",
                    maxDate: "today",  // Don't allow future dates for birthdays
                    position: "above auto",  // Try more specific positioning
                    onReady: function(selectedDates, dateStr, instance) {
                        // Force positioning above the input after calendar is ready
                        if (instance.calendarContainer) {
                            // Add data attribute to exclude from global CSS rules
                            instance.calendarContainer.setAttribute('data-birthday-picker', 'true');

                            const inputRect = birthdayInput.getBoundingClientRect();
                            const calendarHeight = instance.calendarContainer.offsetHeight;

                            instance.calendarContainer.style.position = "absolute";
                            instance.calendarContainer.style.top = `${inputRect.top - calendarHeight - 10}px`;
                            instance.calendarContainer.style.left = `${inputRect.left}px`;
                            instance.calendarContainer.style.zIndex = "10600";
                        }
                    }
                });
                console.log("✨ Birthday flatpickr initialized successfully");
            } else {
                console.warn("Birthday flatpickr initialization failed - element or library not ready");
            }
        };

        // Try to initialize immediately, then with a delay if needed
        initBirthdayPicker();
        setTimeout(initBirthdayPicker, 100);

    }, 0);
    return html;
}

// Fetch the Celtic date dynamically and update the home screen
export async function fetchCelticDate() {
    try {
        const localISO = toISODate(new Date());
        
        // Use local calculation as primary method to avoid backend timezone issues
        const localCelticDate = convertGregorianToCeltic(localISO);
        const [monthName, dayStr] = localCelticDate.split(' ');
        const celticDay = parseInt(dayStr, 10);
        const weekday = getCelticWeekdayFromGregorian(localISO);
        
        console.log("Using local Celtic date calculation:", localCelticDate);
        
        // Still fetch from backend for other data, but override the date calculation
        const response = await fetch(`/api/celtic-date?date=${localISO}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Override backend date calculation with local calculation
        data.month = monthName;
        data.celtic_day = celticDay;
        
        console.log("Using corrected Celtic Date:", data);

        // Build a reliable ISO date and a friendly display string
        const gConv = convertCelticToGregorian(data.month, parseInt(data.celtic_day, 10));
        const gregISO = localISO; // Use the local ISO date we already calculated
        const gregDisplay = formatMonthDay(gregISO);

        // Ensure the data contains the necessary values
        if (!data || !data.month || !data.celtic_day) {
            throw new Error("Incomplete Celtic date data received.");
        }

        // Update the home screen UI
        const dateContainer = document.querySelector('.celtic-date');
        if (dateContainer) {
            dateContainer.innerHTML = `
              <h1 id="celtic-day">${weekday}</h1>
              <p><span id="celtic-month">${data.month} ${data.celtic_day}</span> / <span id="gregorian-month">${gregDisplay}</span></p>
            `;
        }

        // Make the Celtic date (e.g., "Lugh 23") act like the Calendar's "Today" button
        const dateClickable = dateContainer?.querySelector("#celtic-month");
        if (dateClickable) {
          // Accessibility + affordance
          dateClickable.classList.add("clickable-date");
          dateClickable.setAttribute("role", "button");
          dateClickable.setAttribute("tabindex", "0");
          dateClickable.setAttribute("aria-label", "Open this month's calendar");
          dateClickable.setAttribute("title", "Open this month's calendar");

          // Capture today's values from this invocation so we do not re-fetch
          const todayCelticMonth = data.month;

          const openMonthModal = () => {
            try {
              // Ensure we have a calendar-compatible modal shell on Home
              ensureCalendarModalOnHome();
              
              // First show our new overlay system
              showOverlay();
              
              // Create a temporary old-style overlay for calendar compatibility
              let tempOverlay = document.getElementById("modal-overlay");
              if (!tempOverlay) {
                tempOverlay = document.createElement("div");
                tempOverlay.id = "modal-overlay";
                tempOverlay.className = "modal-overlay show";
                tempOverlay.style.display = "none"; // Hide it since we're using Celtic overlay
                document.body.appendChild(tempOverlay);
              } else {
                tempOverlay.classList.add("show");
                tempOverlay.classList.remove("hidden");
                tempOverlay.style.display = "none"; // Hide it since we're using Celtic overlay
              }
              
              // Now render the MONTH view into that modal
              showModal(todayCelticMonth);
            } catch (e) {
              console.error("Failed to open today's modal from home date:", e);
            }
          };

          dateClickable.addEventListener("click", openMonthModal);
          dateClickable.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openMonthModal();
            }
          });
        }

        // ✅ Return structured data so other functions can use it
        return {
            celticMonth: data.month,
            celticDay: parseInt(data.celtic_day, 10),
            gregorianDate: gregISO
        };

    } catch (error) {
        console.error("Failed to fetch Celtic date:", error);
        return null; // Return null instead of breaking execution
    }
}

// Fetch the Celtic Zodiac sign for the day
export async function fetchCelticZodiac() {
  try {
    // 1) Get today’s Celtic date (also gives us today's Gregorian ISO)
    const todayCeltic = await fetchCelticDate();
    if (!todayCeltic) throw new Error("No Celtic date available");

    const { gregorianDate } = todayCeltic; // e.g. "2025-08-14"

    // 2) Load zodiac ranges once and cache
    const data = window.__ALL_ZODIAC ? { zodiac: window.__ALL_ZODIAC } : await api.calendarData();
    const zodiacArray = data.zodiac || [];
    window.__ALL_ZODIAC = zodiacArray;

    // 3) Determine which sign today’s Gregorian date falls into
    const signName = findZodiacByGregorian(gregorianDate, zodiacArray);

    // 4) Render the card
    const container = document.querySelector(".celtic-zodiac-details");
    if (container) {
      container.innerHTML = `
        <div class="zodiac-modal-trigger" data-zodiac="${signName}">
          <img class="celtic-zodiac-image"
               src="/assets/images/zodiac/zodiac-${slugifyCharm(signName).toLowerCase()}.png"
               alt="${signName}" />
          <p>${signName}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Failed to fetch Celtic Zodiac:", error);
  }
}

// Fetch the Moon Phase dynamically and update the home screen
export async function fetchDynamicMoonPhase() {
    const today = toISODate(new Date());
    try {
        // Always go through the API helper so the request hits the backend base URL
        const data = await api.dynamicMoonPhases(today, today);
        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No moon phase data available.");
            return;
        }

        const moonPhase = data[0];

        // Select the container for the moon phase
        const moonPhaseContainer = document.querySelector('.moon-phase');
        if (moonPhaseContainer) {
            moonPhaseContainer.innerHTML = `
                <div class="moon-phase-details">
                    <div class="moon-phase-graphic">${moonPhase.graphic}</div>
                    <p>${moonPhase.moonName || moonPhase.phase}</p>
                </div>
            `;
        }

        // Show poem under the moon
        const poemContainer = document.querySelector('.moon-poem');
        if (poemContainer) {
            poemContainer.textContent = moonPhase.poem || '';
        }
    } catch (error) {
        console.error('Failed to fetch moon phase:', error);
    }
}

// Fetch the Moon Phase poem and update home screen
export async function fetchPoemAndUpdate() {
    try {
        const response = await fetch('/api/lunar-phase-poem');
        if (!response.ok) throw new Error('Failed to fetch the poem.');

        const data = await response.json();
        const poemContainer = document.querySelector('.moon-poem');

        if (poemContainer) {
            poemContainer.innerHTML = `
                ${data.poem}
            `;
        }
    } catch (error) {
        console.error('Error fetching the moon poem:', error);
    }
}

// Fetch moon poem for unamed Full Moon
export function getUnnamedMoonPoem() {
    const poems = [
      "The moon glows gently this month, unnamed yet full of secrets.",
      "A nameless moon rises, wrapped in silver mystery.",
      "No name graces this full moon, yet it hums with quiet magic.",
      "This moon wears no title, only a cloak of shimmering wonder.",
      "A soft and silent full moon drifts through the veil, untethered by name.",
      "The full moon of this month remains unnamed, like a forgotten spell in the night sky."
    ];
    return poems[Math.floor(Math.random() * poems.length)];
  }

  // Fetch upcoming events for the next 5 days
  export async function fetchComingEvents() {
      console.log("Fetching coming events...");
    
      try {
        // 1) Get the Celtic date (to figure out today’s Gregorian date).
        const todayCeltic = await fetchCelticDate();

        if (!todayCeltic) {
          console.error("Could not fetch Celtic date. No upcoming events displayed.");
          return;
        }

        const { celticMonth } = todayCeltic; // we no longer need the formatted gregorianDate

        // Use the actual current date as the anchor for the next 7 days
        const now = new Date();
        const todayDate = new Date(Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate()
        ));

        const pad = (n) => String(n).padStart(2, "0");
        const upcomingDates = [];
    
        // 3) Generate next 7 days in YYYY-MM-DD
        for (let i = 0; i < 7; i++) {
          const d = new Date(todayDate);
          d.setUTCDate(todayDate.getUTCDate() + i);
          const y = d.getUTCFullYear();
          const m = pad(d.getUTCMonth() + 1);
          const dd = pad(d.getUTCDate());
          upcomingDates.push(`${y}-${m}-${dd}`);
      }
        console.log("Next 7 Gregorian Dates:", upcomingDates);
    
        // 4) Fetch all data in parallel
        const [festivals, lunarData, holidays, customEvents, eclipses] = await Promise.all([
          fetchFestivals(),        // now returns *all* festivals in Gregorian date
          fetchMoonPhases(celticMonth),
          fetchNationalHolidays(), // unify logic if needed
          fetchCustomEvents(),      // now returns *all* custom events
          fetchEclipses()  // 🌑 Fetch Eclipse Data
        ]);
    
        // 5) Prepare an empty array to store all upcoming events
        const upcomingEvents = [];
    
        // 5A) Add any festivals that fall within those 5 days
        upcomingDates.forEach(date => {
          console.log(`🔍 Checking festivals for date: ${date}`);
          
          festivals.forEach(festival => {
              console.log(`   🎭 Comparing with festival: ${festival.title} | Date: ${festival.date}`);
          });
      
          const festival = festivals.find(f => f.date === date);
          
          if (festival) {
              console.log("✅ Festival match found!", festival.date, "vs", date);
              console.log("Festival Object:", festival);
      
              upcomingEvents.push({
                  type: "festival",
                  title: festival.title,
                  description: festival.description || "A sacred celebration.",
                  date
              });
          } else {
              console.log("❌ No festival match for", date);
          }
      });
    
      // 5B) Add Named (or plain) Full Moons — ±2-day window
        upcomingDates.forEach(date => {
          // Is this date the exact peak?
          const moonEvent = lunarData.find(m => m.date === date && m.phase === "Full Moon");
          if (moonEvent) {
            // Use helper to see if the date is inside a named-moon window
            const named = getNamedMoonForDate(date, 2);
            
            // Use moon poetry if available, otherwise fall back to description
            const moonDescription = named?.poem || named?.description || moonEvent.description || "A night of celestial power.";
            
            upcomingEvents.push({
              type: "full-moon",
              title: named?.name || moonEvent.moonName || "Full Moon",
              description: moonDescription,
              date
            });
          }
        });
                
  
      // 🌑 Add Lunar & Solar Eclipses (Updated)
      for (const eclipse of eclipses) {
          console.log("🌘 Checking eclipse:", eclipse);
          const cleanDate = eclipse.date.split(" ")[0];
  
          if (upcomingDates.includes(cleanDate)) {
              const celticMonth = getCelticMonthFromDate(cleanDate);
              const description = await getEclipseDescription(eclipse.type, celticMonth);
  
              upcomingEvents.push({
                  type: "eclipse",
                  title: ` ${eclipse.title}`,
                  description,
                  date: cleanDate
              });
          }
      }
      
    
        // 5C) Add national holidays
        upcomingDates.forEach(date => {
          const holiday = holidays.find(h => h.date === date);
          if (holiday) {
            upcomingEvents.push({
              type: "holiday",
              title: holiday.title,
              description: holiday.description || "A recognized holiday.",
              date
            });
          }
        });
    
        // 5D) Add custom events
        upcomingDates.forEach(date => {
          customEvents.forEach(event => {
            const [eYear, eMonth, eDay] = event.date.split("-");
            const matches = event.recurring
              ? date.endsWith(`-${eMonth}-${eDay}`)
              : date === event.date;
            if (matches) {
              upcomingEvents.push({
                type: "custom-event",
                category: event.type,
                title: event.title,
                description: event.notes || "A personal milestone.",
                date
              });
            }
          });
        });
  
  
      // Load user preferences for filtering
      const prefs = getMysticalPrefs();
      /* 🎭 Apply mystical filters (Settings)*/
      const filteredEvents = upcomingEvents.filter(event => {
          if (event.type === "holiday" && !prefs.showHolidays) return false;
          if (event.type === "full-moon" && prefs.showMoons === false) return false;
          if (event.type === "eclipse" && prefs.showEclipses === false) return false;
          if (event.type === "custom-event" && !prefs.showCustomEvents) return false;
          return true; // Keep everything else
      });
  
      // const filteredEvents = upcomingEvents;
      // temporarily skip filter to verify display logic
    
      console.log("Final Upcoming Events Array:", upcomingEvents);
      // Determine local today at midnight
      const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // We only hide past events when the user says so
      const eventsFromToday = prefs.showPastEvents
        ? filteredEvents                               // keep everything
        : filteredEvents.filter(evt => {
            const [y, m, d] = evt.date.split('-').map(Number);
            const evtDate = new Date(y, m - 1, d);
            return evtDate >= todayLocal;              // drop if before today
          });

      console.log("Events heading to the carousel:", eventsFromToday);

      if (document.getElementById("coming-events-container")) {
          populateComingEventsCarousel(eventsFromToday);
          console.log("🌕 Upcoming events array:", eventsFromToday);
      }
  
      } catch (error) {
          console.error("Error fetching coming events:", error);
      }
}

// Reusable boundaries for Celtic months (month indices are 0-based)
const CELTIC_BOUNDS = [
  { name: "Janus",   start: [0, 20],  end: [1, 16] },  // Jan 20 – Feb 16
  { name: "Brigid",  start: [1, 17],  end: [2, 16] },  // Feb 17 – Mar 16
  { name: "Flora",   start: [2, 17],  end: [3, 13] },  // Mar 17 – Apr 13
  { name: "Maia",    start: [3, 14],  end: [4, 11] },  // Apr 14 – May 11
  { name: "Juno",    start: [4, 12],  end: [5, 8]  },  // May 12 – Jun 8
  { name: "Solis",   start: [5, 9],   end: [6, 6]  },  // Jun 9 – Jul 6
  { name: "Terra",   start: [6, 7],   end: [7, 3]  },  // Jul 7 – Aug 3
  { name: "Lugh",    start: [7, 4],   end: [7, 31] },  // Aug 4 – Aug 31
  { name: "Pomona",  start: [8, 1],   end: [8, 28] },  // Sep 1 – Sep 28
  { name: "Autumna", start: [8, 29],  end: [9, 26] },  // Sep 29 – Oct 26
  { name: "Eira",    start: [9, 27],  end: [10, 23] }, // Oct 27 – Nov 23
  { name: "Aether",  start: [10, 24], end: [11, 21] }, // Nov 24 – Dec 21
  { name: "Nivis",   start: [11, 22], end: [0, 19] }   // Dec 22 – Jan 19
];

// Fallback: compute Celtic "Month Day" from a Gregorian ISO string using CELTIC_BOUNDS
function computeCelticFromGregorianLoose(dateStr) {
  const iso = toISODate(dateStr);
  if (!iso) return "Unknown Date";
  const [year, month, day] = iso.split("-").map(Number);
  const monthIndex = month - 1;

  // Find the Celtic entry that contains this Gregorian date
  let entryFound = null;
  for (const entry of CELTIC_BOUNDS) {
    const [sM, sD] = entry.start;
    const [eM, eD] = entry.end;
    const afterStart = (monthIndex > sM) || (monthIndex === sM && day >= sD);
    const beforeEnd  = (monthIndex < eM) || (monthIndex === eM && day <= eD);
    const inRange = sM <= eM ? (afterStart && beforeEnd) : (afterStart || beforeEnd);
    if (inRange) { entryFound = entry; break; }
  }
  if (!entryFound) return "Unknown Date";

  const [sM, sD] = entryFound.start;
  const [eM] = entryFound.end;

  // Determine the actual start year if the range wraps year-end
  let startYear = year;
  if (sM > eM) { // wraps across December -> January
    if (monthIndex <= eM) startYear = year - 1;
  }

  const start = new Date(Date.UTC(startYear, sM, sD));
  const target = new Date(Date.UTC(year, monthIndex, day));
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((target - start) / ONE_DAY) + 1; // 1-indexed
  const dayInCeltic = Math.max(1, Math.min(28, diffDays));     // clamp to 1..28

  return `${entryFound.name} ${dayInCeltic}`;
}


function getCelticMonthFromDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfMonth = dateObj.getDate();
  const monthIndex = dateObj.getMonth(); // 0-based

  const celticMap = [
    { name: "Janus",   start: [0, 20],  end: [1, 16] },  // Jan 20 – Feb 16
    { name: "Brigid",  start: [1, 17],  end: [2, 16] },  // Feb 17 – Mar 16
    { name: "Flora",   start: [2, 17],  end: [3, 13] },  // Mar 17 – Apr 13
    { name: "Maia",    start: [3, 14],  end: [4, 11] },  // Apr 14 – May 11
    { name: "Juno",    start: [4, 12],  end: [5, 8]  },  // May 12 – Jun 8
    { name: "Solis",   start: [5, 9],   end: [6, 6]  },  // Jun 9 – Jul 6
    { name: "Terra",   start: [6, 7],   end: [7, 3]  },  // Jul 7 – Aug 3
    { name: "Lugh",    start: [7, 4],   end: [7, 31] },  // Aug 4 – Aug 31
    { name: "Pomona",  start: [8, 1],   end: [8, 28] },  // Sep 1 – Sep 28
    { name: "Autumna", start: [8, 29],  end: [9, 26] },  // Sep 29 – Oct 26
    { name: "Eira",    start: [9, 27],  end: [10, 23] }, // Oct 27 – Nov 23
    { name: "Aether",  start: [10, 24], end: [11, 21] }, // Nov 24 – Dec 21
    { name: "Nivis",   start: [11, 22], end: [0, 19] }   // Dec 22 – Jan 19
  ];

  for (const entry of celticMap) {
    const [sM, sD] = entry.start;
    const [eM, eD] = entry.end;
    const afterStart = (monthIndex > sM) || (monthIndex === sM && dayOfMonth >= sD);
    const beforeEnd  = (monthIndex < eM) || (monthIndex === eM && dayOfMonth <= eD);
    if (sM <= eM ? (afterStart && beforeEnd) : (afterStart || beforeEnd)) return entry.name;
  }
  return "Janus";
}

  // Fetch upcoming festivals based on the Celtic calendar
export async function fetchFestivals() {
    try {
        // Fetch the festival data (assuming it's served from an endpoint)
        const response = await fetch('/api/festivals'); 
        if (!response.ok) throw new Error("Failed to fetch special days");

        const specialDays = await response.json();
        
        // Normalize festival dates to YYYY-MM-DD format
        const festivalData = specialDays.map(day => ({
            type: "festival",
            title: day.name,
            description: day.description || "A sacred celebration.",
            date: toISODate(day.date) || String(day.date).slice(0, 10)  // Normalize format
        }));

        console.log('📅 Festival data processed:', festivalData);
        return festivalData;

    } catch (err) {
        console.error("🚨 Error fetching festivals:", err);
        return [];
    }
}

// Fetch upcoming moon phases based on the Celtic calendar
export async function fetchMoonPhases(celticMonth) {
    console.log(`Fetching moon phases for ${celticMonth}...`);

    // 🎑 Define Celtic month-to-Gregorian range mapping
    const celticMonthMapping = {
        "Nivis": { start: "2024-12-23", end: "2025-01-19" },
        "Janus": { start: "2025-01-20", end: "2025-02-16" },
        "Brigid": { start: "2025-02-17", end: "2025-03-16" },
        "Flora": { start: "2025-03-17", end: "2025-04-13" },
        "Maia": { start: "2025-04-14", end: "2025-05-11" },
        "Juno": { start: "2025-05-12", end: "2025-06-08" },
        "Solis": { start: "2025-06-09", end: "2025-07-06" },
        "Terra": { start: "2025-07-07", end: "2025-08-03" },
        "Lugh": { start: "2025-08-04", end: "2025-08-31" },
        "Pomona": { start: "2025-09-01", end: "2025-09-28" },
        "Autumna": { start: "2025-09-29", end: "2025-10-26" },
        "Eira": { start: "2025-10-27", end: "2025-11-23" },
        "Aether": { start: "2025-11-24", end: "2025-12-21" }
    };

    // Ensure valid month
    if (!celticMonthMapping[celticMonth]) {
        console.error("Invalid Celtic month:", celticMonth);
        return [];
    }

    // Get the Gregorian range for this Celtic month
    const { start, end } = celticMonthMapping[celticMonth];

    try {
        const moonData = await api.dynamicMoonPhases(start, end);
        console.log("🌙 Moon Phases Retrieved:", moonData);
        return moonData;
    } catch (error) {
        console.error("❌ Error fetching moon phases:", error);
        return [];
    }
}

// 🌑 Fetch upcoming eclipses
export async function fetchEclipses() {
    console.log("Fetching upcoming eclipse events...");
    try {
        const response = await fetch("/api/eclipse-events");
        if (!response.ok) throw new Error("Failed to fetch eclipse events");

        const eclipses = await response.json();
        console.log("🌘 Eclipses Retrieved:", eclipses);
        return eclipses;
    } catch (error) {
        console.error("Error fetching eclipses:", error);
        return [];
    }
}

// 🔮 Get a random eclipse description
export async function getEclipseDescription(type, celticMonth) {
    const descriptions = {
      lunar: {
        winter: [
          "The moon hides in frost-kissed silence, dreaming deep in the veil of Eira.",
          "In the cold hush of Nivis, her shadow passes—old spirits whisper their truths.",
          "A silver eclipse beneath Aether’s stars reveals secrets buried in icebound hearts."
        ],
        spring: [
          "Blossoms tremble as Luna’s face fades—new beginnings stir in ancient soil.",
          "Beneath Brigid’s breath, the moon wanes into myth, and the land leans in to listen.",
          "A soft eclipse in Flora’s bloom—wishes bloom in the dark between stars."
        ],
        summer: [
          "The summer moon weeps petals of gold—her eclipse sings of bold transformations.",
          "Luna dances behind Solis, her mysteries wrapped in warm twilight.",
          "In Terra’s heat, a shadow glides across the moon—prophecies awaken in dreamers."
        ],
        autumn: [
          "Fallen leaves swirl as Luna dims—change ripples in Pomona’s golden hush.",
          "Autumna’s wind carries the eclipse’s hush like a lullaby for sleeping gods.",
          "The Hunter’s moon fades to shadow—memories stir, and the veil thins."
        ]
      },
  
      solar: {
        winter: [
          "In Aether's pale sky, Sol bows—light swallowed by ancient mystery.",
          "A frozen sun in Eira’s grip—change brews beneath the silence.",
          "The Cold Sun vanishes in Nivis, and time forgets to tick."
        ],
        spring: [
          "Beltaine fire dims as Sol hides his face—hearts burn with old passion reborn.",
          "A Flora eclipse—sunlight swirled in prophecy and pollen.",
          "The spring sun yields—seeds of magic bloom in the shadow’s path."
        ],
        summer: [
          "In Solis' blaze, the eclipse dances—a mirror of power and revelation.",
          "The midsummer sun vanishes—truths flicker, bold and blinding.",
          "A sun-dark hush in Terra, where gods meet in radiant stillness."
        ],
        autumn: [
          "Pomona sighs as Sol is veiled—harvest halts, and fate tiptoes in.",
          "In Autumna’s gold, the sun turns his face—the eclipse whispers of closure.",
          "A waning sun, wrapped in ivy dreams—Lugh listens."
        ]
      }
    };
  
    const seasonalMap = {
        winter: ["Nivis", "Eira", "Aether"],
        spring: ["Janus", "Brigid", "Flora"],
        summer: ["Maia", "Juno", "Solis", "Terra"],
        autumn: ["Lugh", "Pomona", "Autumna"]
    };

    let season = "spring"; // fallback
    for (const [s, months] of Object.entries(seasonalMap)) {
        if (months.includes(celticMonth)) {
            season = s;
            break;
        }
    }

    const eclipseType = type?.toLowerCase();
    const seasonPool = descriptions[eclipseType]?.[season];

    if (!seasonPool) {
        console.warn(`⚠️ No eclipse description found for type: "${type}", season: "${season}"`);
        return "A rare celestial hush, undefined yet stirring...";
    }

    return seasonPool[Math.floor(Math.random() * seasonPool.length)];
}

// Fetch upcoming national holidays for the next 3 days
export async function fetchNationalHolidays() {
    console.log("Fetching upcoming national holidays...");

    try {
        const response = await fetch("/api/national-holidays");
        if (!response.ok) throw new Error("Failed to fetch national holidays");
    
        const nationalHolidays = await response.json();
        // Return everything; no date filtering here.
        return nationalHolidays; 
      } catch (error) {
        console.error("Error fetching national holidays:", error);
        return [];
      }
}


// Populate the Coming Events carousel
export function populateComingEventsCarousel(events) {
    const carouselContainer = document.getElementById("coming-events-carousel");

    if (!carouselContainer) {
        console.error("Carousel container not found!");
        return;
    }

    carouselContainer.innerHTML = ""; // Clear previous slides

    events.forEach((event, index) => {
        const slide = document.createElement("div");
        slide.classList.add("coming-events-slide");
        if (index === 0) slide.classList.add("active"); // Set the first slide as active

        const icon = getEventIcon(event);

        console.log("Event category:", event.category);
        console.log("Event type:", event.type);
        

        // Convert Gregorian date to Celtic date
        const celticDate = convertGregorianToCeltic(event.date);

        slide.innerHTML = `
            <h3 class="coming-events-title">${icon} ${event.title}</h3>
            <p class="coming-events-date">${celticDate}</p>
            <p class="coming-events-description">${event.description}</p>
        `;

        carouselContainer.appendChild(slide);
    });

    // Ensure arrows are visible when we have events
    document.querySelector(".coming-events-carousel-prev")?.classList.remove("hidden");
    document.querySelector(".coming-events-carousel-next")?.classList.remove("hidden");

    //Fallback poetry for carousel
    if (!Array.isArray(events) || events.length === 0) {
        // 🔮 Hide arrows when no events exist
        const leftArrow = document.querySelector(".coming-events-carousel-prev");
        const rightArrow = document.querySelector(".coming-events-carousel-next");
        if (leftArrow && rightArrow) {
            leftArrow.classList.add("hidden");
            rightArrow.classList.add("hidden");
        }
        
        const message = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];
        carouselContainer.innerHTML = `
            <div class="coming-events-slide active">
                <p class="mystical-message">${message}</p>
            </div>
        `;
        return;
    }

    initializeCarouselNavigation();
}

export function initializeCarouselNavigation() {
    const slides = document.querySelectorAll(".coming-events-slide");
    const prevButton = document.querySelector(".coming-events-carousel-prev");
    const nextButton = document.querySelector(".coming-events-carousel-next");
    let currentSlide = 0;
    let autoScroll;

    if (slides.length <= 1) {
      slides[0]?.classList.add("active");
      return;
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.style.opacity = "0"; // Start fade out
            if (i === index) {
                slide.classList.add("active");
                setTimeout(() => (slide.style.opacity = "1"), 300); // Fade in effect
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoScroll() {
        clearInterval(autoScroll); // Ensure no duplicate intervals
        autoScroll = setInterval(nextSlide, 6000); // Start fresh interval
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        setTimeout(startAutoScroll, 8000); // Restart after 8 seconds if no interaction
    }

    // Attach event listeners for manual navigation
    prevButton.addEventListener("click", () => {
        prevSlide();
        stopAutoScroll();
    });

    nextButton.addEventListener("click", () => {
        nextSlide();
        stopAutoScroll();
    });

    // Pause auto-scroll when the user hovers over the carousel
    document.querySelector("#coming-events-carousel").addEventListener("mouseenter", stopAutoScroll);
    document.querySelector("#coming-events-carousel").addEventListener("mouseleave", startAutoScroll);

    // Start auto-scroll initially
    startAutoScroll();
}

export function getMonthNumber(monthName) {
    const months = {
        "January": "01", "February": "02", "March": "03", "April": "04",
        "May": "05", "June": "06", "July": "07", "August": "08",
        "September": "09", "October": "10", "November": "11", "December": "12"
    };
    return months[monthName] || null;
}

if (!window.__HOME_WIRED__) {

  document.addEventListener("DOMContentLoaded", async () => {
      console.log("🏡 Home screen loaded, fetching upcoming events...");
      await fetchComingEvents(); // ✅ this already calls populateComingEventsCarousel internally
  });

  // Modal close handling is now done by the clean modal system

  // 🌟 Zodiac modal trigger
  document.addEventListener('click', async (e) => {
      if (e.target.closest('.zodiac-modal-trigger')) {
        const trigger = e.target.closest('.zodiac-modal-trigger');
        const signName = trigger.dataset.zodiac;
    
        console.log("🔮 Zodiac Trigger Clicked!", signName);
    
        try {
          // Use the data we already loaded from /api/calendar-data
          const zodiacArray =
            window.__ALL_ZODIAC || (await api.calendarData()).zodiac;

          const data = zodiacArray.find(
            z => z.name.toLowerCase() === signName.toLowerCase()
          );

          if (!data) {
            console.error("No zodiac insight found for:", signName);
            return;
          }
    
          // Create modal content
          const modalContent = `
            <h2 style="color: #ffd700; font-family: 'Cinzel Decorative', serif; font-size: 2.5rem; margin-bottom: 10px;">${data.name}</h2>
            <p style="color: #D7E0FF; margin-bottom: 20px;">${data.celtic_date}</p>
            <img src="/assets/images/zodiac/zodiac-${slugifyCharm(signName).toLowerCase()}.png" alt="${data.name}" style="width: 120px; height: 120px; margin: 20px 0; border-radius: 50%; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);" />
            
            <h3 style="color: #ffd700; margin-top: 20px;">Three Key Traits</h3>
            <p>${data.symbolism}</p>
            
            <h3 style="color: #ffd700; margin-top: 15px;">Associated Element</h3>
            <p>${data.element}</p>
            
            <h3 style="color: #ffd700; margin-top: 15px;">Associated Animal</h3>
            <p>${data.animal}</p>
            
            ${data.url ? `<a href="${data.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: linear-gradient(135deg, #9c27b0, #000); color: #ffd700; text-decoration: none; border-radius: 8px; box-shadow: 0 0 12px rgba(255, 140, 0, 0.5); transition: all 0.3s ease;">Learn More</a>` : ''}
          `;
    
          // Show new clean modal
          showCelticModal(modalContent, { id: 'zodiac-modal' });
    
        } catch (err) {
          console.error("Failed to load zodiac insight:", err);
        }
      }
    });
    window.__HOME_WIRED__ = true;
} 