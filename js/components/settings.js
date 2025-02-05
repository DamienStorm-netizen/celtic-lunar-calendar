export function renderSettings() {
    const app = document.getElementById('app');
    return `
    <section class="settings">
        <h1>Settings</h1>
        <div id="settings-panel">
            <label>Theme: 
                <select>
                    <option value="default">Default</option>
                    <option value="dark">Dark Mode</option>
                </select>
            </label>
        </div>

        <div class="modal-toggles">
            <div>
                <span>Show Lunar Phases:</span>
                <button id="toggle-lunar-phases" class="toggle-button" data-active="false">No</button>
                <button class="toggle-button">No</button>
            </div>
            <div>
                <span>Show Festivals:</span>
                <button id="toggle-festivals" class="toggle-button" data-active="false">No</button>
                <button class="toggle-button">No</button>
            </div>
        </div>

    </section>
    `;
    
}

export function setupSettingsEvents() {
    const lunarToggle = document.getElementById("toggle-lunar-phases");
    const festivalsToggle = document.getElementById("toggle-festivals");

    // Load initial preferences from local storage
    lunarToggle.dataset.active = localStorage.getItem("showLunarPhases") === "true" ? "true" : "false";
    festivalsToggle.dataset.active = localStorage.getItem("showFestivals") === "true" ? "true" : "false";

    // Update button text
    lunarToggle.textContent = lunarToggle.dataset.active === "true" ? "Yes" : "No";
    festivalsToggle.textContent = festivalsToggle.dataset.active === "true" ? "Yes" : "No";

    // Toggle lunar phases
    lunarToggle.addEventListener("click", () => {
        const isActive = lunarToggle.dataset.active === "true";
        lunarToggle.dataset.active = !isActive;
        lunarToggle.textContent = isActive ? "No" : "Yes";
        localStorage.setItem("showLunarPhases", !isActive);
    });

    // Toggle festivals
    festivalsToggle.addEventListener("click", () => {
        const isActive = festivalsToggle.dataset.active === "true";
        festivalsToggle.dataset.active = !isActive;
        festivalsToggle.textContent = isActive ? "No" : "Yes";
        localStorage.setItem("showFestivals", !isActive);
    });
}
