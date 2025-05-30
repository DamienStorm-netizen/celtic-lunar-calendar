import { slugifyCharm } from "../utils/slugifyCharm.js";
import { initSwipe } from "../utils/swipeHandler.js"; // ✅ Add this at the top

export function renderInsights() {
  return `
  <div id="insights-container" class="fade-in">  
    <h1 style="margin-top: 15px">Insights</h1>

    <div class="insights-tabs">
      <button class="tab-button active" data-tab="zodiac">Celtic Zodiac</button>
      <button class="tab-button" data-tab="festivals">Festivals</button>
      <button class="tab-button" data-tab="moon-poetry">Moon Poetry</button>
    </div>

    <!-- ************* Sections - Celtic Zodiac ************* -->

    <div id="zodiac" class="tab-content active">
      
      <div class="celtic-zodiac">
        <h2 class="goldNugget">Discover Your Zodiac</h2>

        <div class="wheel-container">
          <div id="wheel">
            <img src="static/assets/images/zodiac/zodiac-wheel.png" alt="Celtic Zodiac Wheel" class="zodiac-wheel" />
          </div>
        </div>

      <ul class="zodiac-list">
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-birch.png" alt="Birch"/> 
            <p>Birch</p><span class="celtic-zodiac-date">Nivis 2 to Janus 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-rowan.png" alt="Rowan" /> 
            <p>Rowan</p><span class="celtic-zodiac-date">Janus 2 to Brigid 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-ash.png" alt="Ash" /> 
            <p>Ash</p><span class="celtic-zodiac-date">Brigid 2 to Flora 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-alder.png" alt="Alder" /> 
            <p>Alder</p><span class="celtic-zodiac-date">Flora 2 to Maia 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-willow.png" alt="Willow" /> 
            <p>Willow</p><span class="celtic-zodiac-date">Maia 2 to Juno 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-hawthorn.png" alt="Hawthorn" /> 
            <p>Hawthorn</p><span class="celtic-zodiac-date">Juno 2 to Solis 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-oak.png" alt="Oak" /> 
            <p>Oak</p><span class="celtic-zodiac-date">Solis 2 to Terra 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-holly.png" alt="Holly" /> 
            <p>Holly</p><span class="celtic-zodiac-date">Terra 2 to Lugh 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-hazel.png" alt="Hazel" /> 
            <p>Hazel</p><span class="celtic-zodiac-date">Lugh 2 to Pomona 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-vine.png" alt="Vine" /> 
            <p>Vine</p><span class="celtic-zodiac-date">Pomona 2 to Autumna 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-ivy.png" alt="Ivy" /> 
            <p>Ivy</p><span class="celtic-zodiac-date">Autumna 2 to Eira 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-reed.png" alt="Reed" /> 
            <p>Reed</p><span class="celtic-zodiac-date">Eira 2 to Aether 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="static/assets/images/zodiac/zodiac-elder.png" alt="Elder" /> 
            <p>Elder</p><span class="celtic-zodiac-date">Aether 2 to Nivis 1</span>
        </li>
      </ul>
    </div>

      <div id="modal-overlay" class="modal-overlay hidden"></div>
      <div id="zodiac-modal" class="modal">
        <div class="modal-content">
          <button id="close-modal" class="mystical-close">
            ✦
          </button>
          <h2 id="zodiac-name">Zodiac Name</h2>
          <p id="zodiac-date-range">Date Range</p>
          <img id="zodiac-image" src="" alt="Zodiac Sign" />
          <p id="zodiac-description">Zodiac description here...</p>

          <h3 class="subheader">Three Key Traits</h3>
          <p id="zodiac-traits"></p>

          <h3 class="subheader">Associated Element</h3>
          <p id="zodiac-element"></p>

          <h3 class="subheader">Associated Animal</h3>
          <p id="zodiac-animal"></p>

          <br />

          <h3 class="subheader">Mythology</h3>
          <p id="zodiac-mythology"></p> 

          <a id="zodiac-learn-more" class="settings-btn celtic-zodiac-btn" href="#" target="_blank">Learn More</a>
        </div>
      </div>
  
    </div>

    <!-- ************* Sections - Celtic Festivals ************* -->


    <div id="festivals" class="tab-content"> 
          <h2 class="goldNugget" style="text-align:center; margin-bottom: 0">The Wheel of the Year</h2>

          <div id="festival-carousel" class="carousel-container">
            <button class="festival-carousel-prev">
              <img src="static/assets/images/decor/moon-crescent-prev.png" alt="Prev" />
            </button>

            <div class="festival-slide active">
                <img src="static/assets/images/festivals/festival-imbolc.png" alt="Imbolc" class="festival-icon" />
                <h2 class="festival-title">Imbolc</h2>
                <h3 class="festival-date">15th of Janus</h3>
                <p class="festival-description">
                    Imbolc marks the first signs of spring. It's a time to celebrate the return of life and the arrival of new growth. Celebrants use this time to cleanse their homes and welcome new beginnings into their lives.
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-ostara.png" alt="Ostara" class="festival-icon" />
                <h2 class="festival-title">Ostara</h2>
                <h3 class="festival-date">6th of Flora</h3>
                <p class="festival-description">
                    Ostara is celebrated on the spring equinox. It's a time to celebrate the balance of light and dark and to look ahead to the growth and renewal of spring. Celebrants come together to plant seeds and watch the world come back to life.
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-beltane.png" alt="Beltane" class="festival-icon" />
                <h2 class="festival-title">Beltane</h2>
                <h3 class="festival-date">19th of Maia</h3>
                <p class="festival-description">
                    Beltane is celebrated at the beginning of summer. It's a time to celebrate the fertility of the earth and the arrival of new life. Revelers come together to dance, sing, and make merry to mark this special day.
                </p>
            </div>

            <div class="festival-slide active">
                <img src="static/assets/images/festivals/festival-litha.png" alt="Litha" class="festival-icon" />
                <h2 class="festival-title">Litha</h2>
                <h3 class="festival-date">14th of Solis</h3>
                <p class="festival-description">
                    Litha is celebrated on the summer solstice. It's a time to celebrate the power of the sun and the longest day of the year. Celebrants come together to light fires, dance, and sing to mark this special day.
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-lammas.png" alt="Lammas" class="festival-icon" />
                <h2 class="festival-title">Lammas</h2>
                <h3 class="festival-date">27th of Terra</h3>
                <p class="festival-description">
                    Lammas marks the beginning of the harvest season. It's a time to give thanks for the abundance of the earth and to prepare for the coming winter. 
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-mabon.png" alt="Mabon" class="festival-icon" />
                <h2 class="festival-title">Mabon</h2>
                <h3 class="festival-date">19th of Lugh</h3>
                <p class="festival-description">
                    Mabon marks the autumn equinox. It's a time to celebrate the balance of light and dark and look ahead to the chill of winter.
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-samhain.png" alt="Samhain" class="festival-icon" />
                <h2 class="festival-title">Samhain</h2>
                <h3 class="festival-date">6th of Eira</h3>
                <p class="festival-description">
                    Samhain marks the end of the harvest season. It's a time to reflect on the past year and honour the ancestors who have come before us. Samhain is also a time to connect with the spirit world and seek guidance for the future.
                </p>
            </div>

            <div class="festival-slide">
                <img src="static/assets/images/festivals/festival-yule.png" alt="Yule" class="festival-icon" />
                <h2 class="festival-title">Yule</h2>
                <h3 class="festival-date">Mirabilis</h3>
                <p class="festival-description">
                    Yule marks the longest night of the year. It's a time to celebrate the return of the light and the rebirth of the sun. Celebrants come together to exchange gifts, light candles, and enjoy feasts to mark this special day.
                </p>
            </div>

            <button class="festival-carousel-next">
              <img src="static/assets/images/decor/moon-crescent-next.png" alt="Next" />
            </button>
        </div>
    </div>

    <!-- ************* Sections - Full Moons ************* -->

    <div id="moon-poetry" class="tab-content"> 
      <h2 class="goldNugget" style="text-align:center; margin-bottom: 0">The Full Moons</h2>

      <img class="full-moon" src="static/assets/images/decor/full-moon.png" alt="Full Moon" />

      <div class="moon-carousel">
        <button class="carousel-prev">
          <img src="static/assets/images/decor/moon-crescent-prev.png" alt="Prev" />
        </button>

        <div class="moon-slide" id="snow-moon">
            <h2 class="moon-title">Snow Moon</h2>
            <h3 class="moon-date">22nd of Nivis</3>
            <p class="moon-poem">
                The Snow Moon casts its tranquil glow, <br>
                Upon the earth where frost does grow. <br>
                Wrap in warmth, let dreams ignite, <br>
                Burn cedar’s scent in soft moonlight.
            </p>
        </div>

        <div class="moon-slide active" id="wolf-moon">
            <h2 class="moon-title">Wolf Moon</h2>
            <h3 class="moon-date">24th of Janus</3>
            <p class="moon-poem">
                Beneath the snow and howling skies, <br>
                The Wolf Moon watches, ancient, wise. <br>
                A time to gather strength and rest, <br>
                And light a candle, for what’s best.
            </p>
        </div>

        <div class="moon-slide active" id="worm-moon">
            <h2 class="moon-title">Worm Moon</h2>
            <h3 class="moon-date">26th of Brigid</3>
            <p class="moon-poem">
              The Worm Moon stirs the thawing ground,<br />
              Where seeds of life are newly found.<br />
              Turn the soil of heart and mind,<br />
              Write your dreams, and leave fear behind.
            </p>
        </div>

        <div class="moon-slide active" id="pink-moon">
            <h2 class="moon-title">Pink Moon</h2>
            <h3 class="moon-date">28th of Flora</3>
            <p class="moon-poem">
                Blush of dawn, the earth reclaims,<br />
                Soft pink petals call our names.<br />
                A time for love, for hearts to rise,<br />
                To bloom beneath the moonlit skies.
            </p>
        </div>

        <div class="moon-slide" id="flower-moon">
            <h2 class="moon-title">Flower Moon</h2>
            <h3 class="moon-date">1st of Juno</3>
            <p class="moon-poem">
            Petals bloom in moonlit air,<br />
            A fragrant world beyond compare.<br />
            Plant your dreams in fertile ground,<br />
            Let love and joy in all things abound.
            </p>
        </div>

        <div class="moon-slide" id="Strawberry-moon">
            <h2 class="moon-title">Strawberry Moon</h2>
            <h3 class="moon-date">3rd of Solis</3>
            <p class="moon-poem">
            The Strawberry Moon, ripe and red,<br />
            A time to savor what’s been bred.<br />
            Sip something sweet, give thanks, rejoice,<br />
            And honor life with grateful voice.
            </p>
        </div>

        <div class="moon-slide" id="thunder-moon">
            <h2 class="moon-title">Thunder Moon</h2>
            <h3 class="moon-date">4th of Terra</3>
            <p class="moon-poem">
            Thunder roars, the moon’s alive,<br />
            With storms of passion, dreams will thrive.<br />
            Dance in rain or light a flame,<br />
            And cleanse your soul of doubt or shame.
            </p>
        </div>

        <div class="moon-slide" id="grain-moon">
            <h2 class="moon-title">Grain Moon</h2>
            <h3 class="moon-date">6th of Lugh</3>
            <p class="moon-poem">
            Fields of grain in moonlight bask,<br />
            A time to gather, a sacred task.<br />
            Share your wealth, both bright and deep,<br />
            And sow what’s needed for the reap.
            </p>
        </div>

        <div class="moon-slide" id="harvest-moon">
            <h2 class="moon-title">Harvest Moon</h2>
            <h3 class="moon-date">7th of Pomona</h3>
            <p class="moon-poem">
                The Harvest Moon, so round, so bright, <br />
                Guides weary hands through autumn’s night. <br />
                Reflect on work, both done and due, <br />
                And thank the world for gifting you.
            </p>
        </div>

        <div class="moon-slide" id="hunters-moon">
            <h2 class="moon-title">Hunter's Moon</h2>
            <h3 class="moon-date">8th of Autumna</3>
            <p class="moon-poem">
            The Hunter’s Moon is sharp and keen,<br />
            A guide through shadows yet unseen.<br />
            Prepare your heart, your tools, your way,<br />
            And let the moonlight mark your stay.
            </p>
        </div>

        <div class="moon-slide" id="Frost-moon">
            <h2 class="moon-title">Frost Moon</h2>
            <h3 class="moon-date">10th of Eira</3>
            <p class="moon-poem">
            Frost-kissed trees stand still and bare,<br />
            A quiet world in winter’s care.<br />
            Beneath the moon’s soft silver glow,<br />
            A time of peace, as storms lie low.
            </p>
        </div>

        <div class="moon-slide" id="cold-moon">
            <h2 class="moon-title">Cold Moon</h2>
            <h3 class="moon-date">12th of Aether</3>
            <p class="moon-poem">
            The Cold Moon whispers of the past,<br />
            Of trials endured and shadows cast.<br />
            Sip warm tea, let heartbeats mend,<br />
            Prepare your soul for year’s new bend.
            </p>
        </div>

        <button class="carousel-next">
          <img src="static/assets/images/decor/moon-crescent-next.png" alt="Next" />
        </button>
      </div>
    </div>
  </div>
  `;
}


// ********************************
// CELTIC ZODIAC  
// ********************************

export function initializeTabbedNav() {
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // Add active class to the clicked tab and corresponding content
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });
  }

export function initializeCelticZodiac() {
  const overlay = document.getElementById("modal-overlay");

  const wheel = document.getElementById("wheel");
  const hoverInfo = document.getElementById("hover-info");
  const zodiacName = document.getElementById("zodiac-name");
  const zodiacDescription = document.getElementById("zodiac-description");

  const radius = wheel.offsetWidth / 2;
  const centerX = radius;
  const centerY = radius;
  const adjustmentFactor = 0.65; // Tightened circle
  const rotationOffset = Math.PI / -110; // Clockwise rotation offset
  const xOffset = 3; // Manual fine-tune for X
  const yOffset = -3; // Manual fine-tune for Y

  // Enable spinning of the Zodiac Wheel
  let isDragging = false;
  let startAngle = 0;
  let currentAngle = 0;

  // Function to get rotation angle
  function getRotationAngle(event, isTouch = false) {
    const rect = wheel.getBoundingClientRect();
    const x = (isTouch ? event.touches[0].clientX : event.clientX) - rect.left - rect.width / 2;
    const y = (isTouch ? event.touches[0].clientY : event.clientY) - rect.top - rect.height / 2;
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  // Celtic Zodiac Modal
  const zodiacModal = document.getElementById("zodiac-modal");
  const closeModal = document.querySelector(".mystical-close");
  const zodiacItems = document.querySelectorAll(".zodiac-item");

   // Hide overlay and make it clickable
   document.getElementById("modal-overlay").addEventListener("click", () => {

    console.log("Click on Overlay");
    const celticZodiacModal = document.getElementById("zodiac-modal");

    if (celticZodiacModal.classList.contains("show")) {
      celticZodiacModal.classList.remove("show");
      celticZodiacModal.classList.add("hidden");
    }

    // Locate open modal to centre of viewport
    document.body.classList.add('modal-open');

    // Hide the overlay itself
    document.getElementById("modal-overlay").classList.remove("show");
    document.getElementById("modal-overlay").classList.add("hidden");
});

  // Assign click behaviour to thumbs
  zodiacItems.forEach(item => {
      item.addEventListener("click", () => {
          const zodiacName = item.querySelector("p").textContent;
          console.log("Modal node ID:", document.getElementById('zodiac-modal'));
          showZodiacModal(zodiacName);
      });
  });

  // Close Celtic zodiac modal
  closeModal.addEventListener("click", () => {
    zodiacModal.classList.remove("show");
    overlay.classList.remove("show");
    overlay.classList.add("hidden");

    document.body.classList.remove('modal-open');

    // Reset transform manually (ghosts hate this)
    zodiacModal.style.transform = 'translate(-50%, -50%) scale(0.95)';
  });
}

async function showZodiacModal(zodiacName) {
  const modal = document.getElementById("zodiac-modal");
  const overlay = document.getElementById("modal-overlay");
  const learnMoreBtn = document.querySelector(".celtic-zodiac-btn"); // 👈 Add this line here!

  try {
      const response = await fetch(`/zodiac/insights/${encodeURIComponent(zodiacName)}`);
      if (!response.ok) {
          throw new Error(`Zodiac sign '${zodiacName}' not found`);
      }

      const zodiacEntry = await response.json();

      // 🪄 Show modal
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      requestAnimationFrame(() => {
          modal.classList.add("show");
          overlay.classList.add("show");
      });

      // 🪄 Scroll modal into centre of viewport
      setTimeout(() => {
        const modal = document.getElementById("zodiac-modal");
        if (modal) {
          modal.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100); // Delay ensures styles are applied

      const imageSlugZodiac = slugifyCharm(zodiacName);

      // 🖼️ Populate modal content
      document.getElementById("zodiac-name").textContent = zodiacEntry.name;
      document.getElementById("zodiac-date-range").textContent = zodiacEntry.celtic_date;
      document.getElementById("zodiac-image").src = `static/assets/images/zodiac/zodiac-${imageSlugZodiac}.png`;
      document.getElementById("zodiac-description").textContent = zodiacEntry.symbolism;
      document.getElementById("zodiac-traits").textContent = zodiacEntry.symbolism;
      document.getElementById("zodiac-element").textContent = zodiacEntry.element || "Element unknown";
      document.getElementById("zodiac-animal").textContent = zodiacEntry.animal;
      document.getElementById("zodiac-mythology").textContent = zodiacEntry.mythical_creature;

      console.log("Zodiac url is ", zodiacEntry.url);

      if (zodiacEntry.url) {
        learnMoreBtn.style.display = "inline-block";
        learnMoreBtn.setAttribute("href", zodiacEntry.url);
        learnMoreBtn.setAttribute("target", "_blank");
      } else {
          learnMoreBtn.style.display = "none"; // Hide if there's no link
      }

  } catch (error) {
      console.error("Error loading zodiac modal:", error);
  }


}

// ********************************
// CELTIC FESTIVALS
// ********************************

export function initializeFestivalCarousel() {
  const slides = document.querySelectorAll(".festival-slide");
  const prevButton = document.querySelector(".festival-carousel-prev");
  const nextButton = document.querySelector(".festival-carousel-next");

  const sparkleSound = new Audio('static/assets/sound/sparkle.wav');
  sparkleSound.volume = 0.6; // adjust as needed

  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.remove("active");
          slide.style.opacity = 0;
          if (i === index) {
              slide.classList.add("active");
              setTimeout(() => slide.style.opacity = 1, 300);
          }
      });
  }

  prevButton.addEventListener("click", () => {
    if (document.getElementById("festivals").classList.contains("active")) {
      sparkleSound.currentTime = 0;
      sparkleSound.play();
    }
    
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    if (document.getElementById("festivals").classList.contains("active")) {
      sparkleSound.currentTime = 0;
      sparkleSound.play();
    }
    
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  });

  // 🎠 Swipe support for festival carousel
  const festivalContainer = document.getElementById("festival-carousel");
  initSwipe(festivalContainer, {
    onSwipeLeft: () => nextButton.click(),
    onSwipeRight: () => prevButton.click()
  });

  // Start with the first festival as the default
  showSlide(currentSlide);
}

// ********************************
// MOON POETRY
// ********************************

export function initializeMoonPoetry() {
  const slides = document.querySelectorAll(".moon-slide");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  const harpSound = new Audio("static/assets/sound/harp.wav"); // Load sound file
  harpSound.volume = 0.6; // adjust as needed

  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.remove("active");
          slide.style.opacity = 0; // Start fade out
          if (i === index) {
              slide.classList.add("active");
              setTimeout(() => slide.style.opacity = 1, 300); // Fade in
          }
      });

      // Move background slightly for parallax effect
      const bgOffset = index * 5; // Adjust movement speed
      document.querySelector(".moon-carousel").style.backgroundPosition = `${bgOffset}px ${bgOffset}px`;
  }

  prevButton.addEventListener("click", () => {
    harpSound.currentTime = 0; // Reset sound for instant replay
    harpSound.play(); // Play sound effect

    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    harpSound.currentTime = 0;
    harpSound.play();

    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  });

  // 🎠 Swipe support for moon poetry carousel
  const moonContainer = document.querySelector(".moon-carousel");
  initSwipe(moonContainer, {
    onSwipeLeft: () => nextButton.click(),
    onSwipeRight: () => prevButton.click()
  });

  // Function to determine the current Celtic month dynamically
  function getCurrentCelticMonth() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth(); // 0 = January, 1 = February, etc.
    const year = today.getFullYear();
  
    // For example, use these fixed boundaries (based on your JSON):
    const celticCalendar = [
      // Note: For proper conversion you may need to adjust December of the previous year.
      { name: "Janus", start: { month: 0, day: 20 }, end: { month: 1, day: 16 } },      // Jan 20 to Feb 16
      { name: "Brigid", start: { month: 1, day: 17 }, end: { month: 2, day: 16 } },     // Feb 17 to Mar 16
      { name: "Flora",  start: { month: 2, day: 17 }, end: { month: 3, day: 13 } },     // Mar 17 to Apr 13
      { name: "Maia",  start: { month: 4, day: 14 }, end: { month: 5, day: 11 } },
      { name: "Juno",  start: { month: 5, day: 12 }, end: { month: 6, day: 8 } },
      { name: "Solis",  start: { month: 6, day: 9 }, end: { month: 7, day: 6 } },
      { name: "Terra",  start: { month: 7, day: 7 }, end: { month: 8, day: 3 } },
      { name: "Lugh",  start: { month: 8, day: 4 }, end: { month: 8, day: 31 } },
      { name: "Pomona",  start: { month: 9, day: 1 }, end: { month: 9, day: 28 } },
      { name: "Autumna",  start: { month: 9, day: 29 }, end: { month: 10, day: 26 } },
      { name: "Eira",  start: { month: 10, day: 27 }, end: { month: 11, day: 23 } },
      { name: "Aether",  start: { month: 11, day: 24 }, end: { month: 12, day: 21 } },
      { name: "Nivis",  start: { month: 12, day: 23 }, end: { month: 0, day: 19 } }          
    ];
  
    // Find the Celtic month that includes today's Gregorian date.
    // (This simple approach assumes that today's month falls entirely within one Celtic month.)
    const todayCeltic = celticCalendar.find(({ start, end }) => {
      const afterStart = (month > start.month) || (month === start.month && day >= start.day);
      const beforeEnd = (month < end.month) || (month === end.month && day <= end.day);
      return afterStart && beforeEnd;
    });
  
    return todayCeltic ? todayCeltic.name : "Janus"; // Default to Janus if no match
}

function setInitialMoon() {
  const celticMonth = getCurrentCelticMonth();
  const moonMapping = {
      "Nivis": "wolf-moon",
      "Janus": "snow-moon",
      "Brigid": "worm-moon",
      "Flora": "Pink-moon*",
      "Juno": "flower-moon",
      "Solis": "strawberry-moon",
      "Terra": "thunder-moon",
      "Lugh": "grain-moon",
      "Pomona": "harvest-moon",
      "Autumna": "hunters-moon",
      "Eira": "frost-moon",
      "Aether": "cold-moon"
  };

  console.log("This month is ", celticMonth);

  const firstMoon = moonMapping[celticMonth] || "snow-moon";
  const initialIndex = [...document.querySelectorAll(".moon-slide")].findIndex(slide => slide.id === firstMoon);
  currentSlide = initialIndex !== -1 ? initialIndex : 0;
  showSlide(currentSlide);

}

  // Set the correct moon when the page loads
  setInitialMoon();
}

export function revealZodiacOnScroll() {
  const zodiacs = document.querySelectorAll('.zodiac-item');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.15 // You can tweak this for earlier/later reveals
  });

  zodiacs.forEach(item => {
    observer.observe(item);
  });
}

document.addEventListener("DOMContentLoaded", revealZodiacOnScroll);