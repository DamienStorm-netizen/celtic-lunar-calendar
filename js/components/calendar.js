let cachedNationalHolidays = []; // Store national holidays globally

export function renderCalendar() {
    const app = document.getElementById('app');
    return `
        <section class="calendar">
            <h1 class="calendar-title">Calendar</h1>
            <div class="calendar-grid">
                <div class="month-thumbnail" id="nivis" data-month="Nivis">
                    <img src="assets/images/months/nivis-thumbnail.png" alt="Nivis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="janus" data-month="Janus">
                    <img src="assets/images/months/janus-thumbnail.png" alt="Janus Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="brigid" data-month="Brigid">
                    <img src="assets/images/months/brigid-thumbnail.png" alt="Brigid Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Flora" data-month="Flora">
                    <img src="assets/images/months/flora-thumbnail.png" alt="Flora Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Maia" data-month="Maia">
                    <img src="assets/images/months/maia-thumbnail.png" alt="Maia Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Juno" data-month="Juno">
                    <img src="assets/images/months/juno-thumbnail.png" alt="Juno Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Solis" data-month="Solis">
                    <img src="assets/images/months/solis-thumbnail.png" alt="Solis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Terra" data-month="Terra">
                    <img src="assets/images/months/terra-thumbnail.png" alt="Terra Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Lugh" data-month="Lugh">
                    <img src="assets/images/months/lugh-thumbnail.png" alt="Lugh Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Pomona" data-month="Pomona">
                    <img src="assets/images/months/pomona-thumbnail.png" alt="Pomona Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Autumna" data-month="Autumna">
                    <img src="assets/images/months/autumna-thumbnail.png" alt="Autumna Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Eira" data-month="Eira">
                    <img src="assets/images/months/eira-thumbnail.png" alt="Eira Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Aether" data-month="Aether">
                    <img src="assets/images/months/Aether-thumbnail.png" alt="Aether Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Mirabilis" data-month="Mirabilis">
                    <img src="assets/images/months/mirabilis-thumbnail.png" alt="Mirabilis Thumbnail">
                </div>
            </div>
        </section>

        <div id="modal-container" class="calendar-modal">
            <div id="modal-content">
                <button id="close-modal" class="mystical-close">✦</button>
                <div id="modal-details"></div>
            </div>
        </div>
    `;

    // Enhance the table with Celtic date logic
    enhanceCalendarTable(modalContainer, monthName);

}

export async function setupCalendarEvents() {
    // Select the modal elements
    const modalContainer = document.getElementById("modal-container");
    const modalClose = modalContainer.querySelector("#close-modal"); // Updated for your close button
    const modalContent = modalContainer.querySelector("#modal-content"); // Updated for your modal content

    // Ensure modal elements exist before attaching listeners
    if (!modalContainer || !modalContent || !modalClose) {
        console.error("Modal elements not found. Check IDs and structure.");
        return;
    }

    // Month data for the modals
    const monthsData = {
        "Nivis": "Nivis, the snow-covered month of tranquillity and reflection.",
        "Janus": "Janus, a time of winds and change, guided by the past and future.",
        "Brigid": "Brigid, the fiery flame of rebirth and creativity.",
        "Flora": "Flora, where blossoms awaken and life blooms anew in soft pastels.",
        "Maia": "Maia, the gentle caress of spring, whispering of love and growth.",
        "Juno": "Juno, radiant and vibrant, bathed in the scarlet hues of passion.",
        "Solis": "Solis, where the sun reigns supreme, a golden embrace of vitality.",
        "Terra": "Terra, the abundant earth, rich with the green promise of harvest.",
        "Lugh": "Lugh, a time of radiant light and craftsmanship, honouring ancient skills.",
        "Pomona": "Pomona, the fruitful season, where the orchards gift their sweetest treasures.",
        "Autumna": "Autumna, the fiery dance of falling leaves, a farewell to warmth and light.",
        "Eira": "Eira, the frost-kissed month of quiet, as the world prepares for slumber.",
        "Aether": "Aether, the ethereal veil between seasons, where dreams and reality entwine."
    };
    
    // Attach event listener to the close button
    document.getElementById("close-modal").addEventListener("click", closeModal);


     
    // Attach event listeners to each month thumbnail
    const thumbnails = document.querySelectorAll(".month-thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            const monthName = e.target.closest(".month-thumbnail").dataset.month;
            console.log("CLICK! for:", monthName);
            showModal(monthName); // Call showModal to handle modal content
        });
    });
}


// Add click events to HTML table
export async function enhanceCalendarTable(modalContainer, monthName) {
    console.log(`Enhancing calendar for ${monthName}...`);

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

    // Fetch national holidays **before using them**
    if (!cachedNationalHolidays || cachedNationalHolidays.length === 0) {
        console.log("Fetching national holidays...");
        cachedNationalHolidays = await fetchNationalHolidays();
    }

    // Fetch lunar phases, festivals and national holidays
    const lunarData = await fetchMoonPhases(monthName);

    // Fetch custom events
    const customEvents = await fetchCustomEvents();
    console.log("Custom events retrieved:", customEvents);
    
    // 🔥 Celtic Festivals Mapping
    const festivalDays = {
        "Janus": [15], // Imbolc
        "Flora": [4], // Ostara
        "Maia": [19], // Beltaine
        "Solis": [14], // Litha
        "Terra": [27], // Lammas
        "Lugh": [19], // Mabon
        "Eira": [6], // Samhain
        "Aether": [28] // Yule
    };
  
    tableCells.forEach((cell) => {
        const day = parseInt(cell.textContent, 10);
        if (!isNaN(day)) {
            // Convert the Celtic day back to Gregorian
            const gregorian = convertCelticToGregorian(monthName, day);
            if (!gregorian) {
                console.error(`Failed to convert ${monthName} ${day} to Gregorian.`);
                return;
            }
            const formattedGregorianDate = `2025-${String(gregorian.gregorianMonth).padStart(2, "0")}-${String(gregorian.gregorianDay).padStart(2, "0")}`;
  
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

             // 🔥 Mark Festival Days
            if (festivalDays[monthName]?.includes(day)) {
                console.log(`Marking ${monthName} ${day} as Festival Day.`);
                cell.classList.add("festival-day");
                cell.setAttribute("title", "Celtic Festival 🔥");
            } else {
                console.log('Festival not found');
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
                showDayModal(day, monthName, formattedGregorianDate); // Pass formattedGregorianDate
            });
        }
    });

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
  export async function fetchCustomEvents() {
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
 export async function fetchNationalHolidays() {
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
 export function showModal(monthName) {

    console.log("I clicked on ", monthName);

    if (monthName) {
        const modalContainer = document.getElementById("modal-container");
        const modalDetails = modalContainer.querySelector("#modal-details");


        // Insert modal content, including the calendar grid
        if (modalDetails) {

            modalContainer.classList.add("show");
            document.body.classList.add("modal-open"); // Prevent scrolling

            if (monthName == 'Mirabilis') {
                modalDetails.innerHTML = `
                    <h2 class="month-title">${monthName}</h2>
                    <div class="mirabilis-image">
                        <img src="assets/images/decor/mirabilis-modal.png" alt="Mirabilis" />
                    </div>
                    <div class="mirabilis-content">
                        <p>Between the last grain of sand and the first light of dawn, Mirabilis shimmers—a moment untethered, a breath between worlds.</p>
                        <p>Neither past nor future, neither here nor there, It is the space where dreams are whispered and destinies rewritten.</p> 
                        <p>Pause, reflect, release. For in this fleeting eternity, you are free to reshape the stars.<p>
                        <br />
                    </div>
                `;
            } else {
                modalDetails.innerHTML = `
                    <h2 class="month-title">${monthName}</h2>
                    
                    <div class="calendarGridBox">
                    <table class="calendar-grid"><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr><tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr><tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr></tbody></table>
                    </div>
        
                    <div class="calendarLegend" style="background-image: url(assets/images/months/${monthName.toLowerCase()}-pale-bg.png)">
                        <h2 class="inner-title">Legend</h2>
                        <table class="calendarLegendGrid">
                            <tr>
                                <td class="festival-day legendBox">&nbsp;</td><td>Festival Day (ie. Beltaine)</td>
                            </tr>
                            <tr>
                                <td class="full-moon-day legendBox">&nbsp;</td><td>Full Moon Day (ie. Wolf Moon)</td>
                            </tr>
                            <tr>
                                <td class="custom-holiday-day legendBox">&nbsp;</td><td>National Holidays (ie. New Year's Eve)</td>
                            </tr>
                            <tr>
                                <td class="custom-event-day legendBox">&nbsp;</td><td>Custom Event (ie. Your Birthday!)</td>
                            </tr>
                        <table>
                    </div>
                `;
            }
        }
        
  
        // Enhance the existing table with click and highlight behaviour
        enhanceCalendarTable(modalContainer, monthName);

        // Apply fade-in effect
        modalContainer.classList.remove("hidden");
        modalContainer.classList.add("fade-in");

        // Remove fade-out class if present
        modalContainer.addEventListener("animationend", () => {
            modalContainer.classList.remove("fade-out");
        });

        //modalContainer.classList.remove("hidden");
    }
}

// Close modal
export function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");
    
    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }
        
}

// Convert Celtic date to Gregorian date.
export function convertCelticToGregorian(celticMonth, celticDay) {
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
    

export async function getCelticDate() {
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
export async function showDayModal(celticDay, celticMonth, formattedGregorianDate) {
    const modalContainer = document.getElementById("modal-container");
    const modalDetails = document.getElementById("modal-details");

    // Festival descriptions
    const festivalDescriptions = {
        "Janus 15": "<strong>Imbolc</strong><br />A festival of light and renewal, honoring Brigid, goddess of poetry and hearth fire.",
        "Flora 4": "<strong>Ostara</strong><br />The balance of light and dark, celebrating new beginnings.",
        "Maia 19": "<strong>Beltaine</strong><br />The fire festival of passion and fertility, where the veil between worlds is thin.",
        "Solis 14": "<strong>Litha</strong><br />The longest day of the year, honoring the Sun’s peak.",
        "Terra 27": "<strong>Lammas</strong><br />A festival of the harvest, honoring the god Lugh and the first fruits of the land.",
        "Lugh 19": "<strong>Mabon</strong><br />A time of balance and gratitude as the harvest ends.",
        "Eira 6": "<strong>Samhain</strong><br />The gateway to winter, the festival of ancestors, spirits, and shadowy magic.",
        "Aether 28": "<strong>Yule</strong><br />The winter solstice is a time to celebrate the return of the light and the rebirth of the sun."
    };

    // Convert date format for lookup
    const formattedFestivalKey = `${celticMonth} ${celticDay}`;
    const festivalInfo = festivalDescriptions[formattedFestivalKey] || "";

    // Show loading state while fetching data
    modalDetails.innerHTML = `<h2>Celtic Calendar</h2><p>Loading...</p>`;

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
    const dayOfWeek = getDayOfWeek(gregorian.gregorianMonth, gregorian.gregorianDay);
    const events = await getCustomEvents(gregorian.gregorianMonth, gregorian.gregorianDay);
    const mysticalSuggestion = getMysticalSuggestion();

    // Construct an ISO date string
    const year = "2025";
    const monthStr = String(gregorian.gregorianMonth).padStart(2, "0");
    const dayStr = String(gregorian.gregorianDay).padStart(2, "0");
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    try {
        const response = await fetch(`/dynamic-moon-phases?start_date=${dateStr}&end_date=${dateStr}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        if (!data || data.length === 0) throw new Error("Invalid lunar data received");

        const lunarData = data[0];
        const gMonth = getFormattedMonth(monthStr);
        const moonPoem = getMoonPoem(lunarData.phase, dateStr);

        if (cachedNationalHolidays.length === 0) {
            await fetchNationalHolidays();
        }

        console.log("Fetched National Holidays:", cachedNationalHolidays);
        const holidayInfo = cachedNationalHolidays
            .filter(h => h.date === dateStr)
            .map(h => `<p><strong>${h.title}</strong> ${h.notes}</p>`)
            .join("") || "";

        let modalContent = `
            <div style="text-align: center; padding-top: 10px; color: white">
                <h2 class="detailsDay">${dayOfWeek}</h2>
                <h2 class="detailsCelticDate">${celticMonth} ${celticDay}</h2>
                <h3 class="detailsGregorianDate">${gMonth} ${dayStr}</h3>
                <div class="moon-phase-graphic">${lunarData.graphic}</div>
                <h3 class="detailsMoonPhase">${moonPoem.moonName || lunarData.phase}</h3>
                <p class="detailsMoonDescription">${moonPoem.poem}</p>
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="subheader">Celtic Zodiac</h3>
                <div class="detailsCelticZodiac">
                    <img src="assets/images/zodiac/zodiac-${zodiac.toLowerCase()}.png" alt="${zodiac}" 
                    onerror="this.src='assets/images/decor/treeoflife.png';" />
                    <p>${zodiac}</p>
                </div>
        `;

        // ✅ Only display Festivals if there is an event
        if (festivalInfo.trim() !== "") {
            modalContent += `
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="subheader">Festivals</h3>
                <p>${festivalInfo}</p>
            `;
        }

        // ✅ Only display Special Events if there is an event
        if (events.trim() !== "<p>There are no custom events today.</p>") {
            modalContent += `
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="subheader">Special Events</h3>
                <p class="detailsCustomEvents">${events}</p>
            `;
        }

        // ✅ Only display Holidays if there is an event
        if (holidayInfo.trim() !== "") {
            modalContent += `
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="subheader">Holidays</h3>
                <p class="detailsNationalHolidays">${holidayInfo}</p>
            `;
        }

        modalContent += `
            <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
            <h3 class="subheader">Mystical Suggestions</h3>
            <p>${mysticalSuggestion}</p>
            <button id="back-to-month" class="back-button">Back to ${celticMonth}</button>
        </div>
        `;

        // ✅ Inject the cleaned-up content into the modal
        modalDetails.innerHTML = modalContent;

        // Add event listener for the "Back" button
        document.getElementById("back-to-month").addEventListener("click", () => {
            showModal(celticMonth);
        });

    } catch (error) {
        console.error("Error fetching lunar phase:", error);
        modalDetails.innerHTML = `<p>Failed to load moon phase data.</p>`;
    }

    console.log("Final Gregorian Date:", dateStr);
}

export function getFormattedMonth(monthNum) {
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return monthNames[parseInt(monthNum, 10) - 1]; // Convert to zero-based index
}

export function getDayOfWeek(gregorianMonth, gregorianDay) {
    const date = new Date(`2025-${gregorianMonth}-${gregorianDay}`);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[date.getDay()];
}

// Get Celtic Zodiac sign
export function getCelticZodiac(gregorianMonth, gregorianDay) {
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

export async function getCustomEvents(gregorianMonth, gregorianDay) {
    try {
        const response = await fetch("/api/custom-events");
        if (!response.ok) throw new Error("Failed to fetch events");

        const events = await response.json();

        // Convert numbers to strings and ensure two-digit format
        const monthStr = String(gregorianMonth).padStart(2, "0");
        const dayStr = String(gregorianDay).padStart(2, "0");

        const targetDate = `2025-${monthStr}-${dayStr}`;

        const filteredEvents = events.filter(event => event.date === targetDate);


        return filteredEvents.length > 0 
            ? filteredEvents.map(e => `<p>${e.title}: ${e.notes}</p>`).join("") 
            : "<p>There are no custom events today.</p>";

    } catch (error) {
        console.error("Error fetching events:", error);
        return "Unable to load events.";
    }
}

export function getMysticalSuggestion() {
    const suggestions = [
        "Light a candle and focus on your intentions for the day.",
        "Meditate under the moonlight and visualize your dreams.",
        "Draw a rune and interpret its meaning for guidance.",
        "Write a letter to your future self and store it safely.",
        "Collect a small item from nature and set an intention with it."
    ];

    return suggestions[Math.floor(Math.random() * suggestions.length)];
}

export function getMoonPoem(moonPhase, date) {
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