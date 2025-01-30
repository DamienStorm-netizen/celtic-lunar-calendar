function renderMonths() {
    const months = ['Nivis', 'Solis', 'Aether', 'Eira', 'Autumma', 'Pomona', 'Lugh', 'Terra', 'Juno', 'Maia', 'Flora'];
    return months
        .map(month => `
            <div class="month-thumbnail" onclick="loadMonth('${month}')">
                <img src="assets/images/months/${month.toLowerCase()}.png" alt="${month}">
                <p>${month}</p>
            </div>
        `)
        .join('');
}

export function renderCalendar() {
    const app = document.getElementById('app');
    return `
        <section class="calendar">
            <h1 style="color: purple">Celtic Monthly Calendar</h1>
            <div id="month-grid">
            <!-- Dynamically load month thumbnails -->
            ${renderMonths()}
        </div>
        </section>
    `;
}


