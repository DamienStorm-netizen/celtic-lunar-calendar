(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(n){if(n.ep)return;n.ep=!0;const l=o(n);fetch(n.href,l)}})();function G(e,{onSwipeLeft:t,onSwipeRight:o,threshold:a=30}){let n=0,l=0;if(!e){console.warn("Swipe handler: no element provided.");return}e.addEventListener("touchstart",i=>{n=i.changedTouches[0].screenX}),e.addEventListener("touchend",i=>{l=i.changedTouches[0].screenX,s()});function s(){const i=l-n;Math.abs(i)>a&&(i<0?t==null||t():o==null||o())}}function Me(e){const t={festival:"🔥","full-moon":"🌕",eclipse:"🌑",holiday:"🎊"},o={"😎 Friends":"😎","🎉 Celebrations":"🎉","🌸 My Cycle":"🌸","💡 General":"💡","🏥 Health":"🏥","💜 Romantic":"💜","🖥️ Professional":"🖥️","🔥 Date":"🔥"};return e.type==="custom-event"&&e.category?o[e.category]||"✨":t[e.type]||"✨"}const he=["Under moonlit veils, forgotten dreams awaken.","A star falls — catch it, and a wish is born.","In every whisper of the trees, ancient secrets hum.","Beyond the silver horizon, new worlds sing.","A butterfly’s sigh carries the weight of tomorrow's hopes.","Drink deep the mist of morning; it carries the voice of destiny.","Embered nights forge unspoken promises in starlight.","Dance where the wild moons weave paths of gold.","Ocean tides murmur songs older than time itself.","Petals fall not with sorrow, but with sacred release.","Light a candle — summon courage from hidden realms.","The winds remember every name ever whispered in longing.","A forgotten melody echoes through the soul’s corridors.","Even the darkest sky bears the memory of dawn.","Somewhere between dusk and dreams, your spirit wanders free."];function Z(e){return e.toLowerCase().trim().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-")}const Te=`
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
`,Ce="https://lunar-almanac-backend.onrender.com".replace(/\/$/,"");function fe(e,t){const o=new URL(Ce+e);if(t)for(const[a,n]of Object.entries(t))n!=null&&n!==""&&o.searchParams.set(a,n);return o.toString()}async function $(e,t){const o=await fetch(fe(e,t),{headers:{Accept:"application/json"}});if(!o.ok)throw new Error(`${o.status} ${o.statusText}`);return o.json()}const C={health:()=>$("/healthz"),calendarData:()=>$("/api/calendar-data"),celticDate:()=>$("/api/celtic-date"),dynamicMoonPhases:(e,t)=>$("/dynamic-moon-phases",{start_date:e,end_date:t}),festivals:()=>$("/festivals"),eclipseEvents:()=>$("/api/eclipse-events"),nationalHolidays:()=>$("/api/national-holidays"),customEvents:()=>$("/api/custom-events"),addCustomEvent:e=>ke("/api/custom-events",e)};async function ke(e,t){const o=await fetch(fe(e),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`API POST failed: ${o.status} ${o.statusText}`);return o.json()}let Q=[];async function Ie(){Q=(await C.calendarData()).full_moons||[]}Ie();function De(e,t=1){if(Q.length===0)return console.warn("🔮 Full moon data not yet loaded!"),null;const o=new Date(e+"T00:00:00Z").getTime();return Q.find(a=>{const n=new Date(a.date+"T00:00:00Z").getTime();return Math.abs(o-n)/864e5<=t})}function ee(e,t){let o,a;switch(e){case"Nivis":o=new Date(Date.UTC(t-1,11,23)),a=new Date(Date.UTC(t,0,19));break;case"Janus":o=new Date(Date.UTC(t,0,20)),a=new Date(Date.UTC(t,1,16));break;case"Brigid":o=new Date(Date.UTC(t,1,17)),a=new Date(Date.UTC(t,2,16));break;case"Flora":o=new Date(Date.UTC(t,2,17)),a=new Date(Date.UTC(t,3,13));break;case"Maia":o=new Date(Date.UTC(t,3,14)),a=new Date(Date.UTC(t,4,11));break;case"Juno":o=new Date(Date.UTC(t,4,12)),a=new Date(Date.UTC(t,5,8));break;case"Solis":o=new Date(Date.UTC(t,5,9)),a=new Date(Date.UTC(t,6,6));break;case"Terra":o=new Date(Date.UTC(t,6,8)),a=new Date(Date.UTC(t,7,4));break;case"Lugh":o=new Date(Date.UTC(t,7,4)),a=new Date(Date.UTC(t,7,31));break;case"Pomona":o=new Date(Date.UTC(t,8,1)),a=new Date(Date.UTC(t,8,28));break;case"Autumna":o=new Date(Date.UTC(t,8,29)),a=new Date(Date.UTC(t,9,26));break;case"Eira":o=new Date(Date.UTC(t,9,27)),a=new Date(Date.UTC(t,10,23));break;case"Aether":o=new Date(Date.UTC(t,10,24)),a=new Date(Date.UTC(t,11,21));break;case"Mirabilis":const l=ne(t);o=new Date(Date.UTC(t,11,22)),a=new Date(Date.UTC(t,11,22+(l?1:0)));break;default:return console.error("Unknown Celtic month in getMonthRangeISO:",e),{startISO:null,endISO:null}}const n=l=>String(l).padStart(2,"0");return{startISO:`${o.getUTCFullYear()}-${n(o.getUTCMonth()+1)}-${n(o.getUTCDate())}`,endISO:`${a.getUTCFullYear()}-${n(a.getUTCMonth()+1)}-${n(a.getUTCDate())}`}}function Be(e,t=new Date,o="current"){const a=Date.UTC(t.getUTCFullYear(),11,23);let n=t.getTime()>=a?t.getUTCFullYear()+1:t.getUTCFullYear(),{startISO:l,endISO:s}=ee(e,n);if(o==="future"){const i=t.toISOString().split("T")[0];s<i&&(n+=1,{startISO:l,endISO:s}=ee(e,n))}return{startISO:l,endISO:s,cycle:n}}let D=[],te=null;function Ae(){return`
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
                        ${Te}
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
    `}async function pe(){console.log("I am running setupCalendarEvents");const e=document.getElementById("modal-container"),t=e==null?void 0:e.querySelector("#close-modal"),o=e==null?void 0:e.querySelector("#modal-content");if(!e||!o||!t){console.error("Modal elements not found. Check IDs and structure.");return}document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on Overlay"),e.classList.contains("show")&&(e.classList.remove("show"),e.classList.add("hidden")),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),t.addEventListener("click",xe),document.getElementById("calendar-today-btn").addEventListener("click",async()=>{const n=await ve();if(!n){console.error("Could not determine today's Celtic date.");return}const{celticMonth:l,celticDay:s}=n,i=se(l,s);if(!i){console.error("Failed to convert today’s Celtic date to Gregorian.");return}const r=`${i.gregorianYear}-${String(i.gregorianMonth).padStart(2,"0")}-${String(i.gregorianDay).padStart(2,"0")}`;q(s,l,r)}),document.querySelectorAll(".month-thumbnail").forEach(n=>{n.addEventListener("click",l=>{const s=l.target.closest(".month-thumbnail").dataset.month;ae(s)})})}function ae(e){te=e,console.log("📅 Last opened month set to:",te);const t=document.getElementById("modal-container");if(t&&(document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on overlay"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),t.classList.remove("hidden"),t.classList.add("month-mode"),e)){const o=t.querySelector("#modal-details");if(o){if(t.classList.add("show"),document.body.classList.add("modal-open"),e==="Mirabilis"){const n=ne(new Date().getFullYear());o.innerHTML=`
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
                        <div class="mirabilis-crest crest-noctis ${n?"":"disabled"}" id="crest-noctis" title="${n?"Click to enter Mirabilis Noctis":"Appears only in leap years"}">
                            <img src="/assets/images/months/mirabilis-noctis.png" alt="Mirabilis Noctis" />
                            <p>Mirabilis Noctis</p>
                        </div>
                    </div>

                    <a id="zodiac-learn-more" class="settings-btn celtic-zodiac-btn" href="https://open.substack.com/pub/playgroundofthesenses/p/mirabilis?r=3ngp34&utm_campaign=post&utm_medium=web" target="_blank" style="display: inline-block;">Learn More</a>
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
                `;if(W(B()),$e(e),Fe(),document.querySelectorAll(".mirabilis-tab").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".mirabilis-tab").forEach(l=>l.classList.remove("active")),a.classList.add("active");const n=a.dataset.tab;document.querySelectorAll(".mirabilis-tab-content").forEach(l=>{l.classList.add("hidden")}),document.getElementById(`tab-${n}`).classList.remove("hidden")})}),e==="Mirabilis"){const n=ne(new Date().getFullYear());setTimeout(()=>{const l=document.getElementById("crest-solis");if(l&&l.addEventListener("click",()=>{q(1,"Mirabilis","2025-12-22")}),n){const s=document.getElementById("crest-noctis");s&&s.addEventListener("click",()=>{q(2,"Mirabilis","2025-12-23")})}},0)}t.classList.add("fade-in"),t.classList.remove("fade-out"),ze(t,e),flatpickr("#event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"}),document.getElementById("add-event-form").addEventListener("submit",async a=>{a.preventDefault();const n=document.getElementById("event-name").value.trim(),l=document.getElementById("event-type").value,s=document.getElementById("event-date").value,i=document.getElementById("event-note").value.trim();if(!n||!s){alert("Please enter both an event name and date.");return}const r={id:Date.now().toString(),title:n,type:l,date:s,notes:i,recurring:!1};if(!(await fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){alert("Failed to add event.");return}await pe();const d=H(s),h=F(s),[E,y]=h.split(" ");Swal.fire({icon:"success",title:`Event saved for ${d}, ${h}`,showCancelButton:!0,confirmButtonText:"View Event"}).then(u=>{u.isConfirmed&&(document.querySelector(".nav-link#nav-calendar").click(),setTimeout(()=>{q(parseInt(y,10),E,s,r.id);const g=document.querySelector(`.custom-event-slide[data-event-id="${r.id}"]`);g&&(g.classList.add("highlight-pulse"),setTimeout(()=>g.classList.remove("highlight-pulse"),2e3))},300))})})}}}function xe(){console.log("Click Close Button");const e=document.getElementById("modal-container");document.body.classList.remove("modal-open"),e&&e.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")}async function $e(e){try{const t=await fetch("/api/calendar-data");if(!t.ok)throw new Error("Failed to fetch calendar data");const a=(await t.json()).months.find(n=>n.name===e);a?document.querySelector(".month-tagline").textContent=a.tagline:document.querySelector(".month-tagline").textContent="A whisper of time's essence..."}catch(t){console.error("Error fetching tagline:",t),document.querySelector(".month-tagline").textContent="A whisper of time's essence..."}}function Fe(){const e=document.querySelectorAll(".calendar-tab-button"),t=document.querySelectorAll(".calendar-tab-content");e.forEach(o=>{o.addEventListener("click",()=>{const a=o.id.replace("tab-","tab-content-");e.forEach(n=>n.classList.remove("active")),t.forEach(n=>n.classList.remove("active")),o.classList.add("active"),document.getElementById(a).classList.add("active")})})}async function ze(e,t){console.log(`Enhancing calendar for ${t}...`),D.length===0&&await oe();const o=await ve();if(!o){console.error("Could not fetch Celtic date. Highlight skipped.");return}const{celticMonth:a,celticDay:n}=o,l=e.querySelectorAll(".calendar-grid td"),s=await ye();console.log("Fetched Eclipse Data:",s),(!D||D.length===0)&&(console.log("Fetching national holidays..."),D=await oe());const{startISO:i,endISO:r}=Be(t,new Date,"current"),c=parseInt(r.split("-")[0],10),d=await Ne(i,r);console.log("🌙 lunarData array (",i,"→",r,"):",d);const h=await Pe();console.log("Custom events retrieved:",h);const E=await be(),y=typeof B=="function"?B():{showHolidays:!0,showCustomEvents:!0,showPastEvents:!0};l.forEach(u=>{const g=parseInt(u.textContent,10);if(console.log(`📅 Checking table cell: ${g}`),isNaN(g))return;console.log(`✅ Table Cell Detected: ${g} in ${t}`);const L=se(t,g,c);if(!L){console.error(`Failed to convert ${t} ${g} to Gregorian.`);return}const b=`${L.gregorianYear}-${String(L.gregorianMonth).padStart(2,"0")}-${String(L.gregorianDay).padStart(2,"0")}`,M=s.find(p=>p.date.startsWith(b));M&&(console.log(`🌑 Marking ${g} as Eclipse Day: ${M.title}`),u.classList.add("eclipse-day"),u.setAttribute("title",`${M.title} 🌘`));const S=d.find(p=>p.date.startsWith(b));if(console.log("Coverted Gregorian date is ",b),S&&S.phase&&S.phase.toLowerCase()==="full moon"){console.log(`🌕 Marking ${g} as Full Moon: ${S.moonName||S.phase}`),u.classList.add("full-moon-day");const p=`${S.moonName||S.phase} 🌕`;u.setAttribute("title",p)}t===a&&g===n&&u.classList.add("highlight-today");const T=E.find(p=>p.date===b);if(T&&(console.log(`Marking ${b} as Festival: ${T.title}`),u.classList.add("festival-day"),u.setAttribute("title",`${T.title} 🎉`)),y.showHolidays){const p=D.find(v=>v.date===b&&v.date>=i&&v.date<=r);p&&(console.log(`Marking ${b} as National Holiday: ${p.title}`),u.classList.add("national-holiday"),u.setAttribute("title",`${p.title} 🎉`))}const[,m,f]=b.split("-");if(y.showCustomEvents){const p=new Date().toISOString().split("T")[0];h.forEach(v=>{const[z,N,k]=v.date.split("-"),U=N===m&&k===f,A=v.date<p,V=!v.recurring&&t==="Nivis"&&U&&parseInt(z,10)===c+1,K=!v.recurring&&y.showPastEvents&&A&&U;if(!y.showPastEvents&&!v.recurring&&A)return;(v.recurring?U:v.date===b||V||K)&&(u.classList.add("custom-event-day"),u.setAttribute("title",`${v.title}${v.notes?" — "+v.notes:""}`),u.setAttribute("data-event-id",v.id||`${v.title}-${v.date}`))})}u.addEventListener("click",()=>{console.log(`Clicked on day ${g} in the month of ${t}, Gregorian: ${b}`),q(g,t,b)})})}async function oe(){const e=await C.nationalHolidays();return D=e,e}async function ve(){const e=await C.celticDate();return{celticMonth:e.month,celticDay:parseInt(e.celtic_day,10)}}async function ye(){return await C.eclipseEvents()}async function Ne(e,t){try{return await C.dynamicMoonPhases(e,t)}catch(o){return console.error("❌ Error fetching moon phases (range):",o),[]}}async function Pe(){return await C.customEvents()}async function be(){return await C.festivals()}async function q(e,t,o,a=null){const n=t,l=e,s=document.getElementById("modal-container"),i=document.getElementById("modal-details");if(!s||!i){console.error("🚨 Modal elements not found, aborting.");return}i.innerHTML=`
        <h2>Celtic Calendar</h2>
        <p>Loading...</p>
    `,s.classList.remove("hidden");const r=document.getElementById("constellation-layer");r&&(r.className=`${n.toLowerCase()}-stars`);const c=se(n,l);if(!c){i.innerHTML="<p>Error: Invalid date conversion.</p>";return}c.gregorianDay.toString().padStart(2,"0"),c.gregorianMonth.toString().padStart(2,"0");let d=await Ue(c.gregorianMonth,c.gregorianDay,c.gregorianYear);Array.isArray(d)||(d=[]);const h=c.gregorianYear,E=String(c.gregorianMonth).padStart(2,"0"),y=String(c.gregorianDay).padStart(2,"0"),u=`${h}-${E}-${y}`;try{const g=await C.dynamicMoonPhases(u,u);if(!Array.isArray(g)||g.length===0)throw new Error("Invalid lunar data received");const L=g[0]||{};let b;const M=He(E),S=Re(L.phase,u);D.length===0&&await oe(),console.log("Fetched National Holidays:",D);const T=Oe(c.gregorianMonth,c.gregorianDay),m=await qe(T);console.log("Zodiac for this date:",m);let f="";if(m&&m.name){const w=Z(m.name);f=`
            <div class="carousel-slide zodiac-slide">
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Celtic Zodiac</h3>
                <p><span class="zodiac-title">${m.name.toUpperCase()}</span></p>
                <img src="/assets/images/zodiac/zodiac-${w}.png" alt="${m.name}" class="zodiac-image">
                <p class="zodiac-description">${m.symbolism||"Mysterious and undefined."}</p>
            </div>
        `}else console.warn("⚠️ Zodiac sign not found for this date!");const v=(await ye()).find(w=>{const I=w.date.split(" ")[0];return console.log(`🔍 Checking Eclipse Date: ${I} vs ${o}`),I===o}),z={"😎 Friends":"😎","🎉 Celebrations":"🎉","🌸 My Cycle":"🌸","💡 General":"💡","🏥 Health":"🏥","💜 Romantic":"💜","🖥️ Professional":"🖥️","🔥 Date!!":"🔥"};console.log("Formatted Gregorian date used with eclipses: ",o),console.log("Today Eclipse data fetched: ",v);const N=await be();console.log("🔍 Checking Festival Dates:"),N.forEach(w=>{console.log(`Festival: ${w.name} | Date in JSON: ${w.date} | Formatted: ${new Date(w.date).toISOString().split("T")[0]}`)}),console.log("🧐 Formatted Gregorian Date Used for Matching:",o),b=typeof L.illumination=="number"?(L.illumination*100).toFixed(2):null;let k=L.phase??"Unknown phase";if(b!=null){const w=parseFloat(b);(w<=1||w<=5&&/crescent/i.test(k))&&(k="New Moon")}L.phase=k;const U=b!=null?`${k} phase with ${b}% illumination.`:k,A=De(o,2),V=A?A.name:k.toLowerCase()==="full moon"?"Full Moon":k,K=A?(A.poem||A.description||"").replace(/\n/g,"<br/>"):U,P=N.find(w=>new Date(w.date).toISOString().split("T")[0]===o);console.log("🎭 Festival Data Retrieved:",P),s.classList.remove("month-mode");const J=D.filter(w=>w.date===u).map(w=>{const I=Z(w.title);return`<p><strong>${w.title}</strong></p>
                <img src='/assets/images/holidays/holiday-${I}.png' class='holiday-img' alt='${w.title}' />`}).join("")||"No national holidays today.";let re="";v&&(console.log("Eclipse Event is:",v.type),re=`
            <div class="eclipse-block">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Eclipse</h3>
            <img src='/assets/images/eclipses/${v.type==="solar-eclipse"?"eclipse-solar.png":"eclipse-lunar.png"}' class='eclipse-img' alt='${v.type}' />
            <p><strong>${v.title}</strong></p>
            <p class="eclipse-note">${v.description}</p>
            </div>
        `);let Se=J&&J.trim()!==""&&J!=="No national holidays today."?`<div class="holiday-block">
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Holidays</h3>
                <p>${J}</p>
        </div>`:"",de="";if(P){const w=Z(P.name);de=`
                <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                <h3 class="goldenTitle">Festivals</h3>
                <p><span class="festival-title">${P.name}</span></p>
                <img src='/assets/images/festivals/festival-${w}.png' class='festival-img' alt='${P.name}' />
                <p class="festival-note">${P.description}</p>
            `}i.innerHTML=`
            <div class="day-carousel-wrapper">
                <button class="day-carousel-prev"><img src="/assets/images/decor/moon-crescent-prev.png" alt="Prev" /></button>

                <div class="day-carousel">
                    ${We({lunarData:L,festivalHTML:de,zodiacHTML:f,holidayHTML:Se,eclipseHTML:re,celticMonth:n,celticDay:l,formattedGregorianDate:o,moonLabel:V,moonText:K})}
                    ${d.map(w=>`
                        <div class="day-slide custom-event-slide" data-event-id="${w.id}">
                          <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
                          <h3 class="goldenTitle">Your Event</h3>
                          <p>${w.title}</p>
                          ${w.notes?`<p>${w.notes}</p>`:""}
                          <p>${w.type}</p>
                        </div>
                    `).join("")}
                </div>

               <button class="day-carousel-next"><img src="/assets/images/decor/moon-crescent-next.png" alt="Next" /></button>
                </div>
                <button id="back-to-month" class="back-button">Back to ${n}</button>
            </div>
        `;const O=Array.from(s.querySelectorAll(".day-slide"));let x=0;O.forEach((w,I)=>{w.style.display=I===x?"flex":"none"});const R=w=>{O[x].style.display="none",x=(w+O.length)%O.length,O[x].style.display="flex"};document.querySelector(".day-carousel-prev").addEventListener("click",()=>R(x-1)),document.querySelector(".day-carousel-next").addEventListener("click",()=>R(x+1));const X=G(s.querySelector(".day-carousel"),{onSwipeLeft:()=>R(x+1),onSwipeRight:()=>R(x-1)});if(a){const w=s.querySelector(`.custom-event-slide[data-event-id="${a}"]`);if(w){const I=O.indexOf(w);X&&typeof X.slideTo=="function"?X.slideTo(I):R(I)}}const me=document.getElementById("back-to-month");me&&me.addEventListener("click",()=>{s.classList.add("month-mode"),ae(n)})}catch(g){console.error("Error fetching lunar phase:",g),i.innerHTML="<p>Failed to load moon phase data.</p>"}console.log("Final Gregorian Date:",u)}function Oe(e,t){console.log(`Checking zodiac for: ${e}-${t}`);const o=[{name:"Birch",start:{month:12,day:24},end:{month:1,day:20}},{name:"Rowan",start:{month:1,day:21},end:{month:2,day:17}},{name:"Ash",start:{month:2,day:18},end:{month:3,day:17}},{name:"Alder",start:{month:3,day:18},end:{month:4,day:14}},{name:"Willow",start:{month:4,day:15},end:{month:5,day:12}},{name:"Hawthorn",start:{month:5,day:13},end:{month:6,day:9}},{name:"Oak",start:{month:6,day:10},end:{month:7,day:7}},{name:"Holly",start:{month:7,day:8},end:{month:8,day:4}},{name:"Hazel",start:{month:8,day:5},end:{month:9,day:1}},{name:"Vine",start:{month:9,day:2},end:{month:9,day:29}},{name:"Ivy",start:{month:9,day:30},end:{month:10,day:27}},{name:"Reed",start:{month:10,day:28},end:{month:11,day:24}},{name:"Elder",start:{month:11,day:25},end:{month:12,day:23}}],a=parseInt(e,10),n=parseInt(t,10);for(const l of o){const{start:s,end:i}=l;if(a===s.month&&n>=s.day||a===i.month&&n<=i.day||s.month>i.month&&(a>s.month||a<i.month))return l.name}return"Unknown"}async function qe(e){try{return(await C.calendarData()).zodiac.find(o=>o.name===e)||null}catch(t){return console.error("Error fetching zodiac info:",t),null}}function He(e){return["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"][parseInt(e,10)-1]}async function Ue(e,t,o){console.log("Fetching custom events...");try{const a=await fetch("/api/custom-events");if(!a.ok)throw new Error("Failed to fetch events");const n=await a.json(),l=String(e).padStart(2,"0"),s=String(t).padStart(2,"0"),i=`${o}-${l}-${s}`;return n.filter(r=>{const[c,d,h]=r.date.split("-");return r.recurring?d===l&&h===s:r.date===i})}catch(a){return console.error("Error fetching events:",a),[]}}function Re(e,t){const o={"01":"Wolf Moon","02":"Snow Moon","03":"Worm Moon","04":"Flower Moon","05":"Strawberry Moon","06":"Thunder Moon","07":"Grain Moon","08":"Harvest Moon","09":"Hunter's Moon",10:"Frost Moon",11:"Beaver Moon",12:"Cold Moon"};if(e==="Full Moon"&&t){const n=t.split("-")[1];console.log("Searching moon phase for this month: ",n),o[n]&&(e=o[n],console.log("🌕 Matched Full Moon:",e))}return{moonName:e,poem:{"Wolf Moon":`Beneath the snow and howling skies,
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
Prepare your soul for year’s new bend.`}[e]||"No description available."}}function We({lunarData:e,festivalHTML:t,holidayHTML:o,eclipseHTML:a,zodiacHTML:n,celticMonth:l,celticDay:s,formattedGregorianDate:i,moonLabel:r,moonText:c}){const d=he[Math.floor(Math.random()*he.length)],[h,E,y]=i.split("-"),u=ie(s),g=e.description&&e.description!=="No description available."?e.description:"The moon stirs in silence tonight, her secrets cloaked.",L=r.toLowerCase()!==e.phase.toLowerCase()||e.phase.toLowerCase()==="full moon";let b="Mirabilis",M="",S="";return l==="Mirabilis"&&(s===1?(b="Mirabilis Solis",M="The sun dances on the edge of time,<br />Golden and defiant, it bends the chime.<br />A sacred spark, a seed of light,<br />That births the wheel in radiant flight.",S='<img src="/assets/images/months/mirabilis-solis-notext.png" class="mirabilis-symbol" alt="Solis Symbol" />'):s===2&&(b="Mirabilis Noctis",M=`A breath of shadow, soft and still,
A second hush upon the hill.
She stirs in dreams beneath the veil,
Where moonlight writes the ancient tale.`,S='<img src="/assets/images/months/mirabilis-noctis-notext.png" class="mirabilis-symbol" alt="Noctis Symbol" />')),`
   <div class="day-slide">
        <h3 class="goldenTitle">${l==="Mirabilis"?b:u}</h3>
        ${l!=="Mirabilis"?`<p><span class="celticDate">${l} ${s}</span></p>`:""}
        ${l!=="Mirabilis"?`
            <div class="moon-phase-graphic moon-centered">
                ${e.graphic}
            </div>`:""}
        <h3 class="moon-phase-name">
          ${L?`${r} `:`${e.phase} `}
        </h3>
        <div class="mirabilis-graphic">
            ${S}
        </div>
        ${M?`<blockquote class="mirabilis-poem">${M}</blockquote>`:""}
        ${l!=="Mirabilis"?`<p class="moon-description">${L?c:g}</p>`:""}
    </div>

        ${t?`<div class="day-slide">${t}</div>`:""}
        ${o?`<div class="day-slide">${o}</div>`:""}
        ${a?`<div class="day-slide">${a}</div>`:""}
        ${n?`<div class="day-slide">${n}</div>`:""}

        <div class="day-slide">
            <img src='/assets/images/decor/divider.png' class='divider' alt='Divider' />
            <h3 class="goldenTitle">Mystical Wisdom</h3>
            <div class="mystical-suggestion-block">
                <img src="/assets/images/decor/mystical-sparkle.png" alt="Mystical Sparkle" class="divider" />
                <p class="mystical-message">${d}</p>
            </div>
        </div>
    `}function W(e){document.querySelectorAll(".national-holiday-row").forEach(s=>{s.classList.toggle("legend-row-hidden",!e.showHolidays)}),document.querySelectorAll(".national-holiday").forEach(s=>{e.showHolidays?s.classList.add("national-holiday"):s.classList.remove("national-holiday")}),document.querySelectorAll(".custom-event-day-row").forEach(s=>{s.classList.toggle("legend-row-hidden",!e.showCustomEvents)}),document.querySelectorAll(".custom-event-day").forEach(s=>{e.showCustomEvents?s.classList.add("custom-event-day"):s.classList.remove("custom-event-day")});const l=document.getElementById("mystical-insight");if(l){const s=l.querySelector("h3"),i=l.querySelector("span");if(l){const r=["🌙 Trust your inner tides.","✨ Today is a good day to cast intentions.","🔮 The stars whisper secrets today...","🌿 Pause. Listen to nature. It knows.","🌙 Trust your inner tides.","✨ Today is a good day to cast intentions.","🔮 The stars whisper secrets today...","🪄 Cast your hopes into the universe.","🌸 A seed planted today blooms tomorrow.","🌌 Let stardust guide your heart.","🕯️ Light a candle and focus on your intentions for the day.","🌜Meditate under the moonlight and visualize your dreams.","߷ Draw a rune and interpret its meaning for guidance.","💌 Write a letter to your future self and store it safely.","🍁 Collect a small item from nature and set an intention with it."],c=Math.floor(Math.random()*r.length);s.classList.remove("hidden"),i.textContent=r[c],i.classList.remove("hidden"),l.classList.remove("hidden")}else s.classList.add("hidden"),i.textContent="",i.classList.add("hidden"),l.classList.add("hidden")}}document.addEventListener("submit",async e=>{const t=e.target&&e.target.id==="add-event-form",o=window.location.hash==="#calendar";if(t&&o){e.preventDefault(),console.log("✨ Adding new custom event from CALENDAR...");const a=document.getElementById("event-name").value.trim(),n=document.getElementById("event-type").value.trim(),l=document.getElementById("event-note").value.trim(),s=document.getElementById("event-date").value;if(!a||!s){alert("Please enter a valid event name and date.");return}const i=new Date(s).toISOString().split("T")[0],r={id:Date.now().toString(),title:a,type:n||"General",notes:l||"",date:i};console.log("🎉 Event to be added (Calendar):",r);try{const c=await fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!c.ok)throw new Error("Failed to add event.");const d=await c.json();console.log("✅ Event added from Calendar:",d),ae(te)}catch(c){console.error("❌ Error adding calendar event:",c)}}});function ne(e=new Date().getFullYear()){return e%4===0&&e%100!==0||e%400===0}function se(e,t,o=new Date().getFullYear()){const l={Nivis:`${e==="Nivis"?o-1:o}-12-23`,Janus:`${o}-01-20`,Brigid:`${o}-02-17`,Flora:`${o}-03-17`,Maia:`${o}-04-14`,Juno:`${o}-05-12`,Solis:`${o}-06-09`,Terra:`${o}-07-07`,Lugh:`${o}-08-04`,Pomona:`${o}-09-01`,Autumna:`${o}-09-29`,Eira:`${o}-10-27`,Aether:`${o}-11-24`,Mirabilis:`${o}-12-22`}[e];if(!l)return console.error("Invalid Celtic month:",e),null;const s=new Date(l+"T00:00:00Z"),i=new Date(s.getTime()+(t-1)*864e5);return{gregorianMonth:String(i.getUTCMonth()+1).padStart(2,"0"),gregorianDay:String(i.getUTCDate()).padStart(2,"0"),gregorianYear:i.getUTCFullYear()}}function F(e){const t=typeof e=="string"?new Date(e+"T00:00:00Z"):new Date(e);if(isNaN(t))return console.error("Invalid Gregorian date:",e),"Invalid Date";const o=t.getUTCFullYear(),a=Date.UTC(o,11,23),n=t.getTime()>=a?o+1:o,l=["Nivis","Janus","Brigid","Flora","Maia","Juno","Solis","Terra","Lugh","Pomona","Autumna","Eira","Aether","Mirabilis"];for(const s of l){const{startISO:i,endISO:r}=ee(s,n),c=new Date(i+"T00:00:00Z"),d=new Date(r+"T00:00:00Z");if(t>=c&&t<=d){const h=Math.floor((t.getTime()-c.getTime())/864e5);return s==="Mirabilis"?h===0?"Mirabilis Solis":"Mirabilis Noctis":`${s} ${h+1}`}}return"Unknown Date"}function ie(e){return["Moonday","Trésda","Wyrdsday","Thornsday","Freyasday","Emberveil","Sunveil"][(e-1)%7]}function H(e){let t,o,a;if(typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e))[t,o,a]=e.split("-").map(Number);else{const d=new Date(e);if(isNaN(d.getTime()))return console.error("Invalid Gregorian date for weekday:",e),"";t=d.getFullYear(),o=d.getMonth()+1,a=d.getDate()}const n=Date.UTC(t,o-1,a),l=Date.UTC(t,11,23),s=n>=l?t:t-1,i=Date.UTC(s,11,23),c=Math.floor((n-i)/864e5)+1;return ie((c-1)%7+1)}function Je(e){localStorage.setItem("customEvents",JSON.stringify(e))}function je(){const e=localStorage.getItem("customEvents");return e?JSON.parse(e):[]}async function _(){try{const e=await fetch("/api/custom-events",{cache:"no-store",headers:{"Cache-Control":"no-store"}});if(!e.ok)throw new Error("Failed to fetch custom events");return await e.json()}catch(e){return console.error("Error fetching custom events:",e),[]}}function Ze(e,t){const o=document.getElementById("event-toast"),a=document.getElementById("toast-date"),n=document.getElementById("toast-view-btn"),l=H(t),s=F(t);a.textContent=`${l}, ${s}`,o.classList.remove("hidden"),setTimeout(()=>o.classList.add("hidden"),6e3),n.onclick=()=>{document.querySelector(".nav-link#nav-calendar").click(),showCalendarForDate(new Date(t));const i=document.querySelector(`[data-event-id="${e}"]`);i&&i.classList.add("highlight-pulse"),setTimeout(()=>i&&i.classList.remove("highlight-pulse"),2e3),o.classList.add("hidden")}}function Ge(){return`
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
                    <li class="mystical-toggle">
                        <span>Show Past Events</span>
                        <label class="switch">
                            <input type="checkbox" id="show-past-events" data-on="🕰️" data-off="🚫" />
                            <span class="slider round"></span>
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
    `}function B(){const e=localStorage.getItem("mysticalPrefs"),t={mysticalSuggestions:!0,showHolidays:!0,showCustomEvents:!0,showPastEvents:!1,showConstellations:!0};return e?{...t,...JSON.parse(e)}:t}function _e(e){const t=document.getElementById("edit-event-modal"),o=document.getElementById("edit-event-form");console.log("Event ID to edit is ",e),fetch("/api/custom-events").then(a=>a.json()).then(a=>{const n=a.find(s=>s.id===e);if(!n){console.error("Event not found.");return}console.log("Type to edit is ",n.type),document.getElementById("edit-event-name").value=n.title,document.getElementById("edit-event-type").value=n.type||"General",document.getElementById("edit-event-date").value=n.date;const l=document.getElementById("edit-event-date");l._flatpickr&&l._flatpickr.setDate(n.date,!0),document.getElementById("edit-event-notes").value=n.notes||"",document.getElementById("edit-event-recurring").checked=n.recurring||!1,o.setAttribute("data-original-id",n.id),t.classList.remove("hidden"),t.classList.add("show"),document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.querySelectorAll(".close-modal-edit").forEach(s=>{s.addEventListener("click",()=>{const i=document.getElementById("edit-event-modal");i.classList.remove("show"),i.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")})}),document.querySelectorAll(".cancel-modal-edit").forEach(s=>{s.addEventListener("click",()=>{const i=document.getElementById("edit-event-modal");i.classList.remove("show"),i.classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show")})})}).catch(a=>console.error("Error fetching event:",a))}function Ye(){console.log("☸️ Running the setupSettingsEvent function");const e=document.getElementById("edit-event-form");e&&(e.removeEventListener("submit",ge),e.addEventListener("submit",ge));const t=document.getElementById("add-event-form");t&&(t.removeEventListener("submit",ue),t.addEventListener("submit",ue)),document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on overlay");const i=document.getElementById("edit-event-modal"),r=document.getElementById("add-event-modal");i.classList.contains("show")&&(i.classList.remove("show"),i.classList.add("hidden")),r.classList.contains("show")&&(r.classList.remove("show"),r.classList.add("hidden")),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),_().then(i=>Y(i)).catch(i=>console.error("Error loading events:",i));const o=B();document.getElementById("show-holidays").checked=o.showHolidays,document.getElementById("show-custom-events").checked=o.showCustomEvents,document.getElementById("show-past-events").checked=o.showPastEvents;function a(){document.querySelectorAll(".switch input[type='checkbox']").forEach(i=>{const r=i.nextElementSibling,c=i.dataset.on||"🔮",d=i.dataset.off||"✨";r.innerHTML=`<span class="toggle-icon">${i.checked?c:d}</span>`})}function n(){document.querySelectorAll(".switch input[type='checkbox']").forEach(i=>{i.addEventListener("change",a)}),a()}n();const l=document.getElementById("convert-to-celtic"),s=document.querySelector(".converted-date");if(l&&s){l.addEventListener("change",r=>{const c=r.target.value,d=F(c);if(d==="Unknown Date"||d==="Invalid Date")s.textContent=d;else{const h=H(c);s.textContent=`${h}, ${d}`}});const i=new Date().toISOString().split("T")[0];l.value=i,l.dispatchEvent(new Event("change"))}flatpickr("#convert-to-celtic",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil",onChange:function(i,r){const c=F(r);if(c==="Unknown Date"||c==="Invalid Date")s.textContent=c;else{const d=H(r);s.textContent=`${d}, ${c}`}}}),flatpickr("#event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"}),flatpickr("#edit-event-date",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",theme:"moonveil"})}function Ve(){console.log("📝 Open Add Event Modal...");const e=document.getElementById("add-event-modal");e.classList.remove("hidden"),e.classList.add("show"),document.getElementById("modal-overlay").classList.add("show"),document.getElementById("modal-overlay").classList.remove("hidden"),document.querySelectorAll(".cancel-modal-add").forEach(t=>{t.addEventListener("click",()=>{e.classList.remove("show"),e.classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")})}),document.querySelectorAll(".close-modal-add").forEach(t=>{t.addEventListener("click",()=>{e.classList.remove("show"),e.classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")})})}async function ue(e){document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show"),console.log("Adding an event"),e.preventDefault();const t=document.getElementById("event-name").value.trim(),o=document.getElementById("event-type").value,a=document.getElementById("event-date").value,n=document.getElementById("event-note").value.trim(),l=document.getElementById("event-recurring").checked;if(!t||!a){alert("Please enter both an event name and date.");return}const s={id:Date.now().toString(),title:t,type:o,date:a,notes:n,recurring:l};let i=[];try{i=je(),Array.isArray(i)||(i=[])}catch(c){console.warn("Failed to load custom events from localStorage:",c),i=[]}const r=[...i,s];Je(r),console.log("📤 Sending new event:",s);try{const c=await fetch("/api/custom-events",{cache:"no-store",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!c.ok)throw new Error("Failed to add event");const d=await c.json();console.log("✅ Event added successfully:",d),document.getElementById("add-event-modal").style.display="none";const h=await _();if(Y(h),setTimeout(()=>{const E=document.querySelectorAll(".event-item"),y=Array.from(E).find(u=>u.textContent.includes(t)&&u.textContent.includes(a));y&&(y.classList.add("event-highlight"),y.scrollIntoView({behavior:"smooth",block:"center"}),y.classList.add("event-highlight-glow"),y.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{y.classList.remove("event-highlight"),y.classList.remove("event-highlight-glow")},3e3))},200),document.getElementById("event-name").value="",document.getElementById("event-date").value="",document.getElementById("event-type").value="General",document.getElementById("event-note").value="",typeof Swal<"u"&&Swal.fire){const E=H(a),y=F(a);Swal.fire({title:`Event saved for ${E}, ${y}`,html:'<img src="/assets/icons/logo-icon.png" class="swal2-logo-icon" alt="Lunar Logo">',customClass:{popup:"celestial-toast"},showCancelButton:!0,confirmButtonText:"View Event",cancelButtonText:"Cancel"}).then(u=>{if(u.isConfirmed){document.querySelector(".nav-link#nav-calendar").click();const[g,L]=y.split(" ");setTimeout(()=>{q(parseInt(L,10),g,a,s.id);const b=document.querySelector(`[data-event-id="${s.id}"]`);b&&(b.classList.add("highlight-pulse"),setTimeout(()=>b.classList.remove("highlight-pulse"),2e3))},300)}})}else Ze(s.id,a)}catch(c){console.error("❌ Error adding event:",c),alert("Oops! Something went wrong while adding your event.")}}function Y(e){const t=document.getElementById("event-list-container");t.innerHTML="",e.forEach(o=>{console.log("Processing event:",o);const a=document.createElement("div");a.classList.add("event-item"),a.innerHTML=`
            <ul class="settings-event-list">
                <li><h3>${o.title} - ${o.type}</h3></li>
                <li>${o.date}</li>
                <li>${o.notes||"No notes added."}</li>
                <li><button class="settings-edit-event" data-id="${o.id}">Edit</button><button class="settings-delete-event" data-id="${o.id}">Delete</button></li>
            </ul>
        `,t.appendChild(a)}),Xe()}async function ge(e){e.preventDefault();const o=document.getElementById("edit-event-form").getAttribute("data-original-id"),a={title:document.getElementById("edit-event-name").value.trim(),type:document.getElementById("edit-event-type").value,date:document.getElementById("edit-event-date").value,notes:document.getElementById("edit-event-notes").value.trim()};a.recurring=document.getElementById("edit-event-recurring").checked,console.log("✨ Submitting update for event ID:",o,a);try{const n=await fetch(`/api/custom-events/${o}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!n.ok)throw new Error("Failed to update event.");const l=await n.json();console.log("✅ Event updated:",l),document.getElementById("edit-event-modal").classList.remove("show"),document.getElementById("edit-event-modal").classList.add("hidden"),document.getElementById("modal-overlay").classList.add("hidden"),document.getElementById("modal-overlay").classList.remove("show");const s=await _();Y(s)}catch(n){console.error("❌ Error updating event:",n),alert("Oops! Something went wrong while updating your event.")}}async function Ke(e){if(console.log("🚀 handleDeleteEvent function triggered!"),!e){console.error("❌ Error: eventId is undefined.");return}console.log(`🗑️ Attempting to delete event on: ${e}`);try{const t=await fetch(`/api/custom-events/${e}`,{method:"DELETE"});if(!t.ok)throw new Error(`Failed to delete event: ${t.statusText}`);console.log(`✅ Event on ${e} deleted successfully!`);const o=document.getElementById("event-list-container");o&&(o.innerHTML="<p>Refreshing events...</p>"),setTimeout(async()=>{console.log("🔄 Fetching updated events...");const a=await _();Y(a)},1e3)}catch(t){console.error("❌ Error deleting event:",t)}}function Xe(){const e=document.getElementById("add-event-button");e&&e.addEventListener("click",()=>{Ve()});const t=document.getElementById("about-page-button");t&&t.addEventListener("click",()=>{console.log("Clicked on About link"),window.location.hash="about"}),document.querySelectorAll(".settings-edit-event").forEach(s=>{s.addEventListener("click",i=>{console.log("Edit button clicked!");const r=i.target.getAttribute("data-id");r?_e(r):console.error("No data-id attribute found on edit button.")})}),document.querySelectorAll(".settings-delete-event").forEach(s=>{s.addEventListener("click",i=>{console.log("Delete button clicked!!!");const r=i.target;if(!r){console.error("Error: event.target is undefined.");return}const c=r.getAttribute("data-id");if(!c){console.error("Error: data-id attribute not found.");return}console.log("Attempting to delete event on:",c),Ke(c)})});const o=document.getElementById("toggle-mystical");o&&o.addEventListener("change",s=>{const i=B();i.mysticalSuggestions=s.target.checked,j(i),W(i)});const a=document.getElementById("show-holidays");a&&a.addEventListener("change",s=>{const i=B();i.showHolidays=s.target.checked,j(i),W(i)});const n=document.getElementById("show-custom-events");n&&n.addEventListener("change",s=>{const i=B();i.showCustomEvents=s.target.checked,j(i),W(i)});const l=document.getElementById("show-past-events");l&&l.addEventListener("change",s=>{const i=B();i.showPastEvents=s.target.checked,j(i),W(i)})}function j(e){localStorage.setItem("mysticalPrefs",JSON.stringify(e))}function Qe(){const e=`
        <section class="home" class="fade-in">
            <div id="modal-overlay" class="modal-overlay hidden"></div>
            <div class="celtic-date"></div>
            <div class="celtic-info-container">

            <!--- *** MOON & CELTIC ZODIAC *** --->
                <!-- Moon Phase Column -->
                <div class="moon-column">
                    <p class="goldenTitle">Tonight's Moon</p>
                    <div class="moon-phase">
                        <div class="moon-graphic"></div>
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
                <p id="traitsParagraph" class="hidden">
                  <strong>Zodiac Traits:</strong>
                  <span id="traitsOutput"></span>
                </p>

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
    `;return setTimeout(()=>{var s;const t=document.getElementById("modal-overlay");t&&t.addEventListener("click",()=>{var i,r;(i=document.getElementById("home-zodiac-modal"))==null||i.classList.remove("show"),(r=document.getElementById("home-zodiac-modal"))==null||r.classList.add("hidden"),t.classList.remove("show"),t.classList.add("hidden")}),requestAnimationFrame(()=>{const i=document.getElementById("coming-events-carousel");i?(G(i,{onSwipeLeft:()=>{var r;return(r=document.querySelector(".coming-events-carousel-next"))==null?void 0:r.click()},onSwipeRight:()=>{var r;return(r=document.querySelector(".coming-events-carousel-prev"))==null?void 0:r.click()}}),console.log("Swipe listener attached to home carousel")):console.warn("coming-events-carousel element not found for swipe init")});const o=document.getElementById("birthdateInput"),a=document.getElementById("revealZodiac"),n=document.getElementById("birthdayResults");let l={};C.calendarData().then(i=>{i.zodiac.forEach(r=>{l[r.name.trim().toLowerCase()]=r.symbolism})}).catch(i=>console.error("Failed to load zodiac data:",i)),a.addEventListener("click",async()=>{if(!o.value)return;const i=o.value,r=F(i);let c="";try{const y=await(await fetch("/zodiac/all")).json(),[u,g,L]=i.split("-").map(Number),b=y.find(M=>{const[,S,T]=M.start_date.split("-").map(Number),[,m,f]=M.end_date.split("-").map(Number),p=g>S||g===S&&L>=T,v=g<m||g===m&&L<=f;return S<m||S===m&&T<=f?p&&v:p||v});c=(b==null?void 0:b.name)||"Unknown"}catch(E){console.error("Zodiac fetch/all error:",E)}const d=(c||"").trim().toLowerCase();l[d]||console.warn(`⚠️ Traits for ${c} not found in initial load. Either the sign name is wrong or the JSON lacks that entry.`);const h=l[d]||"No traits found.";document.getElementById("lunarDateOutput").textContent=r,document.getElementById("celticSignOutput").textContent=c,document.getElementById("traitsOutput").textContent=h,n.classList.remove("hidden")}),(s=document.getElementById("addBirthdayEvent"))==null||s.addEventListener("click",()=>{const i=o.value;console.log("Add Bday button is clicked: ",i);const r={id:Date.now().toString(),date:i,title:"Celtic Birthday",type:"🎂 Birthday",notes:`Lunar: ${document.getElementById("lunarDateOutput").textContent}, Sign: ${document.getElementById("celticSignOutput").textContent}`,recurring:!0},c=loadCustomEvents();saveCustomEvents([...c,r]),fetch("/api/custom-events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(d=>{if(!d.ok)throw new Error("Failed to save event");return d.json()}).then(()=>{ce();const d=H(i),h=F(i);typeof Swal<"u"&&Swal.fire&&Swal.fire({icon:"success",title:`Event saved for ${d}, ${h}`,showCancelButton:!0,confirmButtonText:"View Event",cancelButtonText:"Cancel"}).then(E=>{E.isConfirmed&&(document.querySelector(".nav-link#nav-calendar").click(),setTimeout(()=>{const[y,u]=h.split(" ");showDayModal(parseInt(u,10),y,i)},300))})}).catch(d=>{console.error("Error adding birthday event:",d),typeof Swal<"u"&&Swal.fire&&Swal.fire({icon:"error",title:"Oops! Could not add your birthday event."})})}),flatpickr("#birthdateInput",{altInput:!0,altFormat:"F j, Y",dateFormat:"Y-m-d",defaultDate:"today",theme:"moonveil"})},0),e}async function le(){try{const e=await fetch("/api/celtic-date");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const t=await e.json(),o=ie(parseInt(t.celtic_day,10));if(console.log("Fetched Celtic Date:",t),!t||!t.month||!t.celtic_day)throw new Error("Incomplete Celtic date data received.");const a=document.querySelector(".celtic-date");return a&&(a.innerHTML=`
            <h1 id="celtic-day">${o}</h1>
            <p><span id="celtic-month">${t.month} ${t.celtic_day}</span> / <span id="gregorian-month">${t.gregorian_date}</span></p>
        `),{celticMonth:t.month,celticDay:parseInt(t.celtic_day,10),gregorianDate:t.gregorian_date}}catch(e){return console.error("Failed to fetch Celtic date:",e),null}}async function et(){try{const e=await le();if(!e)throw new Error("No Celtic date available");const{celticMonth:t,celticDay:o}=e,a={Nivis:"Birch",Janus:"Rowan",Brigid:"Alder",Flora:"Willow",Maia:"Hawthorn",Juno:"Oak",Solis:"Holly",Terra:"Oak",Lugh:"Holly",Pomona:"Hazel",Autumna:"Vine",Eira:"Ivy",Aether:"Reed",Mirabilis:"Elder"};let n;t==="Terra"?n=o===1?"Oak":"Holly":n=a[t]||"";const l=document.querySelector(".celtic-zodiac-details");l&&(l.innerHTML=`
        <div class="zodiac-modal-trigger" data-zodiac="${n}">
          <img class="celtic-zodiac-image"
               src="/assets/images/zodiac/zodiac-${n.toLowerCase()}.png"
               alt="${n}" />
          <p>${n}</p>
        </div>
      `)}catch(e){console.error("Failed to fetch Celtic Zodiac:",e)}}async function tt(){const e=new Date().toISOString().split("T")[0];try{const t=await C.dynamicMoonPhases(e,e);if(!Array.isArray(t)||t.length===0){console.warn("No moon phase data available.");return}const o=t[0],a=document.querySelector(".moon-phase");a&&(a.innerHTML=`
                <div class="moon-phase-details">
                    <div class="moon-phase-graphic">${o.graphic}</div>
                    <p>${o.moonName||o.phase}</p>
                </div>
            `);const n=document.querySelector(".moon-poem");n&&(n.textContent=o.poem||"")}catch(t){console.error("Failed to fetch moon phase:",t)}}async function ot(){try{const e=await fetch("/api/lunar-phase-poem");if(!e.ok)throw new Error("Failed to fetch the poem.");const t=await e.json(),o=document.querySelector(".moon-poem");o&&(o.innerHTML=`
                ${t.poem}
            `)}catch(e){console.error("Error fetching the moon poem:",e)}}async function ce(){console.log("Fetching coming events...");try{const e=await le();if(!e){console.error("Could not fetch Celtic date. No upcoming events displayed.");return}const{celticMonth:t,celticDay:o,gregorianDate:a}=e;if(!a||typeof a!="string"){console.error("🚨 gregorianDate is missing or not a string!",a);return}const[n,l]=a.split(" "),s=ht(n),i=l.padStart(2,"0"),r=new Date(`2025-${s}-${i}`),c=[];for(let m=0;m<7;m++){const f=new Date(r);f.setDate(r.getDate()+m);const p=f.getFullYear(),v=String(f.getMonth()+1).padStart(2,"0"),z=String(f.getDate()).padStart(2,"0"),N=`${p}-${v}-${z}`;c.push(N)}console.log("Next 5 Gregorian Dates:",c);const[d,h,E,y,u]=await Promise.all([at(),st(t),ct(),rt(),it()]),g=[];c.forEach(m=>{console.log(`🔍 Checking festivals for date: ${m}`),d.forEach(p=>{console.log(`   🎭 Comparing with festival: ${p.title} | Date: ${p.date}`)});const f=d.find(p=>p.date===m);f?(console.log("✅ Festival match found!",f.date,"vs",m),console.log("Festival Object:",f),g.push({type:"festival",title:f.title,description:f.description||"A sacred celebration.",date:m})):console.log("❌ No festival match for",m)}),c.forEach(m=>{const f=h.find(p=>p.date===m&&p.phase==="Full Moon");if(f){const p=getNamedMoonForDate(m,2);g.push({type:"full-moon",title:p?p.name:f.moonName||"Full Moon",description:p?p.description||"A night of celestial power.":f.description||"A night of celestial power.",date:m})}});for(const m of u){console.log("🌘 Checking eclipse:",m);const f=m.date.split(" ")[0];if(c.includes(f)){const p=nt(f),v=await lt(m.type,p);g.push({type:"eclipse",title:` ${m.title}`,description:v,date:f})}}c.forEach(m=>{const f=E.find(p=>p.date===m);f&&g.push({type:"holiday",title:f.title,description:f.description||"A recognized holiday.",date:m})}),c.forEach(m=>{y.forEach(f=>{const[p,v,z]=f.date.split("-");(f.recurring?m.endsWith(`-${v}-${z}`):m===f.date)&&g.push({type:"custom-event",category:f.type,title:f.title,description:f.notes||"A personal milestone.",date:m})})});const L=B(),b=g.filter(m=>!(m.type==="holiday"&&!L.showHolidays||m.type==="full-moon"&&!L.showMoons||m.type==="eclipse"&&!L.showEclipses||m.type==="custom-event"&&!L.showCustomEvents));console.log("Final Upcoming Events Array:",g);const M=new Date,S=new Date(M.getFullYear(),M.getMonth(),M.getDate()),T=L.showPastEvents?b:b.filter(m=>{const[f,p,v]=m.date.split("-").map(Number);return new Date(f,p-1,v)>=S});console.log("Events heading to the carousel:",T),document.getElementById("coming-events-container")&&(dt(T),console.log("🌕 Upcoming events array:",T))}catch(e){console.error("Error fetching coming events:",e)}}function nt(e){const[t,o,a]=e.split("-").map(Number),n=new Date(t,o-1,a),l=n.getDate(),s=n.getMonth(),i=[{name:"Janus",start:[0,20],end:[1,16]},{name:"Brigid",start:[1,17],end:[2,16]},{name:"Flora",start:[2,17],end:[3,13]},{name:"Maia",start:[4,14],end:[5,11]},{name:"Juno",start:[5,12],end:[6,8]},{name:"Solis",start:[6,9],end:[7,6]},{name:"Terra",start:[7,7],end:[8,3]},{name:"Lugh",start:[8,4],end:[8,31]},{name:"Pomona",start:[9,1],end:[9,28]},{name:"Autumna",start:[9,29],end:[10,26]},{name:"Eira",start:[10,27],end:[11,23]},{name:"Aether",start:[11,24],end:[12,21]},{name:"Nivis",start:[12,22],end:[0,19]}];for(const r of i){const[c,d]=r.start,[h,E]=r.end,y=s>c||s===c&&l>=d,u=s<h||s===h&&l<=E;if(c<=h?y&&u:y||u)return r.name}return"Janus"}async function at(){try{const e=await fetch("/festivals");if(!e.ok)throw new Error("Failed to fetch special days");const o=(await e.json()).map(a=>({type:"festival",title:a.name,description:a.description||"A sacred celebration.",date:new Date(a.date).toISOString().split("T")[0]}));return console.log("📅 Festival data processed:",o),o}catch(e){return console.error("🚨 Error fetching festivals:",e),[]}}async function st(e){console.log(`Fetching moon phases for ${e}...`);const t={Nivis:{start:"2024-12-23",end:"2025-01-19"},Janus:{start:"2025-01-20",end:"2025-02-16"},Brigid:{start:"2025-02-17",end:"2025-03-16"},Flora:{start:"2025-03-17",end:"2025-04-13"},Maia:{start:"2025-04-14",end:"2025-05-11"},Juno:{start:"2025-05-12",end:"2025-06-08"},Solis:{start:"2025-06-09",end:"2025-07-06"},Terra:{start:"2025-07-07",end:"2025-08-03"},Lugh:{start:"2025-08-04",end:"2025-08-31"},Pomona:{start:"2025-09-01",end:"2025-09-28"},Autumna:{start:"2025-09-29",end:"2025-10-26"},Eira:{start:"2025-10-27",end:"2025-11-23"},Aether:{start:"2025-11-24",end:"2025-12-21"}};if(!t[e])return console.error("Invalid Celtic month:",e),[];const{start:o,end:a}=t[e];try{const n=await C.dynamicMoonPhases(o,a);return console.log("🌙 Moon Phases Retrieved:",n),n}catch(n){return console.error("❌ Error fetching moon phases:",n),[]}}async function it(){console.log("Fetching upcoming eclipse events...");try{const e=await fetch("/api/eclipse-events");if(!e.ok)throw new Error("Failed to fetch eclipse events");const t=await e.json();return console.log("🌘 Eclipses Retrieved:",t),t}catch(e){return console.error("Error fetching eclipses:",e),[]}}async function lt(e,t){var i;const o={lunar:{winter:["The moon hides in frost-kissed silence, dreaming deep in the veil of Eira.","In the cold hush of Nivis, her shadow passes—old spirits whisper their truths.","A silver eclipse beneath Aether’s stars reveals secrets buried in icebound hearts."],spring:["Blossoms tremble as Luna’s face fades—new beginnings stir in ancient soil.","Beneath Brigid’s breath, the moon wanes into myth, and the land leans in to listen.","A soft eclipse in Flora’s bloom—wishes bloom in the dark between stars."],summer:["The summer moon weeps petals of gold—her eclipse sings of bold transformations.","Luna dances behind Solis, her mysteries wrapped in warm twilight.","In Terra’s heat, a shadow glides across the moon—prophecies awaken in dreamers."],autumn:["Fallen leaves swirl as Luna dims—change ripples in Pomona’s golden hush.","Autumna’s wind carries the eclipse’s hush like a lullaby for sleeping gods.","The Hunter’s moon fades to shadow—memories stir, and the veil thins."]},solar:{winter:["In Aether's pale sky, Sol bows—light swallowed by ancient mystery.","A frozen sun in Eira’s grip—change brews beneath the silence.","The Cold Sun vanishes in Nivis, and time forgets to tick."],spring:["Beltaine fire dims as Sol hides his face—hearts burn with old passion reborn.","A Flora eclipse—sunlight swirled in prophecy and pollen.","The spring sun yields—seeds of magic bloom in the shadow’s path."],summer:["In Solis' blaze, the eclipse dances—a mirror of power and revelation.","The midsummer sun vanishes—truths flicker, bold and blinding.","A sun-dark hush in Terra, where gods meet in radiant stillness."],autumn:["Pomona sighs as Sol is veiled—harvest halts, and fate tiptoes in.","In Autumna’s gold, the sun turns his face—the eclipse whispers of closure.","A waning sun, wrapped in ivy dreams—Lugh listens."]}},a={winter:["Nivis","Eira","Aether"],spring:["Janus","Brigid","Flora"],summer:["Maia","Juno","Solis","Terra"],autumn:["Lugh","Pomona","Autumna"]};let n="spring";for(const[r,c]of Object.entries(a))if(c.includes(t)){n=r;break}const l=e==null?void 0:e.toLowerCase(),s=(i=o[l])==null?void 0:i[n];return s?s[Math.floor(Math.random()*s.length)]:(console.warn(`⚠️ No eclipse description found for type: "${e}", season: "${n}"`),"A rare celestial hush, undefined yet stirring...")}async function ct(){console.log("Fetching upcoming national holidays...");try{const e=await fetch("/api/national-holidays");if(!e.ok)throw new Error("Failed to fetch national holidays");return await e.json()}catch(e){return console.error("Error fetching national holidays:",e),[]}}async function rt(){console.log("Fetching custom events...");try{const e=await fetch("/api/custom-events");if(!e.ok)throw new Error("Failed to fetch custom events");const t=await e.json();return console.log("Custom events are: ",t),t}catch(e){return console.error("Error fetching custom events:",e),[]}}function dt(e){const t=document.getElementById("coming-events-carousel");if(!t){console.error("Carousel container not found!");return}if(t.innerHTML="",e.forEach((o,a)=>{const n=document.createElement("div");n.classList.add("coming-events-slide"),a===0&&n.classList.add("active");const l=Me(o);console.log("Event category:",o.category),console.log("Event type:",o.type);const s=F(o.date);n.innerHTML=`
            <h3 class="coming-events-title">${l} ${o.title}</h3>
            <p class="coming-events-date">${s}</p>
            <p class="coming-events-description">${o.description}</p>
        `,t.appendChild(n)}),!Array.isArray(e)||e.length===0){const o=document.querySelector(".coming-events-carousel-prev"),a=document.querySelector(".coming-events-carousel-next");o&&a&&(o.classList.add("hidden"),a.classList.add("hidden"));const n=["💫 The stars whisper, but no great events stir. The journey continues in quiet contemplation... 💫","✨ The wind carries no omens today, only the gentle breath of the earth. Rest in the rhythm of the moment. ✨","🔮 The threads of fate are still weaving. In the quiet, new paths may emerge... 🔮","🦉 Even in stillness, the world turns. The wise ones know that the silence holds its own kind of magic. 🦉","🔥 No great fires are lit, no grand feasts are planned, but the embers of time still glow beneath the surface. 🔥","🌟 Tonight, the universe is quiet, waiting. Perhaps the next moment holds something unseen... 🌟"],l=n[Math.floor(Math.random()*n.length)];t.innerHTML=`
            <div class="coming-events-slide active">
                <p class="mystical-message">${l}</p>
            </div>
        `;return}mt()}function mt(){const e=document.querySelectorAll(".coming-events-slide"),t=document.querySelector(".coming-events-carousel-prev"),o=document.querySelector(".coming-events-carousel-next");let a=0,n;function l(d){e.forEach((h,E)=>{h.classList.remove("active"),h.style.opacity="0",E===d&&(h.classList.add("active"),setTimeout(()=>h.style.opacity="1",300))})}function s(){a=(a+1)%e.length,l(a)}function i(){a=(a-1+e.length)%e.length,l(a)}function r(){clearInterval(n),n=setInterval(s,6e3)}function c(){clearInterval(n),setTimeout(r,8e3)}t.addEventListener("click",()=>{i(),c()}),o.addEventListener("click",()=>{s(),c()}),document.querySelector("#coming-events-carousel").addEventListener("mouseenter",c),document.querySelector("#coming-events-carousel").addEventListener("mouseleave",r),r()}function ht(e){return{January:"01",February:"02",March:"03",April:"04",May:"05",June:"06",July:"07",August:"08",September:"09",October:"10",November:"11",December:"12"}[e]||null}document.addEventListener("DOMContentLoaded",async()=>{console.log("🏡 Home screen loaded, fetching upcoming events..."),await ce()});document.addEventListener("click",e=>{if(e.target.classList.contains("close-button-home")||e.target.classList.contains("mystical-close")||e.target.id==="modal-overlay"){console.log("✨ Closing the Zodiac Modal..."),document.getElementById("home-zodiac-modal").classList.remove("show"),document.getElementById("home-zodiac-modal").classList.add("hidden"),document.body.classList.remove("modal-open");const t=document.getElementById("modal-overlay");t?(t.classList.add("hidden"),t.classList.remove("show")):console.log("🌫️ Cannot find overlay")}});document.addEventListener("click",async e=>{if(e.target.closest(".zodiac-modal-trigger")){const o=e.target.closest(".zodiac-modal-trigger").dataset.zodiac;console.log("🔮 Zodiac Trigger Clicked!",o);try{const n=await(await fetch(`/zodiac/insights/${o}`)).json();document.getElementById("home-zodiac-modal-details").innerHTML=`
          <h2 id="zodiac-name">${n.name}</h2>
          <p id="zodiac-date-range">${n.celtic_date}</p>
          <img id="zodiac-image" src="/assets/images/zodiac/zodiac-${n.name.toLowerCase()}.png" alt="${n.name}" />
          <h3 class="subheader">Three Key Traits</h3>
          <p id="zodiac-traits">${n.symbolism}</p>
          <h3 class="subheader">Associated Element</h3>
          <p id="zodiac-element">${n.element}</p>
          <h3 class="subheader">Associated Animal</h3>
          <p id="zodiac-animal">${n.animal}</p>
          <a class="home-modal-btn" href="${n.url||"#"}" target="_blank" rel="noopener noreferrer" style="${n.url?"":"display:none;"}">Learn More</a>
        `;const l=document.getElementById("home-zodiac-modal"),s=document.getElementById("modal-overlay");l.classList.remove("hidden"),l.classList.add("show"),s==null||s.classList.remove("hidden"),s==null||s.classList.add("show"),document.body.classList.add("modal-open")}catch(a){console.error("Failed to load zodiac insight:",a)}}});function ut(){return`
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
  `}function gt(){const e=document.querySelectorAll(".tab-button"),t=document.querySelectorAll(".tab-content");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(a=>a.classList.remove("active")),t.forEach(a=>a.classList.remove("active")),o.classList.add("active"),document.getElementById(o.dataset.tab).classList.add("active")})})}function ft(){const e=document.getElementById("modal-overlay"),t=document.getElementById("wheel");document.getElementById("hover-info"),document.getElementById("zodiac-name"),document.getElementById("zodiac-description"),t.offsetWidth/2;const o=document.getElementById("zodiac-modal"),a=document.querySelector(".mystical-close"),n=document.querySelectorAll(".zodiac-item");document.getElementById("modal-overlay").addEventListener("click",()=>{console.log("Click on Overlay");const l=document.getElementById("zodiac-modal");l.classList.contains("show")&&(l.classList.remove("show"),l.classList.add("hidden")),document.body.classList.add("modal-open"),document.getElementById("modal-overlay").classList.remove("show"),document.getElementById("modal-overlay").classList.add("hidden")}),n.forEach(l=>{l.addEventListener("click",()=>{const s=l.querySelector("p").textContent;console.log("Modal node ID:",document.getElementById("zodiac-modal")),pt(s)})}),a.addEventListener("click",()=>{o.classList.remove("show"),e.classList.remove("show"),e.classList.add("hidden"),document.body.classList.remove("modal-open"),o.style.transform="translate(-50%, -50%) scale(0.95)"})}async function pt(e){const t=document.getElementById("zodiac-modal"),o=document.getElementById("modal-overlay"),a=document.querySelector(".celtic-zodiac-btn");try{const n=await fetch(`/zodiac/insights/${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Zodiac sign '${e}' not found`);const l=await n.json();t.classList.remove("hidden"),o.classList.remove("hidden"),requestAnimationFrame(()=>{t.classList.add("show"),o.classList.add("show")}),setTimeout(()=>{const i=document.getElementById("zodiac-modal");i&&i.scrollIntoView({behavior:"smooth",block:"center"})},100);const s=Z(e);document.getElementById("zodiac-name").textContent=l.name,document.getElementById("zodiac-date-range").textContent=l.celtic_date,document.getElementById("zodiac-image").src=`/assets/images/zodiac/zodiac-${s}.png`,document.getElementById("zodiac-description").textContent=l.symbolism,document.getElementById("zodiac-traits").textContent=l.symbolism,document.getElementById("zodiac-element").textContent=l.element||"Element unknown",document.getElementById("zodiac-animal").textContent=l.animal,document.getElementById("zodiac-mythology").textContent=l.mythical_creature,console.log("Zodiac url is ",l.url),l.url?(a.style.display="inline-block",a.setAttribute("href",l.url),a.setAttribute("target","_blank")):a.style.display="none"}catch(n){console.error("Error loading zodiac modal:",n)}}function vt(){const e=document.querySelectorAll(".festival-slide"),t=document.querySelector(".festival-carousel-prev"),o=document.querySelector(".festival-carousel-next"),a=new Audio("/assets/sound/sparkle.wav");a.volume=.6;let n=0;function l(i){e.forEach((r,c)=>{r.classList.remove("active"),r.style.opacity=0,c===i&&(r.classList.add("active"),setTimeout(()=>r.style.opacity=1,300))})}t.addEventListener("click",()=>{document.getElementById("festivals").classList.contains("active")&&(a.currentTime=0,a.play()),n=n===0?e.length-1:n-1,l(n)}),o.addEventListener("click",()=>{document.getElementById("festivals").classList.contains("active")&&(a.currentTime=0,a.play()),n=n===e.length-1?0:n+1,l(n)});const s=document.getElementById("festival-carousel");G(s,{onSwipeLeft:()=>o.click(),onSwipeRight:()=>t.click()}),l(n)}function yt(){const e=document.querySelectorAll(".moon-slide"),t=document.querySelector(".carousel-prev"),o=document.querySelector(".carousel-next"),a=new Audio("/assets/sound/harp.wav");a.volume=.6;let n=0;function l(c){e.forEach((h,E)=>{h.classList.remove("active"),h.style.opacity=0,E===c&&(h.classList.add("active"),setTimeout(()=>h.style.opacity=1,300))});const d=c*5;document.querySelector(".moon-carousel").style.backgroundPosition=`${d}px ${d}px`}t.addEventListener("click",()=>{a.currentTime=0,a.play(),n=n===0?e.length-1:n-1,l(n)}),o.addEventListener("click",()=>{a.currentTime=0,a.play(),n=n===e.length-1?0:n+1,l(n)});const s=document.querySelector(".moon-carousel");G(s,{onSwipeLeft:()=>o.click(),onSwipeRight:()=>t.click()});function i(){const c=new Date,d=c.getDate(),h=c.getMonth();c.getFullYear();const y=[{name:"Janus",start:{month:0,day:20},end:{month:1,day:16}},{name:"Brigid",start:{month:1,day:17},end:{month:2,day:16}},{name:"Flora",start:{month:2,day:17},end:{month:3,day:13}},{name:"Maia",start:{month:4,day:14},end:{month:5,day:11}},{name:"Juno",start:{month:5,day:12},end:{month:6,day:8}},{name:"Solis",start:{month:6,day:9},end:{month:7,day:6}},{name:"Terra",start:{month:7,day:7},end:{month:8,day:3}},{name:"Lugh",start:{month:8,day:4},end:{month:8,day:31}},{name:"Pomona",start:{month:9,day:1},end:{month:9,day:28}},{name:"Autumna",start:{month:9,day:29},end:{month:10,day:26}},{name:"Eira",start:{month:10,day:27},end:{month:11,day:23}},{name:"Aether",start:{month:11,day:24},end:{month:12,day:21}},{name:"Nivis",start:{month:12,day:23},end:{month:0,day:19}}].find(({start:u,end:g})=>{const L=h>u.month||h===u.month&&d>=u.day,b=h<g.month||h===g.month&&d<=g.day;return L&&b});return y?y.name:"Janus"}function r(){const c=i(),d={Nivis:"snow-moon",Janus:"wolf-moon",Brigid:"worm-moon",Flora:"pink-moon",Juno:"flower-moon",Solis:"strawberry-moon",Terra:"thunder-moon",Lugh:"grain-moon",Pomona:"harvest-moon",Autumna:"hunters-moon",Eira:"frost-moon",Aether:"cold-moon"};console.log("This month is ",c);const h=d[c]||"snow-moon",E=[...document.querySelectorAll(".moon-slide")].findIndex(y=>y.id===h);n=E!==-1?E:0,l(n)}r()}function we(){const e=document.querySelectorAll(".zodiac-item"),t=new IntersectionObserver((o,a)=>{o.forEach(n=>{n.isIntersecting&&(n.target.classList.add("visible"),n.target.classList.remove("hidden"),a.unobserve(n.target))})},{threshold:.15});e.forEach(o=>{t.observe(o)})}document.addEventListener("DOMContentLoaded",we);function bt(){gt(),ft(),vt(),yt(),we()}function wt(){Ye()}function Et(){return`
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
  `}function Lt(){document.querySelectorAll(".accordion-header").forEach(t=>{t.addEventListener("click",()=>{console.log("FAQ Click"),t.parentElement.classList.toggle("open")})})}function St(){return`
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
                Rooted in ancient traditions, this almanac follows the rhythm of <strong>13 lunar months</strong>, 
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
                This almanac was created to reconnect us with the <strong>cosmic dance of the universe</strong>. 
                Inspired by the wisdom of the <strong>druids</strong>, the poetry of the <strong>stars</strong>, and the <strong>whispers 
                of the wind</strong>, it serves as a guide through the mystical passage of time.
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
                <a href="https://eclipsedrealities.com" target="_blank"><img src="/assets/images/decor/er-logo.png" width="175px" alt="Eclipsed Realities" class="er-logo" /></a>
                <p>
                    A collective of <strong>tech sorcerers and celestial coders</strong>, shaping digital landscapes where time bends, 
                    moon phases whisper, and history breathes again. From the <strong>rhythms of the stars</strong> to the <strong>logic of algorithms</strong>, we bridge the ethereal with the tangible.
                </p>
                <p><a href="https://eclipsedrealities.com" target="_blank">Eclipsed Realities</a></p>
            </div>

            <div class="creator">
                <h3>Playground of the Senses</h3>
                <a href="https://playgroundofthesenses.substack.com" target="_blank"><img src="/assets/images/decor/playground-logo.webp" alt="Playground of the Senses" class="playground-logo" /></a>
                <p>
                    A sanctuary where <strong>myth and magic entwine</strong>, where each moment is <strong>a spell woven in ink and sound</strong>, 
                    a place where the <strong>past and future dance as one</strong>. Words shimmer, symbols awaken, and the unseen 
                    world steps into view.
                    </p>
                    <p><a href="https://playgroundofthesenses.substack.com" target="_blank">Playground of the Senses</a></p>
            </div>
    </div>

    <p>
        Together, we have crafted something more than an almanac—<strong>a celestial compass</strong>, an <strong>invitation to wonder</strong>, 
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
    `}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".about-section, .about-creators, .about-closing"),t=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&a.target.classList.add("glow")})},{threshold:.5});e.forEach(o=>t.observe(o))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".creator"),t=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&a.target.classList.add("glow-effect")})},{threshold:.3});e.forEach(o=>t.observe(o))});function Mt(){return`
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
    `}function Ee(){document.querySelectorAll(".nav-link").forEach(t=>{t.classList.remove("active"),t.getAttribute("href")===window.location.hash&&t.classList.add("active")})}function Le(e){try{const t=e.replace("#",""),o=document.getElementById("app");switch(t){case"home":o.innerHTML=Qe(),le(),et(),tt(),ot(),ce();break;case"insights":o.innerHTML=ut(),bt();break;case"calendar":o.innerHTML=Ae(),pe();break;case"faq":o.innerHTML=Et(),Lt();break;case"settings":o.innerHTML=Ge(),wt();break;case"about":o.innerHTML=St();break;case"privacy":o.innerHTML=Mt();break;default:console.error("Page not found:",e),o.innerHTML='<p class="error-message">Oops! Page not found.</p>'}}catch(t){console.error("⚡ Router Error:",t);const o=document.getElementById("app");if(o){o.innerHTML=`
                <div class="error-screen">
                    <h1>🌑 Oops, something mystical went wrong!</h1>
                    <p>${t.message}</p>
                    <button id="retry-button" class="retry-button">🔄 Retry</button>
                </div>
            `;const a=document.getElementById("retry-button");a&&a.addEventListener("click",()=>{console.log("🔄 Retrying to load page..."),loadPage(page||"home")})}}}window.addEventListener("hashchange",Ee);window.addEventListener("load",Ee);window.addEventListener("hashchange",()=>Le(location.hash));window.addEventListener("load",()=>Le(location.hash||"#home"));const Tt=2e3,Ct=Date.now();window.addEventListener("load",()=>{const e=Date.now()-Ct,t=Math.max(0,Tt-e);setTimeout(()=>{const o=document.getElementById("preloader");o&&(o.classList.add("fade-out"),setTimeout(()=>{o.style.display="none"},800))},t)});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{console.log("🌙 ServiceWorker registered: ",e)}).catch(e=>{console.log("🛑 ServiceWorker registration failed: ",e)})});
