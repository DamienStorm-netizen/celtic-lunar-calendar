export function renderFaq() {
  return `
    <div class="faq-section">
        <h1 class="faq-title">FAQ</h1>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>What is the Lunar Almanac app?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                    The Lunar Almanac is a beautifully crafted Celtic-inspired calendar that helps you track lunar phases, Celtic festivals, zodiac signs, and personal milestones — all in one magical place.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>How do I contact the creators?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                    Just email us at hello@lunaralmanac.app. We love hearing from our users!
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>How do I know which Celtic Zodiac sign I am?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                    Enter your birthdate and the app will reveal your Celtic Zodiac sign, along with detailed traits and symbolic lore.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>What are the special days and festivals?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                   You’ll find Celtic festivals like Samhain, Imbolc, Beltane, and more. These are marked with glowing highlights and short descriptions in the calendar view.
                </p>
            </div>
        </div>

         <div class="accordion-item">
            <button class="accordion-header">
                <span>Can I track my menstrual cycle or personal milestones?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                  Yes! You can add custom events for anything you want to track — including your cycle, moods, anniversaries, or spiritual milestones.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Why does the calendar look different from the one I’m used to?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                  It’s based on ancient Celtic timekeeping — which follows lunar rhythms and seasonal festivals. It’s not the standard Gregorian calendar, but it’s designed to reconnect you with natural cycles.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>What do the icons and symbols mean?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                  Hover over or tap on each symbol to reveal its meaning — from full moons and eclipses to zodiac signs and personal events.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Does the app work offline?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                  Yes, the core features work offline. Some features, like updates or syncing, require internet access.
                </p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Where can I go to learn more?</span>
                <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
                <p>
                 Explore the About section in the app, or visit <a href="https://playgroundofthesenses.substack.com/s/lunar-almanac" target="_blank">https://playgroundofthesenses.substack.com/s/lunar-almanac</a> for deeper insight into the Celtic calendar and its symbols.
                </p>
            </div>
        </div>

    </div>
  `;
}

export function initFaq() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      console.log("FAQ Click");
      const item = header.parentElement;
      item.classList.toggle("open");
    });
  });
}