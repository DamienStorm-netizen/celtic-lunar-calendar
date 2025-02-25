export function renderInsights() {
  return `
    <h1 style="margin-top: 15px">Insights</h1>

    <div class="insights-tabs">
      <button class="tab-button active" data-tab="zodiac">Celtic Zodiac</button>
      <button class="tab-button" data-tab="festivals">Festivals</button>
      <button class="tab-button" data-tab="moon-poetry">Moon Poetry</button>
    </div>

    <!-- Content Sections -->

    <div id="zodiac" class="tab-content active">
      
      <div class="celtic-zodiac">
        <h2 class="goldNugget">Discover Your Zodiac</h2>
        <div class="wheel-container">
          <div id="wheel">
            <img src="assets/images/zodiac/zodiac-wheel.png" alt="Celtic Zodiac Wheel" class="zodiac-wheel" />
          </div>
        </div>

      <ul class="zodiac-list">
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-birch.png" alt="Birch"/> 
            <p>Birch</p><span class="celtic-date">Nivis 2 to Janus 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-rowan.png" alt="Rowan" /> 
            <p>Rowan</p><span class="celtic-date">Janus 2 to Brigid 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-ash.png" alt="Ash" /> 
            <p>Ash</p><span class="celtic-date">Brigid 2 to Flora 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-alder.png" alt="Alder" /> 
            <p>Alder</p><span class="celtic-date">Flora 2 to Maia 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-willow.png" alt="Willow" /> 
            <p>Willow</p><span class="celtic-date">Maia 2 to Juno 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-hawthorn.png" alt="Hawthorn" /> 
            <p>Hawthorn</p><span class="celtic-date">Juno 2 to Solis 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-oak.png" alt="Oak" /> 
            <p>Oak</p><span class="celtic-date">Solis 2 to Terra 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-holly.png" alt="Holly" /> 
            <p>Holly</p><span class="celtic-date">Terra 2 to Lugh 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-hazel.png" alt="Hazel" /> 
            <p>Hazel</p><span class="celtic-date">Lugh 2 to Pomona 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-vine.png" alt="Vine" /> 
            <p>Vine</p><span class="celtic-date">Pomona 2 to Autumna 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-ivy.png" alt="Ivy" /> 
            <p>Ivy</p><span class="celtic-date">Autumna 2 to Eira 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-reed.png" alt="Reed" /> 
            <p>Reed</p><span class="celtic-date">Eira 2 to Aether 1</span>
        </li>
        <li class="zodiac-item">
            <img src="assets/images/zodiac/zodiac-elder.png" alt="Elder" /> 
            <p>Elder</p><span class="celtic-date">Aether 2 to Nivis 1</span>
        </li>
      </ul>
    </div>

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

          <h3 class="subheader">Mythology</h3>
          <p id="zodiac-mythology"></p>

          <button class="learn-more">Learn More</button>
        </div>
      </div>
   
    </div>


    <div id="festivals" class="tab-content"> 
      <h1> Festivus for the Rest of Us</h1>
    </div>

    <div id="moon-poetry" class="tab-content"> 

      <img class="full-moon" src="assets/images/decor/full-moon.png" alt="Full Moon" />

      <div class="moon-carousel">
        <button class="carousel-prev">❮</button>

         <div class="moon-slide" id="snow-moon">
            <h2 class="moon-title">Snow Moon</h2>
             <h3 class="moon-date">22sd of Nivis</3>
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

        <button class="carousel-next">❯</button>
      </div>
    </div>
  `;
}


// ********************************
// CELTIC ZODIAC  
// ********************************

// Define zodiac signs and their descriptions
const zodiacSigns = [
  { name: "Birch", description: "Symbol of renewal and strength." },
  { name: "Rowan", description: "Symbol of protection and insight." },
  { name: "Ash", description: "Symbol of healing and growth." },
  { name: "Alder", description: "Symbol of endurance and passion." },
  { name: "Willow", description: "Symbol of intuition and cycles." },
  { name: "Hawthorn", description: "Symbol of balance and duality." },
  { name: "Oak", description: "Symbol of wisdom and strength." },
  { name: "Holly", description: "Symbol of resilience and defence." },
  { name: "Hazel", description: "Symbol of wisdom and inspiration." },
  { name: "Vine", description: "Symbol of prophecy and change." },
  { name: "Ivy", description: "Symbol of tenacity and connection." },
  { name: "Reed", description: "Symbol of harmony and courage." },
  { name: "Elder", description: "Symbol of transformation and release." }
];

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

  zodiacItems.forEach(item => {
      item.addEventListener("click", () => {
          const zodiacName = item.querySelector("p").textContent;
          console.log("Click!!!");
          showZodiacModal(zodiacName);
      });
  });

  closeModal.addEventListener("click", () => {
      zodiacModal.classList.remove("show");
  });

  function showZodiacModal(zodiacName) {

    // Fetch Zodiac details from a JSON or an object
    const zodiacData = {
        "Birch": {
            date: "Nivis 2 to Janus 1",
            image: "assets/images/zodiac/zodiac-birch.png",
            description: "The Birch tree stands at the threshold of new beginnings, its pale bark shimmering like moonlight on fresh snow. A symbol of renewal, resilience, and leadership, Birch is the first to take root after devastation, whispering to those who dare to embark on new journeys.",
            traits: "Leadership, ambition, resilience.",
            element: "🌬️ Air",
            animal: "White Stag - Guidance and Intuition.",
            mythology: "The Birch tree is associated with rebirth and the dawn of new journeys."
        },
        "Rowan": {
            date: "Janus 2 to Brigid 1",
            image: "assets/images/zodiac/zodiac-rowan.png",
            description: "The Rowan tree is the guardian of enchantment, its bright red berries forming a celestial script of ancient protection. A beacon for intuition and visionary wisdom, Rowan souls walk between worlds, unlocking mysteries hidden from mortal eyes. Sacred to the Druids, this tree was believed to ward off dark magic and guide lost spirits home.",
            traits: "Creativity, intuition, inspiration.",
            element: "🔥 Fire",
            animal: "Crane - Longevity, Wisdom, and Spiritual Strength",
            mythology: "Sacred to the Druids, Rowan trees were thought to guard against enchantment."
        },
        "Ash": {
          date: "Brigid 2 to Flora 1",
          image: "assets/images/zodiac/zodiac-ash.png",
          description: "Tall and unwavering, the Ash tree bridges the heavens and the earth, its roots drinking deeply from sacred wells of wisdom. A sign of creativity, adaptability, and deep spiritual insight, Ash-born souls are dreamers, poets, and healers, moving effortlessly between the material and mystical realms. In Celtic lore, the Ash was believed to hold the knowledge of fate itself.",
          traits: "Creativity, intuition, inspiration.",
          element: "💧 Water",
          animal: "Adder - Transformation and rebirth.",
          mythology: "Sea Serpent - Hidden depths and transformation."
      },
      "Alder": {
        date: "Flora 2 to Maia 1",
        image: "assets/images/zodiac/zodiac-alder.png",
        description: "The Alder tree thrives where land meets water, standing strong even in the most shifting of landscapes. A sign of strength, endurance, and fierce protection, Alder souls are warriors of the heart, defending those they love with unshakable loyalty. In Celtic mythology, Alder wood was used to create magical shields, imbued with the spirit of resilience and courage.",
        traits: "Balance, stability, and courage.",
        element: "🌊 Water",
        animal: "Fox - Intelligence, cunning, and adaptability.",
        mythology: "Firebird - Resurrection and spiritual enlightenment."
    },
      "Willow": {
        date: "Maia 2 to Juno 1",
        image: "assets/images/zodiac/zodiac-willow.png",
        description: "The Willow tree bends but never breaks, its silver leaves whispering ancient secrets to those who listen. A tree of intuition, emotion, and moonlit magic, Willow-born souls feel the unseen tides of the world, embracing both light and shadow with equal grace. Under a full moon, the Willow’s branches can be used to divine the truth hidden beneath the surface.",
        traits: "Intuition, creativity, and emotions.",
        element: "🌊 Water",
        animal: "Hawk - Intuition and sensitivity.",
        mythology: "Hare - Magic, fertility, and new life."
    },
      "Hawthorn": {
        date: "Juno 2 to Solis 1",
        image: "assets/images/zodiac/zodiac-hawthorn.png",
        description: "The Hawthorn tree is the threshold between this world and the next, often seen guarding the faerie realms. A sign of balance, transformation, and hidden power, Hawthorn-born souls hold both the sting and the bloom, capable of great gentleness and ferocity. To sleep under a Hawthorn tree on Beltane was said to grant visions of the Otherworld.",
        traits: "Balance, protection, and transformation.",
        element: "🌬️ Air",
        animal: "Owl - Wisdom, intuition, and mystery.",
        mythology: "Unicorn - Purity, grace, and divine guidance."
    },
    "Oak": {
        date: "Solis 2 to Terra 1",
        image: "assets/images/zodiac/zodiac-oak.png",
        description: "The Oak tree is the mighty king of the forest, its vast branches sheltering all creatures beneath its wisdom. A sign of strength, endurance, and deep-rooted knowledge, Oak souls carry the fire of ancient kings and the patience of the land itself. The Druids believed that the acorn held the power of prophecy, and those born under the Oak stand firm through life’s greatest storms.",
        traits: "Strength, wisdom, and stability.",
        element: "🌎 Earth",
        animal: "Wren - Quick-wittedness and resourcefulness.",
        mythology: "White Horse - Power, freedom, and victory."
    },
    "Holly": {
      date: "Terra 2 to Lugh 1",
      image: "assets/images/zodiac/zodiac-holly.png",
      description: "The Holly tree is a warrior’s shield, its evergreen leaves brimming with protective energy. A sign of determination, honor, and fierce love, Holly souls are both the sword and the sanctuary, offering both strength and solace. In Celtic mythology, Holly ruled the dark half of the year, standing as a guardian between worlds.",
      traits: "Protection, balance, and transformation.",
      element: "🔥 Fire",
      animal: "Horse - Freedom, courage, and adventure.",
      mythology: "Pegasus - Creativity and spiritual enlightenment."
   },
    "Hazel": {
      date: "Lugh 2 to Pomona 1",
      image: "assets/images/zodiac/zodiac-hazel.png",
      description: "The Hazel tree is the sacred tree of knowledge, growing beside the mystical Well of Wisdom. A sign of insight, intelligence, and deep memory, Hazel souls are the keepers of ancient lore, forever drawn to the pursuit of truth. The Celts believed Hazel nuts granted divine inspiration, making this tree a favorite of poets and seers.",
      traits: "Wisdom, creativity, and inspiration.",
      element: "💧 Water",
      animal: "Salmon - Knowledge and divine inspiration.",
      mythology: "Salmon of Knowledge - Quest for wisdom and understanding."
   },
    "Vine": {
      date: "Pomona 2 to Autumna 1",
      image: "assets/images/zodiac/zodiac-vine.png",
      description: "The Vine twists and turns, embracing life’s cycles with grace. A sign of passion, sensuality, and deep intuition, Vine-born souls are both wild and wise, able to sense hidden truths beneath the surface. Celtic lore tells of the Vine’s power to reveal the nature of one’s heart, whether it be love, ambition, or destiny itself.",
      traits: "Growth, fun, and celebration.",
      element: "🌎 Earth",
      animal: "Swan - Grace and transformation.",
      mythology: "Selkie - Adaptability and emotional depth."
   },
   "Ivy": {
    date: "Autumna 2 to Eira 1",
    image: "assets/images/zodiac/zodiac-ivy.png",
    description: "The Ivy climbs ever higher, a symbol of perseverance, growth, and eternal connection. Those born under Ivy know how to navigate through life’s mazes, finding paths where others see only walls. In Celtic belief, Ivy was worn for protection against negative energies, ensuring that no darkness could entangle the heart of an Ivy soul.",
    traits: "Connection, loyalty, and perseverance.",
    element: "🌬️ Air",
    animal: "Butterfly - Endurance and adaptability.",
    mythology: "Faerie - Magic and the hidden realms of nature."
   },
   "Reed": {
    date: "Eira 2 to Aether 1",
    image: "assets/images/zodiac/zodiac-reed.png",
    description: "The Reed bends to the wind but never breaks, a sign of resilience, adaptability, and deep inner wisdom. Those born under the Reed move through life like water, shifting with the currents but never losing their direction. In Celtic myth, the Reed was a symbol of storytelling and sacred speech, carrying the power of words woven into fate.",
    traits: "Adaptability, flexibility, and protection.",
    element: " 🌊 Water",
    animal: "Cat - Independence and curiosity.",
    mythology: "Mermaid - Transformation, healing, and rebirth."
   },
   "Elder": {
    date: "Aether 2 to Nivis 1",
    image: "assets/images/zodiac/zodiac-elder.png",
    description: "The Elder tree is the final gateway, its roots deep in the wisdom of ages past. A sign of transformation, endings, and rebirth, Elder souls are old spirits in young bodies, always moving toward the next great adventure. In Celtic tradition, Elder wood was never burned, for it was believed to house the spirits of ancestors and unseen guides.",
    traits: "Protection, renewal, and transformation.",
    element: "🔥 Fire",
    animal: "Badger - Magic and intelligence.",
    mythology: "Phoenix - Rebirth and spiritual transformation."
   }
  };

    const data = zodiacData[zodiacName] || {};

    // Populate the modal with Zodiac details
    document.getElementById("zodiac-name").textContent = zodiacName;
    document.getElementById("zodiac-date-range").textContent = data.date || "Date not found";
    document.getElementById("zodiac-image").src = data.image || "";
    document.getElementById("zodiac-description").textContent = data.description || "No description available.";
    document.getElementById("zodiac-traits").textContent = data.traits || "Traits unknown.";
    document.getElementById("zodiac-element").textContent = data.element || "Element unknown.";
    document.getElementById("zodiac-animal").textContent = data.animal || "Animal unknown.";
    document.getElementById("zodiac-mythology").textContent = data.mythology || "Mythology unknown.";

    // Show the modal
    zodiacModal.classList.remove("hidden");
    zodiacModal.classList.add("show");
  }
};

// ********************************
// MOON POETRY
// ********************************

export function initializeMoonPoetry() {
  const slides = document.querySelectorAll(".moon-slide");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const harpSound = new Audio("assets/sound/harp.wav"); // Load sound file

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
      "Nivis": "snow-moon",
      "Janus": "wolf-moon",
      "Brigid": "worm-moon",
      "Flora": "pink-moon",
      "Juno": "flower-moon",
      "Solis": "strawberry-moon",
      "Terra": "thunder-moon",
      "Lugh": "grain-moon",
      "Pomona": "harvest-moon",
      "Autumna": "hunters-moon",
      "Eira": "frost-moon",
      "Aether": "cold-moon",
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