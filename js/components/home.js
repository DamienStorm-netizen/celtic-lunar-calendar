import { getMysticalPrefs } from "./settings.js";

export function renderHome() {
    return `
        <section class="home" class="fade-in">
            <div class="celtic-date"></div> <!-- Dynamic content goes here -->
            <div class="celtic-info-container">
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic">
                            <h4 class="moon-phase-name">Loading...</h4>
                        </div>
                        <h4 class="moon-phase-name">Loading...</h4>
                    </div>
                </div>

                <!-- Celtic Zodiac Column -->
                <div class="zodiac-column">
                    <div class="celtic-zodiac">
                        <p class="goldenTitle">Celtic Zodiac</p>
                        <div class="celtic-zodiac-details">
                            <h4 class="zodiac-sign">Loading...</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tree-of-life">

                <!-- Moon Poem -->
                <div class="poem-container">
                    <blockquote class="moon-poem">Fetching poetic wisdom...</blockquote>
                </div>

                <!-- What's Happening! Carousel -->
                <div id="coming-events-container">
                    <h3 class="coming-events-header">The Journey Unfolds</h3>
                    <button class="coming-events-carousel-prev">❮</button>
                    <div id="coming-events-carousel" class="coming-events-carousel-container">
                        <button class="coming-events-carousel-prev">❮</button>
                        <div class="coming-events-slide active">
                            <p>Loading events...</p>
                        </div>
                    </div>
                    <button class="coming-events-carousel-next">❯</button>
                </div>

            </div>
        </section>
    `;

    async function setupHomeScreen() {
        //await fetchCelticDate(); // Fetch the Celtic date and update UI
        await fetchComingEvents(); // Fetch upcoming events separately
        console.log("Fetching Coming Events from renderHome");
    }
}

// Fetch the Celtic date dynamically and update the home screen
export async function fetchCelticDate() {
    try {
        const response = await fetch('/api/celtic-date');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Celtic Date:", data);

        // Ensure the data contains the necessary values
        if (!data || !data.month || !data.celtic_day) {
            throw new Error("Incomplete Celtic date data received.");
        }

        // Update the home screen UI
        const dateContainer = document.querySelector('.celtic-date');
        if (dateContainer) {
            dateContainer.innerHTML = `
                <h1 id="celtic-day">${data.day}</h1>
                <p><span id="celtic-month">${data.month} ${data.celtic_day}</span> / <span id="gregorian-month">${data.gregorian_date}</span></p>
            `;
        }

        // ✅ Return structured data so other functions can use it
        return {
            celticMonth: data.month,
            celticDay: parseInt(data.celtic_day, 10),
            gregorianDate: data.gregorian_date
        };

    } catch (error) {
        console.error("Failed to fetch Celtic date:", error);
        return null; // Return null instead of breaking execution
    }
}

// Fetch the Celtic Zodiac sign for the day
export async function fetchCelticZodiac() {
    try {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD
        const response = await fetch(`/zodiac?date=${today}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const zodiacData = await response.json();

        // Select the container for the Zodiac details
        const zodiacContainer = document.querySelector('.celtic-zodiac-details');

        if (zodiacContainer) {
            zodiacContainer.innerHTML = `
                <img class="celtic-zodiac-image" src="assets/images/zodiac/zodiac-${zodiacData.zodiac_sign}.png" alt="${zodiacData.zodiac_sign}" />
                <h3>${zodiacData.zodiac_sign}</h3>
                <!-- <p>${zodiacData.symbolism}</p>
                <p><strong>Animal:</strong> ${zodiacData.animal}</p>
                <p><strong>Mythical Creature:</strong> ${zodiacData.mythical_creature}</p>
                -->
            `;
        }
    } catch (error) {
        console.error('Failed to fetch Celtic Zodiac:', error);
    }
}

// Fetch the Moon Phase dynamically and update the home screen
export async function fetchDynamicMoonPhase() {
    const today = new Date().toISOString().split('T')[0]; // Today's date in ISO format
    try {
        const response = await fetch(`/dynamic-moon-phases?start_date=${today}&end_date=${today}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length > 0) {
            const moonPhase = data[0];

            // Select the container for the moon phase
            const moonPhaseContainer = document.querySelector('.moon-phase');

            // Update the UI with moon phase details
            moonPhaseContainer.innerHTML = `
                <div class="moon-phase-details">
                    <div class="moon-phase-graphic">${moonPhase.graphic}</div>
                    <p>${moonPhase.moonName || moonPhase.phase} </p>
                    <!-- <span>${moonPhase.poem || 'A sliver of light...'}</span> -->
                </div>
            `;
            console.log(moonPhase.graphic);
        } else {
            console.warn('No moon phase data available.');
        }
    } catch (error) {
        console.error('Failed to fetch moon phase:', error);
    }
}

// Fetch the Moon Phase poem and update home screen
export async function fetchPoemAndUpdate() {
    try {
        const response = await fetch('/api/lunar-phase-poem');
        if (!response.ok) throw new Error('Failed to fetch the poem.');

        const data = await response.json();
        const poemContainer = document.querySelector('.moon-poem');

        if (poemContainer) {
            poemContainer.innerHTML = `
                ${data.poem}
            `;
        }
    } catch (error) {
        console.error('Error fetching the moon poem:', error);
    }
}

// Fetch upcoming events for the next 5 days
export async function fetchComingEvents() {
    console.log("Fetching coming events...");
  
    try {
      // 1) Get the Celtic date (to figure out today’s Gregorian date).
      const todayCeltic = await fetchCelticDate();
      if (!todayCeltic) {
        console.error("Could not fetch Celtic date. No upcoming events displayed.");
        return;
      }
  
      const { celticMonth, celticDay, gregorianDate } = todayCeltic;
      if (!gregorianDate || typeof gregorianDate !== "string") {
        console.error("🚨 gregorianDate is missing or not a string!", gregorianDate);
        return;
      }
  
      // 2) Convert “March 11” => monthName="March", day="11"
      const [monthName, day] = gregorianDate.split(" ");
      const gregorianMonth = getMonthNumber(monthName);  // e.g. "03"
      const gregorianDay   = day.padStart(2, "0");       // e.g. "11"
  
      const todayDate = new Date(`2025-${gregorianMonth}-${gregorianDay}`);
      const upcomingDates = [];
  
      // 3) Generate next 5 days in YYYY-MM-DD
      for (let i = 0; i < 7; i++) {
        const futureDate = new Date(todayDate);
        futureDate.setDate(todayDate.getDate() + i);
  
        const y  = futureDate.getFullYear();
        const m  = String(futureDate.getMonth() + 1).padStart(2, "0");
        const d  = String(futureDate.getDate()).padStart(2, "0");
        const iso = `${y}-${m}-${d}`;
        upcomingDates.push(iso);
      }
      console.log("Next 5 Gregorian Dates:", upcomingDates);
  
      // 4) Fetch all data in parallel
      const [festivals, lunarData, holidays, customEvents, eclipses] = await Promise.all([
        fetchFestivals(),        // now returns *all* festivals in Gregorian date
        fetchMoonPhases(celticMonth),
        fetchNationalHolidays(), // unify logic if needed
        fetchCustomEvents(),      // now returns *all* custom events
        fetchEclipses()  // 🌑 Fetch Eclipse Data
      ]);
  
      // 5) Prepare an empty array to store all upcoming events
      const upcomingEvents = [];
  
      // 5A) Add any festivals that fall within those 5 days
      upcomingDates.forEach(date => {
        console.log(`🔍 Checking festivals for date: ${date}`);
        
        festivals.forEach(festival => {
            console.log(`   🎭 Comparing with festival: ${festival.title} | Date: ${festival.date}`);
        });
    
        const festival = festivals.find(f => f.date === date);
        
        if (festival) {
            console.log("✅ Festival match found!", festival.date, "vs", date);
            console.log("Festival Object:", festival);
    
            upcomingEvents.push({
                type: "festival",
                title: festival.title,
                description: festival.description || "A sacred celebration.",
                date
            });
        } else {
            console.log("❌ No festival match for", date);
        }
    });
  
      // 5B) Add Full Moons (already works)
      upcomingDates.forEach(date => {
        const moonEvent = lunarData.find(moon => moon.date === date && moon.phase === "Full Moon");
        if (moonEvent) {
          upcomingEvents.push({
            type: "full-moon",
            title: moonEvent.moonName || "Full Moon",
            description: moonEvent.description || "A night of celestial power.",
            date
          });
        }
      });

       // 🌑 Add Lunar & Solar Eclipses (Updated)
        eclipses.forEach(eclipse => {
            console.log("🌘 Checking eclipse:", eclipse);
            if (upcomingDates.includes(eclipse.date.split(" ")[0])) {
                upcomingEvents.push({
                    type: "eclipse",
                    title: `${eclipse.title} 🌑`,
                    description: getRandomEclipseDescription(),
                    date: eclipse.date
                });
            }
        });
  
      // 5C) Add national holidays
      upcomingDates.forEach(date => {
        const holiday = holidays.find(h => h.date === date);
        if (holiday) {
          upcomingEvents.push({
            type: "holiday",
            title: holiday.title,
            description: holiday.notes || "A recognized holiday.",
            date
          });
        }
      });
  
      // 5D) Add custom events
      upcomingDates.forEach(date => {
        const event = customEvents.find(e => e.date === date);
        if (event) {
          upcomingEvents.push({
            type: "custom-event",
            title: event.title,
            description: event.notes || "A personal milestone.",
            date
          });
        }
      });

      const prefs = getMysticalPrefs();

    // Mystical Troubleshooting
    console.log("🌟 Mystical Preferences:", prefs);

    /* 🎭 Apply mystical filters (Settings)*/
    const filteredEvents = upcomingEvents.filter(event => {
        if (event.type === "holiday" && !prefs.showHolidays) return false;
        if (event.type === "full-moon" && !prefs.showMoons) return false;
        if (event.type === "eclipse" && !prefs.showEclipses) return false;
        if (event.type === "custom-event" && !prefs.showCustomEvents) return false;
        return true; // Keep everything else
    });

    // const filteredEvents = upcomingEvents;
    // temporarily skip filter to verify display logic
  
    console.log("Final Upcoming Events Array:", upcomingEvents);
    if (document.getElementById("coming-events-container")) {
        populateComingEventsCarousel(filteredEvents);
      }

    } catch (error) {
        console.error("Error fetching coming events:", error);
    }
}

// Fetch upcoming festivals based on the Celtic calendar
export async function fetchFestivals() {
    try {
        // Fetch the festival data (assuming it's served from an endpoint)
        const response = await fetch('/festivals'); 
        if (!response.ok) throw new Error("Failed to fetch special days");

        const specialDays = await response.json();
        
        // Normalize festival dates to YYYY-MM-DD format
        const festivalData = specialDays.map(day => ({
            type: "festival",
            title: day.name,
            description: day.description || "A sacred celebration.",
            date: new Date(day.date).toISOString().split('T')[0]  // Normalize format
        }));

        console.log('📅 Festival data processed:', festivalData);
        return festivalData;

    } catch (err) {
        console.error("🚨 Error fetching festivals:", err);
        return [];
    }
}

// Fetch upcoming moon phases based on the Celtic calendar
export async function fetchMoonPhases(celticMonth) {
    console.log(`Fetching moon phases for ${celticMonth}...`);

    // 🎑 Define Celtic month-to-Gregorian range mapping
    const celticMonthMapping = {
        "Nivis": { start: "2024-12-23", end: "2025-01-19" },
        "Janus": { start: "2025-01-20", end: "2025-02-16" },
        "Brigid": { start: "2025-02-17", end: "2025-03-16" },
        "Flora": { start: "2025-03-17", end: "2025-04-13" },
        "Maia": { start: "2025-04-14", end: "2025-05-11" },
        "Juno": { start: "2025-05-12", end: "2025-06-08" },
        "Solis": { start: "2025-06-09", end: "2025-07-06" },
        "Terra": { start: "2025-07-07", end: "2025-08-03" },
        "Lugh": { start: "2025-08-04", end: "2025-08-31" },
        "Pomona": { start: "2025-09-01", end: "2025-09-28" },
        "Autumna": { start: "2025-09-29", end: "2025-10-26" },
        "Eira": { start: "2025-10-27", end: "2025-11-23" },
        "Aether": { start: "2025-11-24", end: "2025-12-21" }
    };

    // Ensure valid month
    if (!celticMonthMapping[celticMonth]) {
        console.error("Invalid Celtic month:", celticMonth);
        return [];
    }

    // Get the Gregorian range for this Celtic month
    const { start, end } = celticMonthMapping[celticMonth];

    try {
        // Call the API for moon phases within the given date range
        const response = await fetch(`/dynamic-moon-phases?start_date=${start}&end_date=${end}`);
        if (!response.ok) throw new Error("Failed to fetch moon phases");

        const moonData = await response.json();
        console.log("🌙 Moon Phases Retrieved:", moonData);
        return moonData;
    } catch (error) {
        console.error("❌ Error fetching moon phases:", error);
        return [];
    }
}

// 🌑 Fetch upcoming eclipses
export async function fetchEclipses() {
    console.log("Fetching upcoming eclipse events...");
    try {
        const response = await fetch("/api/eclipse-events");
        if (!response.ok) throw new Error("Failed to fetch eclipse events");

        const eclipses = await response.json();
        console.log("🌘 Eclipses Retrieved:", eclipses);
        return eclipses;
    } catch (error) {
        console.error("Error fetching eclipses:", error);
        return [];
    }
}

 // 🌑 Array of mystical eclipse descriptions
 const eclipseDescriptions = [
    "Shadow and light embrace in celestial dance, a moment between worlds.",
    "A veil of shadow whispers across the sky, heralding change and prophecy.",
    "When the sun and moon entwine, fate's hand turns unseen pages.",
    "A doorway of darkness, a path of light—step into the unknown.",
    "The sky dims, the air hums—something ancient stirs in the eclipse's glow."
];

// 🔮 Get a random eclipse description
export function getRandomEclipseDescription() {
    return eclipseDescriptions[Math.floor(Math.random() * eclipseDescriptions.length)];
}

// Fetch upcoming national holidays for the next 3 days
export async function fetchNationalHolidays() {
    console.log("Fetching upcoming national holidays...");

    try {
        const response = await fetch("/api/national-holidays");
        if (!response.ok) throw new Error("Failed to fetch national holidays");
    
        const nationalHolidays = await response.json();
        // Return everything; no date filtering here.
        return nationalHolidays; 
      } catch (error) {
        console.error("Error fetching national holidays:", error);
        return [];
      }
}

// Fetch upcoming custom events (birthdays, anniversaries, etc.) for the next 3 days
export async function fetchCustomEvents() {
    console.log("Fetching custom events...");
    try {
      const response = await fetch("/api/custom-events");
      if (!response.ok) throw new Error("Failed to fetch custom events");
  
      const customEvents = await response.json();
      // Return everything; no date filtering here.
      console.log('Custom events are: ', customEvents);
      return customEvents; 
    } catch (error) {
      console.error("Error fetching custom events:", error);
      return [];
    }
}

// Populate the Coming Events carousel
export function populateComingEventsCarousel(events) {
    const carouselContainer = document.getElementById("coming-events-carousel");

    if (!carouselContainer) {
        console.error("Carousel container not found!");
        return;
    }

    carouselContainer.innerHTML = ""; // Clear previous slides

    events.forEach((event, index) => {
        const slide = document.createElement("div");
        slide.classList.add("coming-events-slide");
        if (index === 0) slide.classList.add("active"); // Set the first slide as active

        let icon = "";
        switch (event.type) {
            case "festival":
                icon = "🔥"; // Fire for Celtic festivals
                break;
            case "full-moon":
                icon = "🌕"; // Moon emoji
                break;
            case "holiday":
                icon = "🎉"; // Celebration emoji
                break;
            case "custom-event":
                icon = "💜"; // Custom events
                break;
        }

        // Convert Gregorian date to Celtic date
        const celticDate = convertGregorianToCeltic(event.date);

        slide.innerHTML = `
            <h3 class="coming-events-title">${icon} ${event.title}</h3>
            <p class="coming-events-date">${celticDate}</p>
            <p class="coming-events-description">${event.description}</p>
        `;

        carouselContainer.appendChild(slide);
    });

    //Fallback poetry for carousel
    if (!Array.isArray(events) || events.length === 0) {
        // 🔮 Hide arrows when no events exist
        const leftArrow = document.querySelector(".coming-events-carousel-prev");
        const rightArrow = document.querySelector(".coming-events-carousel-next");
        if (leftArrow && rightArrow) {
            leftArrow.classList.add("hidden");
            rightArrow.classList.add("hidden");
        }

        const mysticalMessages = [
            "💫 The stars whisper, but no great events stir. The journey continues in quiet contemplation... 💫",
            "✨ The wind carries no omens today, only the gentle breath of the earth. Rest in the rhythm of the moment. ✨",
            "🔮 The threads of fate are still weaving. In the quiet, new paths may emerge... 🔮",
            "🦉 Even in stillness, the world turns. The wise ones know that the silence holds its own kind of magic. 🦉",
            "🔥 No great fires are lit, no grand feasts are planned, but the embers of time still glow beneath the surface. 🔥",
            "🌟 Tonight, the universe is quiet, waiting. Perhaps the next moment holds something unseen... 🌟"
        ];
        
        const message = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];
        carouselContainer.innerHTML = `
            <div class="coming-events-slide active">
                <p class="mystical-message">${message}</p>
            </div>
        `;
        return;
    }

    /*
    if (leftArrow && rightArrow) {
        if (shouldShowArrows) {
            leftArrow.classList.remove("hidden");
            rightArrow.classList.remove("hidden");
        } else {
            leftArrow.classList.add("hidden");
            rightArrow.classList.add("hidden");
        }
    }
    */

    initializeCarouselNavigation();
}

export function initializeCarouselNavigation() {
    const slides = document.querySelectorAll(".coming-events-slide");
    const prevButton = document.querySelector(".coming-events-carousel-prev");
    const nextButton = document.querySelector(".coming-events-carousel-next");
    let currentSlide = 0;
    let autoScroll;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            slide.style.opacity = "0"; // Start fade out
            if (i === index) {
                slide.classList.add("active");
                setTimeout(() => (slide.style.opacity = "1"), 300); // Fade in effect
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoScroll() {
        clearInterval(autoScroll); // Ensure no duplicate intervals
        autoScroll = setInterval(nextSlide, 6000); // Start fresh interval
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
        setTimeout(startAutoScroll, 8000); // Restart after 8 seconds if no interaction
    }

    // Attach event listeners for manual navigation
    prevButton.addEventListener("click", () => {
        prevSlide();
        stopAutoScroll();
    });

    nextButton.addEventListener("click", () => {
        nextSlide();
        stopAutoScroll();
    });

    // Pause auto-scroll when the user hovers over the carousel
    document.querySelector("#coming-events-carousel").addEventListener("mouseenter", stopAutoScroll);
    document.querySelector("#coming-events-carousel").addEventListener("mouseleave", startAutoScroll);

    // Start auto-scroll initially
    startAutoScroll();
}

export function getMonthNumber(monthName) {
    const months = {
        "January": "01", "February": "02", "March": "03", "April": "04",
        "May": "05", "June": "06", "July": "07", "August": "08",
        "September": "09", "October": "10", "November": "11", "December": "12"
    };
    return months[monthName] || null;
}

export function convertGregorianToCeltic(gregorianDate) {
    const monthMapping = {
        "Nivis": { start: "2024-12-23", end: "2025-01-19" },
        "Janus": { start: "2025-01-20", end: "2025-02-16" },
        "Brigid": { start: "2025-02-17", end: "2025-03-16" },
        "Flora": { start: "2025-03-17", end: "2025-04-13" },
        "Maia": { start: "2025-04-14", end: "2025-05-11" },
        "Juno": { start: "2025-05-12", end: "2025-06-08" },
        "Solis": { start: "2025-06-09", end: "2025-07-06" },
        "Terra": { start: "2025-07-07", end: "2025-08-03" },
        "Lugh": { start: "2025-08-04", end: "2025-08-31" },
        "Pomona": { start: "2025-09-01", end: "2025-09-28" },
        "Autumna": { start: "2025-09-29", end: "2025-10-26" },
        "Eira": { start: "2025-10-27", end: "2025-11-23" },
        "Aether": { start: "2025-11-24", end: "2025-12-21" },
    };

    const inputDate = new Date(gregorianDate);
    if (isNaN(inputDate.getTime())) {
        console.error("Invalid Gregorian date:", gregorianDate);
        return "Invalid Date";
    }

    for (const [celticMonth, range] of Object.entries(monthMapping)) {
        const startDate = new Date(range.start);
        const endDate = new Date(range.end);

        if (inputDate >= startDate && inputDate <= endDate) {
            const celticDay = Math.floor((inputDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            return `${celticMonth} ${celticDay}`;
        }
    }

    return "Unknown Date";
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🏡 Home screen loaded, fetching upcoming events...");
    await fetchComingEvents(); // ✅ this already calls populateComingEventsCarousel internally
});