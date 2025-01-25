let currentRotation = 0; // Declare at the top of your script

// Define zodiac signs and their descriptions
const zodiacSigns = [
    { name: "Birch", description: "Symbol of renewal and strength.", top: "5%", left: "50%" },
    { name: "Rowan", description: "Symbol of protection and insight.", top: "15%", left: "75%" },
    { name: "Ash", description: "Symbol of healing and growth.", top: "35%", left: "90%" },
    { name: "Alder", description: "Symbol of endurance and passion.", top: "60%", left: "80%" },
    { name: "Willow", description: "Symbol of intuition and cycles.", top: "75%", left: "55%" },
    { name: "Hawthorn", description: "Symbol of balance and duality.", top: "80%", left: "25%" },
    { name: "Oak", description: "Symbol of wisdom and strength.", top: "70%", left: "10%" },
    { name: "Holly", description: "Symbol of resilience and defence.", top: "50%", left: "2%" },
    { name: "Hazel", description: "Symbol of wisdom and inspiration.", top: "30%", left: "10%" },
    { name: "Vine", description: "Symbol of prophecy and change.", top: "15%", left: "25%" },
    { name: "Ivy", description: "Symbol of tenacity and connection.", top: "10%", left: "45%" },
    { name: "Reed", description: "Symbol of harmony and courage.", top: "20%", left: "65%" },
    { name: "Elder", description: "Symbol of transformation and release.", top: "40%", left: "75%" }
  ];


document.addEventListener("DOMContentLoaded", () => {
    const wheel = document.getElementById("wheel");
    const hotspots = document.querySelectorAll(".hotspot");
    const totalHotspots = hotspots.length;
    const radius = 250; // Radius of the wheel (half of its width/height)

    const wheelRadius = 165; // Radius of the wheel
    const offsetX = 255; // Centre X (half the wheel size)
    const offsetY = 245; // Centre Y (half the wheel size)
  
    // Position hotspots evenly around the wheel
    hotspots.forEach((hotspot, index) => {
        const angle = (index / totalHotspots) * 2 * Math.PI; // Calculate angle
        const xPos = offsetX + wheelRadius * Math.cos(angle); // X coordinate
        const yPos = offsetY + wheelRadius * Math.sin(angle); // Y coordinate

        hotspot.style.left = `${xPos}px`;
        hotspot.style.top = `${yPos}px`;

        // hotspot.style.left = `${xPos - hotspot.offsetWidth / 2}px`; // Centre align hotspot
        // hotspot.style.top = `${yPos - hotspot.offsetHeight / 2}px`; // Centre align hotspot
  
      // Add hover interactivity
      hotspot.addEventListener("mouseover", () => {
        const zodiac = hotspot.dataset.zodiac;
        document.getElementById("hover-info").innerText = zodiac; // Update info display
      });
    });
  
     // Pause spinning on hover
    wheel.addEventListener("mouseover", () => {
        wheel.style.animationPlayState = "paused"; // Pause spinning
    });

    // Resume spinning on mouse leave
    wheel.addEventListener("mouseout", () => {
        wheel.style.animationPlayState = "running"; // Resume spinning
    });

});