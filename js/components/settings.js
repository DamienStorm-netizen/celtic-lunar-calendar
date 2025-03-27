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

                <!--- ADD Custom Event --->
                <div id="add-event-modal" class="modal-settings hidden">
                    <div class="modal-content-add">
                        <span class="close-modal-add">&times;</span>
                        <h2>Add New Event</h2>
                        <form id="add-event-form">
                            <label for="event-name">Event Name:
                            <input type="text" id="event-name" required /></label>

                            <label for="event-type">Type of Event:
                            <select id="event-type">
                                <option value="🎉 Fun">🎉 Fun</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="🔥 Festival">🔥 Festival</option>
                                <option value="🌕 Full Moon">🌕 Full Moon</option>
                                <option value="🎄 Holiday">🎄 Holiday</option>
                            </select></label>

                            <label for="event-date">Date:
                            <input type="date" id="event-date" required /></label>

                            <label for="event-note">Event Description:
                            <textarea id="event-note"></textarea></label>

                            <button type="submit">Save Event</button>
                            <button type="button" class="cancel-modal-add">Cancel</button>
                        </form> 
                    </div>
                </div>
                

                <!--- EDIT Custom Event -->
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

    console.log("☸️ Running the setupSettingsEvent function");

    // Prevent duplicate listeners
    const addEventForm = document.getElementById("add-event-form");
    addEventForm.removeEventListener("submit", handleAddEventSubmit); // clear old
    addEventForm.addEventListener("submit", handleAddEventSubmit);    // attach fresh

   // Fetch and populate custom events list on load
    fetchCustomEvents()
        .then(events => populateEventList(events))
        .catch(error => console.error("Error loading events:", error));
}

// Function to show add event modal (to be created)
function showAddEventModal() {
    
    console.log("📝 Open Add Event Modal...");
    const modal = document.getElementById("add-event-modal");
    modal.classList.remove("hidden");
    modal.classList.add("show");

    // Close modal when clicking the close button
    document.querySelectorAll(".close-modal-add").forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.remove("show");
            modal.classList.add("hidden");
        });
    });

    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", () => {
            modal.classList.remove("show");
            modal.classList.add("hidden");
        });
    });

}

function attachEventHandlers() {

    // Manage Custom Events
    document.getElementById("add-event-button").addEventListener("click", () => {
        showAddEventModal();
    });

     // Redirect to About Page
     document.getElementById("about-page-button").addEventListener("click", () => {
        console.log("Clicked on About link");
        window.location.hash = "about";
    });

    document.querySelectorAll(".settings-edit-event").forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Edit button clicked!");  // 🔎 See if this logs!
        });
    });

    document.querySelectorAll(".settings-delete-event").forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Delete button clicked!!!");
    
            // Check if the event target is correct
            const targetButton = event.target;
            if (!targetButton) {
                console.error("Error: event.target is undefined.");
                return;
            }
    
            // Ensure the data-date attribute is being read correctly
            const eventDate = targetButton.getAttribute("data-date");
            if (!eventDate) {
                console.error("Error: data-date attribute not found.");
                return;
            }
    
            console.log("Attempting to delete event on:", eventDate);
    
            // Call the delete function
            handleDeleteEvent(eventDate);
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
                <li><button class="settings-edit-event" data-date="${event.date}">Edit</button><button class="settings-delete-event" data-date="${event.date}">Delete</button></li>
            </ul>
        `;

        container.appendChild(eventElement);
    });

    // ✅ Attach event handlers *after* buttons exist
    attachEventHandlers();
}

// Function to handle event submission - ADD
async function handleAddEventSubmit(event) {

    console.log("Adding an event");
    event.preventDefault(); // Prevent default form submission behavior

    // Grab form values
    const eventName = document.getElementById("event-name").value.trim();
    const eventType = document.getElementById("event-type").value;
    const eventDate = document.getElementById("event-date").value;
    const eventNotes = document.getElementById("event-note").value.trim();

    // Ensure required fields are filled
    if (!eventName || !eventDate) {
        alert("Please enter both an event name and date.");
        return;
    }

    // Construct event object
    const newEvent = {
        title: eventName,
        type: eventType,
        date: eventDate,
        notes: eventNotes
    };

    console.log("📤 Sending new event:", newEvent);

    // Send event data to Python backend
    try {
        const response = await fetch("/custom-events", {
            cache: 'no-store',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent)
        });

        if (!response.ok) {
            throw new Error("Failed to add event");
        }

        const result = await response.json();
        console.log("✅ Event added successfully:", result);

        // Close modal & refresh event list
        document.getElementById("add-event-modal").style.display = "none";

        // ✨ Refresh the list with live data!
        const updatedEvents = await fetchCustomEvents();
        populateEventList(updatedEvents);

        // 🪄 Wait a moment to let the DOM update
        setTimeout(() => {
            const allEvents = document.querySelectorAll(".event-item");
            const newEventElement = Array.from(allEvents).find(el =>
                el.textContent.includes(title) && el.textContent.includes(date)
            );

    if (newEventElement) {
        newEventElement.classList.add("event-highlight");
        newEventElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // ✨ Remove highlight after a few seconds
        setTimeout(() => {
            newEventElement.classList.remove("event-highlight");
        }, 3000);
    }
}, 200);

        // ✨ Clear form
        document.getElementById("event-name").value = "";
        document.getElementById("event-date").value = "";
        document.getElementById("event-type").value = "General";
        document.getElementById("event-note").value = "";

    } catch (error) {
        console.error("❌ Error adding event:", error);
        alert("Oops! Something went wrong while adding your event.");
    }
}

// Function to handle event deletion - DELETE
async function handleDeleteEvent(eventDate) {
    console.log("🚀 handleDeleteEvent function triggered!");

    if (!eventDate) {
        console.error("❌ Error: eventDate is undefined.");
        return;
    }

    console.log(`🗑️ Attempting to delete event on: ${eventDate}`);

    try {
        const response = await fetch(`/custom-events/${eventDate}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete event: ${response.statusText}`);
        }

        console.log(`✅ Event on ${eventDate} deleted successfully!`);

        // 🧹 **Step 1: Clear the event list before refreshing**
        const container = document.getElementById("event-list-container");
        if (container) {
            container.innerHTML = "<p>Refreshing events...</p>";
        }

        // ⏳ **Step 2: Delay fetch slightly to allow server time to reload JSON**
        setTimeout(async () => {
            console.log("🔄 Fetching updated events...");
            const updatedEvents = await fetchCustomEvents();
            populateEventList(updatedEvents);
        }, 1000); // Small delay for a smoother experience

    } catch (error) {
        console.error("❌ Error deleting event:", error);
    }
}


