// Exported function to render the home screen

export function renderHome() {
    return `
        <section class="home">
            <div class="celtic-date"></div> <!-- Dynamic content goes here -->
            <div class="celtic-info-container">
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic">
                            <p class="moon-phase-name">Loading...</p>
                        </div>
                        <p class="moon-phase-name">Loading...</p>
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
                    <h3 class="coming-events-header">The Road Ahead</h3>
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
    console.log("🌑 Fetching coming events...");

    try {
        // Get the current Celtic date
        const todayCeltic = await fetchCelticDate();
        if (!todayCeltic) {
            console.error("Could not fetch Celtic date. No upcoming events displayed.");
            return;
        }

        // Extract celticMonth, celticDay, gregorianDate from fetchCelticDate()
        const { celticMonth, celticDay, gregorianDate } = todayCeltic;

        // gregorianDate is a string like "March 06"
        const [monthName, dayStr] = gregorianDate.split(" ");
        const monthNum = getMonthNumber(monthName);  // e.g. "March" -> "03"
        const dayNum = dayStr.padStart(2, "0");      // "06"

        // Now generate the next 5 days
        const upcomingDates = [];
        const baseDate = new Date(`2025-${monthNum}-${dayNum}`);

        for (let i = 0; i < 5; i++) {
            const futureDate = new Date(baseDate);
            futureDate.setDate(baseDate.getDate() + i);

            const formattedFutureDate = `2025-${
                String(futureDate.getMonth() + 1).padStart(2, "0")
            }-${
                String(futureDate.getDate()).padStart(2, "0")
            }`;

        upcomingDates.push(formattedFutureDate);
        }

        console.log("📅 Upcoming Gregorian Dates:", upcomingDates);

        // Fetch all event types
        const [festivals, lunarData, holidays, customEvents, eclipses] = await Promise.all([
            fetchFestivals(),
            fetchMoonPhases(celticMonth),
            fetchNationalHolidays(),
            fetchCustomEvents(),
            fetchEclipses() // <-- Add this new function!
        ]);

        const upcomingEvents = [];

        // 🎭 Add Festivals
        festivals.forEach(event => {
            if (upcomingDates.includes(event.date)) {
                upcomingEvents.push({
                    type: "festival",
                    title: event.title,
                    description: event.description,
                    date: event.date
                });
            }
        });


        // 🌑 Add Eclipses!
        eclipses.forEach(eclipse => {
            console.log("🌑 Checking eclipse:", eclipse);
            if (upcomingDates.includes(eclipse.date.split(" ")[0])) {
                upcomingEvents.push({
                    type: "eclipse",
                    title: `${eclipse.type} 🌑`,
                    description: eclipse.visibility || "Check local conditions.",
                    date: eclipse.date
                });
            }
        });

        console.log("🌑 Eclipse added:", upcomingEvents);

        // 🎉 Add Holidays
        holidays.forEach(holiday => {
            if (upcomingDates.includes(holiday.date)) {
                upcomingEvents.push({
                    type: "holiday",
                    title: holiday.title,
                    description: holiday.notes || "A recognized holiday.",
                    date: holiday.date
                });
            }
        });

        // 💜 Add Custom Events
        customEvents.forEach(event => {
            if (upcomingDates.includes(event.date)) {
                upcomingEvents.push({
                    type: "custom-event",
                    title: event.title,
                    description: event.notes || "A special occasion.",
                    date: event.date
                });
            }
        });

        console.log("🌟 Final Upcoming Events:", upcomingEvents);

        // Populate the Carousel
        populateComingEventsCarousel(upcomingEvents);

    } catch (error) {
        console.error("⚠️ Error fetching coming events:", error);
    }
}

// Fetch upcoming festivals based on the Celtic calendar
export async function fetchFestivals() {
    console.log("Fetching festival data...");

    // 🎉 Define static festival dates (Celtic Calendar)
    const festivalDays = {
        "Janus": { day: 15, name: "Imbolc", description: "A festival of light and renewal, honoring Brigid, goddess of poetry and hearth fire." },
        "Flora": { day: 6, name: "Ostara", description: "The balance of light and dark, celebrating new beginnings." },
        "Brigid": { day: 19, name: "Ostara", description: "The balance of light and dark, celebrating new beginnings." },
        "Maia": { day: 19, name: "Beltaine", description: "The fire festival of passion and fertility, where the veil between worlds is thin." },
        "Solis": { day: 14, name: "Litha", description: "The longest day of the year, honoring the Sun’s peak." },
        "Terra": { day: 27, name: "Lammas", description: "A festival of the harvest, honoring the god Lugh and the first fruits of the land." },
        "Lugh": { day: 19, name: "Mabon", description: "A time of balance and gratitude as the harvest ends." },
        "Eira": { day: 6, name: "Samhain", description: "The gateway to winter, the festival of ancestors, spirits, and shadowy magic." },
        "Aether": { day: 28, name: "Yule", description: "The winter solstice, celebrating the return of the light and the rebirth of the sun." }
    };

    // Get today's Celtic month and day
    const todayCeltic = await fetchCelticDate();
    if (!todayCeltic) {
        console.error("Could not fetch Celtic date. No festivals loaded.");
        return [];
    }

    const { celticMonth, celticDay } = todayCeltic;
    
    // Look up festival for the current month
    const festival = festivalDays[celticMonth];

    if (festival && festival.day >= celticDay && festival.day <= celticDay + 3) {
        return [{
            title: festival.name,
            date: `Brigid ${festival.day}`,
            description: festival.description
        }];
    }

    console.log("No upcoming festivals found.");
    return [];
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

// Fetch upcoming national holidays for the next 5 days
export async function fetchNationalHolidays() {
    console.log("Fetching upcoming national holidays...");

    try {
        // Fetch holiday data from API
        const response = await fetch("/api/national-holidays");
        if (!response.ok) throw new Error("Failed to fetch national holidays");

        const holidays = await response.json();
        console.log("🏛️ National Holidays Retrieved:", holidays);

        // ✅ Get today's date in YYYY-MM-DD format
        const today = new Date();
        const upcomingDates = [];
        for (let i = 0; i < 5; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = `2025-${String(futureDate.getMonth() + 1).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
            upcomingDates.push(formattedDate);
        }

        console.log("📅 Checking holidays for:", upcomingDates);

        // ✅ Filter holidays that match the next 5 days
        const upcomingHolidays = holidays.filter(h => upcomingDates.includes(h.date));

        console.log("🎉 Upcoming Holidays Found:", upcomingHolidays);
        return upcomingHolidays;
    } catch (error) {
        console.error("❌ Error fetching national holidays:", error);
        return [];
    }
}

// Fetch upcoming custom events (birthdays, anniversaries, etc.) for the next 5 days
export async function fetchCustomEvents() {
    console.log("Fetching upcoming custom events...");

    try {
        // Fetch all custom events from the API
        const response = await fetch("/api/custom-events");
        if (!response.ok) throw new Error("Failed to fetch custom events");

        const customEvents = await response.json();
        console.log("🎂 Custom Events Retrieved:", customEvents);

        // ✅ Get today's date in YYYY-MM-DD format
        const today = new Date();
        const upcomingDates = [];
        for (let i = 0; i < 5; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = `2025-${String(futureDate.getMonth() + 1).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
            upcomingDates.push(formattedDate);
        }

        console.log("📅 Checking custom events for:", upcomingDates);

        // ✅ Filter custom events that fall within the next 5 days
        const upcomingCustomEvents = customEvents.filter(event => upcomingDates.includes(event.date));

        console.log("🎊 Upcoming Custom Events Found:", upcomingCustomEvents);
        return upcomingCustomEvents;
    } catch (error) {
        console.error("❌ Error fetching custom events:", error);
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

    if (events.length === 0) {
        carouselContainer.innerHTML = "<p>No upcoming events.</p>";
        return;
    }

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
            case "eclipse":
                icon = "🌑"; // Eclipse emoji
                break;
        }

        const celticDate = convertGregorianToCeltic(event.date);
        slide.innerHTML = `
            <h3 class="event-title">${icon} ${event.title}</h3>
            <p class="event-date">${celticDate}</p>
            <p class="event-description">${event.description}</p>
        `;

        carouselContainer.appendChild(slide);
    });

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

// Fetch upcoming lunar and solar eclipses
export async function fetchEclipses() {
    console.log("🌒 Fetching upcoming eclipses...");
    
    try {
        const response = await fetch("/api/eclipses");
        if (!response.ok) throw new Error("Failed to fetch eclipse data.");

        const eclipses = await response.json();
        console.log("🌘 Eclipses Retrieved:", eclipses);
        return eclipses;
    } catch (error) {
        console.error("❌ Error fetching eclipses:", error);
        return [];
    }
}