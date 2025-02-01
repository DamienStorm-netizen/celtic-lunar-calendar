// Exported function to render the home screen

export function renderHome() {
    return `
        <section class="home">
            <h1 class="header-title">Welcome to the Celtic Lunar Calendar</h1>
            <p>Your journey through the mystic cycles of time begins here.</p>
            <div class="celtic-date"></div> <!-- Dynamic content goes here -->
        </section>
    `;
}

// Fetch the Celtic date dynamically and update the home screen
    async function fetchCelticDate() {
        try {
            const response = await fetch('/api/celtic-date');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Select the main date container in the home section
            const dateContainer = document.querySelector('.header-title');

            // Ensure the container exists and then populate it
            if (dateContainer) {
                dateContainer.innerHTML = `
                    <h2 class="celtic-day">${data.day}</h2>
                    <p class="celtic-month">${data.month} ${data.celtic_day} / ${data.gregorian_date}</p>
                `;
            } else {
                console.error('Date container not found in the DOM.');
            }
        } catch (error) {
            console.error('Failed to fetch Celtic date:', error);
        }
    }

    // Call the function here to ensure it runs after DOM content is loaded
    fetchCelticDate();

// Call the function to fetch and render the date
//fetchCelticDate();