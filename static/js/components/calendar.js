let lastOpenedMonth = null; // Keep track of the last opened month modal

export function renderCalendar() {
    return `
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

export async function setupCalendarEvents() {
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
            //getCelticZodiac(monthName);

            // Open the modal with the selected month
            showModal(monthName);
        });
    });
}

 // Close modal
 export function closeModal() {
    console.log("Click Close Button");
    const modalContainer = document.getElementById("modal-container");

    if (modalContainer) {
        modalContainer.classList.add("hidden");
    }    

    // Show the modal overlay
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("modal-overlay").classList.remove("show");
}

// Open modal window and insert HTML
export function showModal(monthName) {

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
            //applyMysticalSettings(getMysticalPrefs());

            // Fetch tagline and update
            //fetchTagline(monthName);

            // Setup tabbed navigation
            //setupCalendarTabNavigation();

            // Apply fade-in effect
            modalContainer.classList.add("fade-in");
            modalContainer.classList.remove("fade-out");

            // ✅ Call enhancement only when the modal is displayed
            //enhanceCalendarTable(modalContainer, monthName);

            document.getElementById("add-event-form").addEventListener("submit", (e) => {
                e.preventDefault();
              
                // 🌟 Save the event here...
              
                // Switch to Calendar tab
                document.getElementById("tab-calendar").click();
              });
        }
    }
}