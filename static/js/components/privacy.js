export function renderPrivacy() {
    const app = document.getElementById('app');
    return `
    <section class="privacy">

        <h1>Privacy</h1>
        
          <section>
            <p>
                At <strong>Eclipsed Realities & Playground of the Senses</strong>, we believe that some things should remain untouched by the modern world's prying eyes—like <em>your privacy.</em> This app is a place of magic, wonder, and self-discovery, not data collection.
            </p>
        </section>

        <section>
            <h2>🛡️ What We Collect:</h2>
            <p><strong>Absolutely nothing.</strong></p>
            <p>No names. No emails. No personal information. Your journey through the Celtic Lunar Calendar remains <em>yours alone</em>.</p>
        </section>

        <section>
            <h2>🔍 Tracking & Analytics?</h2>
            <p><strong>Nope. None. Zero.</strong></p>
            <p>We don’t use Google Analytics, cookies, third-party trackers, or any digital scrying tools. Your path through this app is <em>for your eyes only.</em></p>
        </section>

        <section>
            <h2>🔮 Third-Party Services?</h2>
            <p>We don’t share or sell your data because... well, <strong>we don’t have any of it.</strong></p>
            <p>There are no advertisers lurking in the shadows. No corporations harvesting your dreams.</p>
        </section>

        <section>
            <h2>🗝️ Your Data, Your Control</h2>
            <p>Since we don’t store anything, there’s nothing to request, delete, or worry about. The only thing you leave behind are <em>footsteps in the moonlight.</em> 🌙</p>
        </section>

        <section>
            <h2>💜 A Space of Trust</h2>
            <p>This app was created with <strong>love, magic, and the belief that technology can exist without intrusion.</strong></p>
            <p>Here, you can explore the rhythms of the moon <em>without interference.</em></p>
        </section>

        <div class="privacy-footer">
            <p>✨ No tracking. No data. Just you, the moon, and the magic of time. ✨</p>
        </div>

         <div>
            <button onclick="window.history.back()" class="back-button">Back to Safety</button>
        </div>
    </section>
    `;
    
}