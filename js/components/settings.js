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
    </section>
    `;
    
}
