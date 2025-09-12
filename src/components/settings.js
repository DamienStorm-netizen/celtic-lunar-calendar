import { convertGregorianToCeltic, getCelticWeekdayFromGregorian } from "../utils/dateUtils.js";
import { applyMysticalSettings, showDayModal } from "./calendar.js";
import { saveCustomEvents, loadCustomEvents } from "../utils/localStorage.js";
import { fetchCustomEvents, deleteCustomEvent, updateCustomEvent } from "./eventsAPI.js";
import { showCelticModal, hideCelticModal } from "../utils/modalOverlay.js";
import { escapeHtml, sanitizeForAttribute, createElement, validateEventData } from "../utils/security.js";


// Helper to show a toast and wire up “View it now”
function showEventToast(id, gregorianDate) {
  const toast       = document.getElementById("event-toast");
  const toastDate   = document.getElementById("toast-date");
  const toastButton = document.getElementById("event-toast-view");

  // Build the Celtic date string
  const weekday = getCelticWeekdayFromGregorian(gregorianDate);
  const lunar   = convertGregorianToCeltic(gregorianDate);
  toastDate.textContent = `${weekday}, ${lunar}`;

  // Reveal and auto-hide
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 6000);

  // “View it now” jumps you to that date and pulses the event
  toastButton.onclick = () => {
    document.querySelector('.nav-link#nav-calendar').click();
    //showCalendarForDate(new Date(gregorianDate));         // your function to switch month
    const el = document.querySelector(`[data-event-id="${id}"]`);
    if (el) el.classList.add("highlight-pulse");
    setTimeout(() => el && el.classList.remove("highlight-pulse"), 2000);
    toast.classList.add("hidden");
  };
}

// Utility: mark a button (or any element) as busy/idle
function setBusy(el, isBusy = true) {
  if (!el) return;
  el.disabled = !!isBusy;
  el.setAttribute("aria-busy", String(!!isBusy));
  el.classList.toggle("is-busy", !!isBusy);
}

export function renderSettings() {
    return `
        <div id="settings-container" class="fade-in">
            <h1 class="settings-title">Settings</h1>

            <!-- Custom Events Management -->
            <section id="custom-events-settings">

                <h2>🌗 Date Conversion</h2>
                <p class="settings-subheader">Gregorian to Lunar Date</p>
                <ul class="conversion-settings">
                    <li>Gregorian Date: <input type="text" id="convert-to-celtic" class="flatpickr-input" placeholder="Pick your date 🌕" required /></li>
                   <li class="lunar-date-row"><span class="lunar-label">Lunar Date:</span><span class="converted-date">Trésda, Juno 9</span></li>
                </ul>
            
                <br />

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

            </section>

            <br />


            <!-- Mystical Preferences -->
            <section id="mystical-settings">
              <h2>🔮 Mystical Preferences</h2>
              <p class="settings-subheader">Fine-tune your Almanac.</p>

              <ul class="mystical-list">
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
                  </label>
                </li>

                <li class="mystical-toggle">
                  <span>Show Moon Phases</span>
                  <label class="switch">
                    <input type="checkbox" id="show-moons" data-on="🌕" data-off="🌘" />
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
                  <span>Show Past Events</span>
                  <label class="switch">
                    <input type="checkbox" id="show-past-events" data-on="🕰️" data-off="🚫" />
                    <span class="slider round"></span>
                  </label>
                </li>
              </ul>
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

// 🌟 Updated: Display mystical preferences including Custom Events
export function getMysticalPrefs() {
  const saved = localStorage.getItem("mysticalPrefs");
  const defaults = {
    mysticalSuggestions: true,
    showHolidays: true,
    showCustomEvents: true,
    showMoons: true,        // ✅ new default
    showEclipses: true,     // ✅ new default
    showPastEvents: false,
    showConstellations: true
  };
  return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
}

// Function to show add event modal
function showAddEventModal() {
    console.log("📝 Open Add Event Modal...");
    
    const modalContent = `
        <h2 class="goldenTitle">Add New Event</h2>
        <form id="add-event-form" style="text-align: left;">
            <label for="event-name">Event Name:
                <input type="text" id="event-name" required class="celtic-form-input" />
            </label>

            <label for="event-type">Type of Event:
                <select id="event-type" class="celtic-form-input">
                    <option value="🔥 Date">🔥 Date</option>
                    <option value="😎 Friends">😎 Friends</option>
                    <option value="🎉 Celebrations">🎉 Celebrations</option>
                    <option value="🌸 My Cycle">🌸 My Cycle</option>
                    <option value="💡 General" selected>💡 General</option>
                    <option value="🏥 Health">🏥 Health</option>
                    <option value="💜 Romantic">💜 Romantic</option>
                    <option value="🖥️ Professional">🖥️ Professional</option>
                </select>
            </label>

            <label for="event-date">Date:
                <input type="date" id="event-date" required class="celtic-form-input" />
            </label>

            <label for="event-note">Event Description:
                <textarea id="event-note" class="celtic-form-textarea"></textarea>
            </label>

            <label for="event-recurring" class="celtic-form-checkbox-container">
                <input type="checkbox" id="event-recurring" class="celtic-form-checkbox" />
                <span class="celtic-form-checkbox-label">Make it Recurring</span>
            </label>

            <div style="margin-top: 20px; text-align: center; display: flex; gap: 15px; justify-content: center;">
                <button type="submit" class="settings-btn">Save Event</button>
                <button type="button" class="settings-btn" id="cancel-add-event">Cancel</button>
            </div>
        </form> 
    `;

    // Show Celtic modal
    const modal = showCelticModal(modalContent, { id: 'add-event-modal' });
    
    // Wire the form submit
    const addForm = modal.querySelector("#add-event-form");
    if (addForm) {
        addForm.onsubmit = handleAddEventSubmit;
    }
    
    // Wire cancel button
    const cancelBtn = modal.querySelector("#cancel-add-event");
    if (cancelBtn) {
        cancelBtn.onclick = () => hideCelticModal('add-event-modal');
    }
}

// Function to handle event submission - ADD
async function handleAddEventSubmit(event) {
    console.log("Adding an event");
    event.preventDefault(); // Prevent default form submission behavior

    // Grab and validate form values
    const rawEventData = {
        title: document.getElementById("event-name").value.trim(),
        category: document.getElementById("event-type").value,
        date: document.getElementById("event-date").value,
        notes: document.getElementById("event-note").value.trim(),
        recurring: document.getElementById("event-recurring").checked
    };

    // Validate and sanitize input
    const validation = validateEventData(rawEventData);
    if (!validation.isValid) {
        alert("Please fix the following errors:\n" + validation.errors.join("\n"));
        return;
    }

    const { title: eventName, category: eventType, date: eventDate, notes: eventNotes, recurring: eventRecurring } = validation.sanitized;

    // Identify the submit button (works in all browsers)
    const submitBtn =
      event.submitter ||
      document.querySelector("#add-event-form button[type='submit']");
    setBusy(submitBtn, true);

    // Construct event object
    const newEvent = {
        id: Date.now().toString(),
        title: eventName,
        type: "custom-event",
        category: eventType,
        date: eventDate,
        notes: eventNotes,
        recurring: eventRecurring,
    };

    let existing = [];
    try {
        existing = loadCustomEvents();
        if (!Array.isArray(existing)) existing = [];
    } catch (e) {
        console.warn("Failed to load custom events from localStorage:", e);
        existing = [];
    }

    const customEvents = [...existing, newEvent];
    saveCustomEvents(customEvents);

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

        // Close Celtic modal & refresh event list
        hideCelticModal('add-event-modal');

        // ✨ Refresh the list with live data!
        const updatedEvents = await fetchCustomEvents();
        populateEventList(updatedEvents);

        // 🪄 Wait a moment to let the DOM update
        setTimeout(() => {
            const allEvents = document.querySelectorAll(".event-item");
            const newEventElement = Array.from(allEvents).find(el =>
                el.textContent.includes(eventName) && el.textContent.includes(eventDate)
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
        document.getElementById("event-type").value = "💡 General";
        document.getElementById("event-note").value = "";

        // AFTER you’ve saved the newEvent and refreshed your list…
        // showEventToast(newEvent.id, eventDate);

    // Show confirmation via SweetAlert2 with the actual Celtic date
    if (typeof Swal !== "undefined" && Swal.fire) {
        // Show confirmation via SweetAlert2 with the actual Celtic date
        const wd    = getCelticWeekdayFromGregorian(eventDate);
        const lunar = convertGregorianToCeltic(eventDate);

        Swal.fire({
            title: `Event saved for ${wd}, ${lunar}`,
            html: '<img src="/assets/icons/logo-icon.png" class="swal2-logo-icon" alt="Lunar Logo">',
            customClass: {
                popup: 'celestial-toast'
            },
            showCancelButton: true,
            confirmButtonText: 'View Event',
            cancelButtonText: 'Cancel'
        })
        .then(result => {
          if (result.isConfirmed) {
            // Switch to the main calendar view
            document.querySelector('.nav-link#nav-calendar').click();

            // After calendar view renders, open the day modal directly
            let monthName, dayStr;
            if (lunar.startsWith('Mirabilis')) {
              monthName = 'Mirabilis';
              dayStr = lunar.includes('Noctis') ? '2' : '1'; // Solis=1, Noctis=2
            } else {
              [monthName, dayStr] = lunar.split(' ');
            }
            setTimeout(() => {
              const dayNum = parseInt(dayStr, 10);
              showDayModal(dayNum, monthName, eventDate, newEvent.id);

              // Highlight the newly added event
              const evt = document.querySelector(`[data-event-id="${newEvent.id}"]`);
              if (evt) {
                evt.classList.add('highlight-pulse');
                setTimeout(() => evt.classList.remove('highlight-pulse'), 2000);
              }
            }, 300);
          }
        });
    } else {
        // fallback: just show the toast
        showEventToast(newEvent.id, eventDate);
    }

    } catch (error) {
        console.error("❌ Error adding event:", error);
        alert("Oops! Something went wrong while adding your event.");
    } finally {
      // always release the button
      setBusy(submitBtn, false);
    }
}

function populateEventList(events) {
  const container = document.getElementById("event-list-container");
  container.innerHTML = ""; // Clear placeholder text

  if (!events || events.length === 0) {
    container.innerHTML = `<p class="empty-note">No custom events yet. Add your first one above ✨</p>`;
    return;
  }

  events.forEach(event => {
    const stableId = event.id || `${event.date}|${event.title || event.name || ""}`;

    // Create event element safely without innerHTML
    const eventElement = document.createElement("div");
    eventElement.classList.add("event-item");
    
    const ul = document.createElement("ul");
    ul.classList.add("settings-event-list");
    
    // Title and category (safely escaped)
    const titleLi = document.createElement("li");
    const h3 = document.createElement("h3");
    h3.textContent = `${event.title || event.name || 'Untitled'} - ${event.category || event.type || "custom-event"}`;
    titleLi.appendChild(h3);
    ul.appendChild(titleLi);
    
    // Date
    const dateLi = document.createElement("li");
    dateLi.textContent = event.date;
    ul.appendChild(dateLi);
    
    // Notes (safely escaped)
    const notesLi = document.createElement("li");
    notesLi.textContent = event.notes || "No notes added.";
    ul.appendChild(notesLi);
    
    // Buttons
    const buttonsLi = document.createElement("li");
    
    const editButton = createElement("button", {
      className: "settings-edit-event",
      textContent: "Edit",
      attributes: {
        "data-id": sanitizeForAttribute(stableId),
        "data-key": sanitizeForAttribute(`${event.date}|${event.title ?? event.name ?? ''}`)
      }
    });
    
    const deleteButton = createElement("button", {
      className: "settings-delete-event",
      textContent: "Delete",
      attributes: {
        "data-id": sanitizeForAttribute(stableId),
        "data-key": sanitizeForAttribute(`${event.date}|${event.title ?? event.name ?? ''}`)
      }
    });
    
    buttonsLi.appendChild(editButton);
    buttonsLi.appendChild(deleteButton);
    ul.appendChild(buttonsLi);
    
    eventElement.appendChild(ul);
    container.appendChild(eventElement);
  });

}

// Function to handle Edit Event - PUT
async function handleEditEventSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("edit-event-form");
    const originalId = form.getAttribute("data-original-id");

    // AFTER
    const updatedEvent = {
      title: document.getElementById("edit-event-name").value.trim(),
      type: "custom-event",
      category: document.getElementById("edit-event-type").value,
      date: document.getElementById("edit-event-date").value,
      notes: document.getElementById("edit-event-notes").value.trim()
    };

    updatedEvent.recurring = document.getElementById("edit-event-recurring").checked;

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

export function attachEventHandlers() {
  // Add a Custom Event
  const addBtn = document.getElementById("add-event-button");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showAddEventModal();
    });
  }

  // Redirect to About Page
  const aboutBtn = document.getElementById("about-page-button");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
      console.log("Clicked on About link");
      window.location.hash = "about";
    });
  }

  // Set Mystical Preferences
  const toggleMystical = document.getElementById("toggle-mystical");
  if (toggleMystical) {
    toggleMystical.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.mysticalSuggestions = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs);
    });
  }

  const showHolidays = document.getElementById("show-holidays");
  if (showHolidays) {
    showHolidays.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.showHolidays = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs);
    });
  }

  const showCustom = document.getElementById("show-custom-events");
  if (showCustom) {
    showCustom.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.showCustomEvents = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs); // 🪄 Make it visually apply right away
    });
  }

  const showMoons = document.getElementById("show-moons");
  if (showMoons) {
    showMoons.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.showMoons = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs);
    });
  }

  const showEclipses = document.getElementById("show-eclipses");
  if (showEclipses) {
    showEclipses.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.showEclipses = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs);
    });
  }

  const showPast = document.getElementById("show-past-events");
  if (showPast) {
    showPast.addEventListener("change", (e) => {
      const prefs = getMysticalPrefs();
      prefs.showPastEvents = e.target.checked;
      saveMysticalPrefs(prefs);
      applyMysticalSettings(prefs);
    });
  }

  // Ensure the switches reflect saved prefs when Settings opens
  _syncMysticalToggleUI();

  // Initialize the Gregorian → Lunar picker and ensure toggle icons sync for iPad/Safari
  initConversionPicker();
  _syncToggleIcons();
}

export function saveMysticalPrefs(prefs) {
    localStorage.setItem("mysticalPrefs", JSON.stringify(prefs));
}

// --- Delegated click handling for Edit/Delete in the settings list ---
export function setupSettingsEvents() {
  // Attach once, after the settings view is rendered
  const list = document.getElementById("event-list-container");
  if (list) {
    list.addEventListener(
      "click",
      (e) => {
        const btn = e.target.closest(".settings-edit-event, .settings-delete-event");
        if (!btn || !list.contains(btn)) return;

        const payload = {
          id: btn.dataset.id || "",
          key: btn.dataset.key || "",
        };

        if (btn.classList.contains("settings-edit-event")) {
          openEditModal(payload);
        } else if (btn.classList.contains("settings-delete-event")) {
          handleDeleteEvent(payload, btn);
        }
      },
      { passive: true }
    );
  }
}

// Keep toggle UI in sync with saved preferences
function _syncMysticalToggleUI() {
  const prefs = getMysticalPrefs();
  const map = {
    "show-holidays": prefs.showHolidays,
    "show-custom-events": prefs.showCustomEvents,
    "show-moons": prefs.showMoons,
    "show-eclipses": prefs.showEclipses,
    "show-past-events": prefs.showPastEvents
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.checked = !!val;
  });
}

/**
 * Copy data-on/off from the input onto the .slider so CSS on iPad/Safari
 * can read the correct icon for each toggle.
 */
function _syncToggleIcons() {
  document.querySelectorAll("#mystical-settings .mystical-toggle .switch").forEach(label => {
    const input  = label.querySelector("input[type='checkbox']");
    const slider = label.querySelector(".slider");
    if (!input || !slider) return;
    const on  = input.getAttribute("data-on");
    const off = input.getAttribute("data-off");
    if (on)  slider.setAttribute("data-on", on);
    if (off) slider.setAttribute("data-off", off);
  });
}

/**
 * Initialize flatpickr for the "Gregorian → Lunar" converter input
 * and update the rendered lunar date when the user picks a date.
 */
function initConversionPicker() {
  const input = document.getElementById("convert-to-celtic");
  const outEl = document.querySelector(".converted-date");
  if (!input || !outEl || typeof flatpickr !== "function") {
    // Nothing to wire up (or flatpickr not loaded on this view)
    return;
  }

  // iOS-friendly: prevent keyboard from covering the picker
  input.setAttribute("readonly", "readonly");
  input.setAttribute("aria-haspopup", "dialog");

  const fp = flatpickr(input, {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    allowInput: false,
    clickOpens: true,
    theme: "moonveil",
    onChange: (_selectedDates, dateStr) => {
      if (!dateStr) return;
      try {
        const weekday = getCelticWeekdayFromGregorian(dateStr);
        const lunar   = convertGregorianToCeltic(dateStr);
        outEl.textContent = `${weekday}, ${lunar}`;
      } catch (err) {
        console.warn("Failed to convert picked date → lunar:", err);
      }
    }
  });

  // Make sure it opens on tap/click/focus (esp. on iPad)
  input.addEventListener("click", () => fp.open());
  input.addEventListener("focus", () => fp.open(), { once: true });
}

// Utility: build our stable composite key
function _eventKey(e) {
  return `${e?.date}|${e?.title ?? e?.name ?? ""}`;
}

// Utility: match by id OR composite key
function _matches(e, id, key) {
  return String(e?.id) === String(id) || _eventKey(e) === key;
}

// Open the Edit modal, prefilling fields for the selected event
async function openEditModal(arg) {
  const id = typeof arg === "object" ? arg.id : arg;
  const key = typeof arg === "object" ? arg.key : undefined;

  let all = [];
  try {
    all = await fetchCustomEvents(); // merged backend + local
  } catch (e) {
    console.warn("fetchCustomEvents failed in openEditModal:", e);
  }
  if (!Array.isArray(all) || all.length === 0) {
    try {
      all = loadCustomEvents() || [];
    } catch {}
  }

  const evt = all.find((e) => _matches(e, id, key));
  if (!evt) {
    console.error("Event not found.", { id, key });
    return;
  }

  const modalContent = `
    <h2 class="goldenTitle">Edit Your Event</h2>
    <form id="edit-event-form" style="text-align: left;">
        <label for="edit-event-name">Event Name:
            <input type="text" id="edit-event-name" value="${evt.title ?? evt.name ?? ""}" required class="celtic-form-input" />
        </label>
        
        <label for="edit-event-type">Type:
            <select id="edit-event-type" class="celtic-form-input">
                <option value="🔥 Date" ${(evt.category ?? evt.type) === "🔥 Date" ? "selected" : ""}>🔥 Date</option>
                <option value="😎 Friends" ${(evt.category ?? evt.type) === "😎 Friends" ? "selected" : ""}>😎 Friends</option>
                <option value="🎉 Celebrations" ${(evt.category ?? evt.type) === "🎉 Celebrations" ? "selected" : ""}>🎉 Celebrations</option>
                <option value="🌸 My Cycle" ${(evt.category ?? evt.type) === "🌸 My Cycle" ? "selected" : ""}>🌸 My Cycle</option>
                <option value="💡 General" ${(evt.category ?? evt.type) === "💡 General" ? "selected" : ""}>💡 General</option>
                <option value="🏥 Health" ${(evt.category ?? evt.type) === "🏥 Health" ? "selected" : ""}>🏥 Health</option>
                <option value="💜 Romantic" ${(evt.category ?? evt.type) === "💜 Romantic" ? "selected" : ""}>💜 Romantic</option>
                <option value="🖥️ Professional" ${(evt.category ?? evt.type) === "🖥️ Professional" ? "selected" : ""}>🖥️ Professional</option>
            </select>
        </label>

        <label for="edit-event-date">Date:
            <input type="date" id="edit-event-date" value="${evt.date || ""}" required class="celtic-form-input" />
        </label>

        <label for="edit-event-notes">Notes:
            <textarea id="edit-event-notes" class="celtic-form-textarea">${evt.note ?? evt.notes ?? ""}</textarea>
        </label>

        <label for="edit-event-recurring" class="celtic-form-checkbox-container">
            <input type="checkbox" id="edit-event-recurring" ${evt.recurring ? "checked" : ""} class="celtic-form-checkbox" />
            <span class="celtic-form-checkbox-label">Recurring Event</span>
        </label>

        <div style="margin-top: 20px; text-align: center; display: flex; gap: 15px; justify-content: center;">
            <button type="submit" class="settings-btn save-event-btn">Save Changes</button>
            <button type="button" class="settings-btn" id="cancel-edit-event">Cancel</button>
        </div>
    </form>
  `;

  // Show Celtic modal
  const modal = showCelticModal(modalContent, { id: 'edit-event-modal' });

  // Wire form submit
  const form = modal.querySelector("#edit-event-form");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      const saveBtn = e.submitter || form.querySelector(".save-event-btn");
      setBusy(saveBtn, true);

      try {
        const nameEl = form.querySelector("#edit-event-name");
        const typeEl = form.querySelector("#edit-event-type");
        const dateEl = form.querySelector("#edit-event-date");
        const notesEl = form.querySelector("#edit-event-notes");
        const recEl = form.querySelector("#edit-event-recurring");

        const updated = {
          ...evt,
          title: nameEl?.value?.trim() || evt.title || evt.name || "",
          name: nameEl?.value?.trim() || evt.name || evt.title || "",
          category: typeEl?.value || evt.category || evt.type || "💡 General",
          type: "custom-event",
          date: dateEl?.value || evt.date,
          notes: notesEl?.value ?? evt.notes ?? "",
          recurring: !!recEl?.checked,
        };

        // Update local first for instant UX
        try {
          const local = Array.isArray(loadCustomEvents?.()) ? loadCustomEvents() : [];
          const idx = local.findIndex((e) => _matches(e, evt.id, _eventKey(evt)));
          if (idx >= 0) local[idx] = { ...local[idx], ...updated };
          else local.push(updated);
          saveCustomEvents(local);
        } catch (err) {
          console.warn("Local save failed in openEditModal:", err);
        }

        // Best-effort backend update (keyed by date)
        // Update by id (preferred) or composite key fallback
        try {
          const targetId = updated.id || _eventKey(updated);
          await updateCustomEvent(targetId, updated);
        } catch (err) {
          console.warn("Backend update warning:", err);
        }

        // Hide Celtic modal and refresh the list
        hideCelticModal('edit-event-modal');
        
        try { window.renderCustomEventsList?.(); } catch {}
      } finally {
        setBusy(saveBtn, false);
      }
    };
  }

  // Wire cancel button
  const cancelBtn = modal.querySelector("#cancel-edit-event");
  if (cancelBtn) {
    cancelBtn.onclick = () => hideCelticModal('edit-event-modal');
  }
}

// Delete the selected event (local first, then backend best-effort)
async function handleDeleteEvent(arg, btnEl) {
  const id = typeof arg === "object" ? arg.id : arg;
  const key = typeof arg === "object" ? arg.key : undefined;

  setBusy(btnEl, true); // NEW

  try {
    let all = [];
    try { all = await fetchCustomEvents(); }
    catch (e) { console.warn("fetchCustomEvents failed in handleDeleteEvent:", e); }
    if (!Array.isArray(all) || all.length === 0) {
      try { all = loadCustomEvents() || []; } catch {}
    }

    const victim = all.find((e) => _matches(e, id, key));
    if (!victim) {
      console.error("Delete: event not found.", { id, key });
      return;
    }

    // Remove from local
    try {
      const local = Array.isArray(loadCustomEvents?.()) ? loadCustomEvents() : [];
      const next = local.filter((e) => !_matches(e, victim.id, _eventKey(victim)));
      saveCustomEvents(next);
    } catch (err) {
      console.warn("Local delete failed in handleDeleteEvent:", err);
    }

    // Backend delete (by id or composite key fallback)
    try {
      const targetId = victim.id || _eventKey(victim);
      await deleteCustomEvent(targetId);
    } catch (err) {
      console.warn("Backend delete warning:", err);
    }

    try { window.renderCustomEventsList?.(); } catch {}
  } finally {
    setBusy(btnEl, false); // NEW
  }
}

// Fetch and paint the settings list
export async function renderCustomEventsList() {
  try {
    const events = await fetchCustomEvents();
    populateEventList(events);
  } catch (err) {
    console.warn("renderCustomEventsList failed:", err);
    try {
      populateEventList(loadCustomEvents() || []);
    } catch {}
  }
}

// Expose for other modules and inline refresh calls
if (typeof window !== "undefined") {
  window.renderCustomEventsList = renderCustomEventsList;
}