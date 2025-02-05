export function renderCalendar() {
    const app = document.getElementById('app');
    return `
        <section class="calendar">
            <h1 class="calendar-title">Calendar</h1>
            <div class="calendar-grid">
                <div class="month-thumbnail" id="nivis" data-month="Nivis">
                    <img src="assets/images/decor/nivis-thumbnail.png" alt="Nivis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="janus" data-month="Janus">
                    <img src="assets/images/decor/janus-thumbnail.png" alt="Janus Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="brigid" data-month="Brigid">
                    <img src="assets/images/decor/brigid-thumbnail.png" alt="Brigid Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Flora" data-month="Flora">
                    <img src="assets/images/decor/flora-thumbnail.png" alt="Flora Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Maia" data-month="Maia">
                    <img src="assets/images/decor/maia-thumbnail.png" alt="Maia Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Juno" data-month="Juno">
                    <img src="assets/images/decor/juno-thumbnail.png" alt="Juno Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Solis" data-month="Solis">
                    <img src="assets/images/decor/solis-thumbnail.png" alt="Solis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Terra" data-month="Terra">
                    <img src="assets/images/decor/terra-thumbnail.png" alt="Terra Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Lugh" data-month="Lugh">
                    <img src="assets/images/decor/lugh-thumbnail.png" alt="Lugh Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Pomona" data-month="Pomona">
                    <img src="assets/images/decor/pomona-thumbnail.png" alt="Pomona Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Autumna" data-month="Autumna">
                    <img src="assets/images/decor/autumna-thumbnail.png" alt="Autumna Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Eira" data-month="Eira">
                    <img src="assets/images/decor/eira-thumbnail.png" alt="Eira Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Aether" data-month="Aether">
                    <img src="assets/images/decor/Aether-thumbnail.png" alt="Aether Month Thumbnail">
                </div>
            </div>
        </section>

        <div id="modal-container" class="hidden">
            <div id="modal-content">
                <span id="modal-close" class="close-btn">X</span>
                <div id="modal-details">
                    <div class="modal-header">
                        <h2 id="modal-month-name">Month Name</h2>
                        <button id="today-button">Today</button>
                    </div>
                    <div class="calendar-grid">
                        <!-- Dynamic calendar grid will be generated here -->
                    </div>
                    <div class="dynamic-content">
                        <!-- Dynamic lunar phases and festivals will appear here -->
                    </div>
                    <div class="modal-footer">
                        <h3 id="celtic-zodiac-title">Celtic Zodiac</h3>
                        <p id="celtic-zodiac-info">Birch / Rowan</p>
                    </div>
                </div>
                
            </div>
        </div>

    `;
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

    function showModal(monthName) {
        if (monthName) {
          const modalDetails = document.getElementById("modal-details");
          modalDetails.innerHTML = `<h2>${monthName}</h2><p>${monthsData[monthName] || "No data available."}</p>`;
          modalContainer.classList.remove("hidden");
        }
      }

    // Close modal
    modalClose.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
    });

    // Attach event listeners to each thumbnail
    const thumbnails = document.querySelectorAll(".month-thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            console.log("CLICK!");
            const monthName = e.target.closest(".month-thumbnail").dataset.month;
            showModal(monthName);
        });
    });
}


/*
export function generateCalendarGrid(monthName, totalDays) {
    const showLunarPhases = localStorage.getItem("showLunarPhases") === "true";
    const showFestivals = localStorage.getItem("showFestivals") === "true";

    const calendarGrid = document.querySelector(".calendar-grid");
    calendarGrid.innerHTML = ""; // Clear previous grid

    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("grid-cell");
        dayCell.textContent = day;

        if (showLunarPhases) {
            // Add lunar phase information dynamically
            dayCell.classList.add("lunar-phase");
        }

        if (showFestivals) {
            // Add festival information dynamically
            dayCell.classList.add("festival");
        }

        calendarGrid.appendChild(dayCell);
    }
}
    */

/*

// Populate Modal Content
export function populateModal(monthName) {
    const modalMonthName = document.getElementById("modal-month-name");
    modalMonthName.textContent = monthName;

    // Populate the grid, toggles, and zodiac dynamically here later!
}
*/

/*
export function displayLunarPhases(container, lunarPhases) {
    // Clear any existing lunar phase content
    clearDynamicContent(container, "lunar");

    const lunarDiv = document.createElement("div");
    lunarDiv.classList.add("lunar-content");
    lunarDiv.innerHTML = `<h3>Lunar Phases</h3>`;
    lunarPhases.forEach(phase => {
        lunarDiv.innerHTML += `<p>${phase.date}: ${phase.phase}</p>`;
    });

    container.appendChild(lunarDiv);
}

export function displayFestivals(container, festivals) {
    // Clear any existing festival content
    clearDynamicContent(container, "festivals");

    const festivalDiv = document.createElement("div");
    festivalDiv.classList.add("festival-content");
    festivalDiv.innerHTML = `<h3>Festivals</h3>`;
    festivals.forEach(festival => {
        festivalDiv.innerHTML += `<p>${festival.name}: ${festival.description}</p>`;
    });

    container.appendChild(festivalDiv);
}

export function clearDynamicContent(container, type) {
    const existingContent = container.querySelector(`.${type}-content`);
    if (existingContent) existingContent.remove();
}*/