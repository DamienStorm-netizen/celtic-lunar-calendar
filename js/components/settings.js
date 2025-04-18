import { applyMysticalSettings } from "./calendar.js"; // or wherever it's defined

export function renderSettings() {
    return `
        <div id="settings-container" class="fade-in">
            <div id="modal-overlay" class="modal-overlay hidden"></div>
            <h1 class="settings-title">Settings</h1>

            <!-- Custom Events Management -->
            <section id="custom-events-settings">
                <h2>🌙 Add an Event</h2>
                <p class="settings-subheader">Add a custom event to your calendar.</p>
                <button id="add-event-button" class="settings-btn">Add New Event</button>

                <br />

                 <h2>🌓 Edit/ Delete an Event</h2>
                <p class="settings-subheader">Edit or remove existing custom events from your calendar.</p>
                <!-- Custom Events List -->
                <div id="event-list-container">
                    <p>Loading your magical events...</p>
                </div>

                <!--- ADD Custom Event --->
                <div id="add-event-modal" class="modal modal-settings">
                    <div class="modal-content">
                        <span class="close-modal-add  mystical-close">✦</span>
                        <h2>Add New Event</h2>
                        <form id="add-event-form">
                            <label for="event-name">Event Name:
                            <input type="text" id="event-name" required /></label>

                            <label for="event-type">Type of Event:
                            <select id="event-type">
                                <option value="🔥 Date">🔥 Date</option>
                                        <option value="😎 Friends">😎 Friends</option>
                                        <option value="🎉 Fun">🎉 Fun</option>
                                        <option value="💡 General" active>💡 General</option>
                                        <option value="🏥 Health">🏥 Health</option>
                                        <option value="💜 Romantic">💜 Romantic</option>
                                        <option value="🖥️ Professional">🖥️ Professional</option>
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
                <div id="edit-event-modal" class="modal modal-settings">
                    <div class="modal-content">
                        <span class="close-modal-edit mystical-close">✦</span>
                        <h2>Edit Your Event</h2>
                        <form id="edit-event-form">
                            <label for="edit-event-name">Event Name:<input type="text" id="edit-event-name" required /></label>
                            <label for="edit-event-type">Type:
                            <select id="edit-event-type">
                                <option value="🔥 Date">🔥 Date</option>
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Fun">🎉 Fun</option>
                                <option value="💡 General" active>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></label>

                            <label for="edit-event-date">Date:<input type="date" id="edit-event-date" required /></label>

                            <label for="edit-event-notes">Notes:
                            <textarea id="edit-event-notes"></textarea></label>

                            <button type="submit" class="save-event-btn">Save Changes</button>&nbsp;&nbsp;<button type="button" class="cancel-modal-edit">Cancel</button>      
                        </form>
                    </div>
                </div>
            </section>

            <br />


            <!-- Mystical Preferences -->
            <section id="mystical-settings">
                <h2>🔮 Mystical Preferences</h2>
                <p class="settings-subheader">Fine-tune your calendar.</p>

                <ul class="mystical-list">
                    <li class="mystical-toggle">
                        <span>Enable Mystical Suggestions</span>
                        <label class="switch">
                        <input type="checkbox" id="toggle-mystical" data-on="🔮" data-off="✨" />
                        <span class="slider round"></span>
                        </label>
                    </li>
                    
                    <li class="mystical-toggle">
                        <span>Show Eclipses</span>
                        <label class="switch">
                        <input type="checkbox" id="show-eclipses" data-on="🌑" data-off="☀️" />
                        <span class="slider round"></span>
                        </label>
                    </li>
                    
                    <li class="mystical-toggle">
                        <span>Show Full Moons</span>
                        <label class="switch">
                        <input type="checkbox" id="show-moons" data-on="🌕" data-off="🌒" />
                        <span class="slider round"></span>
                        </label>
                    </li>
                    
                    <li class="mystical-toggle">
                        <span>Show National Holidays</span>
                        <label class="switch">
                        <input type="checkbox" id="show-holidays" data-on="🎉" data-off="🧾" />
                        <span class="slider round"></span>
                        </label>
                    </li>

                    <li class="mystical-toggle">
                        <span>Show Custom Events</span>
                        <label class="switch">
                            <input type="checkbox" id="show-custom-events" data-on="💜" data-off="🖤" />
                            <span class="slider round"></span>
                            </span>
                        </label>
                    </li>
                <ul>
            </section>

            <br />

            <!-- About & Credits -->
            <section id="about-settings">
                <h2>📜 About This Project</h2>
                <p class="settings-subheader">A collaborative project by <strong>Eclipsed Realities</strong> & <strong>Playground of the Senses</strong>.</p>
                <button id="about-page-button" class="settings-btn">Read More</button>
            </section>

            <!-- Shooting Stars on close overlay -->
            <div id="shooting-stars-container"></div>
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
                    <p><strong>Date:</strong> ${event.date}!!</p>
                    <p><strong>Notes:</strong> ${event.notes || "No additional details."}</p>
                </div>
                <div class="event-actions">
                    <button class="edit-event-btn" data-id="${event.id}">✏️ Edit</button>
                    <button class="delete-event-btn" data-id="${event.id}">🗑️ Delete</button>
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

    console.log("Event ID to edit is ", eventId);

    // Fetch the current event data
    fetch(`/api/custom-events`)
        .then(response => response.json())
        .then(events => {
            const event = events.find(e => e.id === eventId);
            if (!event) {
                console.error("Event not found.");
                return;
            }

            console.log("Type to edit is ", event.type);

            // Pre-fill form with event data
            document.getElementById("edit-event-name").value = event.title;
            document.getElementById("edit-event-type").value = event.type || "General";
            document.getElementById("edit-event-date").value = event.date;
            document.getElementById("edit-event-notes").value = event.notes || "";

            // Store original event date for reference
            form.setAttribute("data-original-id", event.id);

            // Show the modal
            modal.classList.remove("hidden");
            modal.classList.add("show");

            // Show the modal overlay
            document.getElementById("modal-overlay").classList.add("show");
            document.getElementById("modal-overlay").classList.remove("hidden");

            // Close modal - X
            document.querySelectorAll(".close-modal-edit").forEach(button => {
                button.addEventListener("click", () => {
                    const modal = document.getElementById("edit-event-modal");
                    // Hide modal
                    modal.classList.remove("show");
                    modal.classList.add("hidden");
                     // Hide overlay
                     document.getElementById("modal-overlay").classList.add("hidden");
                     document.getElementById("modal-overlay").classList.remove("show");
                });
            });

            // Close modal - cancel button
            document.querySelectorAll(".cancel-modal-edit").forEach(button => {
                button.addEventListener("click", () => {
                    const modal = document.getElementById("edit-event-modal");
                    // Hide modal
                    modal.classList.remove("show");
                    modal.classList.add("hidden");
                    // Hide overlay
                    document.getElementById("modal-overlay").classList.add("hidden");
                    document.getElementById("modal-overlay").classList.remove("show");
                });
            });
            
        })
        .catch(error => console.error("Error fetching event:", error));
}

// Attach Event Listeners when Settings Page Loads
export function setupSettingsEvents() {

    console.log("☸️ Running the setupSettingsEvent function");

    const defaultPreferences = {
        mysticalSuggestions: true,
        showEclipses: true,
        showMoons: true,
        showHolidays: true,
        showCustomEvents: true // 💜 Add this line!
    };

    
    function saveMysticalPrefs(prefs) {
        localStorage.setItem("mysticalPrefs", JSON.stringify(prefs));
    }

    // Prevent duplicate listeners
    const editForm = document.getElementById("edit-event-form");
    editForm.removeEventListener("submit", handleEditEventSubmit); // clear old if any
    editForm.addEventListener("submit", handleEditEventSubmit);   // bind fresh ✨

    const addEventForm = document.getElementById("add-event-form");
    addEventForm.removeEventListener("submit", handleAddEventSubmit); // clear old
    addEventForm.addEventListener("submit", handleAddEventSubmit);    // attach fresh

    // Hide overlay and make it clickable
    document.getElementById("modal-overlay").addEventListener("click", () => {
        const editModal = document.getElementById("edit-event-modal");
        const addModal = document.getElementById("add-event-modal");
    
        if (editModal.classList.contains("show")) {
            editModal.classList.remove("show");
            editModal.classList.add("hidden");
        }
    
        if (addModal.classList.contains("show")) {
            addModal.classList.remove("show");
            addModal.classList.add("hidden");
        }
    
        // Hide the overlay itself
        document.getElementById("modal-overlay").classList.remove("show");
        document.getElementById("modal-overlay").classList.add("hidden");
    });

   // Fetch and populate custom events list on load
    fetchCustomEvents()
        .then(events => populateEventList(events))
        .catch(error => console.error("Error loading events:", error));

    const prefs = getMysticalPrefs();
    document.getElementById("toggle-mystical").checked = prefs.mysticalSuggestions;
    document.getElementById("show-eclipses").checked = prefs.showEclipses;
    document.getElementById("show-moons").checked = prefs.showMoons;
    document.getElementById("show-holidays").checked = prefs.showHolidays;
    document.getElementById("show-custom-events").checked = prefs.showCustomEvents;

    function updateToggleIcons() {
        document.querySelectorAll(".switch input[type='checkbox']").forEach(input => {
            const slider = input.nextElementSibling;
            const onSymbol = input.dataset.on || "🔮";
            const offSymbol = input.dataset.off || "✨";
    
            // Create/update the span’s emoji content
            slider.innerHTML = `<span class="toggle-icon">${input.checked ? onSymbol : offSymbol}</span>`;
        });
    }
    
    // Attach listener to update the icon on change
    function initMysticalToggles() {
        document.querySelectorAll(".switch input[type='checkbox']").forEach(input => {
            input.addEventListener("change", updateToggleIcons);
        });
    
        // Initial state
        updateToggleIcons();
    }
    
    // Call it once Settings loads
    initMysticalToggles();
}

// Function to show add event modal (to be created)
function showAddEventModal() {
    
    console.log("📝 Open Add Event Modal...");
    const modal = document.getElementById("add-event-modal");
    // Show Modal
    modal.classList.remove("hidden");
    modal.classList.add("show");
    // Show the modal overlay
    document.getElementById("modal-overlay").classList.add("show");
    document.getElementById("modal-overlay").classList.remove("hidden");

    // Close modal and hide oerlay when clicking the close button
    document.querySelectorAll(".cancel-modal-add").forEach(button => {
        button.addEventListener("click", () => {
            // Hide modal
            modal.classList.remove("show");
            modal.classList.add("hidden");
            // Show the modal overlay
            document.getElementById("modal-overlay").classList.remove("show");
            document.getElementById("modal-overlay").classList.add("hidden");
        });
    });

    // Close modal and hide overlay when clicking the X link
    document.querySelectorAll(".close-modal-add").forEach(button => {
        button.addEventListener("click", () => {
            // Hide modal
            modal.classList.remove("show");
            modal.classList.add("hidden");
            // Show the modal overlay
            document.getElementById("modal-overlay").classList.remove("show");
            document.getElementById("modal-overlay").classList.add("hidden");
        });
    });

}

function attachEventHandlers() {

    // Add a Custom Event
    document.getElementById("add-event-button").addEventListener("click", () => {
        showAddEventModal();
    });

     // Redirect to About Page
     document.getElementById("about-page-button").addEventListener("click", () => {
        console.log("Clicked on About link");
        window.location.hash = "about";
    });

    // Edit a Custom Event 
    document.querySelectorAll(".settings-edit-event").forEach(button => {
        button.addEventListener("click", (event) => {
            console.log("Edit button clicked!");  // Debugging
            const eventId = event.target.getAttribute("data-id"); // Or "data-id" if that’s how you're storing it
            if (eventId) {
                openEditModal(eventId); // 💫 Open the modal with the correct event info
            } else {
                console.error("No data-id attribute found on edit button.");
            }
        });
    });

    // Delete a Custom Event
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
            const eventId = targetButton.getAttribute("data-id");
            if (!eventId) {
                console.error("Error: data-id attribute not found.");
                return;
            }
    
            console.log("Attempting to delete event on:", eventId);
    
            // Call the delete function
            handleDeleteEvent(eventId);
        });
    });

    // Set Mystical Preferences
    document.getElementById("toggle-mystical").addEventListener("change", (e) => {
        const prefs = getMysticalPrefs();
        prefs.mysticalSuggestions = e.target.checked;
        saveMysticalPrefs(prefs);
        applyMysticalSettings(prefs);
    });
    
    document.getElementById("show-eclipses").addEventListener("change", (e) => {
        const prefs = getMysticalPrefs();
        prefs.showEclipses = e.target.checked;
        saveMysticalPrefs(prefs);
        applyMysticalSettings(prefs);
    });
    
    document.getElementById("show-moons").addEventListener("change", (e) => {
        const prefs = getMysticalPrefs();
        prefs.showMoons = e.target.checked;
        saveMysticalPrefs(prefs);
        applyMysticalSettings(prefs);
    });
    
    document.getElementById("show-holidays").addEventListener("change", (e) => {
        const prefs = getMysticalPrefs();
        prefs.showHolidays = e.target.checked;
        saveMysticalPrefs(prefs);
        applyMysticalSettings(prefs);
    });

    document.getElementById("show-custom-events").addEventListener("change", (e) => {
        const prefs = getMysticalPrefs();
        prefs.showCustomEvents = e.target.checked;
        saveMysticalPrefs(prefs);
        applyMysticalSettings(prefs); // 🪄 Make it visually apply right away
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
                <li><h3>${event.title} - ${event.type}</h3></li>
                <li>${event.date}</li>
                <li>${event.notes || "No notes added."}</li>
                <li><button class="settings-edit-event" data-id="${event.id}">Edit</button><button class="settings-delete-event" data-id="${event.id}">Delete</button></li>
            </ul>
        `;

        container.appendChild(eventElement);
    });

    // ✅ Attach event handlers *after* buttons exist
    attachEventHandlers();
}

// Function to handle event submission - ADD
async function handleAddEventSubmit(event) {

    // Hide overlay
    document.getElementById("modal-overlay").classList.add("hidden");
    document.getElementById("modal-overlay").classList.remove("show");

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
        id: Date.now().toString(), // simple and unique-ish
        title: eventName,
        type: eventType,
        date: eventDate,
        notes: eventNotes
    };

    console.log("📤 Sending new event:", newEvent);

    // Send event data to Python backend
    try {
        const response = await fetch("/api/custom-events", {
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
        // Sparkle sparkle
        newEventElement.classList.add("event-highlight-glow");
        newEventElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // ✨ Remove highlight after a few seconds
        setTimeout(() => {
            newEventElement.classList.remove("event-highlight");
            newEventElement.classList.remove("event-highlight-glow");
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
async function handleDeleteEvent(eventId) {
    console.log("🚀 handleDeleteEvent function triggered!");

    if (!eventId) {
        console.error("❌ Error: eventId is undefined.");
        return;
    }

    console.log(`🗑️ Attempting to delete event on: ${eventId}`);

    try {
        const response = await fetch(`/api/custom-events/${eventId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete event: ${response.statusText}`);
        }

        console.log(`✅ Event on ${eventId} deleted successfully!`);

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

// Function to handle Edit Event - PUT
async function handleEditEventSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("edit-event-form");
    const originalId = form.getAttribute("data-original-id");

    const updatedEvent = {
        title: document.getElementById("edit-event-name").value.trim(),
        type: document.getElementById("edit-event-type").value,
        date: document.getElementById("edit-event-date").value,
        notes: document.getElementById("edit-event-notes").value.trim()
    };

    console.log("✨ Submitting update for event ID:", originalId, updatedEvent);

    try {
        const response = await fetch(`/api/custom-events/${originalId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEvent)
        });

        if (!response.ok) {
            throw new Error("Failed to update event.");
        }

        const result = await response.json();
        console.log("✅ Event updated:", result);

        // Hide modal and overlay
        document.getElementById("edit-event-modal").classList.remove("show");
        document.getElementById("edit-event-modal").classList.add("hidden");
        document.getElementById("modal-overlay").classList.add("hidden");
        document.getElementById("modal-overlay").classList.remove("show");

        // ✨ Refresh the list with updated events
        const updatedEvents = await fetchCustomEvents();
        populateEventList(updatedEvents);

    } catch (error) {
        console.error("❌ Error updating event:", error);
        alert("Oops! Something went wrong while updating your event.");
    }
}

// 🌟 Updated: Display mystical preferences including Custom Events
export function getMysticalPrefs() {
    const saved = localStorage.getItem("mysticalPrefs");
    const defaults = {
        mysticalSuggestions: true,
        showEclipses: true,
        showMoons: true,
        showHolidays: true,
        showCustomEvents: true // ✅ This line makes all the difference
    };

    return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
}

export function saveMysticalPrefs(prefs) {
    localStorage.setItem("mysticalPrefs", JSON.stringify(prefs));
}


