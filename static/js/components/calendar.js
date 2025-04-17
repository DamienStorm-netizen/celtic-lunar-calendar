import { getMysticalPrefs } from "./settings.js";
import { saveCustomEvents } from "../utils/localStorage.js";
import { mysticalMessages } from "../constants/mysticalMessages.js";

let cachedNationalHolidays = []; // Store national holidays globally
let cachedFestivals = {}; // Store festivals globally
let lastOpenedMonth = null; // Keep track of the last opened month modal
let customEvents = []; // Initialize an empty array for storing custom events

export function renderCalendar() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="calendar" class="fade-in">
        <div id="modal-overlay" class="modal-overlay hidden"></div>

            <h1 class="calendar-title">Calendar</h1>
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
                <button id="close-modal" class="mystical-close">✦</button>
                <!-- <button class="day-carousel-prev"><img src="static/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button> -->
                <div id="modal-details"></div>
                <!-- <button class="day-carousel-next"><img src="static/assets/images/decor/moon-crescent-next.png" alt="Next" /></button> -->
            </div>
        </div>
    `;

    console.log("✅ Running setupCalendarEvents...");
    setupCalendarEvents();  // Ensure this runs after injecting HTML

}

async function setupCalendarEvents() {
    console.log("I am running setupCalendarEvents");

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

    // Attach event listeners to each month thumbnail
    const thumbnails = document.querySelectorAll(".month-thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            const monthName = e.target.closest(".month-thumbnail").dataset.month;
            console.log(`CLICK! for: ${monthName}`);

            // **Fetch Celtic Zodiac only when a month is clicked**
            getCelticZodiac(monthName);

            // Open the modal with the selected month
            showModal(monthName);
        });
    });
}

 // Close modal
 function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");

    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }    

    // Show the modal overlay
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("modal-overlay").classList.remove("show");
}

// Add click events to HTML table
async function enhanceCalendarTable(modalContainer, monthName) {
    console.log(`Enhancing calendar for ${monthName}...`);

    // Convert monthName to a zero-padded monthIndex
    const monthNames = ["Nivis", "Janus", "Flora", "Maia", "Solis", "Terra", "Lugh", "Pomona", "Brigid", "Autumna", "Eira", "Aether"];
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
    console.log("Fetch moon graphic", lunarData.graphic);

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
            const formattedGregorianDate = `2025-${String(gregorian.gregorianMonth).padStart(2, "0")}-${String(gregorian.gregorianDay).padStart(2, "0")}`;
  
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
            if (moonEvent && moonEvent.phase === "Full Moon") {
                console.log(`Corrected: Marking ${day} (Celtic) = ${formattedGregorianDate} (Gregorian) as Full Moon (${moonEvent.moonName})`);
                cell.classList.add("full-moon-day");
                cell.setAttribute("title", `${moonEvent.moonName} 🌕`);
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
            const matchingEvents = customEvents.filter(event => {
                const eventDate = event.date; // This is in 'YYYY-MM-DD' format
                console.log(`Checking custom event: ${event.title} on ${eventDate}`);

                return eventDate === formattedGregorianDate; // Match Gregorian date format
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
  
  // Fetch lunar phases dynamically for a given month
  async function fetchMoonPhases(monthName) {
    console.log("Fetching moon phases for month:", monthName);
    try {
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
            "Aether": { start: "2025-11-24", end: "2025-12-21" },
        };
  
        if (!celticMonthMapping[monthName]) {
            console.error("Invalid month name:", monthName);
            return [];
        }
  
        const { start, end } = celticMonthMapping[monthName];
  
        const response = await fetch(`/dynamic-moon-phases?start_date=${start}&end_date=${end}`);
        if (!response.ok) throw new Error("Failed to fetch moon phases");
  
        const moonData = await response.json();
        console.log("Moon phases retrieved:", moonData);
        return moonData;
    } catch (error) {
        console.error("Error fetching moon phases:", error);
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
                modalDetails.innerHTML = `
                    <h2 class="month-title">${monthName}</h2>
                    <div class="mirabilis-image">
                        <img src="static/assets/images/decor/mirabilis-modal.png" alt="Mirabilis" />
                    </div>
                    <div class="mirabilis-content">
                        <p>Between the last grain of sand and the first light of dawn, Mirabilis shimmers—a moment untethered, a breath between worlds.</p>
                        <p>Neither past nor future, neither here nor there, it is the space where dreams are whispered and destinies rewritten.</p> 
                        <p>Pause, reflect, release. For in this fleeting eternity, you are free to reshape the stars.<p>
                        <br />
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
                    <button id="tab-legend" class="calendar-tab-button" style="margin: 0 15px 0 5px">Legend</button>
                    <button id="tab-add" class="calendar-tab-button">Add Your Event</button>
                    </div>

                    <!-- 🌿 Calendar View -->
                    <div id="tab-content-calendar" class="calendar-tab-content active">
                    <div class="calendarGridBox">
                        <table class="calendar-grid">
                        <thead>
                            <tr>
                            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
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
                        <h3 class="goldenTitle">Legend</h3>
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
                    <h3 class="goldenTitle">Add Your Event</h3>
                    <form id="add-event-form">
                        <ul>
                        <li><label for="event-name">Event Name</label>
                            <input type="text" id="event-name" required /></li>
                        <li><label for="event-type">Type of Event</label>
                            <select id="event-type" name="event-type">
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Fun">🎉 Fun</option>
                                <option value="💡 General" active>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></li>
                        <li><label for="event-note">Event Description</label>
                            <textarea id="event-note" rows="1" cols="35"></textarea></li>
                        <li><label for="event-date">Date</label>
                            <input type="date" id="event-date" required /></li>
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

            // Apply fade-in effect
            modalContainer.classList.add("fade-in");
            modalContainer.classList.remove("fade-out");

            // ✅ Call enhancement only when the modal is displayed
            enhanceCalendarTable(modalContainer, monthName);

            document.getElementById("add-event-form").addEventListener("submit", (e) => {
                e.preventDefault();
              
                // 🌟 Save the event here...
              
                // Switch to Calendar tab
                document.getElementById("tab-calendar").click();
              });
        }
    }
}

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

// Convert Celtic date to Gregorian date.
function convertCelticToGregorian(celticMonth, celticDay) {
    const monthMapping = {
        "Nivis": "2024-12-23",
        "Janus": "2025-01-20",
        "Brigid": "2025-02-17",
        "Flora": "2025-03-17",
        "Maia": "2025-04-14",
        "Juno": "2025-05-12",
        "Solis": "2025-06-09",
        "Terra": "2025-07-07",
        "Lugh": "2025-08-04",
        "Pomona": "2025-09-01",
        "Autumna": "2025-09-29",
        "Eira": "2025-10-27",
        "Aether": "2025-11-24"
    };

    const startDateStr = monthMapping[celticMonth];
    if (!startDateStr) {
        console.error("Invalid Celtic month:", celticMonth);
        return null;
    }

    // Create a UTC date instead of a local date
    const startDate = new Date(startDateStr + "T00:00:00Z"); 
    const gregorianDate = new Date(startDate.getTime() + (celticDay - 1) * 24 * 60 * 60 * 1000);

    return {
        gregorianMonth: ("0" + (gregorianDate.getUTCMonth() + 1)).slice(-2),  // Ensure UTC month
        gregorianDay: ("0" + gregorianDate.getUTCDate()).slice(-2)  // Ensure UTC day
    };
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

// Function to fetch and display the details for a selected Celtic date
async function showDayModal(celticDay, celticMonth, formattedGregorianDate) {

     // ✅ Ensure modalContainer is defined first!
    const modalContainer = document.getElementById("modal-container");
    const modalDetails = document.getElementById("modal-details");

    if (!modalContainer || !modalDetails) {
        console.error("🚨 Modal elements not found, aborting.");
        return;
    }

    console.log("🚨 Removing hidden class from modal-container");


    // Convert date format for lookup
    const formattedFestivalKey = `${celticMonth} ${celticDay}`;
  
    // Show loading state while fetching data
    modalDetails.innerHTML = `
        <h2>Celtic Calendar</h2>
        <p>Loading...</p>
    `;
  
    // Display the modal
    modalContainer.classList.remove("hidden");
  
    // Convert the Celtic date to Gregorian
    const gregorian = convertCelticToGregorian(celticMonth, celticDay);
    if (!gregorian) {
        modalDetails.innerHTML = "<p>Error: Invalid date conversion.</p>";
        return;
    }

    const formattedDay = gregorian.gregorianDay.toString().padStart(2, "0");
    const formattedMonth = gregorian.gregorianMonth.toString().padStart(2, "0");

    const zodiac = getCelticZodiac(parseInt(gregorian.gregorianMonth, 10), parseInt(gregorian.gregorianDay, 10));

     // Get additional data
    const dayOfWeek = getDayOfWeek(gregorian.gregorianMonth, gregorian.gregorianDay);
    //const zodiac = getCelticZodiac(celticMonth, celticDay);
    let events = await getCustomEvents(gregorian.gregorianMonth, gregorian.gregorianDay);

    // Ensure events is always an array
    if (!Array.isArray(events)) {
        events = [];  // Convert it into an empty array if it's a string or undefined
    }

    // Apply display preferences to Mystical Preferences
    const prefs = getMysticalPrefs();
  
    // Construct an ISO date string
    const year = "2025";
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
  
        // Format the Gregorian month
        const gMonth = getFormattedMonth(monthStr);
        

        // Get alternative lunar descriptions
        const moonPoem = getMoonPoem(lunarData.phase, dateStr);

        // Ensure national holidays are available
        if (cachedNationalHolidays.length === 0) {
            await fetchNationalHolidays(); // Fetch if not already cached
        }
        console.log("Fetched National Holidays:", cachedNationalHolidays);        

        // Find eclipses for this date
        const eclipses = await fetchEclipseEvents();
        const eclipseEvent = eclipses.find(e => {
            const eventDate = e.date.split(" ")[0];  // Extract only YYYY-MM-DD
            console.log(`🔍 Checking Eclipse Date: ${eventDate} vs ${formattedGregorianDate}`);
            return eventDate === formattedGregorianDate;
        });

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
        .map(h => `<p><strong>${h.title}</strong> ${h.notes}</p>`)
        .join("") || "No national holidays today.";

        let festivalHTML = festivalEvent
            ? `<img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="subheader">Festivals</h3>
            <p><span class="festival-title">${festivalEvent.name}</span></p>
            <p class="festival-note">${festivalEvent.description}</p>`
            : "";

        console.log("Festival Data Retrieved:", festivalHTML); // Debugging Log

        let holidayHTML = holidayInfo && holidayInfo.trim() !== "" && holidayInfo !== "No national holidays today."
            ? `<img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="subheader">Holidays</h3><p>${holidayInfo}</p>` 
            : "";

        let eclipseHTML = eclipseEvent 
            ? `<div class="eclipse-block">
                <img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="subheader">Eclipse</h3>
                <p><strong>${eclipseEvent.title}</strong></p>
                <p>${eclipseEvent.description}</p>
            </div>`
            : "";

        let eventsHTML = Array.isArray(events) && events.length > 0
            ? `<img src='static/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="subheader">Special Events</h3>
                ${events.map(event => `
                    <p><span class="event-title">${event.title}</span><br />
                    <span class="event-note">${event.notes || 'No additional details.'}</span><br />
                    <span class="event-type">${event.type}</span></p>
                `).join('')}`
            : "";

        // Update modal with lunar details
        modalDetails.innerHTML = `
            <div class="day-carousel-wrapper">
                <button class="day-carousel-prev"><img src="static/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button>


                <div class="day-carousel">
                    <div class="day-carousel">
                        ${generateDaySlides({ lunarData, festivalHTML, holidayHTML, eclipseHTML, eventsHTML })}
                    </div>
                </div>

               <button class="day-carousel-next"><img src="static/assets/images/decor/moon-crescent-next.png" alt="Next" /></button>
                </div>
                <br />
                <button id="back-to-month" class="back-button">Back to ${celticMonth}</button>
            </div>
        `;

        // The Celestial Day Carousel
        // ✨ Activate the Celestial Carousel
        let currentSlide = 0;
        const carousel = document.querySelector('.day-carousel');
        const slides = document.querySelectorAll('.day-slide');

        document.querySelector('.day-carousel-prev').addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
        });

        document.querySelector('.day-carousel-next').addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateCarousel();
        }
        });

        function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }

        // Apply display preferences to Mystical Preferences
        applyMysticalSettings(prefs);
  
        // Add event listener for the "Back" button
        document.getElementById("back-to-month").addEventListener("click", () => {
            modalContainer.classList.add("month-mode");
            showModal(celticMonth);
        });
  
    } catch (error) {
        console.error("Error fetching lunar phase:", error);
        modalDetails.innerHTML = `<p>Failed to load moon phase data.</p>`;
    }

    console.log("Final Gregorian Date:", dateStr);
}

function generateDaySlides({ lunarData, festivalHTML, holidayHTML, eclipseHTML, eventsHTML }) {


    const randomMystical = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];

    const mysticalSlide = `
    <div class="day-slide">
        <h3 class="goldenTitle">Mystical Suggestions</h3>
        <div class="mystical-suggestion-block">
        <p class="mystical-message">${randomMystical}</p>
        <img src="static/assets/images/decor/moon-sparkle.png" alt="Mystical Sparkle" class="divider" />
        </div>
    </div>
    `;

    const moonDescription = lunarData.description && lunarData.description !== "No description available."
        ? lunarData.description
        : "The moon stirs in silence tonight, her secrets cloaked.";

        return `
        <div class="day-slide">
            <h3 class="goldenTitle">Lunar Phase</h3>
            <div class="moon-phase-graphic moon-centered">
                ${lunarData.graphic}
            </div>
            <p class="moon-phase-name">${lunarData.moonName || lunarData.phase || "Unnamed Phase"}</p>
            <p class="moon-description">${moonDescription}</p>
        </div>
      
        ${festivalHTML ? `<div class="day-slide">${festivalHTML}</div>` : ""}
        ${holidayHTML ? `<div class="day-slide">${holidayHTML}</div>` : ""}
        ${eclipseHTML ? `<div class="day-slide">${eclipseHTML}</div>` : ""}
        ${eventsHTML ? `<div class="day-slide">${eventsHTML}</div>` : ""}
        ${mysticalSlide}
      `;
}

function getFormattedMonth(monthNum) {
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return monthNames[parseInt(monthNum, 10) - 1]; // Convert to zero-based index
}

function getDayOfWeek(gregorianMonth, gregorianDay) {
    const date = new Date(`2025-${gregorianMonth}-${gregorianDay}`);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[date.getDay()];
}

// Get Celtic Zodiac sign
function getCelticZodiac(gregorianMonth, gregorianDay) {
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
        const startMonth = sign.start.month;
        const startDay = sign.start.day;
        const endMonth = sign.end.month;
        const endDay = sign.end.day;
  
        console.log(`Checking ${sign.name}: ${startMonth}/${startDay} - ${endMonth}/${endDay}`);
  
        // Zodiac range handling with numeric comparison
        if (
            (monthNum === startMonth && dayNum >= startDay) || 
            (monthNum === endMonth && dayNum <= endDay) || 
            (monthNum > startMonth && monthNum < endMonth) || 
            (startMonth > endMonth && (monthNum > startMonth || monthNum < endMonth))
        ) {
            console.log(`🎉 Match Found! Zodiac: ${sign.name}`);
            return sign.name;
        }
    }
  
    console.log("❌ No zodiac match found, returning 'Unknown'");
    return "Unknown";
}

async function getCustomEvents(gregorianMonth, gregorianDay) {
    console.log("Fetching custom events...");
    try {
        const response = await fetch("/api/custom-events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const events = await response.json();

        const monthStr = String(gregorianMonth).padStart(2, "0");
        const dayStr = String(gregorianDay).padStart(2, "0");

        const targetDate = `2025-${monthStr}-${dayStr}`;

        // ✅ Return full event objects instead of just titles
        return events.filter(event => event.date === targetDate);

    } catch (error) {
        console.error("Error fetching events:", error);
        return [];  // ✅ Ensure we return an empty array on error
    }
}

export function applyMysticalSettings(prefs) {

    // 🌒 Toggle Eclipses
    const eclipseRows = document.querySelectorAll(".eclipse-day-row");
    eclipseRows.forEach(row => {
        row.classList.toggle("legend-row-hidden", !prefs.showEclipses);
    });

    // 🌕 Toggle Full Moons
    const moonRows = document.querySelectorAll(".full-moon-day-row");
    moonRows.forEach(row => {
        row.classList.toggle("legend-row-hidden", !prefs.showMoons);
    });

    const moonCells = document.querySelectorAll(".full-moon-day");
    moonCells.forEach(cell => {
        if (prefs.showMoons) {
            cell.classList.add("full-moon-day");
        } else {
            cell.classList.remove("full-moon-day");
        }
    });

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

    const eclipseBlock = document.querySelector(".eclipse-block");
    if (eclipseBlock) {
        eclipseBlock.style.display = prefs.showEclipses ? "block" : "none";
    }

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

async function loadCustomEvents() {
    try {
        // 🔥 Change API Endpoint to /custom-events
        const response = await fetch("/api/custom-events"); 
        if (!response.ok) {
            throw new Error("Failed to fetch custom events.");
        }

        const data = await response.json();

        // 🔥 Debugging Step: Log the raw API response
        console.log("🛠 Raw API Response:", data);
        
        // ✅ Store events in the correct format
        if (Array.isArray(data)) {
            customEvents = data;
        } else {
            console.warn("Unexpected response format for custom events.");
            customEvents = [];
        }

        console.log("✅ Custom Events Loaded:", customEvents);
    } catch (error) {
        console.error("Error loading custom events:", error);
    }
}
// Call the function on page load
loadCustomEvents();

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

// Celestial Day carousel magic


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