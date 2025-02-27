// Exported function to render the home screen

export function renderHome() {
    return `
        <section class="home">
            <div class="celtic-date"></div> <!-- Dynamic content goes here -->
            <div class="celtic-info-container">
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="zodiac-subheader">Lunar Phase</p>
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
                        <p class="zodiac-subheader">Celtic Zodiac</p>
                        <div class="celtic-zodiac-details">
                            <h4 class="zodiac-sign">Loading...</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="poem-container">
                <blockquote class="moon-poem">Fetching poetic wisdom...</blockquote>
            </div>
        </section>
    `;
}

// Fetch the Celtic date dynamically and update the home screen
export async function fetchCelticDate() {
    try {
        const response = await fetch('/api/celtic-date');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Select the main date container in the home section
        const dateContainer = document.querySelector('.celtic-date');
        if (dateContainer) {
            dateContainer.innerHTML = `
                <h1 id="celtic-day">${data.day}</h1>
                <p><span id="celtic-month">${data.month} ${data.celtic_day}</span> / <span id="gregorian-month">${data.gregorian_date}</span></p>

            `;
        } else {
            console.error('Date container not found in the DOM.');
        }
    } catch (error) {
        console.error('Failed to fetch Celtic date:', error);
    }
    console.log('Home rendered:', document.querySelector('.celtic-date'));
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
                <p>${data.poem}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching the moon poem:', error);
    }
}
