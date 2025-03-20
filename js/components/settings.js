export function renderSettings() {
    return `
        <div id="settings-container">
            <h1 class="settings-title">Settings</h1>

            <!-- Custom Events Management -->
            <section id="custom-events-settings">
                <h2>🌙 Manage Your Events</h2>
                <p>Add, edit, or remove your custom events.</p>
                <div id="custom-events-list"></div>
                <button id="add-event-button" class="settings-btn">Add New Event</button>
            </section>

            <!-- Mystical Preferences -->
            <section id="mystical-settings">
                <h2>🔮 Mystical Preferences</h2>
                <p>Fine-tune your calendar.</p>

                <ul class="mystical-list">
                    <li><label>
                        <input type="checkbox" id="toggle-mystical" checked> Enable Mystical Suggestions
                    </label></li>
                    <li><label>
                        <input type="checkbox" id="show-eclipses" checked> Show Eclipses
                    </label></li>
                    <li><label>
                        <input type="checkbox" id="show-moons" checked> Show Full Moons
                    </label></li>
                    <li><label>
                        <input type="checkbox" id="show-holidays" checked> Show National Holidays
                    </label></li>
                <ul>
            </section>

            <!-- About & Credits -->
            <section id="about-settings">
                <h2>📜 About This Project</h2>
                <p>A collaborative project by <strong>Eclipsed Realities</strong> & <strong>Playground of the Senses</strong>.</p>
                <button id="about-page-button" class="settings-btn">Read More</button>
            </section>
        </div>
    `;
}

// Attach Event Listeners when Settings Page Loads
export function setupSettingsEvents() {

    // Redirect to About Page
    document.getElementById("about-page-button").addEventListener("click", () => {
        console.log("Clicked on About link");
        window.location.hash = "about";
    });

    // Manage Custom Events
    document.getElementById("add-event-button").addEventListener("click", () => {
        showAddEventModal();
    });
}

// Function to show event modal (to be created)
function showAddEventModal() {
    console.log("📝 Open Add Event Modal...");
    // Logic to open and display modal for event creation
}