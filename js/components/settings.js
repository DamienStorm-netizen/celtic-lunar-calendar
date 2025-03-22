export function renderSettings() {
    return `
        <div id="settings-container">
            <h1 class="settings-title">Settings</h1>

            <!-- Custom Events Management -->
            <section id="custom-events-settings">
                <h2>🌙 Manage Your Events</h2>
                <h3>Add your custom events.</h3>
                <button id="add-event-button" class="settings-btn">Add New Event</button>

                <h3>Edit or remove existing custom events.</h3>
                <!-- Custom Events List -->
                <div id="event-list-container">
                    <p>Loading your magical events...</p>
                </div>

                <div id="edit-event-modal" class="modal hidden">
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>Edit Event</h2>
                        <form id="edit-event-form">
                            <label for="edit-event-name">Event Name:</label>
                            <input type="text" id="edit-event-name" required />

                            <label for="edit-event-type">Type:</label>
                            <select id="edit-event-type">
                                <option value="General">💡 General</option>
                                <option value="🔥 Festival">🔥 Festival</option>
                                <option value="🌕 Full Moon">🌕 Full Moon</option>
                                <option value="🎉 Holiday">🎉 Holiday</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="😎 Friends">😎 Friends</option>
                            </select>

                            <label for="edit-event-date">Date:</label>
                            <input type="date" id="edit-event-date" required />

                            <label for="edit-event-notes">Notes:</label>
                            <textarea id="edit-event-notes"></textarea>

                            <button type="submit" class="save-event-btn">Save Changes</button>
                        </form>
                    </div>
                </div>

                 
    
                
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

import { fetchCustomEvents, deleteCustomEvent } from "./eventsAPI.js";

export async function loadCustomEvents() {
    const eventListContainer = document.getElementById("custom-events-list");
    eventListContainer.innerHTML = "<p class='loading-message'>Loading your magical events...</p>";

    try {
        const events = await fetchCustomEvents();
        
        if (events.length === 0) {
            eventListContainer.innerHTML = "<p class='empty-message'>No custom events found. Add one to weave your own magic! ✨</p>";
            return;
        }

        eventListContainer.innerHTML = ""; // Clear previous content

        events.forEach(event => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("custom-event-item");

            eventItem.innerHTML = `
                <div class="event-details">
                    <h3>${event.title} <span class="event-type">${event.type}</span></h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Notes:</strong> ${event.notes || "No additional details."}</p>
                </div>
                <div class="event-actions">
                    <button class="edit-event-btn" data-id="${event.date}">✏️ Edit</button>
                    <button class="delete-event-btn" data-id="${event.date}">🗑️ Delete</button>
                </div>
            `;

            eventListContainer.appendChild(eventItem);
        });

    } catch (error) {
        console.error("Error loading custom events:", error);
        eventListContainer.innerHTML = "<p class='error-message'>Something went wrong. Try again later.</p>";
    }
}

function openEditModal(eventId) {
    const modal = document.getElementById("edit-event-modal");
    const form = document.getElementById("edit-event-form");

    // Fetch the current event data
    fetch(`/api/custom-events`)
        .then(response => response.json())
        .then(events => {
            const event = events.find(e => e.date === eventId);
            if (!event) {
                console.error("Event not found.");
                return;
            }

            // Pre-fill form with event data
            document.getElementById("edit-event-name").value = event.title;
            document.getElementById("edit-event-type").value = event.type || "General";
            document.getElementById("edit-event-date").value = event.date;
            document.getElementById("edit-event-notes").value = event.notes || "";

            // Store original event date for reference
            form.setAttribute("data-original-date", event.date);

            // Show the modal
            modal.classList.remove("hidden");
        })
        .catch(error => console.error("Error fetching event:", error));
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

    // Fetch and populate custom events list on load
    fetchCustomEvents()
        .then(events => populateEventList(events))
        .catch(error => console.error("Error loading events:", error));
}

// Function to show event modal (to be created)
function showAddEventModal() {
    console.log("📝 Open Add Event Modal...");
    // Logic to open and display modal for event creation
}

function attachEventHandlers() {

    document.querySelectorAll(".settings-edit-event").forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Edit button clicked!");  // 🔎 See if this logs!
        });
    });

    document.querySelectorAll(".settings-delete-event").forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Delete button clicked!!!");  // 🔎 See if this logs!
        });
    });
}

function populateEventList(events) {
    const container = document.getElementById("event-list-container");
    container.innerHTML = ""; // Clear placeholder text

    events.forEach(event => {
        console.log("Processing event:", event); // Debugging

        const eventElement = document.createElement("div");
        eventElement.classList.add("event-item");
        eventElement.innerHTML = `
            <ul class="settings-event-list">
                <li><h3>${event.title}</h3></li>
                <li>${event.date}</li>
                <li>${event.notes || "No notes added."}</li>
                <li><button class="settings-edit-event" data-date="${event.date}">Edit</button><button class="settings-delete-event">Delete</button></li>
            </ul>
        `;

        container.appendChild(eventElement);
    });

    // ✅ Attach event handlers *after* buttons exist
    attachEventHandlers();
}





