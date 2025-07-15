import { initSwipe } from "../utils/swipeHandler.js";
import { getEventIcon } from "../utils/eventUtils.js";
import { getCelticWeekday, convertGregorianToCeltic, getCelticWeekdayFromGregorian } from "../utils/dateUtils.js";
import { getMysticalPrefs } from "./settings.js";
import { saveCustomEvents, loadCustomEvents } from "../utils/localStorage.js";
import { slugifyCharm } from "../utils/slugifyCharm.js";
import { showDayModal } from "./calendar.js";

export function renderHome() {
    // Return the HTML and then in the next tickß attach overlay & swipe
    const html = `
        <section class="home" class="fade-in">
            <div id="modal-overlay" class="modal-overlay hidden"></div>
            <div class="celtic-date"></div>
            <div class="celtic-info-container">

            <!--- *** MOON & CELTIC ZODIAC *** --->
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic">
                            <h4 class="moon-phase-name"></h4>
                        </div>
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
            </div>

            <!-- *** CELTIC BIRTHDAY SECTION *** -->
            <section class="celtic-birthday" style="background-image: url('/assets/images/decor/moon-circle.png'); background-repeat: no-repeat; background-position: center top; background-size: 250px;">
                <h2 class="celtic-birthday-header">What is my Lunar Birthday?</h2>
                <p>Enter your birthdate and discover your Celtic Zodiac sign and lunar date:</p>
                
                <input type="date" id="birthdateInput" class="flatpickr-input" />

                <button id="revealZodiac" class="gold-button">Reveal My Celtic Sign</button>

                <div id="birthdayResults" class="birthday-results hidden">
                <p><strong>Your Lunar Birthday is </strong> <span id="lunarDateOutput"></span></p>
                <img class="birthdayZodiacImage" src="/assets/images/zodiac/zodiac-willow.png" alt="Willow" />
                <p><strong>Your Celtic Zodiac Sign:</strong> <span id="celticSignOutput"></span></p>
                <p><strong>Zodiac Traits:</strong> <span id="traitsOutput"></span></p>

                <button id="addBirthdayEvent" class="gold-button">Add to My Calendar</button>
                </div>
            </section>

            <!--- *** ZODIAC MODAL *** --->
            <div id="home-zodiac-modal" class="modal hidden">
                <div class="modal-content scrollable-content">
                    <span class="close-button-home mystical-close">✦</span>
                    <div id="home-zodiac-modal-details">
                        <p>Loading sign info...</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    // After the HTML is injected into the DOM, attach overlay handler and swipe listener
    setTimeout(() => {
        // Overlay click for modal close (existing code)…

        const overlay = document.getElementById("modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", () => {
                document.getElementById("home-zodiac-modal")?.classList.remove("show");
                document.getElementById("home-zodiac-modal")?.classList.add("hidden");
                overlay.classList.remove("show");
                overlay.classList.add("hidden");
            });
        }

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
        fetch("/static/calendar_data.json")
          .then(res => res.json())
          .then(data => {
            data.zodiac.forEach(sign => {
              zodiacTraits[sign.name] = sign.symbolism;
            });
          })
          .catch(err => console.error("Failed to load zodiac data:", err));

        // On click, compute lunar date and Celtic sign
        revealBtn.addEventListener("click", async () => {
          if (!birthdateInput.value) return;
          const isoDate = birthdateInput.value; // "YYYY-MM-DD"
          // Lunar date using our existing utility
          const lunarDate = convertGregorianToCeltic(isoDate);
          // Fetch all signs and pick matching by month/day
          let signName = "";
          try {
            const resp = await fetch('/zodiac/all');
            const allSigns = await resp.json();
            const [by, bMonth, bDay] = isoDate.split('-').map(Number);
            const match = allSigns.find(sign => {
              const [ , sMonth, sDay] = sign.start_date.split('-').map(Number);
              const [ , eMonth, eDay] = sign.end_date.split('-').map(Number);
              const afterStart = (bMonth > sMonth) || (bMonth === sMonth && bDay >= sDay);
              const beforeEnd = (bMonth < eMonth) || (bMonth === eMonth && bDay <= eDay);
              if (sMonth < eMonth || (sMonth === eMonth && sDay <= eDay)) {
                return afterStart && beforeEnd;
              } else {
                // wraps year boundary
                return afterStart || beforeEnd;
              }
            });
            signName = match?.name || 'Unknown';
          } catch (e) {
            console.error("Zodiac fetch/all error:", e);
          }
          const traits = zodiacTraits[signName] || "No traits found.";
          document.getElementById("lunarDateOutput").textContent = lunarDate;
          document.getElementById("celticSignOutput").textContent = signName;
          document.getElementById("traitsOutput").textContent = traits;
          resultsBox.classList.remove("hidden");
        });

        // Hook up Add to Calendar button
        document.getElementById("addBirthdayEvent")?.addEventListener("click", () => {
            const isoDate = birthdateInput.value;
            console.log("Add Bday button is clicked: ", isoDate);
            const event = {
              id: Date.now().toString(),
              date: isoDate,
              title: `Celtic Birthday`,
              type: "🎂 Birthday",
              notes: `Lunar: ${document.getElementById("lunarDateOutput").textContent}, Sign: ${document.getElementById("celticSignOutput").textContent}`,
              recurring: true
            };
            // Save locally
            const existing = loadCustomEvents();
            saveCustomEvents([...existing, event]);
            // Send to backend
            fetch("/api/custom-events", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(event)
            })
            .then(resp => {
              if (!resp.ok) throw new Error("Failed to save event");
              return resp.json();
            })
            .then(() => {
              // Refresh home carousel to include the new birthday
              fetchComingEvents();
              // SweetAlert2 confirmation instead of alert
              const wd    = getCelticWeekdayFromGregorian(isoDate);
              const lunar = convertGregorianToCeltic(isoDate);
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

        flatpickr("#birthdateInput", {
            altInput: true,
            altFormat: "F j, Y",
            dateFormat: "Y-m-d",
            defaultDate: "today",
            theme: "moonveil"
        });

    }, 0);
    return html;
}

// Fetch the Celtic date dynamically and update the home screen
export async function fetchCelticDate() {
    try {
        const response = await fetch('/api/celtic-date');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const weekday = getCelticWeekday(parseInt(data.celtic_day, 10));
        console.log("Fetched Celtic Date:", data);

        // Ensure the data contains the necessary values
        if (!data || !data.month || !data.celtic_day) {
            throw new Error("Incomplete Celtic date data received.");
        }

        // Update the home screen UI
        const dateContainer = document.querySelector('.celtic-date');
        if (dateContainer) {
            dateContainer.innerHTML = `
            <h1 id="celtic-day">${weekday}</h1>
            <p><span id="celtic-month">${data.month} ${data.celtic_day}</span> / <span id="gregorian-month">${data.gregorian_date}</span></p>
        `;
        }

        // ✅ Return structured data so other functions can use it
        return {
            celticMonth: data.month,
            celticDay: parseInt(data.celtic_day, 10),
            gregorianDate: data.gregorian_date
        };

    } catch (error) {
        console.error("Failed to fetch Celtic date:", error);
        return null; // Return null instead of breaking execution
    }
}

// Fetch the Celtic Zodiac sign for the day
export async function fetchCelticZodiac() {
  try {
    // 1) Get today's Celtic month and day
    const todayCeltic = await fetchCelticDate();
    if (!todayCeltic) throw new Error("No Celtic date available");
    const { celticMonth, celticDay } = todayCeltic;

    // 2) Map lunar month to tree zodiac sign
    const signMap = {
      Nivis:   "Birch",
      Janus:   "Rowan",
      Brigid:  "Alder",
      Flora:   "Willow",
      Maia:    "Hawthorn",
      Juno:    "Oak",
      Solis:   "Holly",
      Terra:   "Oak", // Placeholder, logic below overrides for Terra
      Lugh:    "Holly",
      Pomona:  "Hazel",
      Autumna: "Vine",
      Eira:    "Ivy",
      Aether:  "Reed",
      Mirabilis: "Elder"
    };

    // New logic for Terra: day 1 is Oak, rest are Holly
    let signName;
    if (celticMonth === 'Terra') {
      // On Terra: day 1 is Oak, all subsequent days are Holly
      signName = celticDay === 1 ? 'Oak' : 'Holly';
    } else {
      signName = signMap[celticMonth] || '';
    }

    // 3) Render into the Zodiac container
    const container = document.querySelector('.celtic-zodiac-details');
    if (container) {
      container.innerHTML = `
        <div class="zodiac-modal-trigger" data-zodiac="${signName}">
          <img class="celtic-zodiac-image"
               src="/assets/images/zodiac/zodiac-${signName.toLowerCase()}.png"
               alt="${signName}" />
          <p>${signName}</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to fetch Celtic Zodiac:', error);
  }
}

// Fetch the Moon Phase dynamically and update the home screen
export async function fetchDynamicMoonPhase() {
    const today = new Date().toISOString().split('T')[0]; // Today's date in ISO format
    try {
        const response = await fetch(`/dynamic-moon-phases?start_date=${today}&end_date=${today}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length > 0) {
            const moonPhase = data[0];

            // Select the container for the moon phase
            const moonPhaseContainer = document.querySelector('.moon-phase');

            // Update the UI with moon phase details
            moonPhaseContainer.innerHTML = `
                <div class="moon-phase-details">
                    <div class="moon-phase-graphic">${moonPhase.graphic}</div>
                    <p>${moonPhase.moonName || moonPhase.phase} </p>
                    <!-- <span>${moonPhase.poem || 'A sliver of light...'}</span> -->
                </div>
            `;
            // Show poem under the moon
            const poemContainer = document.querySelector('.moon-poem');
            if (poemContainer) {
                poemContainer.textContent = moonPhase.poem || '';
            }
            console.log(moonPhase.graphic);
        } else {
            console.warn('No moon phase data available.');
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
    
        const { celticMonth, celticDay, gregorianDate } = todayCeltic;
        if (!gregorianDate || typeof gregorianDate !== "string") {
          console.error("🚨 gregorianDate is missing or not a string!", gregorianDate);
          return;
        }
    
        // 2) Convert “March 11” => monthName="March", day="11"
        const [monthName, day] = gregorianDate.split(" ");
        const gregorianMonth = getMonthNumber(monthName);  // e.g. "03"
        const gregorianDay   = day.padStart(2, "0");       // e.g. "11"
    
        const todayDate = new Date(`2025-${gregorianMonth}-${gregorianDay}`);
        const upcomingDates = [];
    
        // 3) Generate next 5 days in YYYY-MM-DD
        for (let i = 0; i < 7; i++) {
          const futureDate = new Date(todayDate);
          futureDate.setDate(todayDate.getDate() + i);
    
          const y  = futureDate.getFullYear();
          const m  = String(futureDate.getMonth() + 1).padStart(2, "0");
          const d  = String(futureDate.getDate()).padStart(2, "0");
          const iso = `${y}-${m}-${d}`;
          upcomingDates.push(iso);
        }
        console.log("Next 5 Gregorian Dates:", upcomingDates);
    
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
    
        // 5B) Add Full Moons (already works)
        upcomingDates.forEach(date => {
          const moonEvent = lunarData.find(moon => moon.date === date && moon.phase === "Full Moon");
          if (moonEvent) {
            upcomingEvents.push({
              type: "full-moon",
              title: moonEvent.moonName || "Full Moon",
              description: moonEvent.description || "A night of celestial power.",
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
          if (event.type === "full-moon" && !prefs.showMoons) return false;
          if (event.type === "eclipse" && !prefs.showEclipses) return false;
          if (event.type === "custom-event" && !prefs.showCustomEvents) return false;
          return true; // Keep everything else
      });
  
      // const filteredEvents = upcomingEvents;
      // temporarily skip filter to verify display logic
    
      console.log("Final Upcoming Events Array:", upcomingEvents);
      // Determine local today at midnight
      const now = new Date();
      const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Filter out any events before today
      const eventsFromToday = filteredEvents.filter(evt => {
          const [eY, eM, eD] = evt.date.split('-').map(Number);
          const evtDateObj = new Date(eY, eM - 1, eD);
          return evtDateObj >= todayLocal;
      });
      console.log("Events from today onward:", eventsFromToday);

      if (document.getElementById("coming-events-container")) {
          populateComingEventsCarousel(eventsFromToday);
      }
  
      } catch (error) {
          console.error("Error fetching coming events:", error);
      }
}


function getCelticMonthFromDate(dateStr) {
    // Assuming your cleanDate is in format "2025-04-09"
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfMonth = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
  
    // 🎑 Your Celtic mapping logic
    const celticMap = [
      { name: "Janus", start: [0, 20], end: [1, 16] },
      { name: "Brigid", start: [1, 17], end: [2, 16] },
      { name: "Flora",  start: [2, 17], end: [3, 13] },
      { name: "Maia",   start: [4, 14], end: [5, 11] },
      { name: "Juno",   start: [5, 12], end: [6, 8] },
      { name: "Solis",  start: [6, 9],  end: [7, 6] },
      { name: "Terra",  start: [7, 7],  end: [8, 3] },
      { name: "Lugh",   start: [8, 4],  end: [8, 31] },
      { name: "Pomona", start: [9, 1],  end: [9, 28] },
      { name: "Autumna",start: [9, 29], end: [10, 26] },
      { name: "Eira",   start: [10, 27], end: [11, 23] },
      { name: "Aether", start: [11, 24], end: [12, 21] },
      { name: "Nivis",  start: [12, 22], end: [0, 19] }
    ];
  
    for (const entry of celticMap) {
      const [startMonth, startDay] = entry.start;
      const [endMonth, endDay] = entry.end;
  
      const afterStart = (monthIndex > startMonth) || (monthIndex === startMonth && dayOfMonth >= startDay);
      const beforeEnd = (monthIndex < endMonth) || (monthIndex === endMonth && dayOfMonth <= endDay);
  
      if (startMonth <= endMonth ? afterStart && beforeEnd : afterStart || beforeEnd) {
        return entry.name;
      }
    }
  
    return "Janus"; // fallback
  }

  // Fetch upcoming festivals based on the Celtic calendar
export async function fetchFestivals() {
    try {
        // Fetch the festival data (assuming it's served from an endpoint)
        const response = await fetch('/festivals'); 
        if (!response.ok) throw new Error("Failed to fetch special days");

        const specialDays = await response.json();
        
        // Normalize festival dates to YYYY-MM-DD format
        const festivalData = specialDays.map(day => ({
            type: "festival",
            title: day.name,
            description: day.description || "A sacred celebration.",
            date: new Date(day.date).toISOString().split('T')[0]  // Normalize format
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
        // Call the API for moon phases within the given date range
        const response = await fetch(`/dynamic-moon-phases?start_date=${start}&end_date=${end}`);
        if (!response.ok) throw new Error("Failed to fetch moon phases");

        const moonData = await response.json();
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

// Fetch upcoming custom events (birthdays, anniversaries, etc.) for the next 3 days
export async function fetchCustomEvents() {
    console.log("Fetching custom events...");
    try {
      const response = await fetch("/api/custom-events");
      if (!response.ok) throw new Error("Failed to fetch custom events");
  
      const customEvents = await response.json();
      // Return everything; no date filtering here.
      console.log('Custom events are: ', customEvents);
      return customEvents; 
    } catch (error) {
      console.error("Error fetching custom events:", error);
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

    const typeIconMap = {
        "festival": "🔥",
        "full-moon": "🌕",
        "eclipse": "🌑",
        "holiday": "🎊"
    };

    // Generate featured icon for custom event slide
    const iconMap = {
        "😎 Friends": "😎",
        "🎉 Celebrations": "🎉",
        "🌸 My Cycle": "🌸",
        "💡 General": "💡",
        "🏥 Health": "🏥",
        "💜 Romantic": "💜",
        "🖥️ Professional": "🖥️",
        "🔥 Date": "🔥" // If you use custom labels
      };

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

    //Fallback poetry for carousel
    if (!Array.isArray(events) || events.length === 0) {
        // 🔮 Hide arrows when no events exist
        const leftArrow = document.querySelector(".coming-events-carousel-prev");
        const rightArrow = document.querySelector(".coming-events-carousel-next");
        if (leftArrow && rightArrow) {
            leftArrow.classList.add("hidden");
            rightArrow.classList.add("hidden");
        }

        const mysticalMessages = [
            "💫 The stars whisper, but no great events stir. The journey continues in quiet contemplation... 💫",
            "✨ The wind carries no omens today, only the gentle breath of the earth. Rest in the rhythm of the moment. ✨",
            "🔮 The threads of fate are still weaving. In the quiet, new paths may emerge... 🔮",
            "🦉 Even in stillness, the world turns. The wise ones know that the silence holds its own kind of magic. 🦉",
            "🔥 No great fires are lit, no grand feasts are planned, but the embers of time still glow beneath the surface. 🔥",
            "🌟 Tonight, the universe is quiet, waiting. Perhaps the next moment holds something unseen... 🌟"
        ];
        
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


document.addEventListener("DOMContentLoaded", async () => {
    console.log("🏡 Home screen loaded, fetching upcoming events...");
    await fetchComingEvents(); // ✅ this already calls populateComingEventsCarousel internally
});

// 🌟 Attach modal close handler only once
document.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('close-button-home') ||
      e.target.classList.contains('mystical-close') ||
      e.target.id === 'modal-overlay'
    ) {
      console.log("✨ Closing the Zodiac Modal...");
      document.getElementById('home-zodiac-modal').classList.remove('show');
      document.getElementById('home-zodiac-modal').classList.add('hidden');

      document.body.classList.remove('modal-open');
  
      const overlay = document.getElementById('modal-overlay');
      if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('show');
      } else {
        console.log("🌫️ Cannot find overlay");
      }
    }
  });

// 🌟 Zodiac modal trigger
document.addEventListener('click', async (e) => {
    if (e.target.closest('.zodiac-modal-trigger')) {
      const trigger = e.target.closest('.zodiac-modal-trigger');
      const signName = trigger.dataset.zodiac;
  
      console.log("🔮 Zodiac Trigger Clicked!", signName);
  
      try {
        const res = await fetch(`/zodiac/insights/${signName}`);
        const data = await res.json();
  
        // Inject modal content
        document.getElementById('home-zodiac-modal-details').innerHTML = `
          <h2 id="zodiac-name">${data.name}</h2>
          <p id="zodiac-date-range">${data.celtic_date}</p>
          <img id="zodiac-image" src="static/assets/images/zodiac/zodiac-${data.name.toLowerCase()}.png" alt="${data.name}" />
          <h3 class="subheader">Three Key Traits</h3>
          <p id="zodiac-traits">${data.symbolism}</p>
          <h3 class="subheader">Associated Element</h3>
          <p id="zodiac-element">${data.element}</p>
          <h3 class="subheader">Associated Animal</h3>
          <p id="zodiac-animal">${data.animal}</p>
          <a class="home-modal-btn" href="${data.url || '#'}" target="_blank" style="${data.url ? '' : 'display:none;'}">Learn More</a>
        `;
  
        // Show modal + overlay
        const modal = document.getElementById('home-zodiac-modal');
        const overlay = document.getElementById('modal-overlay');
        modal.classList.remove('hidden');
        modal.classList.add('show');
        overlay?.classList.remove('hidden');
        overlay?.classList.add('show');

        document.body.classList.add('modal-open');
  
      } catch (err) {
        console.error("Failed to load zodiac insight:", err);
      }
    }
  });