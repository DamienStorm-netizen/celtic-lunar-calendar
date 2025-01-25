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


    // Add inertia to spinning wheel
    let isDragging = false;
    let lastMousePosition = 0; // Track last mouse X position
    let currentRotation = 0; // Track current rotation angle
    let spinVelocity = 0; // Track spin velocity
    // let animationFrameId;

    // Function to apply momentum after dragging
    function applyMomentum() {
        if (Math.abs(spinVelocity) < 0.1) return; // Stop if velocity is negligible
        currentRotation += spinVelocity;
        spinVelocity *= 0.95; // Dampen velocity over time
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        requestAnimationFrame(applyMomentum);
      }

    // Dragging logic
    // Test mousedown event
    wheel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX; // Set the starting mouse position
        console.log("Mouse down detected!");
    });

    // Test mousemove event
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        deltaX = e.clientX - startX;
        currentRotation += deltaX * 0.1; // Adjust multiplier for sensitivity
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        startX = e.clientX;
    });
    /*
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const deltaX = e.clientX - lastMousePosition; // Calculate movement
            currentRotation += deltaX; // Apply rotation
            wheel.style.transform = `rotate(${currentRotation}deg)`; // Update transform
            console.log(`DeltaX: ${deltaX}, Current Rotation: ${currentRotation}`);
            lastMousePosition = e.clientX; // Update position
            if (deltaX !== 0) {
                spinVelocity = deltaX * 1; // Adjust the scaling factor as needed
                console.log("Spin Velocity:", spinVelocity);

                currentRotation += spinVelocity; // Increment rotation
                console.log("Current Rotation:", currentRotation);

                wheel.style.transform = `rotate(${currentRotation}deg)`; // Apply rotation
                console.log("Transform Applied:", wheel.style.transform);

                lastMousePosition = e.clientX; // Update the last mouse position
            }
        }
    });
    */

    // Test mouseup event
    window.addEventListener("mouseup", () => {
        isDragging = false;
        spinVelocity *= 0.9; // Reduce gradually
        requestAnimationFrame(applyMomentum);
      });
  
  // Mobile Touch Events
  wheel.addEventListener("touchstart", (e) => {
    isDragging = true;
    lastMousePosition = e.touches[0].clientX;
    spinVelocity = 0; // Reset velocity to avoid sudden jumps
    cancelAnimationFrame(animationFrameId);
  });
  
  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - lastMousePosition;
        spinVelocity = deltaX * 0.1; // Reduced scaling for smoother control
        currentRotation += deltaX * 0.1; // Apply finer rotation
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        lastMousePosition = e.touches[0].clientX;
    }
  });
  
  document.addEventListener("touchend", () => {
    if (isDragging) {
        isDragging = false;
        applyMomentum();
    }
  });

});