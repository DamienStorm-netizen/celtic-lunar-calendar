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
                <div class="topBar"></div>
                <span id="modal-close" class="close-btn">
                    <img src="assets/images/decor/close-btn.png" alt="Close Modal" />
                </span>
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

    // Add click events to HTML table
    async function enhanceCalendarTable(modalContainer, monthName) {
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
                });
            }
        });
      }

    // Open modal window and insert HTML
    function showModal(monthName) {
        if (monthName) {
            const modalContainer = document.getElementById("modal-container");
            const modalDetails = modalContainer.querySelector("#modal-details");

            // Insert modal content, including the calendar grid
            if (modalDetails) {
                modalDetails.innerHTML = `
                    <h2 class="month-title">${monthName}</h2>
                    <p class="month-poem">${monthsData[monthName] || "No data available."}</p>
                    <table class="calendar-grid"><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody><tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr><tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr><tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr></tbody></table>
                    <div class="feature-image">
                        <img src="assets/images/months/${monthName.toLowerCase()}-bg.png" alt="${monthName}" />
                    </div>
                `;
            }
            
            // Now query the calendar grid that you just inserted
            //const modalContainer = document.getElementById("modal-container");
            //modalContainer.classList.remove("hidden");

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
    function closeModal() {
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
    
    // Attach event listener to the close button
    document.getElementById("modal-close").addEventListener("click", closeModal);


     
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
