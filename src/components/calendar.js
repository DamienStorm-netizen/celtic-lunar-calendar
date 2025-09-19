import { getMysticalPrefs } from "../utils/mysticalSettings.js";
import { mysticalMessages } from "../constants/mysticalMessages.js";
import { slugifyCharm } from "../utils/slugifyCharm.js";
import { initSwipe } from "../utils/swipeHandler.js";
import { starFieldSVG } from "../constants/starField.js";
import { getEventIcon } from "../utils/eventUtils.js";
import { api } from "../utils/api.js";
import { fetchCustomEvents } from "./eventsAPI.js";
// Removed showOverlay, hideOverlay imports to avoid conflicts with Celtic modals

import {
  getCelticWeekday,
  convertCelticToGregorian,
  convertGregorianToCeltic,
  getCelticWeekdayFromGregorian,
  getMonthRangeISO,
  isLeapYear
} from "../utils/dateUtils.js";

// 🌕 Declare globally
let FULL_MOONS = [];

async function initCalendar() {
  const calendarData = await api.calendarData();
  FULL_MOONS = calendarData.full_moons || [];
}

initCalendar();

// Busy helper (same as Settings)
function setBusy(el, isBusy = true) {
  if (!el) return;
  el.disabled = !!isBusy;
  el.setAttribute("aria-busy", String(!!isBusy));
  el.classList.toggle("is-busy", !!isBusy);
}

// Helper: find the named full moon within ±windowDays (defaults to 1 day)
export function getNamedMoonForDate(isoDate, windowDays = 1) {
  if (FULL_MOONS.length === 0) {
    console.warn("🔮 Full moon data not yet loaded!");
    return null;
  }

  const target = new Date(isoDate + "T00:00:00Z").getTime();
  return FULL_MOONS.find(moon => {
    const ts = new Date(moon.date + "T00:00:00Z").getTime();
    return Math.abs(target - ts) / 86400000 <= windowDays;
  });
}

// prefer = "current" (default) keeps the window for the *current* cycle.
// prefer = "future" will advance one cycle if the window already ended.
export function resolveMonthWindow(monthName, today = new Date(), prefer = "current") {
  const dec23Cutoff = Date.UTC(today.getUTCFullYear(), 11, 23);
  let cycle = (today.getTime() >= dec23Cutoff) ? today.getUTCFullYear() + 1 : today.getUTCFullYear();

  let { startISO, endISO } = getMonthRangeISO(monthName, cycle);

  if (prefer === "future") {
    const todayISO = today.toISOString().split("T")[0];
    if (endISO < todayISO) {
      cycle += 1;
      ({ startISO, endISO } = getMonthRangeISO(monthName, cycle));
    }
  }
  return { startISO, endISO, cycle };
}

// ————————————————————————————
// ISO date helpers (prevent mismatches like 'YYYY-MM-DD' vs 'YYYY-MM-DDT00:00:00Z')
function normalizeISODate(str) {
  if (!str) return "";
  const s = String(str);
  // handle "YYYY-MM-DDTHH:MM:SSZ" or "YYYY-MM-DD HH:MM..."
  return s.includes("T") ? s.split("T")[0] : s.split(" ")[0];
}
function sameISODate(a, b) {
  return normalizeISODate(a) === normalizeISODate(b);
}
function withinISO(iso, startISO, endISO) {
  return iso >= startISO && iso <= endISO;
}
// ————————————————————————————

let cachedNationalHolidays = []; // Store national holidays globally
let cachedFestivals = {}; // Store festivals globally
let lastOpenedMonth = null; // Keep track of the last opened month modal
//let customEvents = []; // Initialize an empty array for storing custom events

export function renderCalendar() {
    return `
      <section class="calendar" class="fade-in">

            <h1 class="calendar-title">Calendar</h1>

            <button id="calendar-today-btn" class="today_btn">Today</button>

            <div class="calendar-grid">
                <div class="month-thumbnail" id="nivis" data-month="Nivis">
                    <img src="/assets/images/months/nivis-thumbnail.png" alt="Nivis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="janus" data-month="Janus">
                    <img src="/assets/images/months/janus-thumbnail.png" alt="Janus Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="brigid" data-month="Brigid">
                    <img src="/assets/images/months/brigid-thumbnail.png" alt="Brigid Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Flora" data-month="Flora">
                    <img src="/assets/images/months/flora-thumbnail.png" alt="Flora Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Maia" data-month="Maia">
                    <img src="/assets/images/months/maia-thumbnail.png" alt="Maia Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Juno" data-month="Juno">
                    <img src="/assets/images/months/juno-thumbnail.png" alt="Juno Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Solis" data-month="Solis">
                    <img src="/assets/images/months/solis-thumbnail.png" alt="Solis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Terra" data-month="Terra">
                    <img src="/assets/images/months/terra-thumbnail.png" alt="Terra Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Lugh" data-month="Lugh">
                    <img src="/assets/images/months/lugh-thumbnail.png" alt="Lugh Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Pomona" data-month="Pomona">
                    <img src="/assets/images/months/pomona-thumbnail.png" alt="Pomona Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Autumna" data-month="Autumna">
                    <img src="/assets/images/months/autumna-thumbnail.png" alt="Autumna Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Eira" data-month="Eira">
                    <img src="/assets/images/months/eira-thumbnail.png" alt="Eira Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Aether" data-month="Aether">
                    <img src="/assets/images/months/aether-thumbnail.png" alt="Aether Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Mirabilis" data-month="Mirabilis">
                    <img src="/assets/images/months/mirabilis-thumbnail.png" alt="Mirabilis Thumbnail">
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

    // Listen for Celtic overlay clicks to close modal
    if (!window.__calendarOverlayWired) {
        document.addEventListener('celtic-overlay-click', () => {
            const modalContent = modalContainer.querySelector("#modal-content");
            if (modalContainer.classList.contains("show")) {
                console.log("Click on Celtic Overlay");
                if (modalContent) {
                    modalContent.classList.remove("fade-in");
                    modalContent.classList.add("fade-out");
                    modalContent.addEventListener("animationend", () => {
                        if (modalContainer.classList.contains("show")) {
                            modalContainer.classList.remove("show");
                            modalContainer.classList.add("hidden");
                        }
                        // Don't use hideOverlay() to avoid Celtic overlay conflicts
                        document.body.classList.remove("modal-open");
                        modalContent.classList.remove("fade-out");
                    }, { once: true });
                } else {
                    if (modalContainer.classList.contains("show")) {
                        modalContainer.classList.remove("show");
                        modalContainer.classList.add("hidden");
                    }
                    // Don't use hideOverlay() to avoid Celtic overlay conflicts
                    document.body.classList.remove("modal-open");
                }
            }
        });
        window.__calendarOverlayWired = true;
    }

    // Attach event listener to close modal
    modalClose.addEventListener("click", closeModal);

    // Attach event listender to Today button
    document.getElementById("calendar-today-btn").addEventListener("click", async () => {
        // Don't block decoration if today's Celtic date isn't available
        let celticMonth, celticDay;
        try {
        const todayCeltic = await getCelticDate();

        if (todayCeltic) ({ celticMonth, celticDay } = todayCeltic);
         } catch (err) {
            console.warn("Could not fetch Celtic date; continuing without 'today' highlight.", err);
         }
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
export function showModal(monthName) {

    lastOpenedMonth = monthName; // ✅ Store the last opened month
    console.log("📅 Last opened month set to:", lastOpenedMonth);

    const modalContainer = document.getElementById("modal-container"); // Ensure modalContainer is defined first

    if (!modalContainer) {
        return;
    }

    // Show calendar modal with its own background overlay
    // Don't use showOverlay() to avoid conflicts with Celtic modals


 
    modalContainer.classList.remove("hidden");
    modalContainer.classList.add("month-mode");

    if (monthName) {
        const modalDetails = modalContainer.querySelector("#modal-details");

        if (modalDetails) {
            modalContainer.classList.add("show");
            document.body.classList.add("modal-open"); // Prevent scrolling

            // Play fade-in on modal content
            const modalContent = modalContainer.querySelector("#modal-content");
            if (modalContent) {
                modalContent.classList.remove("fade-out");
                modalContent.classList.add("fade-in");
                modalContent.addEventListener("animationend", () => {
                    modalContent.classList.remove("fade-in");
                }, { once: true });
            }


            // ✦ Highlight today's date cell if it matches this month
            try {
              const todayISO = new Date().toISOString().split("T")[0];
              const celticToday = convertGregorianToCeltic(todayISO);
              if (celticToday && celticToday.startsWith(monthName)) {
                const parts = celticToday.split(" ");
                const todayDay = parseInt(parts[1], 10);
                const cells = modalDetails.querySelectorAll(".calendar-grid td");
                cells.forEach(td => {
                  if (td.textContent.trim() === String(todayDay)) {
                    td.classList.add("highlight-today");
                    td.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                });
              }
            } catch (err) {
              console.warn("Highlight today failed:", err);
            }

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
                            <img src="/assets/images/months/mirabilis-solis.png" alt="Mirabilis Solis" />
                            <p>Mirabilis Solis</p>
                        </div>
                    </div>

                    <div class="mirabilis-tab-content hidden" id="tab-noctis">
                        <div class="mirabilis-crest crest-noctis ${leap ? '' : 'disabled'}" id="crest-noctis" title="${leap ? 'Click to enter Mirabilis Noctis' : 'Appears only in leap years'}">
                            <img src="/assets/images/months/mirabilis-noctis.png" alt="Mirabilis Noctis" />
                            <p>Mirabilis Noctis</p>
                        </div>
                    </div>

                    <a id="zodiac-learn-more" class="settings-btn celtic-zodiac-btn" href="https://open.substack.com/pub/playgroundofthesenses/p/mirabilis?r=3ngp34&utm_campaign=post&utm_medium=web" target="_blank" style="display: inline-block;">Learn More</a>
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
                    <form id="add-event-form" style="text-align: left; padding: 20px;">
                        <label for="event-name">Event Name:
                            <input type="text" id="event-name" required class="celtic-form-input" />
                        </label>

                        <label for="event-type">Type of Event:
                            <select id="event-type" name="event-type" class="celtic-form-input">
                                <option value="🔥 Date">🔥 Date</option>
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Celebrations">🎉 Celebrations</option>
                                <option value="🌸 My Cycle">🌸 My Cycle</option>
                                <option value="💡 General" selected>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select>
                        </label>

                        <label for="event-date">Date:
                            <input type="date" id="event-date" class="flatpickr-input celtic-form-input" placeholder="Pick your date 🌕" required />
                        </label>

                        <label for="event-note">Event Description:
                            <textarea id="event-note" class="celtic-form-textarea"></textarea>
                        </label>

                        <label for="event-recurring" class="celtic-form-checkbox-container">
                            <input type="checkbox" id="event-recurring" class="celtic-form-checkbox" />
                            <span class="celtic-form-checkbox-label">Make it Recurring</span>
                        </label>

                        <div style="margin-top: 20px; text-align: center;">
                            <button type="submit" class="add-event-button">Add Event</button>
                        </div>
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
            if (monthName === 'Mirabilis') {
                const today = new Date();
                const leap = isLeapYear(today.getFullYear());
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
                }, 0);
            }

            // Apply fade-in effect
            modalContainer.classList.add("fade-in");
            modalContainer.classList.remove("fade-out");

            // ✅ Call enhancement only when the modal is displayed
            enhanceCalendarTable(modalContainer, monthName);

            // Initialize flatpickr when the Add Event tab becomes active
            setTimeout(() => {
                initEventDatePicker();
            }, 100);


const addForm = document.getElementById("add-event-form");
if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = e.submitter || addForm.querySelector(".add-event-button");
    setBusy(submitBtn, true);

    const eventName  = document.getElementById("event-name").value.trim();
    const eventType  = document.getElementById("event-type").value;
    const eventDate  = document.getElementById("event-date").value;
    const eventNotes = document.getElementById("event-note").value.trim();
    const eventRecurring = document.getElementById("event-recurring").checked;

    if (!eventName || !eventDate) {
      alert("Please enter both an event name and date.");
      setBusy(submitBtn, false);
      return;
    }

    // keep newEvent in scope for the SweetAlert branch
    const newEvent = {
      id: Date.now().toString(),
      title: eventName,
      type: "custom-event",     // <- consistent with Settings
      category: eventType,       // <- use the selected value from the form
      date: eventDate,
      notes: eventNotes,
      recurring: eventRecurring
    };

    try {
      // go through API helper so dev/prod just works
      await api.addCustomEvent(newEvent);

      // (optional) refresh the grid decorations for this month without re-wiring everything
      // await enhanceCalendarTable(document.getElementById("modal-container"), lastOpenedMonth);

      // ✅ Success UI
      const wd    = getCelticWeekdayFromGregorian(eventDate);
      const lunar = convertGregorianToCeltic(eventDate);

      // Handle Mirabilis special case
      let monthLabel, dayStr;
      if (lunar.startsWith("Mirabilis")) {
        monthLabel = "Mirabilis";
        dayStr = lunar.includes("Noctis") ? "2" : "1";
      } else {
        [monthLabel, dayStr] = lunar.split(" ");
      }

      Swal.fire({
        icon: "success",
        title: `Event saved for ${wd}, ${lunar}`,
        showCancelButton: true,
        confirmButtonText: "View Event"
      }).then(result => {
        if (result.isConfirmed) {
          document.querySelector(".nav-link#nav-calendar").click();
          setTimeout(() => {
            showDayModal(parseInt(dayStr, 10), monthLabel, eventDate, newEvent.id);
            const slideEl = document.querySelector(`.custom-event-slide[data-event-id="${newEvent.id}"]`);
            if (slideEl) {
              slideEl.classList.add("highlight-pulse");
              setTimeout(() => slideEl.classList.remove("highlight-pulse"), 2000);
            }
          }, 300);
        }
      });

    } catch (err) {
      console.error("Add from calendar failed:", err);
      alert("Oops! Couldn’t save that event. Please try again.");
    } finally {
      setBusy(submitBtn, false);
    }
  });
}
        }
    }
}

// Close modal
function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");
    const modalContent = modalContainer?.querySelector("#modal-content");

    const immediateHide = () => {
        if (modalContainer) {
            modalContainer.classList.add("hidden");
            modalContainer.classList.remove("show");
        }
        // Don't use hideOverlay() to avoid Celtic overlay conflicts
        document.body.classList.remove("modal-open");
    };

    if (modalContent) {
        modalContent.classList.remove("fade-in");
        modalContent.classList.add("fade-out");
        modalContent.addEventListener("animationend", () => {
            modalContent.classList.remove("fade-out");
            immediateHide();
        }, { once: true });
    } else {
        immediateHide();
    }
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

// Simple datepicker initialization like the working birthdateInput
function initEventDatePicker() {
    const eventDateInput = document.getElementById("event-date");
    if (!eventDateInput) return;
    
    // Use the same simple approach as the working birthdateInput
    flatpickr("#event-date", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        theme: "moonveil"
    });
}

// Sets up the 3 tabs inside the modal
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
        
        // If switching to the Add Event tab, ensure datepicker is properly initialized
        if (targetId === "tab-content-add") {
            setTimeout(() => {
                initEventDatePicker();
            }, 50);
        }
      });
    });
}

// Add click events to HTML table
async function enhanceCalendarTable(modalContainer, monthName, prefsOverride) {
    console.log(`Enhancing calendar for ${monthName}...`);

    if (cachedNationalHolidays.length === 0) {
        await fetchNationalHolidays();
    }

    const todayCeltic = await getCelticDate();
    if (!todayCeltic) {
        console.error("Could not fetch Celtic date. Highlight skipped.");
        return;
    }

    const { celticMonth, celticDay } = todayCeltic;
    const tableCells = modalContainer.querySelectorAll(".calendar-grid td");

    const eclipses = await fetchEclipseEvents();
    console.log("Fetched Eclipse Data:", eclipses);

    if (!cachedNationalHolidays || cachedNationalHolidays.length === 0) {
        console.log("Fetching national holidays...");
        cachedNationalHolidays = await fetchNationalHolidays();
    }

    // 🔧 One window to rule them all (use the same range for cells, moons, holidays)
    const { startISO, endISO, cycle } = resolveMonthWindow(monthName, new Date(), "current");
    const baseYearForMonth = parseInt(endISO.split("-")[0], 10);

    // Fetch lunar phases for this exact window
    const lunarData = await fetchMoonPhasesBetween(startISO, endISO);
    console.log("🌙 lunarData array (", startISO, "→", endISO, "):", lunarData);

    const customEvents = await fetchCustomEvents();
    console.log("Custom events retrieved (from eventsAPI):", customEvents);

    const festivals = await fetchFestivals();

    // Preferences (fallback defaults)
    const prefs = prefsOverride || ((typeof getMysticalPrefs === "function")
        ? getMysticalPrefs()
        : { showHolidays: true, showCustomEvents: true, showPastEvents: true, showMoons: true, showEclipses: true });

    tableCells.forEach((cell) => {
        const day = parseInt(cell.textContent, 10);
        console.log(`📅 Checking table cell: ${day}`);

        if (isNaN(day)) return;

        console.log(`✅ Table Cell Detected: ${day} in ${monthName}`);

        const gregorian = convertCelticToGregorian(monthName, day, baseYearForMonth);
        if (!gregorian) {
            console.error(`Failed to convert ${monthName} ${day} to Gregorian.`);
            return;
        }
        const formattedGregorianDate = `${gregorian.gregorianYear}-${String(gregorian.gregorianMonth).padStart(2, "0")}-${String(gregorian.gregorianDay).padStart(2, "0")}`;

        const eclipseEvent = eclipses.find(e => sameISODate(e.date, formattedGregorianDate));
        if (prefs.showEclipses && eclipseEvent) {
            console.log(`🌑 Marking ${day} as Eclipse Day: ${eclipseEvent.title}`);
            cell.classList.add("eclipse-day");
            cell.setAttribute("title", `${eclipseEvent.title} 🌘`);
        }
        const moonEvent = lunarData.find(moon => sameISODate(moon.date, formattedGregorianDate));
        console.log("Coverted Gregorian date is ", formattedGregorianDate);
        if (prefs.showMoons && moonEvent && moonEvent.phase && moonEvent.phase.toLowerCase() === "full moon") {
            console.log(`🌕 Marking ${day} as Full Moon: ${moonEvent.moonName || moonEvent.phase}`);
            cell.classList.add("full-moon-day");
            const moonLabel = `${moonEvent.moonName || moonEvent.phase} 🌕`;
            cell.setAttribute("title", moonLabel);
        }

        if (celticMonth && celticDay && monthName === celticMonth && day === celticDay) {
            cell.classList.add("highlight-today");
        }

        const festival = festivals.find(f => normalizeISODate(f.date) === formattedGregorianDate);
        if (festival) {
            const festLabel = festival.title || festival.name || "Festival";
            console.log(`Marking ${formattedGregorianDate} as Festival: ${festLabel}`);
            cell.classList.add("festival-day");
            cell.setAttribute("title", `${festLabel} 🎉`);
        }

        // Holidays (normalize to guard against 'YYYY-MM-DDTHH:mm:ssZ')
        // Holidays (normalize to guard against 'YYYY-MM-DDTHH:mm:ssZ')
        if (prefs.showHolidays) {
        const holiday = cachedNationalHolidays.find(h => {
            const hISO = normalizeISODate(h.date);
            return sameISODate(hISO, formattedGregorianDate);
        });
        if (holiday) {
            const label = holiday.title || holiday.name || "Holiday";
            console.log(`🎉 Marking ${formattedGregorianDate} as National Holiday: ${label}`);
            cell.classList.add("national-holiday");
            cell.setAttribute("title", `${label} 🎉`);
        }
        }

        // Custom events
        const [, cellMonth, cellDay] = formattedGregorianDate.split("-");
        if (prefs.showCustomEvents) {
            // --- NEW: today's ISO for past-event logic ---
            const todayISO = new Date().toISOString().split("T")[0];
            customEvents.forEach(event => {
                const [eYear, eMonth, eDay] = event.date.split("-");

                // Past/future helpers
                const sameMonthDay = (eMonth === cellMonth && eDay === cellDay);
                const isPast = event.date < todayISO;   // ✓ now truly “before today”
                const futureMatch  = (!event.recurring && monthName === "Nivis" && sameMonthDay && parseInt(eYear, 10) === baseYearForMonth + 1);
                const pastMatch    = (!event.recurring && prefs.showPastEvents && isPast && sameMonthDay);

                // Hide past singles only when toggle is OFF
                if (!prefs.showPastEvents && !event.recurring && isPast) {
                    return; // skip past single events entirely
                }

                const matches = event.recurring
                    ? sameMonthDay
                    : (event.date === formattedGregorianDate || futureMatch || pastMatch);

                if (matches) {
                    cell.classList.add("custom-event-day");
                    cell.setAttribute(
                        "title",
                        `${event.title}${event.notes ? " — " + event.notes : ""}`
                    );
                    cell.setAttribute("data-event-id", event.id || `${event.title}-${event.date}`);
                }
            });
        }

        cell.addEventListener("click", () => {
            console.log(`Clicked on day ${day} in the month of ${monthName}, Gregorian: ${formattedGregorianDate}`);
            showDayModal(day, monthName, formattedGregorianDate);
        });
    });
}

// Fetch national holidays dynamically (resilient + normalized)
async function fetchNationalHolidays() {
  // Helper to coerce whatever the backend returns into [{ date, title }]
  const normalize = (raw) => {
    const arr = Array.isArray(raw)
      ? raw
      : (raw?.national_holidays || raw?.holidays || raw?.data || []);
    return (arr || [])
      .map(h => ({
        date: normalizeISODate(
          h.date ||
          h.isoDate ||
          h.iso_date ||
          h.observed ||
          h.start_date ||
          h.start ||
          ""
        ),
        title: h.title || h.name || h.localName || h.holiday || h.description || "Holiday"
      }))
      .filter(h => h.date); // keep only items with a date
  };

  // 1) Try the dedicated endpoint
  let data = await api.nationalHolidays().catch(() => null);
  let normalized = normalize(data);

  // 2) Fallback: pull from calendarData if the endpoint is empty
  if (!normalized.length) {
    const cal = await api.calendarData().catch(() => null);
    normalized = normalize(cal);
  }

  // 3) Cache + debug
  cachedNationalHolidays = normalized;
  console.log("🎌 cachedNationalHolidays:", normalized.length, normalized.slice(0, 3));
  return normalized;
}

async function getCelticDate() {
    // Use local calculation to avoid backend timezone/off-by-one issues
    const today = new Date();
    const localISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const localCelticDate = convertGregorianToCeltic(localISO);
    const [monthName, dayStr] = localCelticDate.split(' ');
    const celticDay = parseInt(dayStr, 10);
    
    console.log("Calendar using local Celtic date calculation:", localCelticDate);
    
    // Still fetch from backend for consistency, but override the calculation
    const data = await api.celticDate();
    
    // Use our corrected calculation
    return { celticMonth: monthName, celticDay: celticDay };
}

async function fetchEclipseEvents() {
    const eclipseData = await api.eclipseEvents();
    return eclipseData;
}

// Fetch lunar phases dynamically for a given Celtic month
export async function fetchMoonPhases(celticMonth) {
  console.log(`Fetching moon phases for ${celticMonth}...`);

  const { startISO, endISO } = resolveMonthWindow(celticMonth, new Date(), "current");
  if (!startISO || !endISO) {
    console.error("Invalid Celtic month in fetchMoonPhases:", celticMonth);
    return [];
  }

  try {
        const moonData = await api.dynamicMoonPhases(startISO, endISO);
        console.log("🌙 Moon Phases Retrieved:", moonData);
        return moonData;
    } catch (error) {
        console.error("❌ Error fetching moon phases:", error);
        return [];
    }   
}

// Helper to fetch moon phases for an explicit ISO range
async function fetchMoonPhasesBetween(startISO, endISO) {
  try {
        return await api.dynamicMoonPhases(startISO, endISO);
    } catch (e) {
        console.error("❌ Error fetching moon phases (range):", e);
        return [];
    }
}


// Fetch Celtic festivals dynamically
async function fetchFestivals() {
    const data = await api.festivals();
    cachedFestivals = data;
    return data;
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
export async function showDayModal(day, monthName, formattedGregorianDate, eventId = null) {
    const celticMonth = monthName;
    const celticDay = day;

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
    if (constellationOverlay) {
        constellationOverlay.className = `${celticMonth.toLowerCase()}-stars`;
    }
  
    // Convert the Celtic date to Gregorian
    const gregorian = convertCelticToGregorian(celticMonth, celticDay);
    if (!gregorian) {
        modalDetails.innerHTML = "<p>Error: Invalid date conversion.</p>";
        return;
    }

    const formattedDay = gregorian.gregorianDay.toString().padStart(2, "0");
    const formattedMonth = gregorian.gregorianMonth.toString().padStart(2, "0");

     // Get additional data
    //const dayOfWeek = getDayOfWeek(gregorian.gregorianMonth, gregorian.gregorianDay);
    //const zodiac = getCelticZodiac(celticMonth, celticDay);
    // Get custom events for this specific date
    let allCustomEvents = await fetchCustomEvents();
    let events = allCustomEvents.filter(event => {
        const [eYear, eMonth, eDay] = event.date.split("-");
        const monthStr = String(gregorian.gregorianMonth).padStart(2, "0");
        const dayStr = String(gregorian.gregorianDay).padStart(2, "0");
        const targetDate = `${gregorian.gregorianYear}-${monthStr}-${dayStr}`;

        if (event.recurring) {
            // match month/day each year
            return eMonth === monthStr && eDay === dayStr;
        }
        return event.date === targetDate;
    });

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
       // Call the dynamic endpoint via the API helper so it always hits the backend
        const data = await api.dynamicMoonPhases(dateStr, dateStr);
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Invalid lunar data received");
        }
        const lunarData = data[0] || {};          // Always have an object
        let illumination;   // declare early so later references never choke

        // --- REMOVE EARLIER DUPLICATE NAMED MOON LOGIC BLOCK HERE ---
  
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
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Celtic Zodiac</h3>
                <p><span class="zodiac-title">${zodiacSign.name.toUpperCase()}</span></p>
                <img src="/assets/images/zodiac/zodiac-${imageSlugZodiac}.png" alt="${zodiacSign.name}" class="zodiac-image">
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

        const _prefsForDay = (typeof getMysticalPrefs === "function")
            ? getMysticalPrefs()
            : { showEclipses: true };

        
        // grab the first emoji in a string (works for fire, hearts, etc.)
        function firstEmoji(s = "") {
            const m = s.match(/\p{Extended_Pictographic}/u);
            return m ? m[0] : "";
        }

        // loose text-based fallback if there’s no emoji and no exact map hit
        function iconFromLoose(label = "") {
            const t = label.toLowerCase();
            if (t.includes("date"))       return "🔥";
            if (t.includes("friend"))     return "😎";
            if (t.includes("celebrat"))   return "🎉";
            if (t.includes("cycle"))      return "🌸";
            if (t.includes("health"))     return "🏥";
            if (t.includes("romantic") ||
                t.includes("love"))       return "💜";
            if (t.includes("pro") ||
                t.includes("work") ||
                t.includes("career"))     return "🖥️";
            return "💡";
        }


        console.log("Formatted Gregorian date used with eclipses: ", formattedGregorianDate);
        console.log("Today Eclipse data fetched: ", eclipseEvent);

        

        // Find the festival for this date
        const festivals = await fetchFestivals();

        console.log("🔍 Checking Festival Dates:");
        festivals.forEach(f => {
            console.log(`Festival: ${f.name} | Date in JSON: ${f.date} | Formatted: ${new Date(f.date).toISOString().split("T")[0]}`);
        });

        console.log("🧐 Formatted Gregorian Date Used for Matching:", formattedGregorianDate);

        // 🌕 Named‑moon & phase handling (3‑day window)

        illumination = (typeof lunarData.illumination === "number")
            ? (lunarData.illumination * 100).toFixed(2)
            : null;
  
        let phase = lunarData.phase ?? "Unknown phase";

        if (illumination != null) {
            const illumVal = parseFloat(illumination);
            // ≤ 1 %: always New Moon
            if (illumVal <= 1) {
                phase = "New Moon";
            } else if (illumVal <= 5 && /crescent/i.test(phase)) {
                phase = "New Moon";
            }
        }

        // Propagate the corrected phase so downstream code sees it
        lunarData.phase = phase;

        const defaultText = illumination != null
          ? `${phase} phase with ${illumination}% illumination.`
          : phase;

        const namedMoon = getNamedMoonForDate(formattedGregorianDate, 2); // ±2 days → 5‑day span

        const moonLabel = namedMoon
          ? namedMoon.name
          : (phase.toLowerCase() === "full moon" ? "Full Moon" : phase);

        const moonText = namedMoon
          ? (namedMoon.poem || namedMoon.description || "").replace(/\n/g, "<br/>")
          : defaultText;

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
            .filter(h => sameISODate(h.date, dateStr))
            .map(h => {
            const label = h.title || h.name || "Holiday";
            const imageSlugHoliday = slugifyCharm(label);
            return `<p><strong>${label}</strong></p>
            <img src='/assets/images/holidays/holiday-${imageSlugHoliday}.png' class='holiday-img' alt='${label}' />`;
            })
        .join("") || "No national holidays today.";

        let eclipseHTML = "";
        if (_prefsForDay.showEclipses && eclipseEvent) {
        console.log("Eclipse Event is:", eclipseEvent.type);
        const eclipseImage = eclipseEvent.type === "solar-eclipse"
            ? "eclipse-solar.png"
            : "eclipse-lunar.png";

        eclipseHTML = `
            <div class="eclipse-block">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Eclipse</h3>
            <img src='/assets/images/eclipses/${eclipseImage}' class='eclipse-img' alt='${eclipseEvent.type}' />
            <p><strong>${eclipseEvent.title}</strong></p>
            <p class="eclipse-note">${eclipseEvent.description}</p>
            </div>
        `;
        }

        let holidayHTML = (holidayInfo && holidayInfo.trim() !== "" && holidayInfo !== "No national holidays today.")
        ? `<div class="holiday-block">
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Holidays</h3>
                <p>${holidayInfo}</p>
        </div>`
        : "";


        let festivalHTML = "";
        if (festivalEvent) {
            const imageSlugFestival = slugifyCharm(festivalEvent.name);
            festivalHTML = `
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Festivals</h3>
                <p><span class="festival-title">${festivalEvent.name}</span></p>
                <img src='/assets/images/festivals/festival-${imageSlugFestival}.png' class='festival-img' alt='${festivalEvent.name}' />
                <p class="festival-note">${festivalEvent.description}</p>
            `;
        }

        // safely escape user text
        const escapeHtml = (s = "") =>
        String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

        // build a beautiful slide for a single event
        function renderEventSlide(evt) {
            const label = (evt.category || evt.type || "💡 General").trim();
            const icon  = getEventIcon(evt);
            const titleSafe = escapeHtml(evt.title || "Untitled event");
            const notesHtml = evt.notes
                ? `<p class="event-notes">${escapeHtml(evt.notes).replace(/\n/g, "<br/>")}</p>`
                : "";

            return `
            <div class="day-slide custom-event-slide" data-event-id="${evt.id}">
                <img src="/assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h2 class="event-card__title">${titleSafe}</h2>
                 <div class="event-card-wrapper">
                    <div class="event-card">
                        <div class="event-card__icon">💜</div> <!-- icon floats above -->
                        ${notesHtml}
                    </div>
                
                </div> 
            </div>
`;
        }

        // Update modal with lunar details
        modalDetails.innerHTML = `
            <div class="day-carousel-wrapper">
                <button class="day-carousel-prev"><img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button>

                <div class="day-carousel">
                    ${generateDaySlides({ 
                        lunarData, 
                        festivalHTML,
                        zodiacHTML, 
                        holidayHTML, 
                        eclipseHTML, 
                        celticMonth,
                        celticDay,
                        formattedGregorianDate,
                        moonLabel,
                        moonText
                        })}
                    ${events.map(renderEventSlide).join("")}
                </div>

               <button class="day-carousel-next"><img src="/assets/images/decor/moon-crescent-next.png" alt="Next" /></button>
                </div>
                <button id="back-to-month" class="back-button">Back to ${celticMonth}</button>
            </div>
        `;

        // 🍃 Simple Day Carousel (show/hide) with direct event slide support
        const allSlides = Array.from(modalContainer.querySelectorAll('.day-slide'));
        let currentSlide = 0;
        // Initialize slides: only show the first
        allSlides.forEach((slide, i) => {
          slide.style.display = i === currentSlide ? 'flex' : 'none';
        });
        const showSlide = (index) => {
          allSlides[currentSlide].style.display = 'none';
          currentSlide = (index + allSlides.length) % allSlides.length;
          allSlides[currentSlide].style.display = 'flex';
        };
        // Prev/Next buttons
        document.querySelector('.day-carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
        document.querySelector('.day-carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));
        // Swipe support and capture instance
        const swipeInstance = initSwipe(modalContainer.querySelector('.day-carousel'), {
          onSwipeLeft: () => showSlide(currentSlide + 1),
          onSwipeRight: () => showSlide(currentSlide - 1)
        });
        // If an eventId was passed, jump the carousel to that slide
        if (eventId) {
          const eventSlide = modalContainer.querySelector(`.custom-event-slide[data-event-id="${eventId}"]`);
          if (eventSlide) {
            const idx = allSlides.indexOf(eventSlide);
            // Only call slideTo if it exists on the returned instance
            if (swipeInstance && typeof swipeInstance.slideTo === 'function') {
              swipeInstance.slideTo(idx);
            } else {
              // Fallback: manually show the correct slide
              showSlide(idx);
            }
          }
        }

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
        const data = await api.calendarData();
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
    celticMonth, 
    celticDay, 
    formattedGregorianDate,
    moonLabel,
    moonText
}) {
    const randomMystical = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];

    const [year, month, day] = formattedGregorianDate.split("-");
    const weekday = getCelticWeekday(celticDay);
    const gMonth = getFormattedMonth(month);
    const gDay = parseInt(day, 10);

    const moonDescription = lunarData.description && lunarData.description !== "No description available."
        ? lunarData.description
        : "The moon stirs in silence tonight, her secrets cloaked.";

    // A day is considered 'full / named' if it matches our 3‑day window logic
   // Named/full if the label differs from the raw phase OR it really is full
    const isNamedOrFull =
        moonLabel.toLowerCase() !== lunarData.phase.toLowerCase() ||
        lunarData.phase.toLowerCase() === "full moon";

    // 🌞🌚 Determine whether Solis or Noctis
    let mirabilisTitle = "Mirabilis";
    let mirabilisPoem = "";
    let mirabilisSymbol = "";

    if (celticMonth === "Mirabilis") {
        if (celticDay === 1) {
            mirabilisTitle = "Mirabilis Solis";
            mirabilisPoem = "The sun dances on the edge of time,<br />Golden and defiant, it bends the chime.<br />A sacred spark, a seed of light,<br />That births the wheel in radiant flight.";
            mirabilisSymbol = `<img src="/assets/images/months/mirabilis-solis-notext.png" class="mirabilis-symbol" alt="Solis Symbol" />`;
        } else if (celticDay === 2) {
            mirabilisTitle = "Mirabilis Noctis";
            mirabilisPoem = "A breath of shadow, soft and still,\nA second hush upon the hill.\nShe stirs in dreams beneath the veil,\nWhere moonlight writes the ancient tale.";
            mirabilisSymbol = `<img src="/assets/images/months/mirabilis-noctis-notext.png" class="mirabilis-symbol" alt="Noctis Symbol" />`;
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
          ${isNamedOrFull ? `${moonLabel} ` : `${lunarData.phase} `}
        </h3>
        <div class="mirabilis-graphic">
            ${mirabilisSymbol}
        </div>
        ${mirabilisPoem ? `<blockquote class="mirabilis-poem">${mirabilisPoem}</blockquote>` : ""}
        ${celticMonth !== "Mirabilis"
          ? `<p class="moon-description">${
                isNamedOrFull ? moonText : moonDescription
            }</p>`
          : ""}
    </div>

        ${festivalHTML ? `<div class="day-slide">${festivalHTML}</div>` : ""}
        ${holidayHTML ? `<div class="day-slide">${holidayHTML}</div>` : ""}
        ${eclipseHTML ? `<div class="day-slide">${eclipseHTML}</div>` : ""}
        ${zodiacHTML ? `<div class="day-slide">${zodiacHTML}</div>` : ""}

        <div class="day-slide">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Mystical Wisdom</h3>
            <div class="mystical-suggestion-block">
                <img src="/assets/images/decor/mystical-sparkle.png" alt="Mystical Sparkle" class="divider" />
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

// Clear all day-cell decorations so we can rebuild from prefs
function _clearMonthDecorations(container) {
  const cells = container.querySelectorAll(".calendar-grid td");
  cells.forEach(cell => {
    cell.classList.remove(
      "eclipse-day",
      "full-moon-day",
      "festival-day",
      "national-holiday",
      "custom-event-day",
      "highlight-today"
    );
    cell.removeAttribute("title");
    cell.removeAttribute("data-event-id");
  });
}

// If the month modal is open, rebuild decorations with current prefs
function _refreshMonthGridIfOpen(prefs) {
  const modal = document.getElementById("modal-container");
  if (!modal || !modal.classList.contains("show") || !lastOpenedMonth) return;
  _clearMonthDecorations(modal);
  // reuse the month that is open and apply the new prefs
  enhanceCalendarTable(modal, lastOpenedMonth, prefs);
}

export function applyMysticalSettings(prefs) {
  // 1) Toggle legend rows via a small map (DRY)
  const legendMap = [
    { key: "showHolidays",     selector: ".national-holiday-row" },
    { key: "showCustomEvents", selector: ".custom-event-day-row" },
    { key: "showMoons",        selector: ".full-moon-day-row" },
    { key: "showEclipses",     selector: ".eclipse-day-row" },
    // optional: only if you add a specific legend row for past events
    { key: "showPastEvents",   selector: ".past-events-row" }
  ];

  legendMap.forEach(({ key, selector }) => {
    document.querySelectorAll(selector).forEach(row => {
      row.classList.toggle("legend-row-hidden", !prefs[key]);
    });
  });

  // 2) Mystical suggestions block uses the shared mysticalMessages list
  const mysticalArea = document.getElementById("mystical-insight");
  if (mysticalArea) {
    const heading = mysticalArea.querySelector("h3");
    const message = mysticalArea.querySelector("span");
    const showMystical = !!prefs.mysticalSuggestions;

    if (showMystical) {
      const msg = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)] || "";
      if (heading) heading.classList.remove("hidden");
      if (message) {
        message.textContent = msg;
        message.classList.remove("hidden");
      }
      mysticalArea.classList.remove("hidden");
    } else {
      if (heading) heading.classList.add("hidden");
      if (message) {
        message.textContent = "";
        message.classList.add("hidden");
      }
      mysticalArea.classList.add("hidden");
    }
  }

  // 3) If the month modal is open, rebuild the grid markers so prefs take effect immediately
  _refreshMonthGridIfOpen(prefs);
}
