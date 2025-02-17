export function renderInsights() {
    return `
    <section class="settings">
        <h1>Insights</h1>
        <div id="insightsNavBar">Insights Navigation Bar</div>
        <div class="celtic-zodiac">
            <h2 class="goldNugget">Discover Your Zodiac</h2>
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
    const hoverInfo = document.getElementById("hover-info");
    const zodiacName = document.getElementById("zodiac-name");
    const zodiacDescription = document.getElementById("zodiac-description");
  
    const radius = wheel.offsetWidth / 2;
    const centerX = radius;
    const centerY = radius;
    const adjustmentFactor = 0.66; // Tightened circle
    const rotationOffset = Math.PI / -120; // Clockwise rotation offset
    const xOffset = 4; // Manual fine-tune for X
    const yOffset = -3; // Manual fine-tune for Y
  
    zodiacSigns.forEach((sign, index) => {
      const angle = (index / zodiacSigns.length) * 2 * Math.PI + rotationOffset;
  
      const xPos = centerX + Math.cos(angle) * (radius * adjustmentFactor) + xOffset;
      const yPos = centerY + Math.sin(angle) * (radius * adjustmentFactor) + yOffset;
  
      const hotspot = document.createElement("div");
      hotspot.classList.add("hotspot");
      hotspot.style.left = `${xPos}px`;
      hotspot.style.top = `${yPos}px`;
      hotspot.dataset.zodiac = sign.name;
  
      hotspot.addEventListener("mouseenter", () => {
        zodiacName.textContent = sign.name;
        zodiacDescription.textContent = sign.description;
      });
  
      hotspot.addEventListener("mouseleave", () => {
        zodiacName.textContent = "Hover over a sign!";
        zodiacDescription.textContent = "";
      });
  
      wheel.appendChild(hotspot);
    });
  
    // Enable spinning of the Zodiac Wheel
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;
  
    // Function to get rotation angle
    function getRotationAngle(event, isTouch = false) {
      const rect = wheel.getBoundingClientRect();
      const x = (isTouch ? event.touches[0].clientX : event.clientX) - rect.left - rect.width / 2;
      const y = (isTouch ? event.touches[0].clientY : event.clientY) - rect.top - rect.height / 2;
      return Math.atan2(y, x) * (180 / Math.PI);
    }
  
    // Start spinning
    function startSpin(event) {
      isDragging = true;
      wheel.classList.add("no-animation"); // Stop the slow spin
      startAngle = getRotationAngle(event, event.type === "touchstart");
      currentAngle = parseFloat(wheel.dataset.angle) || 0;
      event.preventDefault();
    }
  
    // Spin the wheel
    function spinWheel(event) {
      if (!isDragging) return;
      const currentRotation = getRotationAngle(event, event.type === "touchmove");
      const deltaAngle = currentRotation - startAngle;
      wheel.style.transform = `rotate(${currentAngle + deltaAngle}deg)`;
    }
  
    // Stop spinning
    function stopSpin(event) {
      if (!isDragging) return;
      isDragging = false;
      const rectifiedAngle = parseFloat(wheel.style.transform.replace(/[^\d.-]/g, '')) % 360;
      currentAngle = rectifiedAngle < 0 ? rectifiedAngle + 360 : rectifiedAngle;
      wheel.dataset.angle = currentAngle;
  
      // Restart the slow spin after a delay
      setTimeout(() => {
        wheel.classList.remove("no-animation");
      }, 2000); // Wait 2 seconds before resuming the slow spin
    }
  
    // Stop animation on hover
    wheel.addEventListener("mouseenter", () => {
      wheel.classList.add("hover-stop");
    });
  
    // Resume animation on mouse leave
    wheel.addEventListener("mouseleave", () => {
      if (!isDragging) {
        wheel.classList.remove("hover-stop");
      }
    });
  
  
    // Mouse events
    wheel.addEventListener("mousedown", startSpin);
    window.addEventListener("mousemove", spinWheel);
    window.addEventListener("mouseup", stopSpin);
  
    // Touch events
    wheel.addEventListener("touchstart", startSpin);
    window.addEventListener("touchmove", spinWheel);
    window.addEventListener("touchend", stopSpin);
};