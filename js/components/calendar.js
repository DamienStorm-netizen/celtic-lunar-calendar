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
            </div>
        </section>

        <div id="modal-container" class="hidden">
            
            <div id="modal-content">
                <div class="topBar">
                    <span id="modal-close" class="close-btn"> 
                        <img src="assets/images/decor/close-btn.png" alt="Close Modal" />
                    </span>
                </div>
                <div id="modal-details">
                    <!-- Display dynamic Cedltic months -->
                </div>
                <!-- <div class="bottomBar">
                    <h3 id="celtic-zodiac-title">Celtic Zodiac</h3>
                    <p id="celtic-zodiac-info">Birch / Rowan</p>
                </div> -->
            </div>
        </div>
    `;

    // Enhance the table with Celtic date logic
    enhanceCalendarTable(modalContainer, monthName);

}

export async function setupCalendarEvents() {
    // Select the modal elements
    const modalContainer = document.getElementById("modal-container");
    const modalClose = modalContainer.querySelector("#modal-close"); // Updated for your close button
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
    document.getElementById("modal-close").addEventListener("click", closeModal);


     
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
    const todayCeltic = await getCelticDate(); // Fetch today's Celtic date
    if (!todayCeltic) {
        console.error("Could not fetch Celtic date. Highlight skipped.");
        return;
    }
  
    const { celticMonth, celticDay } = todayCeltic;
    const tableCells = modalContainer.querySelectorAll(".calendar-grid td");
  
    tableCells.forEach((cell) => {
        const day = parseInt(cell.textContent, 10); // Get the day number from the cell
        if (!isNaN(day)) {
            // Highlight today's Celtic date if it matches the current month and day
            if (monthName === celticMonth && day === celticDay) {
                cell.classList.add("highlight-today");
            }
  
            // Assign click behaviour to each date cell
            cell.addEventListener("click", () => {
                console.log(`Clicked on day ${day} in the month of ${monthName}`);
                // Add custom logic here for the clicked date
                showDayModal(day, monthName); // Launch the modal for the selected day
            });
        }
    });
}


 // Open modal window and insert HTML
 export function showModal(monthName) {
    if (monthName) {
        const modalContainer = document.getElementById("modal-container");
        const modalDetails = modalContainer.querySelector("#modal-details");

        // Insert modal content, including the calendar grid
        if (modalDetails) {
            modalDetails.innerHTML = `
                <h2 class="month-title">${monthName}</h2>
                
                <div class="calendarGridBox">
                <table class="calendar-grid"><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr><tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr><tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr></tbody></table>
                </div>
                <div class="feature-image">
                    <img src="assets/images/months/${monthName.toLowerCase()}-bg.png" alt="${monthName}" />
                </div>
            `;
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

        modalContainer.classList.remove("hidden");
    }
}

// Close modal
export function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");
    
    // Remove 'fade-in' class before adding 'fade-out'
    modalContainer.classList.remove("fade-in");
    modalContainer.classList.add("fade-out");

    // Add animationend listener to handle hiding the modal
    const onAnimationEnd = () => {
        modalContainer.classList.add("hidden");
        modalContainer.classList.remove("fade-out");
        
        // Clean up listener
        modalContainer.removeEventListener("animationend", onAnimationEnd);
    };

    modalContainer.addEventListener("animationend", onAnimationEnd);
}

// Convert Celtic date to Grgorian date.
export function convertCelticToGregorian(celticMonth, celticDay) {

    console.log("Celtic month is:", celticMonth);
    // Define your Celtic-to-Gregorian mapping based on calendar_data.json
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
    const startDate = new Date(startDateStr);
    // Subtract one because Celtic day 1 corresponds to the start date.
    const gregorianDate = new Date(startDate.getTime() + (celticDay) * 24 * 60 * 60 * 1000);
    
    const gregorianMonth = ("0" + (gregorianDate.getMonth() + 1)).slice(-2); // Month in MM format
    const gregorianDay = gregorianDate.getDate();
    return { gregorianMonth, gregorianDay };
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
export async function showDayModal(celticDay, celticMonth) {
    const modalContainer = document.getElementById("modal-container");
    const modalDetails = document.getElementById("modal-details");
  
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

    // Testing Zodiac
    console.log(`Gregorian Date Passed: ${gregorian.gregorianMonth}-${gregorian.gregorianDay}`);

    const formattedDay = gregorian.gregorianDay.toString().padStart(2, "0");
    const formattedMonth = gregorian.gregorianMonth.toString().padStart(2, "0");

    console.log(`Gregorian Date Passed: ${formattedMonth}-${formattedDay}`); // Debug Log

    const zodiac = getCelticZodiac(parseInt(gregorian.gregorianMonth, 10), parseInt(gregorian.gregorianDay, 10));
     // Get additional data
    const dayOfWeek = getDayOfWeek(gregorian.gregorianMonth, gregorian.gregorianDay);
    //const zodiac = getCelticZodiac(celticMonth, celticDay);
    const events = await getCustomEvents(gregorian.gregorianMonth, gregorian.gregorianDay);
    const mysticalSuggestion = getMysticalSuggestion();
  
    // Construct an ISO date string
    const year = "2025";
    const monthStr = gregorian.gregorianMonth.padStart(2, "0");
    const dayStr = gregorian.gregorianDay < 10 ? "0" + gregorian.gregorianDay : gregorian.gregorianDay;
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
  
        // Format the Gregorian month
        const gMonth = getFormattedMonth(monthStr);
  
        // Update modal with lunar details
        modalDetails.innerHTML = `
            <div style="text-align: center; padding-top: 10px; color: white">
                <h2 class="detailsDay">${dayOfWeek}</h2>
                <h2 class="detailsCelticDate">${celticMonth} ${celticDay}</h2>
                <h3 class="detailsGregorianDate">${gMonth} ${dayStr}</h3>
                <div class="moon-phase-graphic">${lunarData.graphic}</div>
                <h3 class="detailsMoonPhase">${lunarData.moonName || lunarData.phase} </h3>
                <p class="detailsMoonDescription">${lunarData.description}</p>
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="detailsTitle">Celtic Zodiac</h3>
                <div class="detailsCelticZodiac">
                    <img src="assets/images/zodiac/zodiac-${zodiac.toLowerCase()}.png" alt="${zodiac}" 
     onerror="this.src='assets/images/decor/treeoflife.png';" />
                    <p>${zodiac}</p>
                </div>
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="detailsTitle">Today's Events</h3>
                <p class="detailsCustomEvents">${events}</p>
                <img src="assets/images/decor/divider.png" class="divider" alt="Divider" />
                <h3 class="detailsTitle">Mystical Suggestions</h3>
                <p>${mysticalSuggestion}</p>
                <button id="back-to-month" class="back-button">Back to ${celticMonth}</button>
            </div>
        `;
  
        // Add event listener for the "Back" button
        document.getElementById("back-to-month").addEventListener("click", () => {
            showModal(celticMonth);
        });
  
    } catch (error) {
        console.error("Error fetching lunar phase:", error);
        modalDetails.innerHTML = `<p>Failed to load moon phase data.</p>`;
    }
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
        const filteredEvents = events.filter(event => 
            event.date === `2025-${gregorianMonth}-${gregorianDay}`
        );

        return filteredEvents.length > 0 
            ? filteredEvents.map(e => `<p>${e.title}: ${e.notes}</p>`).join("") 
            : "There are no events today.>";
            console.log('Target custom date is', filteredEvents);

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