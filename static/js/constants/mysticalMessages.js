function generateDaySlides({ lunarData, festivalHTML, holidayHTML, eclipseHTML, eventsHTML }) {
  const randomMystical = mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)];

  const mysticalSlide = `
    <div class="day-slide">
        <h3 class="goldenTitle">Mystical Suggestions</h3>
        <div class="mystical-suggestion-block">
            <p class="mystical-message">${randomMystical}</p>
            <img src="static/assets/images/decor/moon-sparkle.png" alt="Mystical Sparkle" class="divider" />
        </div>
    </div>
  `;

  return `
    <div class="day-slide"> ...Lunar stuff... </div>
    ${festivalHTML ? `<div class="day-slide">${festivalHTML}</div>` : ""}
    ${holidayHTML ? `<div class="day-slide">${holidayHTML}</div>` : ""}
    ${eclipseHTML ? `<div class="day-slide">${eclipseHTML}</div>` : ""}
    ${eventsHTML ? `<div class="day-slide">${eventsHTML}</div>` : ""}
    ${mysticalSlide}
  `;
}