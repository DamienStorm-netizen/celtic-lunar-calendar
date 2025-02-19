export function renderInsights() {
    return `
    <section class="settings">
        <h1>Insights</h1>

        <div id="insightsNavBar">Insights Navigation Bar</div>

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

        <div id="zodiac-modal" class="modal">
          <div class="modal-content">
              <button class="close-modal">✖</button>
              <h2 id="zodiac-name">Zodiac Name</h2>
              <p id="zodiac-date-range">Date Range</p>
              <img id="zodiac-image" src="" alt="Zodiac Sign" />
              <p id="zodiac-description">Zodiac description here...</p>

              <h3>Three Key Traits</h3>
              <p id="zodiac-traits"></p>

              <h3>Associated Element</h3>
              <p id="zodiac-element"></p>

              <h3>Plants/Animals</h3>
              <p id="zodiac-plants"></p>

              <h3>Mythology</h3>
              <p id="zodiac-mythology"></p>

              <button id="learn-more">Learn More</button>
          </div>
</div>
    </section>
    `;
}

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
  
  export function initializeWheel() {
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
    const closeModal = document.querySelector(".close-modal");
    const zodiacItems = document.querySelectorAll(".zodiac-item");

    zodiacItems.forEach(item => {
        item.addEventListener("click", () => {
            const zodiacName = item.querySelector("p").textContent;
            showZodiacModal(zodiacName);
        });
    });

    closeModal.addEventListener("click", () => {
        zodiacModal.classList.remove("show");
    });

    function showZodiacModal(zodiacName) {

      console.log("Zodiac Modal Element:", document.getElementById("zodiac-modal"));
      // Fetch Zodiac details from a JSON or an object
      const zodiacData = {
          "Birch": {
              date: "Nivis 2 to Janus 1",
              image: "assets/images/zodiac/zodiac-birch.png",
              description: "The Birch tree stands at the threshold of new beginnings, its pale bark shimmering like moonlight on fresh snow. A symbol of renewal, resilience, and leadership, Birch is the first to take root after devastation, whispering to those who dare to embark on new journeys.",
              traits: "Leadership, ambition, resilience.",
              element: "🌬️ Air",
              plants: "White Birch - Growth and adaptability.",
              mythology: "The Birch tree is associated with rebirth and the dawn of new journeys."
          },
          "Rowan": {
              date: "Janus 2 to Brigid 1",
              image: "assets/images/zodiac/zodiac-rowan.png",
              description: "The Rowan tree is the guardian of enchantment, its bright red berries forming a celestial script of ancient protection. A beacon for intuition and visionary wisdom, Rowan souls walk between worlds, unlocking mysteries hidden from mortal eyes. Sacred to the Druids, this tree was believed to ward off dark magic and guide lost spirits home.",
              traits: "Creativity, intuition, inspiration.",
              element: "🔥 Fire",
              plants: "Rowan Tree - Protection and insight.",
              mythology: "Sacred to the Druids, Rowan trees were thought to guard against enchantment."
          },
          "Ash": {
            date: "Brigid 2 to Flora 1",
            image: "assets/images/zodiac/zodiac-ash.png",
            description: "Tall and unwavering, the Ash tree bridges the heavens and the earth, its roots drinking deeply from sacred wells of wisdom. A sign of creativity, adaptability, and deep spiritual insight, Ash-born souls are dreamers, poets, and healers, moving effortlessly between the material and mystical realms. In Celtic lore, the Ash was believed to hold the knowledge of fate itself.",
            traits: "Creativity, intuition, inspiration.",
            element: "💧 Water",
            Animal: "Adder - Transformation and rebirth.",
            mythology: "Sea Serpent - Hidden depths and transformation."
        },
        "Alder": {
          date: "Flora 2 to Maia 1",
          image: "assets/images/zodiac/zodiac-alder.png",
          description: "The Alder tree thrives where land meets water, standing strong even in the most shifting of landscapes. A sign of strength, endurance, and fierce protection, Alder souls are warriors of the heart, defending those they love with unshakable loyalty. In Celtic mythology, Alder wood was used to create magical shields, imbued with the spirit of resilience and courage.",
          traits: "Balance, stability, and courage.",
          element: "🌊 Water",
          Animal: "Fox - Intelligence, cunning, and adaptability.",
          mythology: "Firebird - Resurrection and spiritual enlightenment."
      },
        "Willow": {
          date: "Maia 2 to Juno 1",
          image: "assets/images/zodiac/zodiac-willow.png",
          description: "The Willow tree bends but never breaks, its silver leaves whispering ancient secrets to those who listen. A tree of intuition, emotion, and moonlit magic, Willow-born souls feel the unseen tides of the world, embracing both light and shadow with equal grace. Under a full moon, the Willow’s branches can be used to divine the truth hidden beneath the surface.",
          traits: "Intuition, creativity, and emotions.",
          element: "🌊 Water",
          Animal: "Hawk - Intuition and sensitivity.",
          mythology: "Hare - Magic, fertility, and new life."
      },
        "Hawthorn": {
          date: "Juno 2 to Solis 1",
          image: "assets/images/zodiac/zodiac-hawthorn.png",
          description: "The Hawthorn tree is the threshold between this world and the next, often seen guarding the faerie realms. A sign of balance, transformation, and hidden power, Hawthorn-born souls hold both the sting and the bloom, capable of great gentleness and ferocity. To sleep under a Hawthorn tree on Beltane was said to grant visions of the Otherworld.",
          traits: "Balance, protection, and transformation.",
          element: "🌬️ Air",
          Animal: "Owl - Wisdom, intuition, and mystery.",
          mythology: "Unicorn - Purity, grace, and divine guidance."
      },
      "Oak": {
          date: "Solis 2 to Terra 1",
          image: "assets/images/zodiac/zodiac-oak.png",
          description: "The Oak tree is the mighty king of the forest, its vast branches sheltering all creatures beneath its wisdom. A sign of strength, endurance, and deep-rooted knowledge, Oak souls carry the fire of ancient kings and the patience of the land itself. The Druids believed that the acorn held the power of prophecy, and those born under the Oak stand firm through life’s greatest storms.",
          traits: "Strength, wisdom, and stability.",
          element: "🌎 Earth",
          Animal: "Wren - Quick-wittedness and resourcefulness.",
          mythology: "White Horse - Power, freedom, and victory."
      },
      "Holly": {
        date: "Terra 2 to Lugh 1",
        image: "assets/images/zodiac/zodiac-holly.png",
        description: "The Holly tree is a warrior’s shield, its evergreen leaves brimming with protective energy. A sign of determination, honor, and fierce love, Holly souls are both the sword and the sanctuary, offering both strength and solace. In Celtic mythology, Holly ruled the dark half of the year, standing as a guardian between worlds.",
        traits: "Protection, balance, and transformation.",
        element: "🔥 Fire",
        Animal: "Horse - Freedom, courage, and adventure.",
        mythology: "Pegasus - Creativity and spiritual enlightenment."
     },
      "Hazel": {
        date: "Lugh 2 to Pomona 1",
        image: "assets/images/zodiac/zodiac-hazel.png",
        description: "The Hazel tree is the sacred tree of knowledge, growing beside the mystical Well of Wisdom. A sign of insight, intelligence, and deep memory, Hazel souls are the keepers of ancient lore, forever drawn to the pursuit of truth. The Celts believed Hazel nuts granted divine inspiration, making this tree a favorite of poets and seers.",
        traits: "Wisdom, creativity, and inspiration.",
        element: "💧 Water",
        Animal: "Salmon - Knowledge and divine inspiration.",
        mythology: "Salmon of Knowledge - Quest for wisdom and understanding."
     },
      "Vine": {
        date: "Pomona 2 to Autumna 1",
        image: "assets/images/zodiac/zodiac-vine.png",
        description: "The Vine twists and turns, embracing life’s cycles with grace. A sign of passion, sensuality, and deep intuition, Vine-born souls are both wild and wise, able to sense hidden truths beneath the surface. Celtic lore tells of the Vine’s power to reveal the nature of one’s heart, whether it be love, ambition, or destiny itself.",
        traits: "Growth, fun, and celebration.",
        element: "🌎 Earth",
        Animal: "Swan - Grace and transformation.",
        mythology: "Selkie - Adaptability and emotional depth."
     },
     "Ivy": {
      date: "Autumna 2 to Eira 1",
      image: "assets/images/zodiac/zodiac-ivy.png",
      description: "The Ivy climbs ever higher, a symbol of perseverance, growth, and eternal connection. Those born under Ivy know how to navigate through life’s mazes, finding paths where others see only walls. In Celtic belief, Ivy was worn for protection against negative energies, ensuring that no darkness could entangle the heart of an Ivy soul.",
      traits: "Connection, loyalty, and perseverance.",
      element: "🌬️ Air",
      Animal: "Butterfly - Endurance and adaptability.",
      mythology: "Faerie - Magic and the hidden realms of nature."
     },
     "Reed": {
      date: "Eira 2 to Aether 1",
      image: "assets/images/zodiac/zodiac-reed.png",
      description: "The Reed bends to the wind but never breaks, a sign of resilience, adaptability, and deep inner wisdom. Those born under the Reed move through life like water, shifting with the currents but never losing their direction. In Celtic myth, the Reed was a symbol of storytelling and sacred speech, carrying the power of words woven into fate.",
      traits: "Adaptability, flexibility, and protection.",
      element: " 🌊 Water",
      Animal: "Cat - Independence and curiosity.",
      mythology: "Mermaid - Transformation, healing, and rebirth."
     },
     "Elder": {
      date: "Aether 2 to Nivis 1",
      image: "assets/images/zodiac/zodiac-elder.png",
      description: "The Elder tree is the final gateway, its roots deep in the wisdom of ages past. A sign of transformation, endings, and rebirth, Elder souls are old spirits in young bodies, always moving toward the next great adventure. In Celtic tradition, Elder wood was never burned, for it was believed to house the spirits of ancestors and unseen guides.",
      traits: "Protection, renewal, and transformation.",
      element: "🔥 Fire",
      Animal: "Badger - Magic and intelligence.",
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
      document.getElementById("zodiac-plants").textContent = data.plants || "Plants unknown.";
      document.getElementById("zodiac-mythology").textContent = data.mythology || "Mythology unknown.";

      // Show the modal
      zodiacModal.classList.add("show");
    }
  
  
};