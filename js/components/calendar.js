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

export function generateCalendarGrid(monthName) {
    
    const calendarMonth = '<table class="calendar-grid"><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr><tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr><tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr></tbody></table>';

    return calendarMonth;
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
            // Insert your modal content along with an empty calendar grid container.

            if (modalDetails) {
                modalDetails.innerHTML = `
                    <h2 class="month-title">${monthName}</h2>
                    <p>${monthsData[monthName] || "No data available."}</p>
                    <div class="calendar-grid"></div>
                `;
            }
            
            // Now query the calendar grid that you just inserted
            const modalCalendarGrid = modalDetails.querySelector(".calendar-grid");
            console.log("Generate Calendar Grid for:", monthName);
            if (modalCalendarGrid) {
                // Make sure generateCalendarGrid returns a value (e.g., an HTML string)
                modalCalendarGrid.innerHTML = generateCalendarGrid(monthName);
            }
            modalContainer.classList.remove("hidden");
        }
    }

    // Close modal
    modalClose.addEventListener("click", () => {
        modalContainer.classList.add("hidden");
    });

     // Generate and set the calendar grid
     // modalCalendarGrid.innerHTML = generateCalendarGrid(monthName);
     
    // Attach event listeners to each thumbnail
    const thumbnails = document.querySelectorAll(".month-thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            const monthName = e.target.closest(".month-thumbnail").dataset.month;
            console.log("CLICK! for:", monthName);
            showModal(monthName); // Call showModal to handle modal content
        });
    });
}