import { getMysticalPrefs } from "./settings.js";
import { saveCustomEvents } from "../utils/localStorage.js";
import { mysticalMessages } from "../constants/mysticalMessages.js";
import { slugifyCharm } from "../utils/slugifyCharm.js";
import { initSwipe } from "../utils/swipeHandler.js"; // ✅ Add this at the top
import { starFieldSVG } from "../constants/starField.js";

import { getCelticWeekday, convertCelticToGregorian, isLeapYear } from '../utils/dateUtils.js';

// Helper: Return ISO start/end dates for any Celtic month in a given cycle year
function getMonthRangeISO(monthName, cycleYear) {
  let startDate, endDate;
  switch (monthName) {
    case "Nivis":
      startDate = new Date(Date.UTC(cycleYear - 1, 11, 23));
      endDate   = new Date(Date.UTC(cycleYear,    0, 19));
      break;
    case "Janus":
      startDate = new Date(Date.UTC(cycleYear,    0, 20));
      endDate   = new Date(Date.UTC(cycleYear,    1, 16));
      break;
    case "Brigid":
      startDate = new Date(Date.UTC(cycleYear,    1, 17));
      endDate   = new Date(Date.UTC(cycleYear,    2, 16));
      break;
    case "Flora":
      startDate = new Date(Date.UTC(cycleYear,    2, 17));
      endDate   = new Date(Date.UTC(cycleYear,    3, 13));
      break;
    case "Maia":
      startDate = new Date(Date.UTC(cycleYear,    3, 14));
      endDate   = new Date(Date.UTC(cycleYear,    4, 11));
      break;
    case "Juno":
      startDate = new Date(Date.UTC(cycleYear,    4, 12));
      endDate   = new Date(Date.UTC(cycleYear,    5,  8));
      break;
    case "Solis":
      startDate = new Date(Date.UTC(cycleYear,    5,  9));
      endDate   = new Date(Date.UTC(cycleYear,    6,  6));
      break;
    case "Terra":
      startDate = new Date(Date.UTC(cycleYear,    6,  7));
      endDate   = new Date(Date.UTC(cycleYear,    7,  3));
      break;
    case "Lugh":
      startDate = new Date(Date.UTC(cycleYear,    7,  4));
      endDate   = new Date(Date.UTC(cycleYear,    7, 31));
      break;
    case "Pomona":
      startDate = new Date(Date.UTC(cycleYear,    8,  1));
      endDate   = new Date(Date.UTC(cycleYear,    8, 28));
      break;
    case "Autumna":
      startDate = new Date(Date.UTC(cycleYear,    8, 29));
      endDate   = new Date(Date.UTC(cycleYear,    9, 26));
      break;
    case "Eira":
      startDate = new Date(Date.UTC(cycleYear,    9, 27));
      endDate   = new Date(Date.UTC(cycleYear,   10, 23));
      break;
    case "Aether":
      startDate = new Date(Date.UTC(cycleYear,   10, 24));
      endDate   = new Date(Date.UTC(cycleYear,   11, 21));
      break;
    case "Mirabilis":
      const isLeap = isLeapYear(cycleYear);
      startDate = new Date(Date.UTC(cycleYear,   11, 22));
      endDate   = new Date(Date.UTC(cycleYear,   11, 22 + (isLeap ? 1 : 0)));
      break;
    default:
      console.error("Unknown Celtic month in getMonthRangeISO:", monthName);
      return { startISO: null, endISO: null };
  }
  const pad = (n) => String(n).padStart(2, "0");
  return {
    startISO: `${startDate.getUTCFullYear()}-${pad(startDate.getUTCMonth() + 1)}-${pad(startDate.getUTCDate())}`,
    endISO:   `${endDate.getUTCFullYear()}-${pad(endDate.getUTCMonth() + 1)}-${pad(endDate.getUTCDate())}`
  };
}

let cachedNationalHolidays = []; // Store national holidays globally
let cachedFestivals = {}; // Store festivals globally
let lastOpenedMonth = null; // Keep track of the last opened month modal
//let customEvents = []; // Initialize an empty array for storing custom events

export function renderCalendar() {
    return `
      <section class="calendar" class="fade-in">
        <div id="modal-overlay" class="modal-overlay hidden"></div>

            <h1 class="calendar-title">Calendar</h1>

            <button id="calendar-today-btn" class="today_btn">Today</button>

            <div class="calendar-grid">
                <div class="month-thumbnail" id="nivis" data-month="Nivis">
                    <img src="static/assets/images/months/nivis-thumbnail.png" alt="Nivis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="janus" data-month="Janus">
                    <img src="static/assets/images/months/janus-thumbnail.png" alt="Janus Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="brigid" data-month="Brigid">
                    <img src="static/assets/images/months/brigid-thumbnail.png" alt="Brigid Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Flora" data-month="Flora">
                    <img src="static/assets/images/months/flora-thumbnail.png" alt="Flora Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Maia" data-month="Maia">
                    <img src="static/assets/images/months/maia-thumbnail.png" alt="Maia Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Juno" data-month="Juno">
                    <img src="static/assets/images/months/juno-thumbnail.png" alt="Juno Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Solis" data-month="Solis">
                    <img src="static/assets/images/months/solis-thumbnail.png" alt="Solis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Terra" data-month="Terra">
                    <img src="static/assets/images/months/terra-thumbnail.png" alt="Terra Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Lugh" data-month="Lugh">
                    <img src="static/assets/images/months/lugh-thumbnail.png" alt="Lugh Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Pomona" data-month="Pomona">
                    <img src="static/assets/images/months/pomona-thumbnail.png" alt="Pomona Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Autumna" data-month="Autumna">
                    <img src="static/assets/images/months/autumna-thumbnail.png" alt="Autumna Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Eira" data-month="Eira">
                    <img src="static/assets/images/months/eira-thumbnail.png" alt="Eira Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Aether" data-month="Aether">
                    <img src="static/assets/images/months/aether-thumbnail.png" alt="Aether Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Mirabilis" data-month="Mirabilis">
                    <img src="static/assets/images/months/mirabilis-thumbnail.png" alt="Mirabilis Thumbnail">
                </div>
            </div>
        </section>

        <div id="modal-container" class="calendar-modal hidden">
            <div id="modal-content">
                <!-- Add this inside #modal-container -->

                <div id="constellation-layer">
                    <!-- 🌠 Shooting star or constellation here -->
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
        </div>
    `;

    console.log("✅ Running setupCalendarEvents...");
}

export async function setupCalendarEvents() {
    console.log("I am running setupCalendarEvents");

    function logToScreen(message) {
        const debug = document.getElementById("debug");
        if (debug) {
          debug.innerHTML += `<div>${message}</div>`;
          debug.scrollTop = debug.scrollHeight;
        }
      }

    // Select the modal elements
    const modalContainer = document.getElementById("modal-container");
    const modalClose = modalContainer?.querySelector("#close-modal");
    const modalContent = modalContainer?.querySelector("#modal-content");

    // Ensure modal elements exist before attaching listeners
    if (!modalContainer || !modalContent || !modalClose) {
        console.error("Modal elements not found. Check IDs and structure.");
        return;
    }

    // Hide overlay and make it clickable
    document.getElementById("modal-overlay").addEventListener("click", () => {
        console.log("Click on Overlay");
    
        if (modalContainer.classList.contains("show")) {
            modalContainer.classList.remove("show");
            modalContainer.classList.add("hidden");
        }
    
        // Hide the overlay itself
        document.getElementById("modal-overlay").classList.remove("show");
        document.getElementById("modal-overlay").classList.add("hidden");
    });
    

    // Attach event listener to close modal
    modalClose.addEventListener("click", closeModal);

    // Attach event listender to Today button
    document.getElementById("calendar-today-btn").addEventListener("click", async () => {
        const todayCeltic = await getCelticDate();
        if (!todayCeltic) {
            console.error("Could not determine today's Celtic date.");
            return;
        }

        const { celticMonth, celticDay } = todayCeltic;
        const gregorian = convertCelticToGregorian(celticMonth, celticDay);

        if (!gregorian) {
            console.error("Failed to convert today’s Celtic date to Gregorian.");
            return;
        }

        const formattedGregorianDate = `${gregorian.gregorianYear}-${String(gregorian.gregorianMonth).padStart(2, "0")}-${String(gregorian.gregorianDay).padStart(2, "0")}`;

        showDayModal(celticDay, celticMonth, formattedGregorianDate);
    });

    // Attach event listeners to each month thumbnail
    const thumbnails = document.querySelectorAll(".month-thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
                const monthName = e.target.closest(".month-thumbnail").dataset.month;
                showModal(monthName);
          });
    });
}

// Open modal window and insert HTML
function showModal(monthName) {

    lastOpenedMonth = monthName; // ✅ Store the last opened month
    console.log("📅 Last opened month set to:", lastOpenedMonth);

    const modalContainer = document.getElementById("modal-container"); // Ensure modalContainer is defined first

    if (!modalContainer) {
        return;
    }

    // Show the modal overlay
    document.getElementById("modal-overlay").classList.add("show");
    document.getElementById("modal-overlay").classList.remove("hidden");

    // Make overlay clickable
    document.getElementById("modal-overlay").addEventListener("click", () => {
        console.log("Click on overlay");
        // Hide the overlay itself
        document.getElementById("modal-overlay").classList.remove("show");
        document.getElementById("modal-overlay").classList.add("hidden");
    });

 
    modalContainer.classList.remove("hidden");
    modalContainer.classList.add("month-mode");

    if (monthName) {
        const modalDetails = modalContainer.querySelector("#modal-details");

        if (modalDetails) {
            modalContainer.classList.add("show");
            document.body.classList.add("modal-open"); // Prevent scrolling

            if (monthName === 'Mirabilis') {
                const today = new Date();
                const leap = isLeapYear(today.getFullYear());

                modalDetails.innerHTML = `
                    <h2 class="month-title">Mirabilis</h2>
                    <p class="mirabilis-intro month-tagline">Beyond the boundary of time, in the hush between cycles, Mirabilis blooms. Here, two sacred breaths—one of fire, one of shadow—meet where neither past nor future holds sway.</p>

                    <div class="mirabilis-tabs">
                        <button class="mirabilis-tab active" data-tab="solis">Mirabilis Solis</button>
                        <button class="mirabilis-tab" data-tab="noctis">Mirabilis Noctis</button>
                    </div>

                    <div class="mirabilis-tab-content" id="tab-solis">
                        <div class="mirabilis-crest crest-solis" id="crest-solis" title="Click to enter Mirabilis Solis">
                            <img src="static/assets/images/months/mirabilis-solis.png" alt="Mirabilis Solis" />
                            <p>Mirabilis Solis</p>
                        </div>
                    </div>

                    <div class="mirabilis-tab-content hidden" id="tab-noctis">
                        <div class="mirabilis-crest crest-noctis ${leap ? '' : 'disabled'}" id="crest-noctis" title="${leap ? 'Click to enter Mirabilis Noctis' : 'Appears only in leap years'}">
                            <img src="static/assets/images/months/mirabilis-noctis.png" alt="Mirabilis Noctis" />
                            <p>Mirabilis Noctis</p>
                         </div>
                    </div>
                    `;
            } else {
                modalDetails.innerHTML = `
                    <!-- Inside modalDetails.innerHTML -->
                    <h2 class="month-title">${monthName}</h2>
                    <p class="month-tagline">Loading month tagline...</p>

                    <!-- 🌟 Magical Tabs -->
                    <div class="calendar-tabs">
                        <button id="tab-calendar" class="calendar-tab-button active">Calendar</button>
                        <button id="tab-legend" class="calendar-tab-button">Legend</button>
                        <button id="tab-add" class="calendar-tab-button">Add Your Event</button>
                    </div>

                    <!-- 🌿 Calendar View -->
                    <div id="tab-content-calendar" class="calendar-tab-content active">
                        <div class="calendarGridBox">
                            <table class="calendar-grid">
                                <thead>
                                    <tr>
                                    <th title="Moonday">Moon</th><th title="Trésda">Trés</th><th title="Wyrdsday">Wyrd</th><th title="Thornsday">Thrn</th><th title="Freyasday">Freya</th><th title="Emberveil">Ember</th><th title="Sunveil">Veil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                                    <tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                                    <tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr>
                                    <tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 🧚 Legend -->
                    <div id="tab-content-legend" class="calendar-tab-content">
                        <!-- <h3 class="goldenTitle">Legend</h3> -->
                        <div id="legend-section">
                            <table class="calendarLegendGrid">
                                <tr class="festival-day-row"><td class="festival-day legendBox">&nbsp;</td><td>Festival Day</td></tr>
                                <tr class="full-moon-day-row"><td class="full-moon-day legendBox">&nbsp;</td><td>Full Moon</td></tr>
                                <tr class="eclipse-day-row"><td class="eclipse-day legendBox">&nbsp;</td><td>Eclipse</td></tr>
                                <tr class="national-holiday-row"><td class="national-holiday legendBox">&nbsp;</td><td>Holiday</td></tr>
                                <tr class="custom-event-day-row"><td class="custom-event-day legendBox">&nbsp;</td><td>Your Event</td></tr>
                            </table>
                        </div>
                    </div>

                    <!-- 💌 Add Event Form -->
                    <div id="tab-content-add" class="calendar-tab-content">
                    <!-- <h3 class="goldenTitle">Add Your Event</h3> -->
                    <form id="add-event-form">
                        <ul>
                        <li><label for="event-name">Event Name</label>
                            <input type="text" id="event-name" required /></li>
                        <li><label for="event-type">Type of Event</label>
                            <select id="event-type" name="event-type">
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Celebrations">🎉 Celebrations</option>
                                <option value="🌸 My Cycle">🌸 My Cycle</option>
                                <option value="💡 General" active>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></li>
                        <li><label for="event-note">Event Description</label>
                            <textarea id="event-note" rows="1" cols="35"></textarea></li>
                        <li><label for="event-date">Date</label>
                            <input type="text" id="event-date" class="flatpickr-input" placeholder="Pick your date 🌕" required /></li>
                        <li><button type="submit" class="add-event-button">Add Event</button></li>
                        </ul>
                    </form>
                    </div>
                `;
            }

            // Fetch Mystical Preferences
            applyMysticalSettings(getMysticalPrefs());

            // Fetch tagline and update
            fetchTagline(monthName);

            // Setup tabbed navigation
            setupCalendarTabNavigation();

           document.querySelectorAll(".mirabilis-tab").forEach(tab => {
                tab.addEventListener("click", () => {
                // Toggle button active states
                document.querySelectorAll(".mirabilis-tab").forEach(btn => btn.classList.remove("active"));
                tab.classList.add("active");

                // Toggle content visibility
                const target = tab.dataset.tab;
                document.querySelectorAll(".mirabilis-tab-content").forEach(content => {
                content.classList.add("hidden");
                });
                document.getElementById(`tab-${target}`).classList.remove("hidden");
                });
            });

            // Assign click behaviours to Mirabilis
            // 🌟 Add these *after* the modal content is injected:
            setTimeout(() => {
                const crestSolis = document.getElementById("crest-solis");
                if (crestSolis) {
                    crestSolis.addEventListener("click", () => {
                        showDayModal(1, "Mirabilis", "2025-12-22");
                    });
                }

                if (leap) {
                    const crestNoctis = document.getElementById("crest-noctis");
                    if (crestNoctis) {
                        crestNoctis.addEventListener("click", () => {
                            showDayModal(2, "Mirabilis", "2025-12-23");
                        });
                    }
                }
    }, 0); // ⏳ Waits for DOM to render first

            // Apply fade-in effect
            modalContainer.classList.add("fade-in");
            modalContainer.classList.remove("fade-out");

            // ✅ Call enhancement only when the modal is displayed
            enhanceCalendarTable(modalContainer, monthName);

            flatpickr("#event-date", {
                altInput: true,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
                theme: "moonveil"
            });

            document.getElementById("add-event-form").addEventListener("submit", (e) => {
                e.preventDefault();
              
                // 🌟 Save the event here...
              
                // Switch to Calendar tab
                document.getElementById("tab-calendar").click();
              });
        }
    }
}

 // Close modal
 function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");

    document.body.classList.remove("modal-open"); //Add scrollbars to body

    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }    

    // Show the modal overlay
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("modal-overlay").classList.remove("show");
}

// Fetch monthly tag line
async function fetchTagline(monthName) {
    try {
        const response = await fetch("/api/calendar-data");  // Updated endpoint
        if (!response.ok) throw new Error("Failed to fetch calendar data");

        const data = await response.json();
        const monthData = data.months.find(month => month.name === monthName);

        if (monthData) {
            document.querySelector(".month-tagline").textContent = monthData.tagline;
        } else {
            document.querySelector(".month-tagline").textContent = "A whisper of time's essence...";
        }
    } catch (error) {
        console.error("Error fetching tagline:", error);
        document.querySelector(".month-tagline").textContent = "A whisper of time's essence...";
    }
}

// Sets up the 3 tabs inside the  modal
function setupCalendarTabNavigation() {
    const tabs = document.querySelectorAll(".calendar-tab-button");
    const contents = document.querySelectorAll(".calendar-tab-content");
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.id.replace("tab-", "tab-content-");
  
        // Deactivate all tabs
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));
  
        // Activate the clicked tab
        tab.classList.add("active");
        document.getElementById(targetId).classList.add("active");
      });
    });
}

// Add click events to HTML table
async function enhanceCalendarTable(modalContainer, monthName) {
    console.log(`Enhancing calendar for ${monthName}...`);

    // Convert monthName to a zero-padded monthIndex
    const monthNames = ["Nivis", "Janus", "Flora", "Maia", "Juno", "Solis", "Terra", "Lugh", "Pomona", "Brigid", "Autumna", "Eira", "Aether"];
    const monthIndex = String(monthNames.indexOf(monthName) + 1).padStart(2, "0");

    // Ensure national holidays are fetched before using them
    if (cachedNationalHolidays.length === 0) {
        await fetchNationalHolidays(); // Fetch if not already cached
    }
  
    const todayCeltic = await getCelticDate();
    if (!todayCeltic) {
        console.error("Could not fetch Celtic date. Highlight skipped.");
        return;
    }
  
    const { celticMonth, celticDay } = todayCeltic;
    const tableCells = modalContainer.querySelectorAll(".calendar-grid td");

    // Fetch eclipses
    const eclipses = await fetchEclipseEvents();
    console.log("Fetched Eclipse Data:", eclipses);

    // Fetch national holidays **before using them**
    if (!cachedNationalHolidays || cachedNationalHolidays.length === 0) {
        console.log("Fetching national holidays...");
        cachedNationalHolidays = await fetchNationalHolidays();
    }

    // Fetch lunar phases, festivals and national holidays
    const lunarData = await fetchMoonPhases(monthName);
    console.log("🌙 lunarData array:", lunarData);

    // Fetch custom events
    const customEvents = await fetchCustomEvents();
    console.log("Custom events retrieved:", customEvents);

    // Fetch festivals once before the loop
    const festivals = await fetchFestivals(); // ✅ This runs BEFORE we start checking each cell
  
    tableCells.forEach((cell) => {
        const day = parseInt(cell.textContent, 10);
        console.log(`📅 Checking table cell: ${day}`);

        if (!isNaN(day)) {
            console.log(`✅ Table Cell Detected: ${day} in ${monthName}`);

            // Convert the Celtic day back to Gregorian
            const gregorian = convertCelticToGregorian(monthName, day);
            if (!gregorian) {
                console.error(`Failed to convert ${monthName} ${day} to Gregorian.`);
                return;
            }
            const formattedGregorianDate = `${gregorian.gregorianYear}-${String(gregorian.gregorianMonth).padStart(2, "0")}-${String(gregorian.gregorianDay).padStart(2, "0")}`;
  
             // Check if this date has an eclipse
             const eclipseEvent = eclipses.find(e => e.date.startsWith(formattedGregorianDate));

             if (eclipseEvent) {
                 console.log(`🌑 Marking ${day} as Eclipse Day: ${eclipseEvent.title}`);
                 cell.classList.add("eclipse-day");
                 cell.setAttribute("title", `${eclipseEvent.title} 🌘`);
             }

            // Find the corresponding moon event
            const moonEvent = lunarData.find(moon => moon.date === formattedGregorianDate);
            console.log("Coverted Gregorian date is ", formattedGregorianDate);
            if (moonEvent && (moonEvent.moonName || moonEvent.phase.toLowerCase() === "full moon")) {
                console.log(`🌕 Marking ${day} as Full Moon: ${moonEvent.moonName || moonEvent.phase}`);
                cell.classList.add("full-moon-day");

                // always display the name if present, otherwise use the returned phase text
                const moonLabel = `${moonEvent.moonName || moonEvent.phase} 🌕`;
                cell.setAttribute("title", moonLabel);
            }

            // Highlight today's Celtic date if it matches the current month and day
            if (monthName === celticMonth && day === celticDay) {
                cell.classList.add("highlight-today");
            }

            // Normalize date format for easy comparison
            const formattedDay = String(day).padStart(2, "0");
            const formattedDate = `2025-${monthIndex}-${formattedDay}`;

            // Highlight festivals
            const festival = cachedFestivals.find(h => h.date === formattedGregorianDate);
        
            if (festival) {
                console.log(`Marking ${formattedGregorianDate} as Festival: ${festival.title}`);
                cell.classList.add("festival-day");
                cell.setAttribute("title", `${festival.title} 🎉`);
            } else {
                console.log("No holfestivaliday, No marking");
            }

            // Highlight national holidays
            const holiday = cachedNationalHolidays.find(h => h.date === formattedGregorianDate);
            
            if (holiday) {
                console.log(`Marking ${formattedGregorianDate} as National Holiday: ${holiday.title}`);
                cell.classList.add("national-holiday");
                cell.setAttribute("title", `${holiday.title} 🎉`);
            } else {
                console.log("No holiday, No marking");
            }

            // 💜 Highlight Custom Event Days
            const today = new Date();
            const currentYear = today.getFullYear();

            const prefs = getMysticalPrefs(); // make sure this is declared above if not already

            const matchingEvents = customEvents.filter(event => {
                const eventDate = new Date(event.date);
                const eventDateISO = eventDate.toISOString().split("T")[0];
                const todayISO = new Date().toISOString().split("T")[0];

                const isTodayOrFuture = eventDateISO >= todayISO;
                const isSameDate = eventDateISO === formattedGregorianDate;

                // Only include if past events are shown OR it's today/future
                return isSameDate && (prefs.showPastEvents || isTodayOrFuture);
            });

            if (matchingEvents.length > 0) {
                console.log(`Marking ${day} as Custom Event: ${matchingEvents.map(e => e.title).join(", ")}`);
                cell.classList.add("custom-event-day");
                cell.setAttribute("title", `Custom Event: ${matchingEvents.map(e => e.title).join(", ")}`);
            } else {
                console.log(`Custom event not found for ${formattedGregorianDate}`);
            }

            // Assign click behaviour to each date cell
            cell.addEventListener("click", () => {
                console.log(`Clicked on day ${day} in the month of ${monthName}, Gregorian: ${formattedGregorianDate}`);
                showDayModal(day, monthName,formattedGregorianDate); // Pass formattedGregorianDate
            });
        }
    });

    applyMysticalSettings(getMysticalPrefs());

}

// Fetch national holidays dynamically
async function fetchNationalHolidays() {
    console.log('Fetching national holidays now!!');
    try {
        const response = await fetch("/api/national-holidays");
        if (!response.ok) throw new Error("Failed to fetch national holidays");
        const data = await response.json();
        cachedNationalHolidays = data; // Store globally for reuse
        console.log("✅ National Holidays Fetched:", cachedNationalHolidays);
        return data;
    } catch (error) {
        console.error("Error fetching national holidays:", error);
        return [];
    }
}

async function getCelticDate() {
    try {
        const response = await fetch("/api/celtic-date");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return {
            celticMonth: data.month, // "Janus"
            celticDay: parseInt(data.celtic_day, 10), // 19
        };
    } catch (error) {
        console.error("Failed to fetch Celtic date:", error);
        return null;
    }
}

async function fetchEclipseEvents() {
    try {
        console.log("🌘 Calling fetchEclipseEvents()...");
        const response = await fetch("/api/eclipse-events");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const eclipseData = await response.json();
        console.log("✅ Eclipse Data Retrieved:", eclipseData);

        return eclipseData;
    } catch (error) {
        console.error("❌ Failed to fetch eclipse events:", error);
        return [];
    }
}

// Fetch lunar phases dynamically for a given Celtic month
export async function fetchMoonPhases(celticMonth) {
  console.log(`Fetching moon phases for ${celticMonth}...`);

  // Determine anchor year based on first day of the Celtic month
  const firstGregorian = convertCelticToGregorian(celticMonth, 1);
  const anchorYear = firstGregorian.gregorianYear;

  // Get the ISO date range for this Celtic month
  const { startISO, endISO } = getMonthRangeISO(celticMonth, anchorYear);
  if (!startISO || !endISO) {
    console.error("Invalid Celtic month in fetchMoonPhases:", celticMonth);
    return [];
  }

  try {
    const response = await fetch(`/dynamic-moon-phases?start_date=${startISO}&end_date=${endISO}`);
    if (!response.ok) throw new Error("Failed to fetch moon phases");
    const moonData = await response.json();
    console.log("🌙 Moon Phases Retrieved:", moonData);
    return moonData;
  } catch (error) {
    console.error("❌ Error fetching moon phases:", error);
    return [];
  }
}

// Fetch custom events dynamically
async function fetchCustomEvents() {
    try {
        const response = await fetch("/api/custom-events");
        if (!response.ok) throw new Error("Failed to fetch custom events");
        return await response.json();
    } catch (error) {
        console.error("Error fetching custom events:", error);
        return [];
    }
}

// Fetch Celtic festivals dynamically
async function fetchFestivals() {
    console.log('Fetching Festivals now!!');
    try {
        const response = await fetch("/festivals");
        if (!response.ok) throw new Error("Failed to fetch festivals");
        const data = await response.json();
        cachedFestivals = data; // Store globally for reuse
        console.log("✅ Festivals Fetched:", cachedFestivals);
        return data;
    } catch (error) {
        console.error("Error fetching festivals:", error);
        return [];
    }
}

function waitForImagesToLoad(container, callback) {
    const images = container.querySelectorAll("img");
    let loaded = 0;
  
    if (images.length === 0) return callback();
  
    images.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === images.length) callback();
        });
        img.addEventListener("error", () => {
          loaded++;
          if (loaded === images.length) callback();
        });
      }
    });
  
    if (loaded === images.length) callback();
}

// Function to fetch and display the details for a selected Celtic date
async function showDayModal(celticDay, celticMonth, formattedGregorianDate) {

     // ✅ Ensure modalContainer is defined first!
    const modalContainer = document.getElementById("modal-container");
    const modalDetails = document.getElementById("modal-details");

    if (!modalContainer || !modalDetails) {
        console.error("🚨 Modal elements not found, aborting.");
        return;
    }

    // Convert date format for lookup
    const formattedFestivalKey = `${celticMonth} ${celticDay}`;
  
    // Show loading state while fetching data
    modalDetails.innerHTML = `
        <h2>Celtic Calendar</h2>
        <p>Loading...</p>
    `;
  
    // Display the modal
    modalContainer.classList.remove("hidden");

    const constellationOverlay = document.getElementById("constellation-layer");
    constellationOverlay.className = `${celticMonth.toLowerCase()}-stars`;
  
    // Convert the Celtic date to Gregorian
    const gregorian = convertCelticToGregorian(celticMonth, celticDay);
    if (!gregorian) {
        modalDetails.innerHTML = "<p>Error: Invalid date conversion.</p>";
        return;
    }

    const formattedDay = gregorian.gregorianDay.toString().padStart(2, "0");
    const formattedMonth = gregorian.gregorianMonth.toString().padStart(2, "0");

    const zodiacName = getCelticZodiacName(gregorian.gregorianMonth, gregorian.gregorianDay);
    const zodiacSign = await fetchZodiacInfoByName(zodiacName);

     // Get additional data
    //const dayOfWeek = getDayOfWeek(gregorian.gregorianMonth, gregorian.gregorianDay);
    //const zodiac = getCelticZodiac(celticMonth, celticDay);
    let events = await getCustomEvents(gregorian.gregorianMonth, gregorian.gregorianDay, gregorian.gregorianYear);

    // Ensure events is always an array
    if (!Array.isArray(events)) {
        events = [];  // Convert it into an empty array if it's a string or undefined
    }

    // Apply display preferences to Mystical Preferences
    // const prefs = getMysticalPrefs();
  
    // Construct an ISO date string
    const year = gregorian.gregorianYear;
    const monthStr = String(gregorian.gregorianMonth).padStart(2, "0");
    const dayStr = String(gregorian.gregorianDay).padStart(2, "0"); 
    const dateStr = `${year}-${monthStr}-${dayStr}`;
  
    try {
        // Call the dynamic endpoint using the constructed date string
        const response = await fetch(`/dynamic-moon-phases?start_date=${dateStr}&end_date=${dateStr}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error("Invalid lunar data received");
        }
        const lunarData = data[0];
        console.log("🌙 lunarData.graphic is:", lunarData.graphic);
        const fullMoonName = lunarData.moonName;
  
        // Format the Gregorian month
        const gMonth = getFormattedMonth(monthStr);
        

        // Get alternative lunar descriptions
        const moonPoem = getMoonPoem(lunarData.phase, dateStr);

        // Ensure national holidays are available
        if (cachedNationalHolidays.length === 0) {
            await fetchNationalHolidays(); // Fetch if not already cached
        }
        console.log("Fetched National Holidays:", cachedNationalHolidays);        

        // Find Celtic Zodiac for this date
        const zodiacName = getCelticZodiacName(gregorian.gregorianMonth, gregorian.gregorianDay);
        const zodiacSign = await fetchZodiacInfoByName(zodiacName);

        console.log("Zodiac for this date:", zodiacSign);


        // Create a new zodiac slide
        let zodiacHTML = "";
        if (zodiacSign && zodiacSign.name) {
            const imageSlugZodiac = slugifyCharm(zodiacSign.name); // Convert to slugified charm name
        zodiacHTML = `
            <div class="carousel-slide zodiac-slide">
                <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Celtic Zodiac</h3>
                <p><span class="zodiac-title">${zodiacSign.name.toUpperCase()}</span></p>
                <img src="static/assets/images/zodiac/zodiac-${imageSlugZodiac}.png" alt="${zodiacSign.name}" class="zodiac-image">
                <p class="zodiac-description">${zodiacSign.symbolism || "Mysterious and undefined."}</p>
            </div>
        `;
        } else {
            console.warn("⚠️ Zodiac sign not found for this date!");
        }

        // Find eclipses for this date
        const eclipses = await fetchEclipseEvents();
        const eclipseEvent = eclipses.find(e => {
            const eventDate = e.date.split(" ")[0];  // Extract only YYYY-MM-DD
            console.log(`🔍 Checking Eclipse Date: ${eventDate} vs ${formattedGregorianDate}`);
            return eventDate === formattedGregorianDate;
        });

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


        console.log("Formatted Gregorian date used with eclipses: ", formattedGregorianDate);
        console.log("Today Eclipse data fetched: ", eclipseEvent);

        // Find the festival for this date
        const festivals = await fetchFestivals();

        console.log("🔍 Checking Festival Dates:");
        festivals.forEach(f => {
            console.log(`Festival: ${f.name} | Date in JSON: ${f.date} | Formatted: ${new Date(f.date).toISOString().split("T")[0]}`);
        });

        console.log("🧐 Formatted Gregorian Date Used for Matching:", formattedGregorianDate);

        // Ensure date format consistency
        const festivalEvent = festivals.find(f => {
            const festivalDate = new Date(f.date).toISOString().split("T")[0]; // Normalize format
            return festivalDate === formattedGregorianDate;
        });

        console.log("🎭 Festival Data Retrieved:", festivalEvent);

        // Show crescent moon nav buttons
        modalContainer.classList.remove("month-mode");

        // Find the holiday for this date
        const holidayInfo = cachedNationalHolidays
        .filter(h => h.date === dateStr)
        .map(h => {
        const imageSlugHoliday = slugifyCharm(h.title);
        return `<p><strong>${h.title}</strong></p>
                <img src='static/assets/images/holidays/holiday-${imageSlugHoliday}.png' class='holiday-img' alt='${h.title}' />`;
        })
        .join("") || "No national holidays today.";

        let eclipseHTML = "";
        if (eclipseEvent) {
            console.log("Eclipse Event is:", eclipseEvent.type);
            const eclipseImage = eclipseEvent.type === "solar-eclipse"
                ? "eclipse-solar.png"
                : "eclipse-lunar.png";

        eclipseHTML = `
            <div class="eclipse-block">
            <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Eclipse</h3>
            <img src='static/assets/images/eclipses/${eclipseImage}' class='eclipse-img' alt='${eclipseEvent.type}' />
            <p><strong>${eclipseEvent.title}</strong></p>
            <p class="eclipse-note">${eclipseEvent.description}</p>
            </div>
        `;
        }

        let holidayHTML = (holidayInfo && holidayInfo.trim() !== "" && holidayInfo !== "No national holidays today.")
        ? `<div class="holiday-block">
                <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Holidays</h3>
                <p>${holidayInfo}</p>
        </div>`
        : "";


        let festivalHTML = "";
        if (festivalEvent) {
            const imageSlugFestival = slugifyCharm(festivalEvent.name);
            festivalHTML = `
                <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Festivals</h3>
                <p><span class="festival-title">${festivalEvent.name}</span></p>
                <img src='static/assets/images/festivals/festival-${imageSlugFestival}.png' class='festival-img' alt='${festivalEvent.name}' />
                <p class="festival-note">${festivalEvent.description}</p>
            `;
        }

        let eventsHTML = Array.isArray(events) && events.length > 0
        ? `<img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Your Event</h3>
            ${events.map(event => {
                const icon = iconMap[event.type] || "🌟"; // fallback
                return `
                    <p><span class="event-title">${event.title}</span><br />
                    <div class="custom-event-icon">${icon}</div>
                    <span class="event-note">${event.notes || 'No additional details.'}</span><br />
                    <span class="event-type">${event.type}</span></p>
                `;
            }).join('')}`
        : "";

        // Update modal with lunar details
        modalDetails.innerHTML = `
            <div class="day-carousel-wrapper">
                <button class="day-carousel-prev"><img src="static/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button>

                <div class="day-carousel">
                    ${generateDaySlides({ 
                        lunarData, 
                        festivalHTML,
                        zodiacHTML, 
                        holidayHTML, 
                        eclipseHTML, 
                        eventsHTML,
                        celticMonth,
                        celticDay,
                        formattedGregorianDate,
                        fullMoonName // ✨ Add this line 
                        })}
                </div>

               <button class="day-carousel-next"><img src="static/assets/images/decor/moon-crescent-next.png" alt="Next" /></button>
                </div>
                <button id="back-to-month" class="back-button">Back to ${celticMonth}</button>
            </div>
        `;

        // 🍃 Simple Day Carousel (show/hide)
        const allSlides = Array.from(document.querySelectorAll('.day-slide'));
        let currentSlide = 0;
        // Initialize slides: only show the first
        allSlides.forEach((slide, i) => {
          slide.style.display = i === currentSlide ? 'flex' : 'none';
        });
        const showSlide = (index) => {
          // hide current
          allSlides[currentSlide].style.display = 'none';
          // wrap index
          currentSlide = (index + allSlides.length) % allSlides.length;
          // show new
          allSlides[currentSlide].style.display = 'flex';
        };
        // Prev/Next buttons
        document.querySelector('.day-carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
        document.querySelector('.day-carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));
        // Swipe support
        initSwipe(document.querySelector('.day-carousel'), {
          onSwipeLeft: () => showSlide(currentSlide + 1),
          onSwipeRight: () => showSlide(currentSlide - 1)
        });

        // Add event listener for the "Back" button
        const backButton = document.getElementById("back-to-month");
        if (backButton) {
            backButton.addEventListener("click", () => {
                modalContainer.classList.add("month-mode");
                showModal(celticMonth);
            });
        }
  
    } catch (error) {
        console.error("Error fetching lunar phase:", error);
        modalDetails.innerHTML = `<p>Failed to load moon phase data.</p>`;
    }

    console.log("Final Gregorian Date:", dateStr);
}

// Get Celtic Zodiac sign
function getCelticZodiacName(gregorianMonth, gregorianDay) {
    console.log(`Checking zodiac for: ${gregorianMonth}-${gregorianDay}`);
  
    const zodiacSigns = [
        { name: "Birch", start: { month: 12, day: 24 }, end: { month: 1, day: 20 } },
        { name: "Rowan", start: { month: 1, day: 21 }, end: { month: 2, day: 17 } },
        { name: "Ash", start: { month: 2, day: 18 }, end: { month: 3, day: 17 } },
        { name: "Alder", start: { month: 3, day: 18 }, end: { month: 4, day: 14 } },
        { name: "Willow", start: { month: 4, day: 15 }, end: { month: 5, day: 12 } },
        { name: "Hawthorn", start: { month: 5, day: 13 }, end: { month: 6, day: 9 } },
        { name: "Oak", start: { month: 6, day: 10 }, end: { month: 7, day: 7 } },
        { name: "Holly", start: { month: 7, day: 8 }, end: { month: 8, day: 4 } },
        { name: "Hazel", start: { month: 8, day: 5 }, end: { month: 9, day: 1 } },
        { name: "Vine", start: { month: 9, day: 2 }, end: { month: 9, day: 29 } },
        { name: "Ivy", start: { month: 9, day: 30 }, end: { month: 10, day: 27 } },
        { name: "Reed", start: { month: 10, day: 28 }, end: { month: 11, day: 24 } },
        { name: "Elder", start: { month: 11, day: 25 }, end: { month: 12, day: 23 } }
    ];
  
    const monthNum = parseInt(gregorianMonth, 10);
    const dayNum = parseInt(gregorianDay, 10);

    for (const sign of zodiacSigns) {
        const { start, end } = sign;
        if (
            (monthNum === start.month && dayNum >= start.day) ||
            (monthNum === end.month && dayNum <= end.day) ||
            (start.month > end.month && (monthNum > start.month || monthNum < end.month))
        ) {
            return sign.name;
        }
    }
    return "Unknown";
}

async function fetchZodiacInfoByName(name) {
    try {
        const response = await fetch("/api/calendar-data");
        if (!response.ok) throw new Error("Failed to fetch zodiac info");

        const data = await response.json();
        return data.zodiac.find(z => z.name === name) || null;
    } catch (error) {
        console.error("Error fetching zodiac info:", error);
        return null;
    }
}

function getFormattedMonth(monthNum) {
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return monthNames[parseInt(monthNum, 10) - 1]; // Convert to zero-based index
}

async function getCustomEvents(gregorianMonth, gregorianDay, gregorianYear) {
    console.log("Fetching custom events...");
    try {
        const response = await fetch("/api/custom-events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const events = await response.json();

        const monthStr = String(gregorianMonth).padStart(2, "0");
        const dayStr = String(gregorianDay).padStart(2, "0");
        const targetDate = `${gregorianYear}-${monthStr}-${dayStr}`;
        return events.filter(event => event.date === targetDate);

    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

function getMoonPoem(moonPhase, date) {
    const fullMoonNames = {
        "01": "Wolf Moon",
        "02": "Snow Moon",
        "03": "Worm Moon",
        "04": "Flower Moon",
        "05": "Strawberry Moon",
        "06": "Thunder Moon",
        "07": "Grain Moon",
        "08": "Harvest Moon",
        "09": "Hunter's Moon",
        "10": "Frost Moon",
        "11": "Beaver Moon",
        "12": "Cold Moon"
    };

    if (moonPhase === "Full Moon" && date) {
        const month = date.split("-")[1]; 
        console.log("Searching moon phase for this month: ", month);
        if (fullMoonNames[month]) {
            moonPhase = fullMoonNames[month]; // Assign the named moon
            console.log("🌕 Matched Full Moon:", moonPhase);
        }
    }

    const moonPoems = {
        "Wolf Moon": "Beneath the snow and howling skies,\nThe Wolf Moon watches, ancient, wise.\nA time to gather strength and rest,\nAnd light a candle, for what’s best.",
        "Snow Moon": "The Snow Moon casts its tranquil glow,\nUpon the earth where frost does grow.\nWrap in warmth, let dreams ignite,\nBurn cedar’s scent in soft moonlight.",
        "Worm Moon": "The Worm Moon stirs the thawing ground,\nWhere seeds of life are newly found.\nTurn the soil of heart and mind,\nWrite your dreams, and leave fear behind.",
        "Pink Moon": "Blush-lit petals drift and sway,\nCarried where the dreamers play.\nSoft as dawn and bright as air,\nA time to love, to hope, to dare.",
        "Flower Moon": "Petals bloom in moonlit air,\nA fragrant world beyond compare.\nPlant your dreams in fertile ground,\nLet love and joy in all things abound.",
        "Strawberry Moon": "The Strawberry Moon, ripe and red,\nA time to savour what’s been bred.\nSip something sweet, give thanks, rejoice,\nAnd honour life with grateful voice.",
        "Thunder Moon": "Thunder roars, the moon’s alive,\nWith storms of passion, dreams will thrive.\nDance in rain or light a flame,\nAnd cleanse your soul of doubt or shame.",
        "Grain Moon": "Fields of grain in moonlight bask,\nA time to gather, a sacred task.\nShare your wealth, both bright and deep,\nAnd sow what’s needed for the reap.",
        "Harvest Moon": "The Harvest Moon, so round, so bright,\nGuides weary hands through autumn’s night.\nReflect on work, both done and due,\nAnd thank the world for gifting you.",
        "Hunter's Moon": "The Hunter’s Moon is sharp and keen,\nA guide through shadows yet unseen.\nPrepare your heart, your tools, your way,\nAnd let the moonlight mark your stay.",
        "Frost Moon": "Frost-kissed trees stand still and bare,\nA quiet world in winter's care.\nBeneath the moon's soft silver glow,\nA time of peace, as storms lie low.",
        "Cold Moon": "The Cold Moon whispers of the past,\nOf trials endured and shadows cast.\nSip warm tea, let heartbeats mend,\nPrepare your soul for year’s new bend."
    };

    // Return the corresponding poem
    return {
        moonName: moonPhase, // This should now be "Flower Moon" instead of "Full Moon"
        poem: moonPoems[moonPhase] || "No description available."
    };
}

// Builds slides for the Day carousel
function generateDaySlides({ 
    lunarData, 
    festivalHTML, 
    holidayHTML, 
    eclipseHTML, 
    zodiacHTML,
    eventsHTML, 
    celticMonth, 
    celticDay, 
    formattedGregorianDate,
    fullMoonName // ✨ Add this too! 
}) {
    const randomMystical = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];

    const [year, month, day] = formattedGregorianDate.split("-");
    const weekday = getCelticWeekday(celticDay);
    const gMonth = getFormattedMonth(month);
    const gDay = parseInt(day, 10);

    const moonDescription = lunarData.description && lunarData.description !== "No description available."
        ? lunarData.description
        : "The moon stirs in silence tonight, her secrets cloaked.";

    // 🌞🌚 Determine whether Solis or Noctis
    let mirabilisTitle = "Mirabilis";
    let mirabilisPoem = "";
    let mirabilisSymbol = "";

    if (celticMonth === "Mirabilis") {
        if (celticDay === 1) {
            mirabilisTitle = "Mirabilis Solis";
            mirabilisPoem = "The sun dances on the edge of time,<br />Golden and defiant, it bends the chime.<br />A sacred spark, a seed of light,<br />That births the wheel in radiant flight.";
            mirabilisSymbol = `<img src="static/assets/images/months/mirabilis-solis-notext.png" class="mirabilis-symbol" alt="Solis Symbol" />`;
        } else if (celticDay === 2) {
            mirabilisTitle = "Mirabilis Noctis";
            mirabilisPoem = "A breath of shadow, soft and still,\nA second hush upon the hill.\nShe stirs in dreams beneath the veil,\nWhere moonlight writes the ancient tale.";
            mirabilisSymbol = `<img src="static/assets/images/months/mirabilis-noctis-notext.png" class="mirabilis-symbol" alt="Noctis Symbol" />`;
        }
    }

    return `
    <div class="day-slide">
        <h3 class="goldenTitle">${celticMonth === "Mirabilis" ? mirabilisTitle : weekday}</h3>
        ${celticMonth !== "Mirabilis" ? `<p><span class="celticDate">${celticMonth} ${celticDay}</span></p>` : ""}
        ${celticMonth !== "Mirabilis" ? `
            <div class="moon-phase-graphic moon-centered">
                ${lunarData.graphic}
            </div>` : ""}
            <h3 class="moon-phase-name">
                ${fullMoonName ? fullMoonName + " 🌕" : lunarData.phase + " 🌙"}
            </h3>
        <div class="mirabilis-graphic">
            ${mirabilisSymbol}
        </div>
        ${mirabilisPoem ? `<blockquote class="mirabilis-poem">${mirabilisPoem}</blockquote>` : ""}
        ${celticMonth !== "Mirabilis" ? `<p class="moon-description">${moonDescription}</p>`: ""}
    </div>

        ${festivalHTML ? `<div class="day-slide">${festivalHTML}</div>` : ""}
        ${holidayHTML ? `<div class="day-slide">${holidayHTML}</div>` : ""}
        ${eclipseHTML ? `<div class="day-slide">${eclipseHTML}</div>` : ""}
        ${zodiacHTML ? `<div class="day-slide">${zodiacHTML}</div>` : ""}
        ${eventsHTML ? `<div class="day-slide">${eventsHTML}</div>` : ""}

        <div class="day-slide">
            <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Mystical Wisdom</h3>
            <div class="mystical-suggestion-block">
                <img src="static/assets/images/decor/mystical-sparkle.png" alt="Mystical Sparkle" class="divider" />
                <p class="mystical-message">${randomMystical}</p>
            </div>
        </div>
    `;
}

function initDayCarousel(carousel, allSlides, currentSlide) {
    // Force consistent width for all slides
    const container = carousel.parentElement; // Or use a more specific selector if needed
    if (container) {
        const slideWidth = container.clientWidth;

        allSlides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
    }

    waitForImagesToLoad(carousel, () => {
        const slideWidth = allSlides[0].clientWidth;
        carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    });
}

export function applyMysticalSettings(prefs) {

    // 🎉 Toggle Holidays
    const holidayRows = document.querySelectorAll(".national-holiday-row");
    holidayRows.forEach(row => {
        row.classList.toggle("legend-row-hidden", !prefs.showHolidays);
    });

    const holidayCells = document.querySelectorAll(".national-holiday");
    holidayCells.forEach(cell => {
        if (prefs.showHolidays) {
            cell.classList.add("national-holiday");
        } else {
            cell.classList.remove("national-holiday");
        }
    });

    // 💜 Toggle Custom Events
    const customEventRows = document.querySelectorAll(".custom-event-day-row");
    customEventRows.forEach(row => {
        row.classList.toggle("legend-row-hidden", !prefs.showCustomEvents);
    });

    const customEventCells = document.querySelectorAll(".custom-event-day");
    customEventCells.forEach(cell => {
        if (prefs.showCustomEvents) {
            cell.classList.add("custom-event-day");
        } else {
            cell.classList.remove("custom-event-day");
        }
    });

    // ✨ Toggle Mystical Suggestions display logic
    const showMystical = prefs.mysticalSuggestions;
    const mysticalArea = document.getElementById("mystical-insight");

    // (Eclipse block display now always handled by presence, not prefs.showEclipses)

    if (mysticalArea) {
        const heading = mysticalArea.querySelector("h3");
        const message = mysticalArea.querySelector("span");

        if (showMystical && mysticalArea) {
            const messages = [
                "🌙 Trust your inner tides.",
                "✨ Today is a good day to cast intentions.",
                "🔮 The stars whisper secrets today...",
                "🌿 Pause. Listen to nature. It knows.",
                "🌙 Trust your inner tides.",
                "✨ Today is a good day to cast intentions.",
                "🔮 The stars whisper secrets today...",
                "🪄 Cast your hopes into the universe.",
                "🌸 A seed planted today blooms tomorrow.",
                "🌌 Let stardust guide your heart.",
                "🕯️ Light a candle and focus on your intentions for the day.",
                "🌜Meditate under the moonlight and visualize your dreams.",
                "߷ Draw a rune and interpret its meaning for guidance.",
                "💌 Write a letter to your future self and store it safely.",
                "🍁 Collect a small item from nature and set an intention with it."
            ];
            const randomIndex = Math.floor(Math.random() * messages.length);
            heading.classList.remove("hidden");
            message.textContent = messages[randomIndex];
            message.classList.remove("hidden");
            mysticalArea.classList.remove("hidden");
        } else {
            heading.classList.add("hidden");
            message.textContent = "";
            message.classList.add("hidden");
            mysticalArea.classList.add("hidden");
        }
    }

    // 🌒 Control Eclipse visibility based on preferences
    const eclipseElements = document.querySelectorAll(".eclipse-day");
    eclipseElements.forEach(el => {
        el.style.display = prefs.showEclipses ? "table-cell" : "none";
    });

    const eclipseSection = document.querySelector("#modal-details h3.subheader + p");
    if (eclipseSection && eclipseSection.textContent.includes("Eclipse")) {
        eclipseSection.parentElement.style.display = prefs.showEclipses ? "block" : "none";
    }
}

// Add only one submit listener for calendar page
document.addEventListener("submit", async (event) => {
    const isCalendarForm = event.target && event.target.id === "add-event-form";
    const isOnCalendarPage = window.location.hash === "#calendar";

    if (isCalendarForm && isOnCalendarPage) {
        event.preventDefault();
        console.log("✨ Adding new custom event from CALENDAR...");

        const eventName = document.getElementById("event-name").value.trim();
        const eventType = document.getElementById("event-type").value.trim();
        const eventNotes = document.getElementById("event-note").value.trim();
        const eventDate = document.getElementById("event-date").value;

        if (!eventName || !eventDate) {
            alert("Please enter a valid event name and date.");
            return;
        }

        const formattedDate = new Date(eventDate).toISOString().split("T")[0];

        const newEvent = {
            id: Date.now().toString(), // ✨ Unique identifier based on timestamp
            title: eventName,
            type: eventType || "General",
            notes: eventNotes || "",
            date: formattedDate
        };

        console.log("🎉 Event to be added (Calendar):", newEvent);

        try {
            const response = await fetch("/api/custom-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEvent)
            });

            // Fetch all events again and save them to localStorage
            // Instantly update localStorage without refetching
            customEvents.push(newEvent);
            saveCustomEvents(customEvents);

            if (!response.ok) throw new Error("Failed to add event.");

            const result = await response.json();
            console.log("✅ Event added from Calendar:", result);

            // Reopen the modal with updated info!
            showModal(lastOpenedMonth);

        } catch (error) {
            console.error("❌ Error adding calendar event:", error);
        }
    }
});
