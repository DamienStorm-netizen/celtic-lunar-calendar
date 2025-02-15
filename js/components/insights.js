export function renderInsights() {
    return `
    <section class="settings">
        <h1>Insights</h1>
        <div class="wheel-container">
        <div id="wheel">
            <img src="assets/images/zodiac/zodiac-wheel.png" alt="Celtic Zodiac Wheel" class="zodiac-wheel" />
        </div>
    </div>
    <div class="zodiac-info">
        <h2 id="zodiac-name">Hover over a sign!</h2>
        <p id="zodiac-description"></p>
        <!-- <div id="hover-info">Hover over a sign!</div> -->
    </div>
    </section>
    `;
}

// Define zodiac signs and their descriptions
const zodiacSigns = [
    { name: "Birch", description: "Symbol of renewal and strength." },
    { name: "Rowan", description: "Symbol of protection and insight." },
    { name: "Ash", description: "Symbol of healing and growth." },
    { name: "Alder", description: "Symbol of endurance and passion." },
    { name: "Willow", description: "Symbol of intuition and cycles." },
    { name: "Hawthorn", description: "Symbol of balance and duality." },
    { name: "Oak", description: "Symbol of wisdom and strength." },
    { name: "Holly", description: "Symbol of resilience and defence." },
    { name: "Hazel", description: "Symbol of wisdom and inspiration." },
    { name: "Vine", description: "Symbol of prophecy and change." },
    { name: "Ivy", description: "Symbol of tenacity and connection." },
    { name: "Reed", description: "Symbol of harmony and courage." },
    { name: "Elder", description: "Symbol of transformation and release." }
  ];
  
  export function initializeWheel() {
    const wheel = document.getElementById("wheel");

    if (!wheel) {
        console.error("Wheel element not found! Retrying...");
        setTimeout(initializeWheel, 100);
        return;
    }

    console.log("Wheel successfully found!");

    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;

    // 🛑 Stop animation when interacting
    function startSpin(event) {
        isDragging = true;
        wheel.style.animationPlayState = "paused"; // ❌ Pause idle spin

        const rect = wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        startAngle = Math.atan2(clientY - centerY, clientX - centerX) - currentAngle;
    }

    function spinWheel(event) {
        if (!isDragging) return;
        const rect = wheel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        currentAngle = Math.atan2(clientY - centerY, clientX - centerX) - startAngle;

        // 🌀 Ensure smooth transition without flickering
        wheel.style.transition = "none";
        wheel.style.transform = `translate(-50%, -50%) rotate(${currentAngle}rad)`;
    }

    function stopSpin() {
        isDragging = false;

        // ✅ Allow transition back into idle spin
        wheel.style.transition = "transform 0.5s ease-out";
        wheel.style.animationPlayState = "running"; // 🔄 Resume smooth idle spin
    }

    // Mouse events
    wheel.addEventListener("mousedown", startSpin);
    window.addEventListener("mousemove", spinWheel);
    window.addEventListener("mouseup", stopSpin);

    // Touch events
    wheel.addEventListener("touchstart", startSpin);
    window.addEventListener("touchmove", spinWheel);
    window.addEventListener("touchend", stopSpin);
}

// ✅ Run this after `renderInsights()` finishes
document.addEventListener("DOMContentLoaded", () => {
    console.log("Waiting for renderInsights() to complete...");
    setTimeout(initializeWheel, 200); // 🔄 Wait for the wheel to exist before starting
});