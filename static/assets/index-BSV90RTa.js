(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();function U(e,{onSwipeLeft:t,onSwipeRight:o,threshold:n=30}){let a=0,s=0;if(!e){console.warn("Swipe handler: no element provided.");return}e.addEventListener("touchstart",i=>{a=i.changedTouches[0].screenX}),e.addEventListener("touchend",i=>{s=i.changedTouches[0].screenX,l()});function l(){const i=s-a;Math.abs(i)>n&&(i<0?t==null||t():o==null||o())}}function Ee(e){const t={festival:"🔥","full-moon":"🌕",eclipse:"🌑",holiday:"🎊"},o={"😎 Friends":"😎","🎉 Celebrations":"🎉","🌸 My Cycle":"🌸","💡 General":"💡","🏥 Health":"🏥","💜 Romantic":"💜","🖥️ Professional":"🖥️","🔥 Date":"🔥"};return e.type==="custom-event"&&e.category?o[e.category]||"✨":t[e.type]||"✨"}function V(e){localStorage.setItem("customEvents",JSON.stringify(e))}function de(){const e=localStorage.getItem("customEvents");return e?JSON.parse(e):[]}async function R(){try{const e=await fetch("/api/custom-events",{cache:"no-store",headers:{"Cache-Control":"no-store"}});if(!e.ok)throw new Error("Failed to fetch custom events");return await e.json()}catch(e){return console.error("Error fetching custom events:",e),[]}}function Se(e,t){const o=document.getElementById("event-toast"),n=document.getElementById("toast-date"),a=document.getElementById("toast-view-btn"),s=z(t),l=B(t);n.textContent=`${s}, ${l}`,o.classList.remove("hidden"),setTimeout(()=>o.classList.add("hidden"),6e3),a.onclick=()=>{document.querySelector(".nav-link#nav-calendar").click(),showCalendarForDate(new Date(t));const i=document.querySelector(`[data-event-id="${e}"]`);i&&i.classList.add("highlight-pulse"),setTimeout(()=>i&&i.classList.remove("highlight-pulse"),2e3),o.classList.add("hidden")}}function Le(){return`
        <div id="settings-container" class="fade-in">
            <div id="modal-overlay" class="modal-overlay hidden"></div>
            <h1 class="settings-title">Settings</h1>

            <!-- Custom Events Management -->
            <section id="custom-events-settings">

                <h2>🌗 Date Conversion</h2>
                <p class="settings-subheader">Gregorian to Lunar Date</p>
                <ul class="conversion-settings">
                    <li>Gregorian Date: <input type="text" id="convert-to-celtic" class="flatpickr-input" placeholder="Pick your date 🌕" required /></li>
                   <li class="lunar-date-row"><span class="lunar-label">Lunar Date:</span><span class="converted-date">Trésda, Juno 9</span></li>
                </ul>
            
                <br />

                <h2>🌙 Add an Event</h2>
                <p class="settings-subheader">Add a custom event to your calendar.</p>
                <button id="add-event-button" class="settings-btn">Add New Event</button>

                <br />

                 <h2>🌓 Edit/ Delete an Event</h2>
                <p class="settings-subheader">Edit or remove existing custom events from your calendar.</p>
                <!-- Custom Events List -->
                <div id="event-list-container">
                    <p>Loading your magical events...</p>
                </div>

                <!--- ADD Custom Event --->
                <div id="add-event-modal" class="modal modal-settings">
                    <div class="modal-content">
                        <span class="close-modal-add  mystical-close">✦</span>
                        <h2>Add New Event</h2>
                        <form id="add-event-form">
                            <label for="event-name">Event Name:
                            <input type="text" id="event-name" required /></label>

                            <label for="event-type">Type of Event:<br />
                            <select id="event-type">
                                <option value="🔥 Date">🔥 Date</option>
                                        <option value="😎 Friends">😎 Friends</option>
                                        <option value="🎉 Celebrations">🎉 Celebrations</option>
                                        <option value="🌸 My Cycle">🌸 My Cycle</option>
                                        <option value="💡 General" active>💡 General</option>
                                        <option value="🏥 Health">🏥 Health</option>
                                        <option value="💜 Romantic">💜 Romantic</option>
                                        <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></label>

                            <label for="event-date">Date:<br />
                            <input type="date" id="event-date" class="flatpickr-input" placeholder="Pick your date 🌕" required /></label>

                            <label for="event-note">Event Description:
                            <textarea id="event-note"></textarea></label>

                            <label for="event-recurring">
                                <input type="checkbox" id="event-recurring" />
                                Make it Recurring
                            </label>

                            <button type="submit">Save Event</button>
                            <button type="button" class="cancel-modal-add">Cancel</button>
                        </form> 
                    </div>
                </div>

                <!--- EDIT Custom Event -->
                <div id="edit-event-modal" class="modal modal-settings">
                    <div class="modal-content">
                        <span class="close-modal-edit mystical-close">✦</span>
                        <h2>Edit Your Event</h2>
                        <form id="edit-event-form">
                            <label for="edit-event-name">Event Name:<input type="text" id="edit-event-name" required /></label>
                            <label for="edit-event-type">Type:
                            <select id="edit-event-type">
                                <option value="🔥 Date">🔥 Date</option>
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Celebrations">🎉 Celebrations</option>
                                <option value="🌸 My Cycle">🌸 My Cycle</option>
                                <option value="💡 General" active>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></label>

                            <label for="edit-event-date">Date:<br />
                            <input type="date" id="edit-event-date" class="flatpickr-input" placeholder="Pick your date 🌕" required /></label>

                            <label for="edit-event-notes">Notes:<br />
                            <textarea id="edit-event-notes"></textarea></label>

                            <label for="edit-event-recurring">
                                <input type="checkbox" id="edit-event-recurring" />
                                Recurring Event
                            </label>

                            <button type="submit" class="save-event-btn">Save Changes</button>&nbsp;&nbsp;<button type="button" class="cancel-modal-edit">Cancel</button>      
                        </form>
                    </div>
                </div>
            </section>

            <br />


            <!-- Mystical Preferences -->
            <section id="mystical-settings">
                <h2>🔮 Mystical Preferences</h2>
                <p class="settings-subheader">Fine-tune your Almanac.</p>

                <ul class="mystical-list">
                    <li class="mystical-toggle">
                        <span>Enable Mystical Suggestions</span>
                        <label class="switch">
                        <input type="checkbox" id="toggle-mystical" data-on="🔮" data-off="✨" />
                        <span class="slider round"></span>
                        </label>
                    </li>
                    
                    <li class="mystical-toggle">
                        <span>Show National Holidays</span>
                        <label class="switch">
                        <input type="checkbox" id="show-holidays" data-on="🎉" data-off="🧾" />
                        <span class="slider round"></span>
                        </label>
                    </li>

                    <li class="mystical-toggle">
                        <span>Show Custom Events</span>
                        <label class="switch">
                            <input type="checkbox" id="show-custom-events" data-on="💜" data-off="🖤" />
                            <span class="slider round"></span>
                            </span>
                        </label>
                    </li>
                <ul>
            </section>

            <br />

            <!-- About & Credits -->
            <section id="about-settings">
                <h2>📜 About This Project</h2>
                <p class="settings-subheader">A collaborative project by <strong>Eclipsed Realities</strong> & <strong>Playground of the Senses</strong>.</p>
                <button id="about-page-button" class="settings-btn">Read More</button>
            </section>

            <!-- Shooting Stars on close overlay -->
            <div id="shooting-stars-container"></div>

            <!-- Toast conatiner for add Event -->
            <div id="event-toast" class="event-toast hidden">
                ✨ Event added for <span id="toast-date"></span> – <button id="toast-view-btn">View Event</button>
            </div>
        </div>
    `}function A(){const e=localStorage.getItem("mysticalPrefs"),t={mysticalSuggestions:!0,showHolidays:!0,showCustomEvents:!0,showConstellations:!0};return e?{...t,...JSON.parse(e)}:t}function ke(e){const t=document.getElementById("edit-event-modal"),o=document.getElementById("edit-event-form");console.log("Event ID to edit is ",e),fetch("/api/custom-events").then(n=>n.json()).then(n=>{const a=n.find(l=>l.id===e);if(!a){console.error("Event not found.");return}console.log("Type to edit is ",a.type),document.getElementById("edit-event-name").value=a.title,document.getElementById("edit-event-type").value=a.type||"General",document.getElementById("edit-event-date").value=a.date;const s=document.getElementById("edit-event-date");s._flatpickr&&s._flatpickr.setDate(a.date,!0),document.getElementById("edit-event-notes").value=a.notes||"",document.getElementById("edit-event-recurring").checked=a.recurring||!1,o.setAttribute("data-original-id",a.id),t.classList.remove("hidden"),t.classList.add("show"),document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.querySelectorAll(".close-modal-edit").forEach(l=>{l.addEventListener("click",()=>{const i=document.getElementById("edit-event-modal");i.classList.remove("show"),i.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")})}),document.querySelectorAll(".cancel-modal-edit").forEach(l=>{l.addEventListener("click",()=>{const i=document.getElementById("edit-event-modal");i.classList.remove("show"),i.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")})})}).catch(n=>console.error("Error fetching event:",n))}function Te(){console.log("☸️ Running the setupSettingsEvent function");const e=document.getElementById("edit-event-form");e.removeEventListener("submit",ie),e.addEventListener("submit",ie);const t=document.getElementById("add-event-form");t.removeEventListener("submit",se),t.addEventListener("submit",se),document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on overlay");const i=document.getElementById("edit-event-modal"),r=document.getElementById("add-event-modal");i.classList.contains("show")&&(i.classList.remove("show"),i.classList.add("hidden")),r.classList.contains("show")&&(r.classList.remove("show"),r.classList.add("hidden")),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),R().then(i=>j(i)).catch(i=>console.error("Error loading events:",i));const o=A();document.getElementById("toggle-mystical").checked=o.mysticalSuggestions,document.getElementById("show-holidays").checked=o.showHolidays,document.getElementById("show-custom-events").checked=o.showCustomEvents;function n(){document.querySelectorAll(".switch input[type='checkbox']").forEach(i=>{const r=i.nextElementSibling,c=i.dataset.on||"🔮",d=i.dataset.off||"✨";r.innerHTML=`<span class="toggle-icon">${i.checked?c:d}</span>`})}function a(){document.querySelectorAll(".switch input[type='checkbox']").forEach(i=>{i.addEventListener("change",n)}),n()}a();const s=document.getElementById("convert-to-celtic"),l=document.querySelector(".converted-date");if(s&&l){s.addEventListener("change",r=>{const c=r.target.value,d=B(c);if(d==="Unknown Date"||d==="Invalid Date")l.textContent=d;else{const m=z(c);l.textContent=`${m}, ${d}`}});const i=new Date().toISOString().split("T")[0];s.value=i,s.dispatchEvent(new Event("change"))}flatpickr("#convert-to-celtic",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil",onChange:function(i,r){const c=B(r);if(c==="Unknown Date"||c==="Invalid Date")l.textContent=c;else{const d=z(r);l.textContent=`${d}, ${c}`}}}),flatpickr("#event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"}),flatpickr("#edit-event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"})}function Me(){console.log("📝 Open Add Event Modal...");const e=document.getElementById("add-event-modal");e.classList.remove("hidden"),e.classList.add("show"),document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.querySelectorAll(".cancel-modal-add").forEach(t=>{t.addEventListener("click",()=>{e.classList.remove("show"),e.classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")})}),document.querySelectorAll(".close-modal-add").forEach(t=>{t.addEventListener("click",()=>{e.classList.remove("show"),e.classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")})})}async function se(e){document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),console.log("Adding an event"),e.preventDefault();const t=document.getElementById("event-name").value.trim(),o=document.getElementById("event-type").value,n=document.getElementById("event-date").value,a=document.getElementById("event-note").value.trim(),s=document.getElementById("event-recurring").checked;if(!t||!n){alert("Please enter both an event name and date.");return}const l={id:Date.now().toString(),title:t,type:o,date:n,notes:a,recurring:s};let i=[];try{i=de(),Array.isArray(i)||(i=[])}catch(c){console.warn("Failed to load custom events from localStorage:",c),i=[]}const r=[...i,l];V(r),console.log("📤 Sending new event:",l);try{const c=await fetch("/api/custom-events",{cache:"no-store",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!c.ok)throw new Error("Failed to add event");const d=await c.json();console.log("✅ Event added successfully:",d),document.getElementById("add-event-modal").style.display="none";const m=await R();if(j(m),setTimeout(()=>{const y=document.querySelectorAll(".event-item"),h=Array.from(y).find(v=>v.textContent.includes(t)&&v.textContent.includes(n));h&&(h.classList.add("event-highlight"),h.scrollIntoView({behavior:"smooth",block:"center"}),h.classList.add("event-highlight-glow"),h.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{h.classList.remove("event-highlight"),h.classList.remove("event-highlight-glow")},3e3))},200),document.getElementById("event-name").value="",document.getElementById("event-date").value="",document.getElementById("event-type").value="General",document.getElementById("event-note").value="",typeof Swal<"u"&&Swal.fire){const y=z(n),h=B(n);Swal.fire({title:`Event saved for ${y}, ${h}`,html:'<img src="/src/assets/icons/logo-icon.png" class="swal2-logo-icon" alt="Lunar Logo">',customClass:{popup:"celestial-toast"},showCancelButton:!0,confirmButtonText:"View Event",cancelButtonText:"Cancel"}).then(v=>{if(v.isConfirmed){document.querySelector(".nav-link#nav-calendar").click();const[u,w]=h.split(" ");setTimeout(()=>{x(parseInt(w,10),u,n,l.id);const S=document.querySelector(`[data-event-id="${l.id}"]`);S&&(S.classList.add("highlight-pulse"),setTimeout(()=>S.classList.remove("highlight-pulse"),2e3))},300)}})}else Se(l.id,n)}catch(c){console.error("❌ Error adding event:",c),alert("Oops! Something went wrong while adding your event.")}}function j(e){const t=document.getElementById("event-list-container");t.innerHTML="",e.forEach(o=>{console.log("Processing event:",o);const n=document.createElement("div");n.classList.add("event-item"),n.innerHTML=`
            <ul class="settings-event-list">
                <li><h3>${o.title} - ${o.type}</h3></li>
                <li>${o.date}</li>
                <li>${o.notes||"No notes added."}</li>
                <li><button class="settings-edit-event" data-id="${o.id}">Edit</button><button class="settings-delete-event" data-id="${o.id}">Delete</button></li>
            </ul>
        `,t.appendChild(n)}),Ie()}async function ie(e){e.preventDefault();const o=document.getElementById("edit-event-form").getAttribute("data-original-id"),n={title:document.getElementById("edit-event-name").value.trim(),type:document.getElementById("edit-event-type").value,date:document.getElementById("edit-event-date").value,notes:document.getElementById("edit-event-notes").value.trim()};n.recurring=document.getElementById("edit-event-recurring").checked,console.log("✨ Submitting update for event ID:",o,n);try{const a=await fetch(`/api/custom-events/${o}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!a.ok)throw new Error("Failed to update event.");const s=await a.json();console.log("✅ Event updated:",s),document.getElementById("edit-event-modal").classList.remove("show"),document.getElementById("edit-event-modal").classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show");const l=await R();j(l)}catch(a){console.error("❌ Error updating event:",a),alert("Oops! Something went wrong while updating your event.")}}async function Ce(e){if(console.log("🚀 handleDeleteEvent function triggered!"),!e){console.error("❌ Error: eventId is undefined.");return}console.log(`🗑️ Attempting to delete event on: ${e}`);try{const t=await fetch(`/api/custom-events/${e}`,{method:"DELETE"});if(!t.ok)throw new Error(`Failed to delete event: ${t.statusText}`);console.log(`✅ Event on ${e} deleted successfully!`);const o=document.getElementById("event-list-container");o&&(o.innerHTML="<p>Refreshing events...</p>"),setTimeout(async()=>{console.log("🔄 Fetching updated events...");const n=await R();j(n)},1e3)}catch(t){console.error("❌ Error deleting event:",t)}}function Ie(){document.getElementById("add-event-button").addEventListener("click",()=>{Me()}),document.getElementById("about-page-button").addEventListener("click",()=>{console.log("Clicked on About link"),window.location.hash="about"}),document.querySelectorAll(".settings-edit-event").forEach(e=>{e.addEventListener("click",t=>{console.log("Edit button clicked!");const o=t.target.getAttribute("data-id");o?ke(o):console.error("No data-id attribute found on edit button.")})}),document.querySelectorAll(".settings-delete-event").forEach(e=>{e.addEventListener("click",t=>{console.log("Delete button clicked!!!");const o=t.target;if(!o){console.error("Error: event.target is undefined.");return}const n=o.getAttribute("data-id");if(!n){console.error("Error: data-id attribute not found.");return}console.log("Attempting to delete event on:",n),Ce(n)})}),document.getElementById("toggle-mystical").addEventListener("change",e=>{const t=A();t.mysticalSuggestions=e.target.checked,Z(t),P(t)}),document.getElementById("show-holidays").addEventListener("change",e=>{const t=A();t.showHolidays=e.target.checked,Z(t),P(t)}),document.getElementById("show-custom-events").addEventListener("change",e=>{const t=A();t.showCustomEvents=e.target.checked,Z(t),P(t)})}function Z(e){localStorage.setItem("mysticalPrefs",JSON.stringify(e))}const le=["Under moonlit veils, forgotten dreams awaken.","A star falls — catch it, and a wish is born.","In every whisper of the trees, ancient secrets hum.","Beyond the silver horizon, new worlds sing.","A butterfly’s sigh carries the weight of tomorrow's hopes.","Drink deep the mist of morning; it carries the voice of destiny.","Embered nights forge unspoken promises in starlight.","Dance where the wild moons weave paths of gold.","Ocean tides murmur songs older than time itself.","Petals fall not with sorrow, but with sacred release.","Light a candle — summon courage from hidden realms.","The winds remember every name ever whispered in longing.","A forgotten melody echoes through the soul’s corridors.","Even the darkest sky bears the memory of dawn.","Somewhere between dusk and dreams, your spirit wanders free."];function O(e){return e.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-")}const De=`
<circle cx="671" cy="429" r="1.9" fill="#fff3a3" />
<circle cx="357" cy="521" r="1.8" fill="#fffde6" />
<circle cx="692" cy="488" r="2.2" fill="#ffffcc" />
<circle cx="618" cy="225" r="1.5" fill="#fff3a3" />
<circle cx="220" cy="101" r="2.0" fill="#ffe066" />
<circle cx="166" cy="93" r="1.7" fill="#ffffcc" />
<circle cx="148" cy="184" r="1.3" fill="#fff3a3" />
<circle cx="87" cy="143" r="1.9" fill="#ffe066" />
<circle cx="284" cy="479" r="1.9" fill="#fefcd7" />
<circle cx="417" cy="283" r="1.8" fill="#ffe066" />
<circle cx="612" cy="27" r="1.9" fill="#ffe066" />
<circle cx="550" cy="186" r="2.3" fill="#fff3a3" />
<circle cx="45" cy="130" r="1.6" fill="#fff3a3" />
<circle cx="284" cy="356" r="1.6" fill="#fffde6" />
<circle cx="95" cy="255" r="2.1" fill="#fff3a3" />
<circle cx="89" cy="335" r="1.5" fill="#fffde6" />
<circle cx="422" cy="559" r="1.3" fill="#fefcd7" />
<circle cx="464" cy="254" r="1.2" fill="#fefcd7" />
<circle cx="794" cy="457" r="1.4" fill="#fffde6" />
<circle cx="434" cy="278" r="2.2" fill="#fffde6" />
<circle cx="273" cy="270" r="2.2" fill="#ffe066" />
<circle cx="156" cy="411" r="1.8" fill="#ffffcc" />
<circle cx="203" cy="281" r="2.4" fill="#fff3a3" />
<circle cx="72" cy="22" r="1.8" fill="#ffe066" />
<circle cx="144" cy="250" r="2.1" fill="#ffe066" />
<circle cx="427" cy="458" r="1.5" fill="#ffe066" />
<circle cx="7" cy="197" r="1.6" fill="#ffffcc" />
<circle cx="715" cy="176" r="1.3" fill="#fefcd7" />
<circle cx="772" cy="398" r="1.7" fill="#fffde6" />
<circle cx="331" cy="321" r="2.5" fill="#fff3a3" />
<circle cx="792" cy="366" r="1.7" fill="#ffe066" />
<circle cx="575" cy="135" r="1.5" fill="#fff3a3" />
<circle cx="489" cy="540" r="2.2" fill="#fefcd7" />
<circle cx="184" cy="34" r="2.0" fill="#fefcd7" />
<circle cx="72" cy="64" r="2.2" fill="#ffffcc" />
<circle cx="166" cy="157" r="1.4" fill="#ffffcc" />
<circle cx="140" cy="191" r="1.4" fill="#ffffcc" />
<circle cx="269" cy="387" r="2.5" fill="#ffe066" />
<circle cx="393" cy="281" r="2.3" fill="#fffde6" />
<circle cx="748" cy="326" r="2.0" fill="#fff3a3" />
<circle cx="81" cy="492" r="1.5" fill="#fffde6" />
<circle cx="261" cy="455" r="1.8" fill="#fffde6" />
<circle cx="332" cy="399" r="1.7" fill="#fff3a3" />
<circle cx="618" cy="228" r="1.4" fill="#ffe066" />
<circle cx="351" cy="427" r="1.5" fill="#fefcd7" />
<circle cx="416" cy="339" r="1.9" fill="#fefcd7" />
<circle cx="88" cy="433" r="2.4" fill="#fefcd7" />
<circle cx="557" cy="127" r="2.3" fill="#fffde6" />
<circle cx="721" cy="252" r="1.6" fill="#fefcd7" />
<circle cx="623" cy="397" r="1.4" fill="#fff3a3" />
<circle cx="351" cy="394" r="1.5" fill="#fefcd7" />
<circle cx="408" cy="402" r="1.6" fill="#ffffcc" />
<circle cx="468" cy="346" r="2.0" fill="#ffe066" />
<circle cx="119" cy="454" r="1.9" fill="#fff3a3" />
<circle cx="516" cy="469" r="2.2" fill="#ffe066" />
<circle cx="573" cy="147" r="2.0" fill="#fff3a3" />
<circle cx="726" cy="577" r="1.4" fill="#fff3a3" />
<circle cx="284" cy="595" r="1.4" fill="#fefcd7" />
<circle cx="64" cy="262" r="1.9" fill="#ffe066" />
<circle cx="747" cy="28" r="1.9" fill="#fff3a3" />
<circle cx="548" cy="430" r="1.8" fill="#fffde6" />
<circle cx="386" cy="139" r="2.1" fill="#fffde6" />
<circle cx="64" cy="451" r="1.5" fill="#fff3a3" />
<circle cx="526" cy="158" r="2.4" fill="#fff3a3" />
<circle cx="403" cy="298" r="2.0" fill="#ffe066" />
<circle cx="669" cy="119" r="1.5" fill="#ffffcc" />
<circle cx="767" cy="535" r="1.2" fill="#fffde6" />
<circle cx="355" cy="147" r="2.2" fill="#fffde6" />
<circle cx="674" cy="62" r="1.9" fill="#fffde6" />
<circle cx="291" cy="85" r="2.1" fill="#fffde6" />
<circle cx="631" cy="493" r="1.7" fill="#ffe066" />
<circle cx="152" cy="530" r="1.8" fill="#fff3a3" />
<circle cx="394" cy="322" r="1.6" fill="#ffffcc" />
<circle cx="263" cy="370" r="2.4" fill="#fefcd7" />
<circle cx="376" cy="557" r="1.5" fill="#fffde6" />
<circle cx="549" cy="563" r="2.3" fill="#fff3a3" />
<circle cx="654" cy="535" r="1.7" fill="#fff3a3" />
<circle cx="238" cy="418" r="1.8" fill="#fefcd7" />
<circle cx="348" cy="148" r="1.3" fill="#fff3a3" />
<circle cx="305" cy="76" r="2.0" fill="#fff3a3" />
<circle cx="680" cy="135" r="1.8" fill="#ffe066" />
<circle cx="547" cy="56" r="2.4" fill="#fffde6" />
<circle cx="478" cy="310" r="2.3" fill="#fffde6" />
<circle cx="335" cy="190" r="2.3" fill="#ffffcc" />
<circle cx="81" cy="449" r="2.3" fill="#ffe066" />
<circle cx="543" cy="585" r="1.7" fill="#ffffcc" />
<circle cx="542" cy="429" r="2.1" fill="#ffe066" />
<circle cx="197" cy="88" r="1.7" fill="#ffffcc" />
<circle cx="564" cy="4" r="1.6" fill="#ffe066" />
<circle cx="685" cy="272" r="2.5" fill="#ffe066" />
<circle cx="453" cy="181" r="2.0" fill="#ffe066" />
<circle cx="742" cy="358" r="1.2" fill="#fffde6" />
<circle cx="597" cy="182" r="1.9" fill="#fefcd7" />
<circle cx="511" cy="119" r="1.7" fill="#fffde6" />
<circle cx="82" cy="157" r="1.6" fill="#ffffcc" />
<circle cx="387" cy="436" r="2.3" fill="#fefcd7" />
<circle cx="408" cy="23" r="1.6" fill="#fff3a3" />
<circle cx="104" cy="137" r="1.8" fill="#ffe066" />
<circle cx="377" cy="531" r="2.0" fill="#fefcd7" />
<circle cx="712" cy="526" r="2.0" fill="#fff3a3" />
`;function me(e,t){let o,n;switch(e){case"Nivis":o=new Date(Date.UTC(t-1,11,23)),n=new Date(Date.UTC(t,0,19));break;case"Janus":o=new Date(Date.UTC(t,0,20)),n=new Date(Date.UTC(t,1,16));break;case"Brigid":o=new Date(Date.UTC(t,1,17)),n=new Date(Date.UTC(t,2,16));break;case"Flora":o=new Date(Date.UTC(t,2,17)),n=new Date(Date.UTC(t,3,13));break;case"Maia":o=new Date(Date.UTC(t,3,14)),n=new Date(Date.UTC(t,4,11));break;case"Juno":o=new Date(Date.UTC(t,4,12)),n=new Date(Date.UTC(t,5,8));break;case"Solis":o=new Date(Date.UTC(t,5,9)),n=new Date(Date.UTC(t,6,6));break;case"Terra":o=new Date(Date.UTC(t,6,7)),n=new Date(Date.UTC(t,7,3));break;case"Lugh":o=new Date(Date.UTC(t,7,4)),n=new Date(Date.UTC(t,7,31));break;case"Pomona":o=new Date(Date.UTC(t,8,1)),n=new Date(Date.UTC(t,8,28));break;case"Autumna":o=new Date(Date.UTC(t,8,29)),n=new Date(Date.UTC(t,9,26));break;case"Eira":o=new Date(Date.UTC(t,9,27)),n=new Date(Date.UTC(t,10,23));break;case"Aether":o=new Date(Date.UTC(t,10,24)),n=new Date(Date.UTC(t,11,21));break;case"Mirabilis":const s=pe(t);o=new Date(Date.UTC(t,11,22)),n=new Date(Date.UTC(t,11,22+(s?1:0)));break;default:return console.error("Unknown Celtic month in getMonthRangeISO:",e),{startISO:null,endISO:null}}const a=s=>String(s).padStart(2,"0");return{startISO:`${o.getUTCFullYear()}-${a(o.getUTCMonth()+1)}-${a(o.getUTCDate())}`,endISO:`${n.getUTCFullYear()}-${a(n.getUTCMonth()+1)}-${a(n.getUTCDate())}`}}let C=[],G={},_=null;function Be(){return`
      <section class="calendar" class="fade-in">
        <div id="modal-overlay" class="modal-overlay hidden"></div>

            <h1 class="calendar-title">Calendar</h1>

            <button id="calendar-today-btn" class="today_btn">Today</button>

            <div class="calendar-grid">
                <div class="month-thumbnail" id="nivis" data-month="Nivis">
                    <img src="/assets/images/months/nivis-thumbnail.png" alt="Nivis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="janus" data-month="Janus">
                    <img src="/assets/images/months/janus-thumbnail.png" alt="Janus Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="brigid" data-month="Brigid">
                    <img src="/assets/images/months/brigid-thumbnail.png" alt="Brigid Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Flora" data-month="Flora">
                    <img src="/assets/images/months/flora-thumbnail.png" alt="Flora Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Maia" data-month="Maia">
                    <img src="/assets/images/months/maia-thumbnail.png" alt="Maia Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Juno" data-month="Juno">
                    <img src="/assets/images/months/juno-thumbnail.png" alt="Juno Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Solis" data-month="Solis">
                    <img src="/assets/images/months/solis-thumbnail.png" alt="Solis Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Terra" data-month="Terra">
                    <img src="/assets/images/months/terra-thumbnail.png" alt="Terra Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Lugh" data-month="Lugh">
                    <img src="/assets/images/months/lugh-thumbnail.png" alt="Lugh Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Pomona" data-month="Pomona">
                    <img src="/assets/images/months/pomona-thumbnail.png" alt="Pomona Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Autumna" data-month="Autumna">
                    <img src="/assets/images/months/autumna-thumbnail.png" alt="Autumna Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Eira" data-month="Eira">
                    <img src="/assets/images/months/eira-thumbnail.png" alt="Eira Month Thumbnail">
                </div>
                 <div class="month-thumbnail" id="Aether" data-month="Aether">
                    <img src="/assets/images/months/aether-thumbnail.png" alt="Aether Month Thumbnail">
                </div>
                <div class="month-thumbnail" id="Mirabilis" data-month="Mirabilis">
                    <img src="/assets/images/months/mirabilis-thumbnail.png" alt="Mirabilis Thumbnail">
                </div>
            </div>
        </section>

        <div id="modal-container" class="calendar-modal hidden">
            <div id="modal-content">
                <!-- Add this inside #modal-container -->

                <div id="constellation-layer">
                    <!-- 🌠 Shooting star or constellation here -->
                    <svg class="constellation-stars" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                        ${De}
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="5" result="blur"/>
                                <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <!-- Example Orion Constellation -->
                        <circle cx="100" cy="120" r="2" fill="#f7e98c" filter="url(#glow)" />
                        <circle cx="140" cy="160" r="2" fill="#f7e98c" filter="url(#glow)" />
                        <circle cx="180" cy="200" r="2" fill="#f7e98c" filter="url(#glow)" />
                        <polyline points="100,120 140,160 180,200" stroke="#ffd700" stroke-width="0.5" fill="none" />
                    </svg>
                </div>

                <button id="close-modal" class="mystical-close">✦</button>
               
                <div id="modal-details"></div>
               
            </div>
        </div>
    `}async function he(){console.log("I am running setupCalendarEvents");const e=document.getElementById("modal-container"),t=e==null?void 0:e.querySelector("#close-modal"),o=e==null?void 0:e.querySelector("#modal-content");if(!e||!o||!t){console.error("Modal elements not found. Check IDs and structure.");return}document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on Overlay"),e.classList.contains("show")&&(e.classList.remove("show"),e.classList.add("hidden")),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),t.addEventListener("click",Ae),document.getElementById("calendar-today-btn").addEventListener("click",async()=>{const a=await ue();if(!a){console.error("Could not determine today's Celtic date.");return}const{celticMonth:s,celticDay:l}=a,i=J(s,l);if(!i){console.error("Failed to convert today’s Celtic date to Gregorian.");return}const r=`${i.gregorianYear}-${String(i.gregorianMonth).padStart(2,"0")}-${String(i.gregorianDay).padStart(2,"0")}`;x(l,s,r)}),document.querySelectorAll(".month-thumbnail").forEach(a=>{a.addEventListener("click",s=>{const l=s.target.closest(".month-thumbnail").dataset.month;K(l)})})}function K(e){_=e,console.log("📅 Last opened month set to:",_);const t=document.getElementById("modal-container");if(t&&(document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on overlay"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),t.classList.remove("hidden"),t.classList.add("month-mode"),e)){const o=t.querySelector("#modal-details");if(o){if(t.classList.add("show"),document.body.classList.add("modal-open"),e==="Mirabilis"){const a=pe(new Date().getFullYear());o.innerHTML=`
                    <h2 class="month-title">Mirabilis</h2>
                    <p class="mirabilis-intro month-tagline">Beyond the boundary of time, in the hush between cycles, Mirabilis blooms. Here, two sacred breaths—one of fire, one of shadow—meet where neither past nor future holds sway.</p>

                    <div class="mirabilis-tabs">
                        <button class="mirabilis-tab active" data-tab="solis">Mirabilis Solis</button>
                        <button class="mirabilis-tab" data-tab="noctis">Mirabilis Noctis</button>
                    </div>

                    <div class="mirabilis-tab-content" id="tab-solis">
                        <div class="mirabilis-crest crest-solis" id="crest-solis" title="Click to enter Mirabilis Solis">
                            <img src="/assets/images/months/mirabilis-solis.png" alt="Mirabilis Solis" />
                            <p>Mirabilis Solis</p>
                        </div>
                    </div>

                    <div class="mirabilis-tab-content hidden" id="tab-noctis">
                        <div class="mirabilis-crest crest-noctis ${a?"":"disabled"}" id="crest-noctis" title="${a?"Click to enter Mirabilis Noctis":"Appears only in leap years"}">
                            <img src="/assets/images/months/mirabilis-noctis.png" alt="Mirabilis Noctis" />
                            <p>Mirabilis Noctis</p>
                         </div>
                    </div>
                    `}else o.innerHTML=`
                    <!-- Inside modalDetails.innerHTML -->
                    <h2 class="month-title">${e}</h2>
                    <p class="month-tagline">Loading month tagline...</p>

                    <!-- 🌟 Magical Tabs -->
                    <div class="calendar-tabs">
                        <button id="tab-calendar" class="calendar-tab-button active">Calendar</button>
                        <button id="tab-legend" class="calendar-tab-button">Legend</button>
                        <button id="tab-add" class="calendar-tab-button">Add Your Event</button>
                    </div>

                    <!-- 🌿 Calendar View -->
                    <div id="tab-content-calendar" class="calendar-tab-content active">
                        <div class="calendarGridBox">
                            <table class="calendar-grid">
                                <thead>
                                    <tr>
                                    <th title="Moonday">Moon</th><th title="Trésda">Trés</th><th title="Wyrdsday">Wyrd</th><th title="Thornsday">Thrn</th><th title="Freyasday">Freya</th><th title="Emberveil">Ember</th><th title="Sunveil">Veil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                                    <tr><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                                    <tr><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td></tr>
                                    <tr><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- 🧚 Legend -->
                    <div id="tab-content-legend" class="calendar-tab-content">
                        <!-- <h3 class="goldenTitle">Legend</h3> -->
                        <div id="legend-section">
                            <table class="calendarLegendGrid">
                                <tr class="festival-day-row"><td class="festival-day legendBox">&nbsp;</td><td>Festival Day</td></tr>
                                <tr class="full-moon-day-row"><td class="full-moon-day legendBox">&nbsp;</td><td>Full Moon</td></tr>
                                <tr class="eclipse-day-row"><td class="eclipse-day legendBox">&nbsp;</td><td>Eclipse</td></tr>
                                <tr class="national-holiday-row"><td class="national-holiday legendBox">&nbsp;</td><td>Holiday</td></tr>
                                <tr class="custom-event-day-row"><td class="custom-event-day legendBox">&nbsp;</td><td>Your Event</td></tr>
                            </table>
                        </div>
                    </div>

                    <!-- 💌 Add Event Form -->
                    <div id="tab-content-add" class="calendar-tab-content">
                    <!-- <h3 class="goldenTitle">Add Your Event</h3> -->
                    <form id="add-event-form">
                        <ul>
                        <li><label for="event-name">Event Name</label>
                            <input type="text" id="event-name" required /></li>
                        <li><label for="event-type">Type of Event</label>
                            <select id="event-type" name="event-type">
                                <option value="🔥 Date">🔥 Date</option>
                                <option value="😎 Friends">😎 Friends</option>
                                <option value="🎉 Celebrations">🎉 Celebrations</option>
                                <option value="🌸 My Cycle">🌸 My Cycle</option>
                                <option value="💡 General" active>💡 General</option>
                                <option value="🏥 Health">🏥 Health</option>
                                <option value="💜 Romantic">💜 Romantic</option>
                                <option value="🖥️ Professional">🖥️ Professional</option>
                            </select></li>
                        <li><label for="event-note">Event Description</label>
                            <textarea id="event-note" rows="1" cols="35"></textarea></li>
                        <li><label for="event-date">Date</label>
                            <input type="text" id="event-date" class="flatpickr-input" placeholder="Pick your date 🌕" required /></li>
                        <li><button type="submit" class="add-event-button">Add Event</button></li>
                        </ul>
                    </form>
                    </div>
                `;P(A()),xe(e),$e(),document.querySelectorAll(".mirabilis-tab").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".mirabilis-tab").forEach(s=>s.classList.remove("active")),n.classList.add("active");const a=n.dataset.tab;document.querySelectorAll(".mirabilis-tab-content").forEach(s=>{s.classList.add("hidden")}),document.getElementById(`tab-${a}`).classList.remove("hidden")})}),setTimeout(()=>{const n=document.getElementById("crest-solis");if(n&&n.addEventListener("click",()=>{x(1,"Mirabilis","2025-12-22")}),leap){const a=document.getElementById("crest-noctis");a&&a.addEventListener("click",()=>{x(2,"Mirabilis","2025-12-23")})}},0),t.classList.add("fade-in"),t.classList.remove("fade-out"),Fe(t,e),flatpickr("#event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"}),document.getElementById("add-event-form").addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("event-name").value.trim(),s=document.getElementById("event-type").value,l=document.getElementById("event-date").value,i=document.getElementById("event-note").value.trim();if(!a||!l){alert("Please enter both an event name and date.");return}const r={id:Date.now().toString(),title:a,type:s,date:l,notes:i,recurring:!1};if(!(await fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){alert("Failed to add event.");return}await he();const d=z(l),m=B(l),[y,h]=m.split(" ");Swal.fire({icon:"success",title:`Event saved for ${d}, ${m}`,showCancelButton:!0,confirmButtonText:"View Event"}).then(v=>{v.isConfirmed&&(document.querySelector(".nav-link#nav-calendar").click(),setTimeout(()=>{x(parseInt(h,10),y,l,r.id);const u=document.querySelector(`.custom-event-slide[data-event-id="${r.id}"]`);u&&(u.classList.add("highlight-pulse"),setTimeout(()=>u.classList.remove("highlight-pulse"),2e3))},300))})})}}}function Ae(){console.log("Click Close Button");const e=document.getElementById("modal-container");document.body.classList.remove("modal-open"),e&&e.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")}async function xe(e){try{const t=await fetch("/api/calendar-data");if(!t.ok)throw new Error("Failed to fetch calendar data");const n=(await t.json()).months.find(a=>a.name===e);n?document.querySelector(".month-tagline").textContent=n.tagline:document.querySelector(".month-tagline").textContent="A whisper of time's essence..."}catch(t){console.error("Error fetching tagline:",t),document.querySelector(".month-tagline").textContent="A whisper of time's essence..."}}function $e(){const e=document.querySelectorAll(".calendar-tab-button"),t=document.querySelectorAll(".calendar-tab-content");e.forEach(o=>{o.addEventListener("click",()=>{const n=o.id.replace("tab-","tab-content-");e.forEach(a=>a.classList.remove("active")),t.forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById(n).classList.add("active")})})}async function Fe(e,t){console.log(`Enhancing calendar for ${t}...`),String(["Nivis","Janus","Flora","Maia","Juno","Solis","Terra","Lugh","Pomona","Brigid","Autumna","Eira","Aether"].indexOf(t)+1).padStart(2,"0"),C.length===0&&await Y();const n=await ue();if(!n){console.error("Could not fetch Celtic date. Highlight skipped.");return}const{celticMonth:a,celticDay:s}=n,l=e.querySelectorAll(".calendar-grid td"),i=await ge();console.log("Fetched Eclipse Data:",i),(!C||C.length===0)&&(console.log("Fetching national holidays..."),C=await Y());const r=await ze(t);console.log("🌙 lunarData array:",r);const c=await Ne();console.log("Custom events retrieved:",c),await fe(),l.forEach(d=>{const m=parseInt(d.textContent,10);if(console.log(`📅 Checking table cell: ${m}`),!isNaN(m)){console.log(`✅ Table Cell Detected: ${m} in ${t}`);const y=J(t,m);if(!y){console.error(`Failed to convert ${t} ${m} to Gregorian.`);return}const h=`${y.gregorianYear}-${String(y.gregorianMonth).padStart(2,"0")}-${String(y.gregorianDay).padStart(2,"0")}`,v=i.find(E=>E.date.startsWith(h));v&&(console.log(`🌑 Marking ${m} as Eclipse Day: ${v.title}`),d.classList.add("eclipse-day"),d.setAttribute("title",`${v.title} 🌘`));const u=r.find(E=>E.date===h);if(console.log("Coverted Gregorian date is ",h),u&&u.phase&&u.phase.toLowerCase()==="full moon"){console.log(`🌕 Marking ${m} as Full Moon: ${u.moonName||u.phase}`),d.classList.add("full-moon-day");const E=`${u.moonName||u.phase} 🌕`;d.setAttribute("title",E)}t===a&&m===s&&d.classList.add("highlight-today"),String(m).padStart(2,"0");const w=G.find(E=>E.date===h);w?(console.log(`Marking ${h} as Festival: ${w.title}`),d.classList.add("festival-day"),d.setAttribute("title",`${w.title} 🎉`)):console.log("No holfestivaliday, No marking");const S=C.find(E=>E.date===h);S?(console.log(`Marking ${h} as National Holiday: ${S.title}`),d.classList.add("national-holiday"),d.setAttribute("title",`${S.title} 🎉`)):console.log("No holiday, No marking");const[,L,I]=h.split("-");c.forEach(E=>{const[f,g,b]=E.date.split("-");(E.recurring?g===L&&b===I:E.date===h)&&(d.classList.add("custom-event-day"),d.setAttribute("title",`${E.title}${E.notes?" — "+E.notes:""}`))}),d.addEventListener("click",()=>{console.log(`Clicked on day ${m} in the month of ${t}, Gregorian: ${h}`),x(m,t,h)})}}),P(A())}async function Y(){console.log("Fetching national holidays now!!");try{const e=await fetch("/api/national-holidays");if(!e.ok)throw new Error("Failed to fetch national holidays");const t=await e.json();return C=t,console.log("✅ National Holidays Fetched:",C),t}catch(e){return console.error("Error fetching national holidays:",e),[]}}async function ue(){try{const e=await fetch("/api/celtic-date");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json();return{celticMonth:t.month,celticDay:parseInt(t.celtic_day,10)}}catch(e){return console.error("Failed to fetch Celtic date:",e),null}}async function ge(){try{console.log("🌘 Calling fetchEclipseEvents()...");const e=await fetch("/api/eclipse-events");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json();return console.log("✅ Eclipse Data Retrieved:",t),t}catch(e){return console.error("❌ Failed to fetch eclipse events:",e),[]}}async function ze(e){console.log(`Fetching moon phases for ${e}...`);const o=J(e,1).gregorianYear,{startISO:n,endISO:a}=me(e,o);if(!n||!a)return console.error("Invalid Celtic month in fetchMoonPhases:",e),[];try{const s=await fetch(`/dynamic-moon-phases?start_date=${n}&end_date=${a}`);if(!s.ok)throw new Error("Failed to fetch moon phases");const l=await s.json();return console.log("🌙 Moon Phases Retrieved:",l),l}catch(s){return console.error("❌ Error fetching moon phases:",s),[]}}async function Ne(){try{const e=await fetch("/api/custom-events");if(!e.ok)throw new Error("Failed to fetch custom events");return await e.json()}catch(e){return console.error("Error fetching custom events:",e),[]}}async function fe(){console.log("Fetching Festivals now!!");try{const e=await fetch("/festivals");if(!e.ok)throw new Error("Failed to fetch festivals");const t=await e.json();return G=t,console.log("✅ Festivals Fetched:",G),t}catch(e){return console.error("Error fetching festivals:",e),[]}}async function x(e,t,o,n=null){const a=t,s=e,l=document.getElementById("modal-container"),i=document.getElementById("modal-details");if(!l||!i){console.error("🚨 Modal elements not found, aborting.");return}i.innerHTML=`
        <h2>Celtic Calendar</h2>
        <p>Loading...</p>
    `,l.classList.remove("hidden");const r=document.getElementById("constellation-layer");r.className=`${a.toLowerCase()}-stars`;const c=J(a,s);if(!c){i.innerHTML="<p>Error: Invalid date conversion.</p>";return}c.gregorianDay.toString().padStart(2,"0"),c.gregorianMonth.toString().padStart(2,"0");const d=ce(c.gregorianMonth,c.gregorianDay);await re(d);let m=await Pe(c.gregorianMonth,c.gregorianDay,c.gregorianYear);Array.isArray(m)||(m=[]);const y=c.gregorianYear,h=String(c.gregorianMonth).padStart(2,"0"),v=String(c.gregorianDay).padStart(2,"0"),u=`${y}-${h}-${v}`;try{const w=await fetch(`/dynamic-moon-phases?start_date=${u}&end_date=${u}`);if(!w.ok)throw new Error(`HTTP error! Status: ${w.status}`);const S=await w.json();if(!S||S.length===0)throw new Error("Invalid lunar data received");const L=S[0];console.log("🌙 lunarData.graphic is:",L.graphic);const I=L.moonName,E=qe(h),f=He(L.phase,u);C.length===0&&await Y(),console.log("Fetched National Holidays:",C);const g=ce(c.gregorianMonth,c.gregorianDay),b=await re(g);console.log("Zodiac for this date:",b);let k="";if(b&&b.name){const p=O(b.name);k=`
            <div class="carousel-slide zodiac-slide">
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Celtic Zodiac</h3>
                <p><span class="zodiac-title">${b.name.toUpperCase()}</span></p>
                <img src="/assets/images/zodiac/zodiac-${p}.png" alt="${b.name}" class="zodiac-image">
                <p class="zodiac-description">${b.symbolism||"Mysterious and undefined."}</p>
            </div>
        `}else console.warn("⚠️ Zodiac sign not found for this date!");const T=(await ge()).find(p=>{const M=p.date.split(" ")[0];return console.log(`🔍 Checking Eclipse Date: ${M} vs ${o}`),M===o}),ft={"😎 Friends":"😎","🎉 Celebrations":"🎉","🌸 My Cycle":"🌸","💡 General":"💡","🏥 Health":"🏥","💜 Romantic":"💜","🖥️ Professional":"🖥️","🔥 Date!!":"🔥"};console.log("Formatted Gregorian date used with eclipses: ",o),console.log("Today Eclipse data fetched: ",T);const te=await fe();console.log("🔍 Checking Festival Dates:"),te.forEach(p=>{console.log(`Festival: ${p.name} | Date in JSON: ${p.date} | Formatted: ${new Date(p.date).toISOString().split("T")[0]}`)}),console.log("🧐 Formatted Gregorian Date Used for Matching:",o);const $=te.find(p=>new Date(p.date).toISOString().split("T")[0]===o);console.log("🎭 Festival Data Retrieved:",$),l.classList.remove("month-mode");const H=C.filter(p=>p.date===u).map(p=>{const M=O(p.title);return`<p><strong>${p.title}</strong></p>
                <img src='/assets/images/holidays/holiday-${M}.png' class='holiday-img' alt='${p.title}' />`}).join("")||"No national holidays today.";let oe="";T&&(console.log("Eclipse Event is:",T.type),oe=`
            <div class="eclipse-block">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Eclipse</h3>
            <img src='/assets/images/eclipses/${T.type==="solar-eclipse"?"eclipse-solar.png":"eclipse-lunar.png"}' class='eclipse-img' alt='${T.type}' />
            <p><strong>${T.title}</strong></p>
            <p class="eclipse-note">${T.description}</p>
            </div>
        `);let we=H&&H.trim()!==""&&H!=="No national holidays today."?`<div class="holiday-block">
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Holidays</h3>
                <p>${H}</p>
        </div>`:"",ne="";if($){const p=O($.name);ne=`
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Festivals</h3>
                <p><span class="festival-title">${$.name}</span></p>
                <img src='/assets/images/festivals/festival-${p}.png' class='festival-img' alt='${$.name}' />
                <p class="festival-note">${$.description}</p>
            `}i.innerHTML=`
            <div class="day-carousel-wrapper">
                <button class="day-carousel-prev"><img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button>

                <div class="day-carousel">
                    ${Oe({lunarData:L,festivalHTML:ne,zodiacHTML:k,holidayHTML:we,eclipseHTML:oe,celticMonth:a,celticDay:s,formattedGregorianDate:o,fullMoonName:I})}
                    ${m.map(p=>`
                        <div class="day-slide custom-event-slide" data-event-id="${p.id}">
                          <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                          <h3 class="goldenTitle">Your Event</h3>
                          <p>${p.title}</p>
                          ${p.notes?`<p>${p.notes}</p>`:""}
                          <p>${p.type}</p>
                        </div>
                    `).join("")}
                </div>

               <button class="day-carousel-next"><img src="/assets/images/decor/moon-crescent-next.png" alt="Next" /></button>
                </div>
                <button id="back-to-month" class="back-button">Back to ${a}</button>
            </div>
        `;const F=Array.from(l.querySelectorAll(".day-slide"));let D=0;F.forEach((p,M)=>{p.style.display=M===D?"flex":"none"});const q=p=>{F[D].style.display="none",D=(p+F.length)%F.length,F[D].style.display="flex"};document.querySelector(".day-carousel-prev").addEventListener("click",()=>q(D-1)),document.querySelector(".day-carousel-next").addEventListener("click",()=>q(D+1));const W=U(l.querySelector(".day-carousel"),{onSwipeLeft:()=>q(D+1),onSwipeRight:()=>q(D-1)});if(n){const p=l.querySelector(`.custom-event-slide[data-event-id="${n}"]`);if(p){const M=F.indexOf(p);W&&typeof W.slideTo=="function"?W.slideTo(M):q(M)}}const ae=document.getElementById("back-to-month");ae&&ae.addEventListener("click",()=>{l.classList.add("month-mode"),K(a)})}catch(w){console.error("Error fetching lunar phase:",w),i.innerHTML="<p>Failed to load moon phase data.</p>"}console.log("Final Gregorian Date:",u)}function ce(e,t){console.log(`Checking zodiac for: ${e}-${t}`);const o=[{name:"Birch",start:{month:12,day:24},end:{month:1,day:20}},{name:"Rowan",start:{month:1,day:21},end:{month:2,day:17}},{name:"Ash",start:{month:2,day:18},end:{month:3,day:17}},{name:"Alder",start:{month:3,day:18},end:{month:4,day:14}},{name:"Willow",start:{month:4,day:15},end:{month:5,day:12}},{name:"Hawthorn",start:{month:5,day:13},end:{month:6,day:9}},{name:"Oak",start:{month:6,day:10},end:{month:7,day:7}},{name:"Holly",start:{month:7,day:8},end:{month:8,day:4}},{name:"Hazel",start:{month:8,day:5},end:{month:9,day:1}},{name:"Vine",start:{month:9,day:2},end:{month:9,day:29}},{name:"Ivy",start:{month:9,day:30},end:{month:10,day:27}},{name:"Reed",start:{month:10,day:28},end:{month:11,day:24}},{name:"Elder",start:{month:11,day:25},end:{month:12,day:23}}],n=parseInt(e,10),a=parseInt(t,10);for(const s of o){const{start:l,end:i}=s;if(n===l.month&&a>=l.day||n===i.month&&a<=i.day||l.month>i.month&&(n>l.month||n<i.month))return s.name}return"Unknown"}async function re(e){try{const t=await fetch("/api/calendar-data");if(!t.ok)throw new Error("Failed to fetch zodiac info");return(await t.json()).zodiac.find(n=>n.name===e)||null}catch(t){return console.error("Error fetching zodiac info:",t),null}}function qe(e){return["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"][parseInt(e,10)-1]}async function Pe(e,t,o){console.log("Fetching custom events...");try{const n=await fetch("/api/custom-events");if(!n.ok)throw new Error("Failed to fetch events");const a=await n.json(),s=String(e).padStart(2,"0"),l=String(t).padStart(2,"0"),i=`${o}-${s}-${l}`;return a.filter(r=>{const[c,d,m]=r.date.split("-");return r.recurring?d===s&&m===l:r.date===i})}catch(n){return console.error("Error fetching events:",n),[]}}function He(e,t){const o={"01":"Wolf Moon","02":"Snow Moon","03":"Worm Moon","04":"Flower Moon","05":"Strawberry Moon","06":"Thunder Moon","07":"Grain Moon","08":"Harvest Moon","09":"Hunter's Moon",10:"Frost Moon",11:"Beaver Moon",12:"Cold Moon"};if(e==="Full Moon"&&t){const a=t.split("-")[1];console.log("Searching moon phase for this month: ",a),o[a]&&(e=o[a],console.log("🌕 Matched Full Moon:",e))}return{moonName:e,poem:{"Wolf Moon":`Beneath the snow and howling skies,
The Wolf Moon watches, ancient, wise.
A time to gather strength and rest,
And light a candle, for what’s best.`,"Snow Moon":`The Snow Moon casts its tranquil glow,
Upon the earth where frost does grow.
Wrap in warmth, let dreams ignite,
Burn cedar’s scent in soft moonlight.`,"Worm Moon":`The Worm Moon stirs the thawing ground,
Where seeds of life are newly found.
Turn the soil of heart and mind,
Write your dreams, and leave fear behind.`,"Pink Moon":`Blush-lit petals drift and sway,
Carried where the dreamers play.
Soft as dawn and bright as air,
A time to love, to hope, to dare.`,"Flower Moon":`Petals bloom in moonlit air,
A fragrant world beyond compare.
Plant your dreams in fertile ground,
Let love and joy in all things abound.`,"Strawberry Moon":`The Strawberry Moon, ripe and red,
A time to savour what’s been bred.
Sip something sweet, give thanks, rejoice,
And honour life with grateful voice.`,"Thunder Moon":`Thunder roars, the moon’s alive,
With storms of passion, dreams will thrive.
Dance in rain or light a flame,
And cleanse your soul of doubt or shame.`,"Grain Moon":`Fields of grain in moonlight bask,
A time to gather, a sacred task.
Share your wealth, both bright and deep,
And sow what’s needed for the reap.`,"Harvest Moon":`The Harvest Moon, so round, so bright,
Guides weary hands through autumn’s night.
Reflect on work, both done and due,
And thank the world for gifting you.`,"Hunter's Moon":`The Hunter’s Moon is sharp and keen,
A guide through shadows yet unseen.
Prepare your heart, your tools, your way,
And let the moonlight mark your stay.`,"Frost Moon":`Frost-kissed trees stand still and bare,
A quiet world in winter's care.
Beneath the moon's soft silver glow,
A time of peace, as storms lie low.`,"Cold Moon":`The Cold Moon whispers of the past,
Of trials endured and shadows cast.
Sip warm tea, let heartbeats mend,
Prepare your soul for year’s new bend.`}[e]||"No description available."}}function Oe({lunarData:e,festivalHTML:t,holidayHTML:o,eclipseHTML:n,zodiacHTML:a,celticMonth:s,celticDay:l,formattedGregorianDate:i,fullMoonName:r}){const c=le[Math.floor(Math.random()*le.length)],[d,m,y]=i.split("-"),h=X(l),v=e.description&&e.description!=="No description available."?e.description:"The moon stirs in silence tonight, her secrets cloaked.";let u="Mirabilis",w="",S="";return s==="Mirabilis"&&(l===1?(u="Mirabilis Solis",w="The sun dances on the edge of time,<br />Golden and defiant, it bends the chime.<br />A sacred spark, a seed of light,<br />That births the wheel in radiant flight.",S='<img src="static/assets/images/months/mirabilis-solis-notext.png" class="mirabilis-symbol" alt="Solis Symbol" />'):l===2&&(u="Mirabilis Noctis",w=`A breath of shadow, soft and still,
A second hush upon the hill.
She stirs in dreams beneath the veil,
Where moonlight writes the ancient tale.`,S='<img src="static/assets/images/months/mirabilis-noctis-notext.png" class="mirabilis-symbol" alt="Noctis Symbol" />')),`
    <div class="day-slide">
        <h3 class="goldenTitle">${s==="Mirabilis"?u:h}</h3>
        ${s!=="Mirabilis"?`<p><span class="celticDate">${s} ${l}</span></p>`:""}
        ${s!=="Mirabilis"?`
            <div class="moon-phase-graphic moon-centered">
                ${e.graphic}
            </div>`:""}
            <h3 class="moon-phase-name">
                ${r?r+" 🌕":e.phase+" 🌙"}
            </h3>
        <div class="mirabilis-graphic">
            ${S}
        </div>
        ${w?`<blockquote class="mirabilis-poem">${w}</blockquote>`:""}
        ${s!=="Mirabilis"?`<p class="moon-description">${v}</p>`:""}
    </div>

        ${t?`<div class="day-slide">${t}</div>`:""}
        ${o?`<div class="day-slide">${o}</div>`:""}
        ${n?`<div class="day-slide">${n}</div>`:""}
        ${a?`<div class="day-slide">${a}</div>`:""}

        <div class="day-slide">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Mystical Wisdom</h3>
            <div class="mystical-suggestion-block">
                <img src="/assets/images/decor/mystical-sparkle.png" alt="Mystical Sparkle" class="divider" />
                <p class="mystical-message">${c}</p>
            </div>
        </div>
    `}function P(e){document.querySelectorAll(".national-holiday-row").forEach(i=>{i.classList.toggle("legend-row-hidden",!e.showHolidays)}),document.querySelectorAll(".national-holiday").forEach(i=>{e.showHolidays?i.classList.add("national-holiday"):i.classList.remove("national-holiday")}),document.querySelectorAll(".custom-event-day-row").forEach(i=>{i.classList.toggle("legend-row-hidden",!e.showCustomEvents)}),document.querySelectorAll(".custom-event-day").forEach(i=>{e.showCustomEvents?i.classList.add("custom-event-day"):i.classList.remove("custom-event-day")});const s=e.mysticalSuggestions,l=document.getElementById("mystical-insight");if(l){const i=l.querySelector("h3"),r=l.querySelector("span");if(s&&l){const c=["🌙 Trust your inner tides.","✨ Today is a good day to cast intentions.","🔮 The stars whisper secrets today...","🌿 Pause. Listen to nature. It knows.","🌙 Trust your inner tides.","✨ Today is a good day to cast intentions.","🔮 The stars whisper secrets today...","🪄 Cast your hopes into the universe.","🌸 A seed planted today blooms tomorrow.","🌌 Let stardust guide your heart.","🕯️ Light a candle and focus on your intentions for the day.","🌜Meditate under the moonlight and visualize your dreams.","߷ Draw a rune and interpret its meaning for guidance.","💌 Write a letter to your future self and store it safely.","🍁 Collect a small item from nature and set an intention with it."],d=Math.floor(Math.random()*c.length);i.classList.remove("hidden"),r.textContent=c[d],r.classList.remove("hidden"),l.classList.remove("hidden")}else i.classList.add("hidden"),r.textContent="",r.classList.add("hidden"),l.classList.add("hidden")}}document.addEventListener("submit",async e=>{const t=e.target&&e.target.id==="add-event-form",o=window.location.hash==="#calendar";if(t&&o){e.preventDefault(),console.log("✨ Adding new custom event from CALENDAR...");const n=document.getElementById("event-name").value.trim(),a=document.getElementById("event-type").value.trim(),s=document.getElementById("event-note").value.trim(),l=document.getElementById("event-date").value;if(!n||!l){alert("Please enter a valid event name and date.");return}const i=new Date(l).toISOString().split("T")[0],r={id:Date.now().toString(),title:n,type:a||"General",notes:s||"",date:i};console.log("🎉 Event to be added (Calendar):",r);try{const c=await fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(customEvents.push(r),V(customEvents),!c.ok)throw new Error("Failed to add event.");const d=await c.json();console.log("✅ Event added from Calendar:",d),K(_)}catch(c){console.error("❌ Error adding calendar event:",c)}}});function pe(e=new Date().getFullYear()){return e%4===0&&e%100!==0||e%400===0}function J(e,t,o=new Date().getFullYear()){const s={Nivis:`${e==="Nivis"?o-1:o}-12-23`,Janus:`${o}-01-20`,Brigid:`${o}-02-17`,Flora:`${o}-03-17`,Maia:`${o}-04-14`,Juno:`${o}-05-12`,Solis:`${o}-06-09`,Terra:`${o}-07-07`,Lugh:`${o}-08-04`,Pomona:`${o}-09-01`,Autumna:`${o}-09-29`,Eira:`${o}-10-27`,Aether:`${o}-11-24`,Mirabilis:`${o}-12-22`}[e];if(!s)return console.error("Invalid Celtic month:",e),null;const l=new Date(s+"T00:00:00Z"),i=new Date(l.getTime()+(t-1)*864e5);return{gregorianMonth:String(i.getUTCMonth()+1).padStart(2,"0"),gregorianDay:String(i.getUTCDate()).padStart(2,"0"),gregorianYear:i.getUTCFullYear()}}function B(e){const t=typeof e=="string"?new Date(e+"T00:00:00Z"):new Date(e);if(isNaN(t))return console.error("Invalid Gregorian date:",e),"Invalid Date";const o=t.getUTCFullYear(),n=Date.UTC(o,11,23),a=t.getTime()>=n?o+1:o,s=["Nivis","Janus","Brigid","Flora","Maia","Juno","Solis","Terra","Lugh","Pomona","Autumna","Eira","Aether","Mirabilis"];for(const l of s){const{startISO:i,endISO:r}=me(l,a),c=new Date(i+"T00:00:00Z"),d=new Date(r+"T00:00:00Z");if(t>=c&&t<=d){const m=Math.floor((t.getTime()-c.getTime())/864e5);return l==="Mirabilis"?m===0?"Mirabilis Solis":"Mirabilis Noctis":`${l} ${m+1}`}}return"Unknown Date"}function X(e){return["Moonday","Trésda","Wyrdsday","Thornsday","Freyasday","Emberveil","Sunveil"][(e-1)%7]}function z(e){let t,o,n;if(typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e))[t,o,n]=e.split("-").map(Number);else{const d=new Date(e);if(isNaN(d.getTime()))return console.error("Invalid Gregorian date for weekday:",e),"";t=d.getFullYear(),o=d.getMonth()+1,n=d.getDate()}const a=Date.UTC(t,o-1,n),s=Date.UTC(t,11,23),l=a>=s?t:t-1,i=Date.UTC(l,11,23),c=Math.floor((a-i)/864e5)+1;return X((c-1)%7+1)}function Ue(){const e=`
        <section class="home" class="fade-in">
            <div id="modal-overlay" class="modal-overlay hidden"></div>
            <div class="celtic-date"></div>
            <div class="celtic-info-container">

            <!--- *** MOON & CELTIC ZODIAC *** --->
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic">
                            <h4 class="moon-phase-name"></h4>
                        </div>
                        <h4 class="moon-phase-name"></h4>
                    </div>
                </div>
                <!-- Celtic Zodiac Column -->
                <div class="zodiac-column">
                    <div class="celtic-zodiac">
                        <p class="goldenTitle">Celtic Zodiac</p>
                        <div class="celtic-zodiac-details">
                            <h4 class="zodiac-sign"></h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tree-of-life">

                <!--- *** MOON POEM *** --->
                <div class="poem-container">
                    <blockquote class="moon-poem">Fetching poetic wisdom...</blockquote>
                </div>

                <!-- What's Happening! Carousel -->
                <div id="coming-events-container">
                    <h3 class="coming-events-header">The Journey Unfolds</h3>
                    <button class="coming-events-carousel-prev">
                      <img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev">
                    </button>
                    <div id="coming-events-carousel" class="coming-events-carousel-container">
                        <div class="coming-events-slide active">
                            <p>Loading events...</p>
                        </div>
                    </div>
                    <button class="coming-events-carousel-next">
                      <img src="/assets/images/decor/moon-crescent-next.png" alt="Next">
                    </button>
                </div>
            </div>

            <!-- *** CELTIC BIRTHDAY SECTION *** -->
            <section class="celtic-birthday" style="background-image: url('/assets/images/decor/moon-circle.png'); background-repeat: no-repeat; background-position: center top; background-size: 250px;">
                <h2 class="celtic-birthday-header">What is my Lunar Birthday?</h2>
                <p>Enter your birthdate and discover your Celtic Zodiac sign and lunar date:</p>
                
                <input type="date" id="birthdateInput" class="flatpickr-input" />

                <button id="revealZodiac" class="gold-button">Reveal My Celtic Sign</button>

                <div id="birthdayResults" class="birthday-results hidden">
                <p><strong>Your Lunar Birthday is </strong> <span id="lunarDateOutput"></span></p>
                <img class="birthdayZodiacImage" src="/assets/images/zodiac/zodiac-willow.png" alt="Willow" />
                <p><strong>Your Celtic Zodiac Sign:</strong> <span id="celticSignOutput"></span></p>
                <p><strong>Zodiac Traits:</strong> <span id="traitsOutput"></span></p>

                <button id="addBirthdayEvent" class="gold-button">Add to My Calendar</button>
                </div>
            </section>

            <!--- *** ZODIAC MODAL *** --->
            <div id="home-zodiac-modal" class="modal hidden">
                <div class="modal-content scrollable-content">
                    <span class="close-button-home mystical-close">✦</span>
                    <div id="home-zodiac-modal-details">
                        <p>Loading sign info...</p>
                    </div>
                </div>
            </div>
        </section>
    `;return setTimeout(()=>{var l;const t=document.getElementById("modal-overlay");t&&t.addEventListener("click",()=>{var i,r;(i=document.getElementById("home-zodiac-modal"))==null||i.classList.remove("show"),(r=document.getElementById("home-zodiac-modal"))==null||r.classList.add("hidden"),t.classList.remove("show"),t.classList.add("hidden")}),requestAnimationFrame(()=>{const i=document.getElementById("coming-events-carousel");i?(U(i,{onSwipeLeft:()=>{var r;return(r=document.querySelector(".coming-events-carousel-next"))==null?void 0:r.click()},onSwipeRight:()=>{var r;return(r=document.querySelector(".coming-events-carousel-prev"))==null?void 0:r.click()}}),console.log("Swipe listener attached to home carousel")):console.warn("coming-events-carousel element not found for swipe init")});const o=document.getElementById("birthdateInput"),n=document.getElementById("revealZodiac"),a=document.getElementById("birthdayResults");let s={};fetch("/static/calendar_data.json").then(i=>i.json()).then(i=>{i.zodiac.forEach(r=>{s[r.name]=r.symbolism})}).catch(i=>console.error("Failed to load zodiac data:",i)),n.addEventListener("click",async()=>{if(!o.value)return;const i=o.value,r=B(i);let c="";try{const y=await(await fetch("/zodiac/all")).json(),[h,v,u]=i.split("-").map(Number),w=y.find(S=>{const[,L,I]=S.start_date.split("-").map(Number),[,E,f]=S.end_date.split("-").map(Number),g=v>L||v===L&&u>=I,b=v<E||v===E&&u<=f;return L<E||L===E&&I<=f?g&&b:g||b});c=(w==null?void 0:w.name)||"Unknown"}catch(m){console.error("Zodiac fetch/all error:",m)}const d=s[c]||"No traits found.";document.getElementById("lunarDateOutput").textContent=r,document.getElementById("celticSignOutput").textContent=c,document.getElementById("traitsOutput").textContent=d,a.classList.remove("hidden")}),(l=document.getElementById("addBirthdayEvent"))==null||l.addEventListener("click",()=>{const i=o.value;console.log("Add Bday button is clicked: ",i);const r={id:Date.now().toString(),date:i,title:"Celtic Birthday",type:"🎂 Birthday",notes:`Lunar: ${document.getElementById("lunarDateOutput").textContent}, Sign: ${document.getElementById("celticSignOutput").textContent}`,recurring:!0},c=de();V([...c,r]),fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(d=>{if(!d.ok)throw new Error("Failed to save event");return d.json()}).then(()=>{ee();const d=z(i),m=B(i);typeof Swal<"u"&&Swal.fire&&Swal.fire({icon:"success",title:`Event saved for ${d}, ${m}`,showCancelButton:!0,confirmButtonText:"View Event",cancelButtonText:"Cancel"}).then(y=>{y.isConfirmed&&(document.querySelector(".nav-link#nav-calendar").click(),setTimeout(()=>{const[h,v]=m.split(" ");x(parseInt(v,10),h,i)},300))})}).catch(d=>{console.error("Error adding birthday event:",d),typeof Swal<"u"&&Swal.fire&&Swal.fire({icon:"error",title:"Oops! Could not add your birthday event."})})}),flatpickr("#birthdateInput",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",defaultDate:"today",theme:"moonveil"})},0),e}async function Q(){try{const e=await fetch("/api/celtic-date");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json(),o=X(parseInt(t.celtic_day,10));if(console.log("Fetched Celtic Date:",t),!t||!t.month||!t.celtic_day)throw new Error("Incomplete Celtic date data received.");const n=document.querySelector(".celtic-date");return n&&(n.innerHTML=`
            <h1 id="celtic-day">${o}</h1>
            <p><span id="celtic-month">${t.month} ${t.celtic_day}</span> / <span id="gregorian-month">${t.gregorian_date}</span></p>
        `),{celticMonth:t.month,celticDay:parseInt(t.celtic_day,10),gregorianDate:t.gregorian_date}}catch(e){return console.error("Failed to fetch Celtic date:",e),null}}async function Re(){try{const e=await Q();if(!e)throw new Error("No Celtic date available");const{celticMonth:t,celticDay:o}=e,n={Nivis:"Birch",Janus:"Rowan",Brigid:"Alder",Flora:"Willow",Maia:"Hawthorn",Juno:"Oak",Solis:"Holly",Terra:"Oak",Lugh:"Holly",Pomona:"Hazel",Autumna:"Vine",Eira:"Ivy",Aether:"Reed",Mirabilis:"Elder"};let a;t==="Terra"?a=o===1?"Oak":"Holly":a=n[t]||"";const s=document.querySelector(".celtic-zodiac-details");s&&(s.innerHTML=`
        <div class="zodiac-modal-trigger" data-zodiac="${a}">
          <img class="celtic-zodiac-image"
               src="/assets/images/zodiac/zodiac-${a.toLowerCase()}.png"
               alt="${a}" />
          <p>${a}</p>
        </div>
      `)}catch(e){console.error("Failed to fetch Celtic Zodiac:",e)}}async function je(){const e=new Date().toISOString().split("T")[0];try{const t=await fetch(`/dynamic-moon-phases?start_date=${e}&end_date=${e}`);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const o=await t.json();if(o.length>0){const n=o[0],a=document.querySelector(".moon-phase");a.innerHTML=`
                <div class="moon-phase-details">
                    <div class="moon-phase-graphic">${n.graphic}</div>
                    <p>${n.moonName||n.phase} </p>
                    <!-- <span>${n.poem||"A sliver of light..."}</span> -->
                </div>
            `;const s=document.querySelector(".moon-poem");s&&(s.textContent=n.poem||""),console.log(n.graphic)}else console.warn("No moon phase data available.")}catch(t){console.error("Failed to fetch moon phase:",t)}}async function Je(){try{const e=await fetch("/api/lunar-phase-poem");if(!e.ok)throw new Error("Failed to fetch the poem.");const t=await e.json(),o=document.querySelector(".moon-poem");o&&(o.innerHTML=`
                ${t.poem}
            `)}catch(e){console.error("Error fetching the moon poem:",e)}}async function ee(){console.log("Fetching coming events...");try{const e=await Q();if(!e){console.error("Could not fetch Celtic date. No upcoming events displayed.");return}const{celticMonth:t,celticDay:o,gregorianDate:n}=e;if(!n||typeof n!="string"){console.error("🚨 gregorianDate is missing or not a string!",n);return}const[a,s]=n.split(" "),l=et(a),i=s.padStart(2,"0"),r=new Date(`2025-${l}-${i}`),c=[];for(let f=0;f<7;f++){const g=new Date(r);g.setDate(r.getDate()+f);const b=g.getFullYear(),k=String(g.getMonth()+1).padStart(2,"0"),N=String(g.getDate()).padStart(2,"0"),T=`${b}-${k}-${N}`;c.push(T)}console.log("Next 5 Gregorian Dates:",c);const[d,m,y,h,v]=await Promise.all([Ze(),Ge(t),Ve(),Ke(),_e()]),u=[];c.forEach(f=>{console.log(`🔍 Checking festivals for date: ${f}`),d.forEach(b=>{console.log(`   🎭 Comparing with festival: ${b.title} | Date: ${b.date}`)});const g=d.find(b=>b.date===f);g?(console.log("✅ Festival match found!",g.date,"vs",f),console.log("Festival Object:",g),u.push({type:"festival",title:g.title,description:g.description||"A sacred celebration.",date:f})):console.log("❌ No festival match for",f)}),c.forEach(f=>{const g=m.find(b=>b.date===f&&b.phase==="Full Moon");g&&u.push({type:"full-moon",title:g.moonName||"Full Moon",description:g.description||"A night of celestial power.",date:f})});for(const f of v){console.log("🌘 Checking eclipse:",f);const g=f.date.split(" ")[0];if(c.includes(g)){const b=We(g),k=await Ye(f.type,b);u.push({type:"eclipse",title:` ${f.title}`,description:k,date:g})}}c.forEach(f=>{const g=y.find(b=>b.date===f);g&&u.push({type:"holiday",title:g.title,description:g.description||"A recognized holiday.",date:f})}),c.forEach(f=>{h.forEach(g=>{const[b,k,N]=g.date.split("-");(g.recurring?f.endsWith(`-${k}-${N}`):f===g.date)&&u.push({type:"custom-event",category:g.type,title:g.title,description:g.notes||"A personal milestone.",date:f})})});const w=A(),S=u.filter(f=>!(f.type==="holiday"&&!w.showHolidays||f.type==="full-moon"&&!w.showMoons||f.type==="eclipse"&&!w.showEclipses||f.type==="custom-event"&&!w.showCustomEvents));console.log("Final Upcoming Events Array:",u);const L=new Date,I=new Date(L.getFullYear(),L.getMonth(),L.getDate()),E=S.filter(f=>{const[g,b,k]=f.date.split("-").map(Number);return new Date(g,b-1,k)>=I});console.log("Events from today onward:",E),document.getElementById("coming-events-container")&&Xe(E)}catch(e){console.error("Error fetching coming events:",e)}}function We(e){const[t,o,n]=e.split("-").map(Number),a=new Date(t,o-1,n),s=a.getDate(),l=a.getMonth(),i=[{name:"Janus",start:[0,20],end:[1,16]},{name:"Brigid",start:[1,17],end:[2,16]},{name:"Flora",start:[2,17],end:[3,13]},{name:"Maia",start:[4,14],end:[5,11]},{name:"Juno",start:[5,12],end:[6,8]},{name:"Solis",start:[6,9],end:[7,6]},{name:"Terra",start:[7,7],end:[8,3]},{name:"Lugh",start:[8,4],end:[8,31]},{name:"Pomona",start:[9,1],end:[9,28]},{name:"Autumna",start:[9,29],end:[10,26]},{name:"Eira",start:[10,27],end:[11,23]},{name:"Aether",start:[11,24],end:[12,21]},{name:"Nivis",start:[12,22],end:[0,19]}];for(const r of i){const[c,d]=r.start,[m,y]=r.end,h=l>c||l===c&&s>=d,v=l<m||l===m&&s<=y;if(c<=m?h&&v:h||v)return r.name}return"Janus"}async function Ze(){try{const e=await fetch("/festivals");if(!e.ok)throw new Error("Failed to fetch special days");const o=(await e.json()).map(n=>({type:"festival",title:n.name,description:n.description||"A sacred celebration.",date:new Date(n.date).toISOString().split("T")[0]}));return console.log("📅 Festival data processed:",o),o}catch(e){return console.error("🚨 Error fetching festivals:",e),[]}}async function Ge(e){console.log(`Fetching moon phases for ${e}...`);const t={Nivis:{start:"2024-12-23",end:"2025-01-19"},Janus:{start:"2025-01-20",end:"2025-02-16"},Brigid:{start:"2025-02-17",end:"2025-03-16"},Flora:{start:"2025-03-17",end:"2025-04-13"},Maia:{start:"2025-04-14",end:"2025-05-11"},Juno:{start:"2025-05-12",end:"2025-06-08"},Solis:{start:"2025-06-09",end:"2025-07-06"},Terra:{start:"2025-07-07",end:"2025-08-03"},Lugh:{start:"2025-08-04",end:"2025-08-31"},Pomona:{start:"2025-09-01",end:"2025-09-28"},Autumna:{start:"2025-09-29",end:"2025-10-26"},Eira:{start:"2025-10-27",end:"2025-11-23"},Aether:{start:"2025-11-24",end:"2025-12-21"}};if(!t[e])return console.error("Invalid Celtic month:",e),[];const{start:o,end:n}=t[e];try{const a=await fetch(`/dynamic-moon-phases?start_date=${o}&end_date=${n}`);if(!a.ok)throw new Error("Failed to fetch moon phases");const s=await a.json();return console.log("🌙 Moon Phases Retrieved:",s),s}catch(a){return console.error("❌ Error fetching moon phases:",a),[]}}async function _e(){console.log("Fetching upcoming eclipse events...");try{const e=await fetch("/api/eclipse-events");if(!e.ok)throw new Error("Failed to fetch eclipse events");const t=await e.json();return console.log("🌘 Eclipses Retrieved:",t),t}catch(e){return console.error("Error fetching eclipses:",e),[]}}async function Ye(e,t){var i;const o={lunar:{winter:["The moon hides in frost-kissed silence, dreaming deep in the veil of Eira.","In the cold hush of Nivis, her shadow passes—old spirits whisper their truths.","A silver eclipse beneath Aether’s stars reveals secrets buried in icebound hearts."],spring:["Blossoms tremble as Luna’s face fades—new beginnings stir in ancient soil.","Beneath Brigid’s breath, the moon wanes into myth, and the land leans in to listen.","A soft eclipse in Flora’s bloom—wishes bloom in the dark between stars."],summer:["The summer moon weeps petals of gold—her eclipse sings of bold transformations.","Luna dances behind Solis, her mysteries wrapped in warm twilight.","In Terra’s heat, a shadow glides across the moon—prophecies awaken in dreamers."],autumn:["Fallen leaves swirl as Luna dims—change ripples in Pomona’s golden hush.","Autumna’s wind carries the eclipse’s hush like a lullaby for sleeping gods.","The Hunter’s moon fades to shadow—memories stir, and the veil thins."]},solar:{winter:["In Aether's pale sky, Sol bows—light swallowed by ancient mystery.","A frozen sun in Eira’s grip—change brews beneath the silence.","The Cold Sun vanishes in Nivis, and time forgets to tick."],spring:["Beltaine fire dims as Sol hides his face—hearts burn with old passion reborn.","A Flora eclipse—sunlight swirled in prophecy and pollen.","The spring sun yields—seeds of magic bloom in the shadow’s path."],summer:["In Solis' blaze, the eclipse dances—a mirror of power and revelation.","The midsummer sun vanishes—truths flicker, bold and blinding.","A sun-dark hush in Terra, where gods meet in radiant stillness."],autumn:["Pomona sighs as Sol is veiled—harvest halts, and fate tiptoes in.","In Autumna’s gold, the sun turns his face—the eclipse whispers of closure.","A waning sun, wrapped in ivy dreams—Lugh listens."]}},n={winter:["Nivis","Eira","Aether"],spring:["Janus","Brigid","Flora"],summer:["Maia","Juno","Solis","Terra"],autumn:["Lugh","Pomona","Autumna"]};let a="spring";for(const[r,c]of Object.entries(n))if(c.includes(t)){a=r;break}const s=e==null?void 0:e.toLowerCase(),l=(i=o[s])==null?void 0:i[a];return l?l[Math.floor(Math.random()*l.length)]:(console.warn(`⚠️ No eclipse description found for type: "${e}", season: "${a}"`),"A rare celestial hush, undefined yet stirring...")}async function Ve(){console.log("Fetching upcoming national holidays...");try{const e=await fetch("/api/national-holidays");if(!e.ok)throw new Error("Failed to fetch national holidays");return await e.json()}catch(e){return console.error("Error fetching national holidays:",e),[]}}async function Ke(){console.log("Fetching custom events...");try{const e=await fetch("/api/custom-events");if(!e.ok)throw new Error("Failed to fetch custom events");const t=await e.json();return console.log("Custom events are: ",t),t}catch(e){return console.error("Error fetching custom events:",e),[]}}function Xe(e){const t=document.getElementById("coming-events-carousel");if(!t){console.error("Carousel container not found!");return}if(t.innerHTML="",e.forEach((o,n)=>{const a=document.createElement("div");a.classList.add("coming-events-slide"),n===0&&a.classList.add("active");const s=Ee(o);console.log("Event category:",o.category),console.log("Event type:",o.type);const l=B(o.date);a.innerHTML=`
            <h3 class="coming-events-title">${s} ${o.title}</h3>
            <p class="coming-events-date">${l}</p>
            <p class="coming-events-description">${o.description}</p>
        `,t.appendChild(a)}),!Array.isArray(e)||e.length===0){const o=document.querySelector(".coming-events-carousel-prev"),n=document.querySelector(".coming-events-carousel-next");o&&n&&(o.classList.add("hidden"),n.classList.add("hidden"));const a=["💫 The stars whisper, but no great events stir. The journey continues in quiet contemplation... 💫","✨ The wind carries no omens today, only the gentle breath of the earth. Rest in the rhythm of the moment. ✨","🔮 The threads of fate are still weaving. In the quiet, new paths may emerge... 🔮","🦉 Even in stillness, the world turns. The wise ones know that the silence holds its own kind of magic. 🦉","🔥 No great fires are lit, no grand feasts are planned, but the embers of time still glow beneath the surface. 🔥","🌟 Tonight, the universe is quiet, waiting. Perhaps the next moment holds something unseen... 🌟"],s=a[Math.floor(Math.random()*a.length)];t.innerHTML=`
            <div class="coming-events-slide active">
                <p class="mystical-message">${s}</p>
            </div>
        `;return}Qe()}function Qe(){const e=document.querySelectorAll(".coming-events-slide"),t=document.querySelector(".coming-events-carousel-prev"),o=document.querySelector(".coming-events-carousel-next");let n=0,a;function s(d){e.forEach((m,y)=>{m.classList.remove("active"),m.style.opacity="0",y===d&&(m.classList.add("active"),setTimeout(()=>m.style.opacity="1",300))})}function l(){n=(n+1)%e.length,s(n)}function i(){n=(n-1+e.length)%e.length,s(n)}function r(){clearInterval(a),a=setInterval(l,6e3)}function c(){clearInterval(a),setTimeout(r,8e3)}t.addEventListener("click",()=>{i(),c()}),o.addEventListener("click",()=>{l(),c()}),document.querySelector("#coming-events-carousel").addEventListener("mouseenter",c),document.querySelector("#coming-events-carousel").addEventListener("mouseleave",r),r()}function et(e){return{January:"01",February:"02",March:"03",April:"04",May:"05",June:"06",July:"07",August:"08",September:"09",October:"10",November:"11",December:"12"}[e]||null}document.addEventListener("DOMContentLoaded",async()=>{console.log("🏡 Home screen loaded, fetching upcoming events..."),await ee()});document.addEventListener("click",e=>{if(e.target.classList.contains("close-button-home")||e.target.classList.contains("mystical-close")||e.target.id==="modal-overlay"){console.log("✨ Closing the Zodiac Modal..."),document.getElementById("home-zodiac-modal").classList.remove("show"),document.getElementById("home-zodiac-modal").classList.add("hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-overlay");t?(t.classList.add("hidden"),t.classList.remove("show")):console.log("🌫️ Cannot find overlay")}});document.addEventListener("click",async e=>{if(e.target.closest(".zodiac-modal-trigger")){const o=e.target.closest(".zodiac-modal-trigger").dataset.zodiac;console.log("🔮 Zodiac Trigger Clicked!",o);try{const a=await(await fetch(`/zodiac/insights/${o}`)).json();document.getElementById("home-zodiac-modal-details").innerHTML=`
          <h2 id="zodiac-name">${a.name}</h2>
          <p id="zodiac-date-range">${a.celtic_date}</p>
          <img id="zodiac-image" src="static/assets/images/zodiac/zodiac-${a.name.toLowerCase()}.png" alt="${a.name}" />
          <h3 class="subheader">Three Key Traits</h3>
          <p id="zodiac-traits">${a.symbolism}</p>
          <h3 class="subheader">Associated Element</h3>
          <p id="zodiac-element">${a.element}</p>
          <h3 class="subheader">Associated Animal</h3>
          <p id="zodiac-animal">${a.animal}</p>
          <a class="home-modal-btn" href="${a.url||"#"}" target="_blank" style="${a.url?"":"display:none;"}">Learn More</a>
        `;const s=document.getElementById("home-zodiac-modal"),l=document.getElementById("modal-overlay");s.classList.remove("hidden"),s.classList.add("show"),l==null||l.classList.remove("hidden"),l==null||l.classList.add("show"),document.body.classList.add("modal-open")}catch(n){console.error("Failed to load zodiac insight:",n)}}});function tt(){return`
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
            <img src="/assets//images/zodiac/zodiac-wheel.png" alt="Celtic Zodiac Wheel" class="zodiac-wheel" />
          </div>
        </div>

      <ul class="zodiac-list">
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-birch.png" alt="Birch"/> 
            <p>Birch</p><span class="celtic-zodiac-date">Nivis 2 to Janus 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-rowan.png" alt="Rowan" /> 
            <p>Rowan</p><span class="celtic-zodiac-date">Janus 2 to Brigid 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-ash.png" alt="Ash" /> 
            <p>Ash</p><span class="celtic-zodiac-date">Brigid 2 to Flora 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-alder.png" alt="Alder" /> 
            <p>Alder</p><span class="celtic-zodiac-date">Flora 2 to Maia 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-willow.png" alt="Willow" /> 
            <p>Willow</p><span class="celtic-zodiac-date">Maia 2 to Juno 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-hawthorn.png" alt="Hawthorn" /> 
            <p>Hawthorn</p><span class="celtic-zodiac-date">Juno 2 to Solis 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-oak.png" alt="Oak" /> 
            <p>Oak</p><span class="celtic-zodiac-date">Solis 2 to Terra 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-holly.png" alt="Holly" /> 
            <p>Holly</p><span class="celtic-zodiac-date">Terra 2 to Lugh 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-hazel.png" alt="Hazel" /> 
            <p>Hazel</p><span class="celtic-zodiac-date">Lugh 2 to Pomona 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-vine.png" alt="Vine" /> 
            <p>Vine</p><span class="celtic-zodiac-date">Pomona 2 to Autumna 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-ivy.png" alt="Ivy" /> 
            <p>Ivy</p><span class="celtic-zodiac-date">Autumna 2 to Eira 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-reed.png" alt="Reed" /> 
            <p>Reed</p><span class="celtic-zodiac-date">Eira 2 to Aether 1</span>
        </li>
        <li class="zodiac-item hidden">
            <img src="/assets//images/zodiac/zodiac-elder.png" alt="Elder" /> 
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
              <img src="/assets//images/decor/moon-crescent-prev.png" alt="Prev" />
            </button>

            <div class="festival-slide active">
                <img src="/assets//images/festivals/festival-imbolc.png" alt="Imbolc" class="festival-icon" />
                <h2 class="festival-title">Imbolc</h2>
                <h3 class="festival-date">15th of Janus</h3>
                <p class="festival-description">
                    Imbolc marks the first signs of spring. It's a time to celebrate the return of life and the arrival of new growth. Celebrants use this time to cleanse their homes and welcome new beginnings into their lives.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-ostara.png" alt="Ostara" class="festival-icon" />
                <h2 class="festival-title">Ostara</h2>
                <h3 class="festival-date">6th of Flora</h3>
                <p class="festival-description">
                    Ostara is celebrated on the spring equinox. It's a time to celebrate the balance of light and dark and to look ahead to the growth and renewal of spring. Celebrants come together to plant seeds and watch the world come back to life.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-beltane.png" alt="Beltane" class="festival-icon" />
                <h2 class="festival-title">Beltane</h2>
                <h3 class="festival-date">19th of Maia</h3>
                <p class="festival-description">
                    Beltane is celebrated at the beginning of summer. It's a time to celebrate the fertility of the earth and the arrival of new life. Revelers come together to dance, sing, and make merry to mark this special day.
                </p>
            </div>

            <div class="festival-slide active">
                <img src="/assets//images/festivals/festival-litha.png" alt="Litha" class="festival-icon" />
                <h2 class="festival-title">Litha</h2>
                <h3 class="festival-date">14th of Solis</h3>
                <p class="festival-description">
                    Litha is celebrated on the summer solstice. It's a time to celebrate the power of the sun and the longest day of the year. Celebrants come together to light fires, dance, and sing to mark this special day.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-lughnasadh.png" alt="Lughnasadh" class="festival-icon" />
                <h2 class="festival-title">Lughnasadh</h2>
                <h3 class="festival-date">27th of Terra</h3>
                <p class="festival-description">
                    Lughnasadh marks the beginning of the harvest season. It's a time to give thanks for the abundance of the earth and to prepare for the coming winter. 
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-mabon.png" alt="Mabon" class="festival-icon" />
                <h2 class="festival-title">Mabon</h2>
                <h3 class="festival-date">19th of Lugh</h3>
                <p class="festival-description">
                    Mabon marks the autumn equinox. It's a time to celebrate the balance of light and dark and look ahead to the chill of winter.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-samhain.png" alt="Samhain" class="festival-icon" />
                <h2 class="festival-title">Samhain</h2>
                <h3 class="festival-date">6th of Eira</h3>
                <p class="festival-description">
                    Samhain marks the end of the harvest season. It's a time to reflect on the past year and honour the ancestors who have come before us. Samhain is also a time to connect with the spirit world and seek guidance for the future.
                </p>
            </div>

            <div class="festival-slide">
                <img src="/assets//images/festivals/festival-yule.png" alt="Yule" class="festival-icon" />
                <h2 class="festival-title">Yule</h2>
                <h3 class="festival-date">Mirabilis</h3>
                <p class="festival-description">
                    Yule marks the longest night of the year. It's a time to celebrate the return of the light and the rebirth of the sun. Celebrants come together to exchange gifts, light candles, and enjoy feasts to mark this special day.
                </p>
            </div>

            <button class="festival-carousel-next">
              <img src="/assets//images/decor/moon-crescent-next.png" alt="Next" />
            </button>
        </div>
    </div>

    <!-- ************* Sections - Full Moons ************* -->

    <div id="moon-poetry" class="tab-content"> 
      <h2 class="goldNugget" style="text-align:center; margin-bottom: 0">The Full Moons</h2>

      <img class="full-moon" src="/assets//images/decor/full-moon.png" alt="Full Moon" />

      <div class="moon-carousel">
        <button class="carousel-prev">
          <img src="/assets//images/decor/moon-crescent-prev.png" alt="Prev" />
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
          <img src="/assets//images/decor/moon-crescent-next.png" alt="Next" />
        </button>
      </div>
    </div>
  </div>
  `}function ot(){const e=document.querySelectorAll(".tab-button"),t=document.querySelectorAll(".tab-content");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(n=>n.classList.remove("active")),t.forEach(n=>n.classList.remove("active")),o.classList.add("active"),document.getElementById(o.dataset.tab).classList.add("active")})})}function nt(){const e=document.getElementById("modal-overlay"),t=document.getElementById("wheel");document.getElementById("hover-info"),document.getElementById("zodiac-name"),document.getElementById("zodiac-description"),t.offsetWidth/2;const o=document.getElementById("zodiac-modal"),n=document.querySelector(".mystical-close"),a=document.querySelectorAll(".zodiac-item");document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on Overlay");const s=document.getElementById("zodiac-modal");s.classList.contains("show")&&(s.classList.remove("show"),s.classList.add("hidden")),document.body.classList.add("modal-open"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),a.forEach(s=>{s.addEventListener("click",()=>{const l=s.querySelector("p").textContent;console.log("Modal node ID:",document.getElementById("zodiac-modal")),at(l)})}),n.addEventListener("click",()=>{o.classList.remove("show"),e.classList.remove("show"),e.classList.add("hidden"),document.body.classList.remove("modal-open"),o.style.transform="translate(-50%, -50%) scale(0.95)"})}async function at(e){const t=document.getElementById("zodiac-modal"),o=document.getElementById("modal-overlay"),n=document.querySelector(".celtic-zodiac-btn");try{const a=await fetch(`/zodiac/insights/${encodeURIComponent(e)}`);if(!a.ok)throw new Error(`Zodiac sign '${e}' not found`);const s=await a.json();t.classList.remove("hidden"),o.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.add("show"),o.classList.add("show")}),setTimeout(()=>{const i=document.getElementById("zodiac-modal");i&&i.scrollIntoView({behavior:"smooth",block:"center"})},100);const l=O(e);document.getElementById("zodiac-name").textContent=s.name,document.getElementById("zodiac-date-range").textContent=s.celtic_date,document.getElementById("zodiac-image").src=`/assets//images/zodiac/zodiac-${l}.png`,document.getElementById("zodiac-description").textContent=s.symbolism,document.getElementById("zodiac-traits").textContent=s.symbolism,document.getElementById("zodiac-element").textContent=s.element||"Element unknown",document.getElementById("zodiac-animal").textContent=s.animal,document.getElementById("zodiac-mythology").textContent=s.mythical_creature,console.log("Zodiac url is ",s.url),s.url?(n.style.display="inline-block",n.setAttribute("href",s.url),n.setAttribute("target","_blank")):n.style.display="none"}catch(a){console.error("Error loading zodiac modal:",a)}}function st(){const e=document.querySelectorAll(".festival-slide"),t=document.querySelector(".festival-carousel-prev"),o=document.querySelector(".festival-carousel-next"),n=new Audio("/assets//sound/sparkle.wav");n.volume=.6;let a=0;function s(i){e.forEach((r,c)=>{r.classList.remove("active"),r.style.opacity=0,c===i&&(r.classList.add("active"),setTimeout(()=>r.style.opacity=1,300))})}t.addEventListener("click",()=>{document.getElementById("festivals").classList.contains("active")&&(n.currentTime=0,n.play()),a=a===0?e.length-1:a-1,s(a)}),o.addEventListener("click",()=>{document.getElementById("festivals").classList.contains("active")&&(n.currentTime=0,n.play()),a=a===e.length-1?0:a+1,s(a)});const l=document.getElementById("festival-carousel");U(l,{onSwipeLeft:()=>o.click(),onSwipeRight:()=>t.click()}),s(a)}function it(){const e=document.querySelectorAll(".moon-slide"),t=document.querySelector(".carousel-prev"),o=document.querySelector(".carousel-next"),n=new Audio("/assets//sound/harp.wav");n.volume=.6;let a=0;function s(c){e.forEach((m,y)=>{m.classList.remove("active"),m.style.opacity=0,y===c&&(m.classList.add("active"),setTimeout(()=>m.style.opacity=1,300))});const d=c*5;document.querySelector(".moon-carousel").style.backgroundPosition=`${d}px ${d}px`}t.addEventListener("click",()=>{n.currentTime=0,n.play(),a=a===0?e.length-1:a-1,s(a)}),o.addEventListener("click",()=>{n.currentTime=0,n.play(),a=a===e.length-1?0:a+1,s(a)});const l=document.querySelector(".moon-carousel");U(l,{onSwipeLeft:()=>o.click(),onSwipeRight:()=>t.click()});function i(){const c=new Date,d=c.getDate(),m=c.getMonth();c.getFullYear();const h=[{name:"Janus",start:{month:0,day:20},end:{month:1,day:16}},{name:"Brigid",start:{month:1,day:17},end:{month:2,day:16}},{name:"Flora",start:{month:2,day:17},end:{month:3,day:13}},{name:"Maia",start:{month:4,day:14},end:{month:5,day:11}},{name:"Juno",start:{month:5,day:12},end:{month:6,day:8}},{name:"Solis",start:{month:6,day:9},end:{month:7,day:6}},{name:"Terra",start:{month:7,day:7},end:{month:8,day:3}},{name:"Lugh",start:{month:8,day:4},end:{month:8,day:31}},{name:"Pomona",start:{month:9,day:1},end:{month:9,day:28}},{name:"Autumna",start:{month:9,day:29},end:{month:10,day:26}},{name:"Eira",start:{month:10,day:27},end:{month:11,day:23}},{name:"Aether",start:{month:11,day:24},end:{month:12,day:21}},{name:"Nivis",start:{month:12,day:23},end:{month:0,day:19}}].find(({start:v,end:u})=>{const w=m>v.month||m===v.month&&d>=v.day,S=m<u.month||m===u.month&&d<=u.day;return w&&S});return h?h.name:"Janus"}function r(){const c=i(),d={Nivis:"wolf-moon",Janus:"snow-moon",Brigid:"worm-moon",Flora:"Pink-moon*",Juno:"flower-moon",Solis:"strawberry-moon",Terra:"thunder-moon",Lugh:"grain-moon",Pomona:"harvest-moon",Autumna:"hunters-moon",Eira:"frost-moon",Aether:"cold-moon"};console.log("This month is ",c);const m=d[c]||"snow-moon",y=[...document.querySelectorAll(".moon-slide")].findIndex(h=>h.id===m);a=y!==-1?y:0,s(a)}r()}function ve(){const e=document.querySelectorAll(".zodiac-item"),t=new IntersectionObserver((o,n)=>{o.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),a.target.classList.remove("hidden"),n.unobserve(a.target))})},{threshold:.15});e.forEach(o=>{t.observe(o)})}document.addEventListener("DOMContentLoaded",ve);function lt(){ot(),nt(),st(),it(),ve()}function ct(){Te()}function rt(){return`
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
  `}function dt(){document.querySelectorAll(".accordion-header").forEach(t=>{t.addEventListener("click",()=>{console.log("FAQ Click"),t.parentElement.classList.toggle("open")})})}function mt(){return document.getElementById("app"),`
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
                <h3>Eclipsed Realities 🌌</h3>
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
    `}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".about-section, .about-creators, .about-closing"),t=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&n.target.classList.add("glow")})},{threshold:.5});e.forEach(o=>t.observe(o))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".creator"),t=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&n.target.classList.add("glow-effect")})},{threshold:.3});e.forEach(o=>t.observe(o))});function ht(){return document.getElementById("app"),`
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
    `}function ye(){document.querySelectorAll(".nav-link").forEach(t=>{t.classList.remove("active"),t.getAttribute("href")===window.location.hash&&t.classList.add("active")})}function be(e){try{const t=e.replace("#",""),o=document.getElementById("app");switch(t){case"home":o.innerHTML=Ue(),Q(),Re(),je(),Je(),ee();break;case"insights":o.innerHTML=tt(),lt();break;case"calendar":o.innerHTML=Be(),he();break;case"faq":o.innerHTML=rt(),dt();break;case"settings":o.innerHTML=Le(),ct();break;case"about":o.innerHTML=mt();break;case"privacy":o.innerHTML=ht();break;default:console.error("Page not found:",e),o.innerHTML='<p class="error-message">Oops! Page not found.</p>'}}catch(t){console.error("⚡ Router Error:",t);const o=document.getElementById("app");if(o){o.innerHTML=`
                <div class="error-screen">
                    <h1>🌑 Oops, something mystical went wrong!</h1>
                    <p>${t.message}</p>
                    <button id="retry-button" class="retry-button">🔄 Retry</button>
                </div>
            `;const n=document.getElementById("retry-button");n&&n.addEventListener("click",()=>{console.log("🔄 Retrying to load page..."),loadPage(page||"home")})}}}window.addEventListener("hashchange",ye);window.addEventListener("load",ye);window.addEventListener("hashchange",()=>be(location.hash));window.addEventListener("load",()=>be(location.hash||"#home"));const ut=2e3,gt=Date.now();window.addEventListener("load",()=>{const e=Date.now()-gt,t=Math.max(0,ut-e);setTimeout(()=>{const o=document.getElementById("preloader");o&&(o.classList.add("fade-out"),setTimeout(()=>{o.style.display="none"},800))},t)});
