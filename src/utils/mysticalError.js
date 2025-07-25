export function mysticalError(errorMessage = "A mysterious error occurred.", retryCallback = null) {
    console.error("🌒 Mystical Error Shield activated:", errorMessage);

    const app = document.getElementById("app");
    if (!app) return;

    app.innerHTML = `
        <div class="error-screen">
            <h1>🌑 Something Went Mystically Wrong</h1>
            <p>${errorMessage}</p>
            ${retryCallback ? '<button id="retry-button" class="retry-button">🔄 Retry</button>' : ''}
        </div>
    `;

    if (retryCallback) {
        const retryButton = document.getElementById("retry-button");
        retryButton?.addEventListener("click", () => {
            console.log("🔄 Mystical retry triggered...");
            retryCallback();
        });
    }
}