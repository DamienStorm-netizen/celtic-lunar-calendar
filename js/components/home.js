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

                <!-- Coming Events Carousel -->
                <div id="coming-events-container">
                    <h3 class="coming-events-header">Coming Events</h3>
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

// Fetch upcoming events for the next 3 days
export async function fetchComingEvents() {
    console.log("Fetching coming events...");

    try {
        // Get the current Celtic date
        const todayCeltic = await fetchCelticDate();
        if (!todayCeltic) {
            console.error("Could not fetch Celtic date. No upcoming events displayed.");
            return;
        }

        const { celticMonth, celticDay, gregorianDate } = todayCeltic;
        console.log(`Today's Celtic Date: ${celticMonth} ${celticDay} | Gregorian Date: ${gregorianDate}`);

        // ✅ Ensure fetchComingEvents waits for a valid date before proceeding
        if (!celticMonth || !celticDay) {
            console.error("Celtic date is incomplete. Stopping fetchComingEvents.");
            return;
        }

        // Use the Gregorian date directly from fetchCelticDate()
        if (!gregorianDate || typeof gregorianDate !== "string") {
            console.error("🚨 gregorianDate is missing or not a string!", gregorianDate);
            return;
        }
        
        const [monthName, day] = gregorianDate.split(" "); // Example: "March 06" -> ["March", "06"]
        const gregorianMonth = getMonthNumber(monthName);
        const gregorianDay = day.padStart(2, "0");
        
        if (!gregorianMonth || !gregorianDay) {
            console.error("🚨 Gregorian conversion failed. Month or Day is undefined.", gregorianMonth, gregorianDay);
            return;
        }
        
        const gregorianToday = {
            gregorianMonth,
            gregorianDay
        };
        
        console.log("✅ Finalized Gregorian Today:", gregorianToday);
        console.log(`Using Gregorian Date: ${gregorianToday}`);

        const todayDate = new Date(`2025-${String(gregorianToday.gregorianMonth).padStart(2, "0")}-${String(gregorianToday.gregorianDay).padStart(2, "0")}`);
        const upcomingDates = [];

        // Generate the next 5 days in Gregorian format
        for (let i = 0; i < 5; i++) {
            const futureDate = new Date(todayDate);
            futureDate.setDate(todayDate.getDate() + i);

            const formattedFutureDate = `2025-${String(futureDate.getMonth() + 1).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
            upcomingDates.push(formattedFutureDate);
        }

        console.log("📅 Fixed Upcoming Gregorian Dates:", upcomingDates);

        // Fetch all event types
        const [festivals, lunarData, holidays, customEvents] = await Promise.all([
            fetchFestivals(),
            fetchMoonPhases(celticMonth),
            fetchNationalHolidays(),
            fetchCustomEvents()
        ]);

        console.log("Fetched Festivals:", festivals);
        console.log("Fetched Moon Phases:", lunarData);
        console.log("Fetched Holidays:", holidays);
        console.log("Fetched Custom Events:", customEvents);

        // Filter upcoming events
        const upcomingEvents = [];
        

        // Add Festivals
        upcomingDates.forEach(date => {
            const festival = festivals.find(f => f.date === date);
            if (festival) {
                upcomingEvents.push({
                    type: "festival",
                    title: festival.title,
                    description: festival.notes || "A sacred celebration.",
                    date
                });
            }
        });

        // Add Full Moons
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

        // Add National Holidays for the next 3 days
        console.log("Checking holidays for upcoming dates:", upcomingDates);

        upcomingDates.forEach(upcomingDate => {
            console.log(`🔍 Checking holiday for: ${upcomingDate}`);
            
            const holiday = holidays.find(h => h.date === upcomingDate);
            
            if (holiday) {
                console.log(`🎉 Found upcoming holiday: ${holiday.title} on ${holiday.date}`);
                upcomingEvents.push({
                    type: "holiday",
                    title: holiday.title,
                    description: holiday.notes || "A recognized holiday.",
                    date: upcomingDate // ✅ Ensure we're passing the correct date
                });
            }
        });


        // Add Custom Events
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

        if (!Array.isArray(upcomingEvents)) {
            console.error("❌ upcomingEvents is not an array:", upcomingEvents);
            upcomingEvents = []; // Fallback to an empty array to prevent crashes
        }
        
        console.log("✅ Final Upcoming Events Array:", upcomingEvents);
        // Populate the Carousel
        populateComingEventsCarousel(upcomingEvents);

    } catch (error) {
        console.error("Error fetching coming events:", error);
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

// Fetch upcoming national holidays for the next 3 days
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
        for (let i = 0; i < 3; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = `2025-${String(futureDate.getMonth() + 1).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
            upcomingDates.push(formattedDate);
        }

        console.log("📅 Checking holidays for:", upcomingDates);

        // ✅ Filter holidays that match the next 3 days
        const upcomingHolidays = holidays.filter(h => upcomingDates.includes(h.date));

        console.log("🎉 Upcoming Holidays Found:", upcomingHolidays);
        return upcomingHolidays;
    } catch (error) {
        console.error("❌ Error fetching national holidays:", error);
        return [];
    }
}

// Fetch upcoming custom events (birthdays, anniversaries, etc.) for the next 3 days
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
        for (let i = 0; i < 3; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const formattedDate = `2025-${String(futureDate.getMonth() + 1).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
            upcomingDates.push(formattedDate);
        }

        console.log("📅 Checking custom events for:", upcomingDates);

        // ✅ Filter custom events that fall within the next 3 days
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

    if (!Array.isArray(events)) {
        console.error("Events is not an array:", events);
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
        autoScroll = setInterval(nextSlide, 6000); // Changes slides every 6 seconds
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