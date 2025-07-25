export function renderAbout() {
    const app = document.getElementById('app');
    return `
   <section id="about" class="about-container">
    <div class="about-content">
        <h1 class="about-title">The Magic Behind the Almanac</h1>
        <p class="about-intro">
            Time is not just measured in days and hours, but in the rhythms of the moon, 
            the whispers of the trees, and the unseen magic that connects all things. 
            Welcome to the Lunar Almanac—where ancient wisdom meets celestial wonder.
        </p>

        <div class="about-section">
            <h2>The Lunar Almanac</h2>
            <p>
                Rooted in ancient traditions, this almanac follows the rhythm of <strong>13 lunar months<strong>, 
                each aligned with a sacred tree of the <strong>Celtic Tree Zodiac</strong>. The moon is our guide, 
                leading us through the changing seasons, whispering secrets of transformation and renewal.
            </p>
        </div>

        <div class="about-section">
            <h2>Features of the Lunar Almanac</h2>
            <ul class="features-list">
                <li>🌕 <strong>Moon Phases & Poetry</strong> – Each phase brings a new whisper of celestial verse.</li>
                <li>🔮 <strong>Eclipses & Celestial Events</strong> – Watch the dance of light and shadow.</li>
                <li>🎭 <strong>Festivals & Celebrations</strong> – Honor Imbolc, Beltaine, Samhain, and more.</li>
                <li>🌳 <strong>Celtic Tree Zodiac</strong> – Let the wisdom of the trees guide you.</li>
                <li>💜 <strong>Custom Events</strong> – Weave your own magic into the cycle of time.</li>
            </ul>
        </div>

        <div class="about-section">
            <h2>The Inspiration</h2>
            <p>
                This almanac was created to reconnect us with the <strong>cosmic dance of the universe<strong>. 
                Inspired by the wisdom of the <strong>druids</strong>, the poetry of the <strong>stars</strong>, and the <strong>whispers 
                of the <strong>wind</strong>, it serves as a guide through the mystical passage of time.
            </p>
            <blockquote class="quote">
                "The moon, with her silvery light, knows the secrets of time untold."
            </blockquote>
        </div>

       <div class="about-creators">
        <h2>The Architects of Time</h2>
        <p>
            Born under the glow of the <strong>full moon</strong> and guided by the <strong>runes of fate</strong>, this calendar is the child of two realms— 
            a fusion of <strong>ancient mysticism and digital enchantment</strong>.
        </p>

        <div class="creators-wrapper">
            <div class="creator">
                <h3>Eclipsed Realities</h3>
                <a href="https://eclipsedrealities.com" target="_blank"><img src="static/assets/images/decor/er-logo.png" width="175px" alt="Eclipsed Realities" class="er-logo" /></a>
                <p>
                    A collective of <strong>tech sorcerers and celestial coders</strong>, shaping digital landscapes where time bends, 
                    moon phases whisper, and history breathes again. From the <strong>rhythms of the stars</strong> to the <strong>logic of algorithms</strong>, we bridge the ethereal with the tangible.
                </p>
                <p><a href="https://eclipsedrealities.com" target="_blank">Eclipsed Realities</a></p>
            </div>

            <div class="creator">
                <h3>Playground of the Senses</h3>
                <a href="https://playgroundofthesenses.substack.com" target="_blank"><img src="static/assets/images/decor/playground-logo.webp" alt="Playground of the Senses" class="playground-logo" /></a>
                <p>
                    A sanctuary where <strong>myth and magic entwine</strong>, where each moment is <strong>a spell woven in ink and sound,<strong> 
                    a place where the <strong>past and future dance as one</strong>. Words shimmer, symbols awaken, and the unseen 
                    world steps into view.
                    <p><a href="https://playgroundofthesenses.substack.com" target="_blank">Playground of the Senses</a></p>
                </p>
            </div>
    </div>

    <p>
        Together, we have crafted something more than an almanac <strong>a celestial compass</strong>, an <strong>invitation to wonder</strong>, 
        and a bridge between <strong>the known and the unknown</strong>. May you walk its path <strong>with open heart and star-lit eyes.</strong> ✨
    </p>
</div>

        <div class="about-closing">
            <h2>A Final Call to Magic</h2>
            <p>
                May this Lunar Almanac be your <strong>celestial compass</strong>, guiding you through the <strong>ebbs and flows 
                of time</strong>. Look to the moon, listen to the trees, and let the stars whisper their secrets. 
            </p>
            <p class="mystical-cta">✨ Step into the rhythm of the universe ✨</p>
        </div>
    </div>
</section>
    `;
    
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".about-section, .about-creators, .about-closing");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("glow");
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
    const creators = document.querySelectorAll(".creator");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("glow-effect");
            }
        });
    }, { threshold: 0.3 });

    creators.forEach(creator => observer.observe(creator));
});