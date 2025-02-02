// Exported function to render the home screen

export function renderHome() {
    return `
        <section class="home">
            <div class="celtic-date"></div> <!-- Dynamic content goes here -->
            <div class="celtic-info-container">
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <div class="moon-phase">
                        <div class="moon-graphic">
                            <!-- This will be dynamically updated -->
                        </div>
                        <p class="moon-phase-name">Waxing Crescent</p>
                    </div>
                </div>

                <!-- Celtic Zodiac Column -->
                <div class="zodiac-column">
                    <div class="celtic-zodiac">
                        <p class="zodiac-subheader">Celtic Zodiac</p>
                        <h3>Imbolc</h3>
                    </div>
                </div>
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
                    <!-- <blockquote>${moonPhase.poem || 'The moon whispers secrets untold...'}</blockquote> -->
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
