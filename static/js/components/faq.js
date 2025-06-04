export function renderFaq() {
    const app = document.getElementById('app');
    return `
        <div class="faq-section">
        <h1 class="faq-title">FAQ</h1>
        <div class="accordion-item">
            <button class="accordion-header">
            <span>❓ How can I contact the creators?</span>
            <span class="accordion-icon">+</span>
            </button>
            <div class="accordion-content">
            <p>
                You can reach out to the creators of the Lunar Almanac by email at <a href="mailto:hello@lunaralmanac.app">hello@lunaralmanac.app</a>.
                We love hearing from you — whether it’s feedback, bug reports, or stardust wishes. ✨
            </p>
            </div>
        </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerHTML = renderFaq();

  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      console.log("FAQ Click");
      const item = header.parentElement;
      item.classList.toggle("open");
    });
  });
});