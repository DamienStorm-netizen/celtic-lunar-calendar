import { slugifyCharm } from "../utils/slugifyCharm.js";
import { initSwipe } from "../utils/swipeHandler.js"; // ✅ Add this at the top
import { api } from "../utils/api.js";

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
            <img src="/assets/images/zodiac/zodiac-wheel.png" alt="Celtic Zodiac Wheel" class="zodiac-wheel" />
          </div>
        </div>

      <ul class="zodiac-list">
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-birch.png" alt="Birch"/> 
            <p>Birch</p><span class="celtic-zodiac-date">Nivis 2 to Janus 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-rowan.png" alt="Rowan" /> 
            <p>Rowan</p><span class="celtic-zodiac-date">Janus 2 to Brigid 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-ash.png" alt="Ash" /> 
            <p>Ash</p><span class="celtic-zodiac-date">Brigid 2 to Flora 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-alder.png" alt="Alder" /> 
            <p>Alder</p><span class="celtic-zodiac-date">Flora 2 to Maia 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-willow.png" alt="Willow" /> 
            <p>Willow</p><span class="celtic-zodiac-date">Maia 2 to Juno 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-hawthorn.png" alt="Hawthorn" /> 
            <p>Hawthorn</p><span class="celtic-zodiac-date">Juno 2 to Solis 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-oak.png" alt="Oak" /> 
            <p>Oak</p><span class="celtic-zodiac-date">Solis 2 to Terra 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-holly.png" alt="Holly" /> 
            <p>Holly</p><span class="celtic-zodiac-date">Terra 2 to Lugh 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-hazel.png" alt="Hazel" /> 
            <p>Hazel</p><span class="celtic-zodiac-date">Lugh 2 to Pomona 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-vine.png" alt="Vine" /> 
            <p>Vine</p><span class="celtic-zodiac-date">Pomona 2 to Autumna 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-ivy.png" alt="Ivy" /> 
            <p>Ivy</p><span class="celtic-zodiac-date">Autumna 2 to Eira 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-reed.png" alt="Reed" /> 
            <p>Reed</p><span class="celtic-zodiac-date">Eira 2 to Aether 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets/images/zodiac/zodiac-elder.png" alt="Elder" /> 
            <p>Elder</p><span class="celtic-zodiac-date">Aether 2 to Nivis 1</span>
        </li>
      </ul>
    </div>

      <div id="modal-overlay" class="modal-overlay hidden"></div>
      <div id="zodiac-modal" class="modal hidden">
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
              <img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev" />
            </button>

            <div class="festival-slide active">
                <img src="/assets/images/festivals/festival-imbolc.png" alt="Imbolc" class="festival-icon" />
                <h2 class="festival-title">Imbolc</h2>
                <h3 class="festival-date">15th of Janus</h3>
                <p class="festival-description">
                    Imbolc marks the first signs of spring. It's a time to celebrate the return of life and the arrival of new growth. Celebrants use this time to cleanse their homes and welcome new beginnings into their lives.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-ostara.png" alt="Ostara" class="festival-icon" />
                <h2 class="festival-title">Ostara</h2>
                <h3 class="festival-date">6th of Flora</h3>
                <p class="festival-description">
                    Ostara is celebrated on the spring equinox. It's a time to celebrate the balance of light and dark and to look ahead to the growth and renewal of spring. Celebrants come together to plant seeds and watch the world come back to life.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-beltane.png" alt="Beltane" class="festival-icon" />
                <h2 class="festival-title">Beltane</h2>
                <h3 class="festival-date">19th of Maia</h3>
                <p class="festival-description">
                    Beltane is celebrated at the beginning of summer. It's a time to celebrate the fertility of the earth and the arrival of new life. Revelers come together to dance, sing, and make merry to mark this special day.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-litha.png" alt="Litha" class="festival-icon" />
                <h2 class="festival-title">Litha</h2>
                <h3 class="festival-date">14th of Solis</h3>
                <p class="festival-description">
                    Litha is celebrated on the summer solstice. It's a time to celebrate the power of the sun and the longest day of the year. Celebrants come together to light fires, dance, and sing to mark this special day.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-lughnasadh.png" alt="Lughnasadh" class="festival-icon" />
                <h2 class="festival-title">Lughnasadh</h2>
                <h3 class="festival-date">27th of Terra</h3>
                <p class="festival-description">
                    Lughnasadh marks the beginning of the harvest season. It's a time to give thanks for the abundance of the earth and to prepare for the coming winter. 
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-mabon.png" alt="Mabon" class="festival-icon" />
                <h2 class="festival-title">Mabon</h2>
                <h3 class="festival-date">19th of Lugh</h3>
                <p class="festival-description">
                    Mabon marks the autumn equinox. It's a time to celebrate the balance of light and dark and look ahead to the chill of winter.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-samhain.png" alt="Samhain" class="festival-icon" />
                <h2 class="festival-title">Samhain</h2>
                <h3 class="festival-date">6th of Eira</h3>
                <p class="festival-description">
                    Samhain marks the end of the harvest season. It's a time to reflect on the past year and honour the ancestors who have come before us. Samhain is also a time to connect with the spirit world and seek guidance for the future.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets/images/festivals/festival-yule.png" alt="Yule" class="festival-icon" />
                <h2 class="festival-title">Yule</h2>
                <h3 class="festival-date">Mirabilis</h3>
                <p class="festival-description">
                    Yule marks the longest night of the year. It's a time to celebrate the return of the light and the rebirth of the sun. Celebrants come together to exchange gifts, light candles, and enjoy feasts to mark this special day.
                </p>
            </div>

            <button class="festival-carousel-next">
              <img src="/assets/images/decor/moon-crescent-next.png" alt="Next" />
            </button>
        </div>
    </div>

    <!-- ************* Sections - Full Moons ************* -->

    <div id="moon-poetry" class="tab-content"> 
      <h2 class="goldNugget" style="text-align:center; margin-bottom: 0">The Full Moons</h2>

      <img class="full-moon" src="/assets/images/decor/full-moon.png" alt="Full Moon" />

      <div class="moon-carousel">
        <button class="carousel-prev">
          <img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev" />
        </button>

        <div class="moon-slide active" id="snow-moon">
            <h2 class="moon-title">Snow Moon</h2>
            <h3 class="moon-date">22nd of Nivis</h3>
            <p class="moon-poem">
                The Snow Moon casts its tranquil glow, <br>
                Upon the earth where frost does grow. <br>
                Wrap in warmth, let dreams ignite, <br>
                Burn cedar’s scent in soft moonlight.
            </p>
        </div>

        <div class="moon-slide" id="wolf-moon">
            <h2 class="moon-title">Wolf Moon</h2>
            <h3 class="moon-date">24th of Janus</h3>
            <p class="moon-poem">
                Beneath the snow and howling skies, <br>
                The Wolf Moon watches, ancient, wise. <br>
                A time to gather strength and rest, <br>
                And light a candle, for what’s best.
            </p>
        </div>

        <div class="moon-slide" id="worm-moon">
            <h2 class="moon-title">Worm Moon</h2>
            <h3 class="moon-date">26th of Brigid</h3>
            <p class="moon-poem">
              The Worm Moon stirs the thawing ground,<br />
              Where seeds of life are newly found.<br />
              Turn the soil of heart and mind,<br />
              Write your dreams, and leave fear behind.
            </p>
        </div>

        <div class="moon-slide" id="pink-moon">
            <h2 class="moon-title">Pink Moon</h2>
            <h3 class="moon-date">28th of Flora</h3>
            <p class="moon-poem">
                Blush of dawn, the earth reclaims,<br />
                Soft pink petals call our names.<br />
                A time for love, for hearts to rise,<br />
                To bloom beneath the moonlit skies.
            </p>
        </div>

        <div class="moon-slide" id="flower-moon">
            <h2 class="moon-title">Flower Moon</h2>
            <h3 class="moon-date">1st of Juno</h3>
            <p class="moon-poem">
            Petals bloom in moonlit air,<br />
            A fragrant world beyond compare.<br />
            Plant your dreams in fertile ground,<br />
            Let love and joy in all things abound.
            </p>
        </div>

        <div class="moon-slide" id="strawberry-moon">
            <h2 class="moon-title">Strawberry Moon</h2>
            <h3 class="moon-date">3rd of Solis</h3>
            <p class="moon-poem">
            The Strawberry Moon, ripe and red,<br />
            A time to savor what’s been bred.<br />
            Sip something sweet, give thanks, rejoice,<br />
            And honor life with grateful voice.
            </p>
        </div>

        <div class="moon-slide" id="thunder-moon">
            <h2 class="moon-title">Thunder Moon</h2>
            <h3 class="moon-date">4th of Terra</h3>
            <p class="moon-poem">
            Thunder roars, the moon’s alive,<br />
            With storms of passion, dreams will thrive.<br />
            Dance in rain or light a flame,<br />
            And cleanse your soul of doubt or shame.
            </p>
        </div>

        <div class="moon-slide" id="grain-moon">
            <h2 class="moon-title">Grain Moon</h2>
            <h3 class="moon-date">6th of Lugh</h3>
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
            <h3 class="moon-date">8th of Autumna</h3>
            <p class="moon-poem">
            The Hunter’s Moon is sharp and keen,<br />
            A guide through shadows yet unseen.<br />
            Prepare your heart, your tools, your way,<br />
            And let the moonlight mark your stay.
            </p>
        </div>

        <div class="moon-slide" id="frost-moon">
            <h2 class="moon-title">Frost Moon</h2>
            <h3 class="moon-date">10th of Eira</h3>
            <p class="moon-poem">
            Frost-kissed trees stand still and bare,<br />
            A quiet world in winter’s care.<br />
            Beneath the moon’s soft silver glow,<br />
            A time of peace, as storms lie low.
            </p>
        </div>

        <div class="moon-slide" id="cold-moon">
            <h2 class="moon-title">Cold Moon</h2>
            <h3 class="moon-date">12th of Aether</h3>
            <p class="moon-poem">
            The Cold Moon whispers of the past,<br />
            Of trials endured and shadows cast.<br />
            Sip warm tea, let heartbeats mend,<br />
            Prepare your soul for year’s new bend.
            </p>
        </div>

        <button class="carousel-next">
          <img src="/assets/images/decor/moon-crescent-next.png" alt="Next" />
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
  const closeModal = zodiacModal.querySelector("#close-modal");
  const zodiacItems = document.querySelectorAll(".zodiac-item");

  // Hide overlay and make it clickable (defensive)
  const insightsOverlay = document.getElementById("modal-overlay");
  if (insightsOverlay && !insightsOverlay.__insightsWired) {
    insightsOverlay.addEventListener("click", () => {
      const celticZodiacModal = document.getElementById("zodiac-modal");
      if (celticZodiacModal && celticZodiacModal.classList.contains("show")) {
        celticZodiacModal.classList.remove("show");
        celticZodiacModal.classList.add("hidden");
      }
      document.body.classList.remove('modal-open');
      insightsOverlay.classList.remove("show");
      insightsOverlay.classList.add("hidden");
    });
    insightsOverlay.__insightsWired = true;
  }

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
    zodiacModal.style.transform = 'none';
  });
}

async function showZodiacModal(zodiacName) {
  const modal = document.getElementById("zodiac-modal");
  const overlay = document.getElementById("modal-overlay");
  const learnMoreBtn = document.querySelector(".celtic-zodiac-btn");

  // Ensure overlay & modal live under <body> (prevents clipping and partial overlays on iOS)
  if (overlay && overlay.parentElement !== document.body) document.body.appendChild(overlay);
  if (modal && modal.parentElement !== document.body) document.body.appendChild(modal);

  // Open at the top with a tiny buffer
  if (modal) {
    modal.style.transform = "none";
    modal.style.alignItems = "flex-start"; // belt-and-suspenders to match CSS
  }
  const contentEl = modal?.querySelector(".modal-content");
  if (contentEl) {
    contentEl.style.marginTop = "8px"; // small visual buffer below the header
    contentEl.scrollTop = 0;           // always start at the very top
    contentEl.style.webkitOverflowScrolling = "touch"; // iPhone momentum
    contentEl.style.overflowY = "auto";
  }

  // Show modal + overlay and lock background scroll
  if (overlay) { overlay.classList.remove("hidden"); overlay.classList.add("show"); }
  if (modal) { modal.classList.remove("hidden"); modal.classList.add("show"); }
  document.body.classList.add("modal-open");

  // Fallback-friendly lookup from bundled calendar data
  let zodiacEntry = null;
  try {
    const data = await api.calendarData();
    const list = Array.isArray(data?.zodiac) ? data.zodiac : [];
    zodiacEntry = list.find(
      (s) => s?.name?.toLowerCase() === String(zodiacName).toLowerCase()
    );
    if (!zodiacEntry) throw new Error("Zodiac not found in calendar data");
  } catch (e) {
    console.error("Error loading zodiac modal:", e);
    // Graceful fallback when nothing loads
    document.getElementById("zodiac-name").textContent = zodiacName;
    document.getElementById("zodiac-date-range").textContent = "";
    document.getElementById("zodiac-description").textContent =
      "The stars are shy just now. Please try again in a moment.";

    overlay?.classList.add("show");
    overlay?.classList.remove("hidden");
    modal?.classList.add("show");
    modal?.classList.remove("hidden");
    document.body.classList.add("modal-open");
    return;
  }

  // Populate modal fields safely
  const nameEl = document.getElementById("zodiac-name");
  const dateEl = document.getElementById("zodiac-date-range");
  const imgEl = document.getElementById("zodiac-image");
  const descEl = document.getElementById("zodiac-description");
  const traitsEl = document.getElementById("zodiac-traits");
  const elemEl = document.getElementById("zodiac-element");
  const animalEl = document.getElementById("zodiac-animal");

  nameEl.textContent = zodiacEntry.name || zodiacName;
  // Try several keys for the date range
  const friendlyRange =
    zodiacEntry.date_range ||
    zodiacEntry.celtic_date_range ||
    (zodiacEntry.start_date && zodiacEntry.end_date
      ? `${zodiacEntry.start_date.replace(/^[0-9]{4}-/, "")} to ${zodiacEntry.end_date.replace(/^[0-9]{4}-/, "")}`
      : "");
  dateEl.textContent = friendlyRange;

  if (imgEl && zodiacEntry.name) {
    const slug = slugifyCharm(zodiacEntry.name).toLowerCase();
    imgEl.src = `/assets/images/zodiac/zodiac-${slug}.png`;
    imgEl.alt = zodiacEntry.name;
  }

  descEl.textContent = zodiacEntry.description || zodiacEntry.summary || "";
  traitsEl.textContent = zodiacEntry.symbolism || zodiacEntry.traits || "";
  elemEl.textContent = zodiacEntry.element || "";
  animalEl.textContent = zodiacEntry.animal || "";

  if (learnMoreBtn) {
    const href = zodiacEntry.url || zodiacEntry.link || "#";
    learnMoreBtn.setAttribute("href", href);
  }

  // Show modal & overlay and lock background scroll
  overlay?.classList.add("show");
  overlay?.classList.remove("hidden");
  modal?.classList.add("show");
  modal?.classList.remove("hidden");
  document.body.classList.add("modal-open");
}
// ————————————————————————————————
// Festivals carousel wiring (prev/next + optional swipe)
// Exported because insightsInit.js imports it
export function initializeFestivalCarousel() {
  const scope = document.getElementById("festivals");
  if (!scope) return;

  const slides = Array.from(scope.querySelectorAll(".festival-slide"));
  const prevBtn = scope.querySelector(".festival-carousel-prev");
  const nextBtn = scope.querySelector(".festival-carousel-next");
  if (slides.length === 0) return;

  let index = slides.findIndex(s => s.classList.contains("active"));
  if (index < 0) {
    index = 0;
    slides[0].classList.add("active");
  }

  const show = (i) => {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  };

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    show(index);
  });

  // Optional swipe support (no-op if initSwipe is not available)
  const container = scope.querySelector(".carousel-container") || scope;
  try {
    if (typeof initSwipe === "function" && container) {
      initSwipe(container, {
        onSwipeLeft:  () => nextBtn?.click(),
        onSwipeRight: () => prevBtn?.click()
      });
    }
  } catch (err) {
    console.warn("Festival swipe init skipped:", err);
  }
}

// ————————————————————————————————
// Moon Poetry carousel wiring (prev/next + optional swipe)
export function initializeMoonPoetry() {
  const scope = document.getElementById("moon-poetry");
  if (!scope) return;

  const slides = Array.from(scope.querySelectorAll(".moon-slide"));
  const prevBtn = scope.querySelector(".carousel-prev");
  const nextBtn = scope.querySelector(".carousel-next");
  if (slides.length === 0) return;

  let index = slides.findIndex(s => s.classList.contains("active"));
  if (index < 0) {
    index = 0;
    slides[0].classList.add("active");
  }

  const show = (i) => {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  };

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  });

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    show(index);
  });

  const container = scope.querySelector(".moon-carousel") || scope;
  try {
    if (typeof initSwipe === "function" && container) {
      initSwipe(container, {
        onSwipeLeft:  () => nextBtn?.click(),
        onSwipeRight: () => prevBtn?.click()
      });
    }
  } catch (err) {
    console.warn("Moon Poetry swipe init skipped:", err);
  }
}

// ————————————————————————————————
// Reveal the Zodiac tiles on scroll using IntersectionObserver (with fallback)
export function revealZodiacOnScroll() {
  const selector = ".zodiac-item.hidden";
  const hiddenItems = Array.from(document.querySelectorAll(selector));
  if (hiddenItems.length === 0) return;

  if (document.__zodiacRevealWired) return;
  document.__zodiacRevealWired = true;

  const revealEl = (el) => {
    el.classList.remove("hidden");
    el.classList.add("show");
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealEl(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

    hiddenItems.forEach((el) => io.observe(el));
  } else {
    const onScroll = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      hiddenItems.forEach((el) => {
        if (!el.classList.contains("hidden")) return;
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.9) revealEl(el);
      });
      if (!document.querySelector(selector)) {
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}