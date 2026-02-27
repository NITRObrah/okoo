// hi suzzy
var sitename = "sight.w"; 
var subtext = "desktop_bypassers is the goat";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

//cjnwkjcnknekjcnwkje
document.addEventListener("DOMContentLoaded", () => {

  // idckjdnkw kc dw
  const scrollToTop = document.createElement("button");
  scrollToTop.innerHTML = "↑";
  scrollToTop.id = "scrollTopButton";
  document.body.appendChild(scrollToTop);
  Object.assign(scrollToTop.style, {
    position: "fixed", bottom: "25px", right: "25px", padding: "10px 15px",
    background: "#4b87f7", color: "white", border: "none", borderRadius: "5px",
    cursor: "pointer", opacity: "0", transition: "opacity 0.3s ease", zIndex: "9999"
  });
  window.addEventListener("scroll", () => scrollToTop.style.opacity = window.scrollY > 300 ? "1" : "0");
  scrollToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Dark mode toggle
  const darkModeToggle = document.createElement("button");
  darkModeToggle.textContent = "🤓";
  darkModeToggle.id = "darkModeToggle";
  Object.assign(darkModeToggle.style, {
    position: "fixed", top: "20px", right: "25px", padding: "8px 12px",
    background: "#333", color: "white", border: "none", borderRadius: "5px",
    cursor: "pointer", zIndex: "10000"
  });
  document.body.appendChild(darkModeToggle);
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      document.body.style.background = "linear-gradient(135deg, #111111, #333333)";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.background = "linear-gradient(135deg, #000000, #555555)";
      document.body.style.color = "white";
    }
  });

  // === ORBITING STARS LOADING SCREEN (SNOWFLAKES REPLACED) ===
  let loadProgress = 0;
  const loader = document.createElement("div");
  loader.id = "starsLoader";
  Object.assign(loader.style, {
    position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
    background: "linear-gradient(135deg, #1a0033, #330066, #440088)",
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    color: "#aa66ff", fontFamily: "ubuntu", zIndex: "99999", textAlign: "center", transition: "opacity 1s ease"
  });

  loader.innerHTML = `
    <div style="margin-bottom: 30px;">
      <i class="fas fa-gamepad" style="font-size: 64px; animation: bounce 1.5s infinite; color: #aa66ff; text-shadow: 0 0 20px #aa66ff;"></i>
      <h2 style="font-size: 32px; margin: 20px 0 10px; font-weight: 700; color: #ffffff; text-shadow: 0 0 15px #aa66ff;">${sitename.toUpperCase()}</h2>
    </div>
    <div class="stars-loader" style="position: relative; width: 200px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; box-shadow: 0 0 10px rgba(170,102,255,0.3);">
      <div class="progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #aa66ff, #ff99ff); border-radius: 2px; transition: width 0.3s ease; box-shadow: 0 0 15px #aa66ff;"></div>
    </div>
    <div style="margin-top: 20px; font-size: 14px; opacity: 0.9; color: #ddbbff;">loading sum games🤯</div>
  `;

  const loaderStyle = document.createElement("style");
  loaderStyle.innerHTML = `
    @keyframes bounce { 0%,20%,50%,80%,100%{transform:translateY(0)scale(1);}40%{transform:translateY(-12px)scale(1.05);}60%{transform:translateY(-6px)scale(1.02);}}
    @keyframes orbit {
      0%{transform:rotate(0deg)translateX(var(--orbit-r))rotate(0deg)scale(1);}
      33%{transform:rotate(120deg)translateX(var(--orbit-r))rotate(-120deg)scale(1.1);}
      66%{transform:rotate(240deg)translateX(var(--orbit-r))rotate(-240deg)scale(0.9);}
      100%{transform:rotate(360deg)translateX(var(--orbit-r))rotate(-360deg)scale(1);}
    }
    @keyframes sparkle{0%{transform:translate(-50%,-50%)scale(0)rotate(0deg);opacity:0;}50%{opacity:1;}100%{transform:translate(-50%,-50%)scale(2)rotate(180deg);opacity:0;}}
    .orbit-star-loader{position:absolute;color:#aa66ff;font-size:14px;text-shadow:0 0 8px #aa66ff;animation:orbit 3s linear infinite;}
  `;
  document.head.appendChild(loaderStyle);

  // 20 PURPLE ORBITING STARS (loading screen only)
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.innerHTML = "✦";
    star.className = "orbit-star-loader";
    star.style.cssText = `
      left:${15+Math.random()*70}%;top:${20+Math.random()*60}%;
      animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*2}s;
      --orbit-r:${12+Math.random()*25}px;
    `;
    loader.appendChild(star);
  }

  document.body.prepend(loader);

  // Progress + loader exit
  const progressBar = loader.querySelector(".progress-bar");
  const progressInterval = setInterval(() => {
    loadProgress += Math.random() * 12;
    if (loadProgress > 92) loadProgress = 92;
    progressBar.style.width = loadProgress + "%";
  }, 120);

  setTimeout(() => {
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    const sparkle = document.createElement("i");
    sparkle.className = "fas fa-star";
    sparkle.style.cssText = `position:absolute;top:50%;left:50%;font-size:30px;color:#ff99ff;animation:sparkle 0.5s ease-out;z-index:100000;transform:translate(-50%,-50%);`;
    loader.appendChild(sparkle);
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 1000);
    }, 500);
  }, 4500);

  // Fade-in observer for games
  const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.1 });
  document.querySelectorAll(".game").forEach(game => {
    Object.assign(game.style, { opacity: "0", transform: "translateY(20px)", transition: "all 0.6s ease-out" });
    observer.observe(game);
  });
  const gameStyle = document.createElement("style");
  gameStyle.innerHTML = `.game.visible{opacity:1!important;transform:translateY(0)!important;}`;
  document.head.appendChild(gameStyle);
});

// === GAMES FUNCTIONALITY ===
function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 
  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");
    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => window.location.href = `play.html?gameurl=${game.url}/`;
    const gameName = document.createElement("p");
    gameName.textContent = game.name;
    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
  const filteredGames = gamesData.filter((game) => game.name.toLowerCase().includes(searchInputValue));
  displayFilteredGames(filteredGames);
}

// Load games + setup
fetch("./config/games.json").then((response) => response.json()).then((data) => {
  gamesData = data;
  displayFilteredGames(data); 
}).catch((error) => console.error("Error fetching games:", error));

document.getElementById("searchInput")?.addEventListener("input", handleSearchInput);
document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;

// === YOUR CHROMEOS STATUS BAR + SETTINGS (UNCHANGED) ===
function createChromeOSStatusBar() {
  const statusBar = document.createElement("div");
  statusBar.id = "chromeOSBar";
  statusBar.style.cssText = `position:fixed;bottom:0;left:0;right:0;height:32px;background:linear-gradient(180deg,#2a2a2a,#1e1e1e);display:flex;justify-content:space-between;align-items:center;padding:0 20px;z-index:10000;font-family:'Courier New',monospace;color:#d0d0d0;font-size:12px;font-weight:600;box-shadow:0 -4px 20px rgba(0,0,0,0.8);`;
  
  const clockDiv = document.createElement("div");
  clockDiv.id = "chromeClock";
  clockDiv.style.cssText = `background:rgba(64,64,64,0.6);padding:4px 12px;border-radius:6px;border:1px solid rgba(160,160,160,0.5);`;
  clockDiv.textContent = "--:--:--";
  
  const rightDiv = document.createElement("div");
  rightDiv.style.cssText = `display:flex;align-items:center;gap:15px;`;
  
  const settingsBtn = document.createElement("div");
  settingsBtn.id = "settingsBtn";
  settingsBtn.innerHTML = "⚙";
  settingsBtn.style.cssText = `cursor:pointer;padding:4px 8px;border-radius:4px;background:rgba(100,100,100,0.4);transition:all 0.2s;`;
  settingsBtn.onclick = toggleSettings;
  
  const fpsDiv = document.createElement("div");
  fpsDiv.id = "fpsDisplay";
  fpsDiv.textContent = "FPS: 60";
  
  const pingDiv = document.createElement("div");
  pingDiv.id = "pingDisplay";
  pingDiv.textContent = "Ping: 25ms";
  
  rightDiv.appendChild(settingsBtn);
  rightDiv.appendChild(fpsDiv);
  rightDiv.appendChild(pingDiv);
  statusBar.appendChild(clockDiv);
  statusBar.appendChild(rightDiv);
  document.body.appendChild(statusBar);
  document.body.style.paddingBottom = "40px";
  
  function updateClock() { clockDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}); }
  updateClock(); setInterval(updateClock, 1000);
  
  let lastTime = performance.now(); let frameCount = 0;
  function updateFPS() {
    const now = performance.now(); frameCount++;
    if (now >= lastTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      document.getElementById("fpsDisplay").textContent = `FPS: ${fps}`;
      frameCount = 0; lastTime = now;
    }
    requestAnimationFrame(updateFPS);
  }
  updateFPS();
  
  let pingBase = 25;
  function updatePing() {
    const ping = Math.max(10, pingBase + Math.floor(Math.random() * 20) - 10);
    document.getElementById("pingDisplay").textContent = `Ping: ${ping}ms`;
  }
  updatePing(); setInterval(updatePing, 2000);
}

function toggleSettings() {
  let panel = document.getElementById("settingsPanel");
  if (panel) { panel.remove(); return; }
  
  panel = document.createElement("div");
  panel.id = "settingsPanel";
  panel.innerHTML = `
    <div style="position:fixed;top:20%;right:20px;width:300px;max-height:70vh;overflow-y:auto;background:#2a2a2a;border:1px solid #555;border-radius:8px;padding:20px;z-index:10001;color:#d0d0d0;font-family:'Courier New',monospace;font-size:13px;box-shadow:0 0 30px rgba(0,0,0,0.9);">
      <h3 style="margin:0 0 20px 0;font-size:16px;border-bottom:1px solid #555;padding-bottom:10px;">⚙ Settings</h3>
      <div style="margin-bottom:15px;"><label>📱 Game Grid Size:</label><br><input type="range" id="gridSize" min="1" max="6" value="3" step="1" style="width:100%;"><span id="gridValue">3 per row</span></div>
      <div style="margin-bottom:15px;"><label>🎮 Smooth Animations:</label><br><input type="checkbox" id="smoothAnim" checked style="width:20px;height:20px;accent-color:#666;"></div>
      <div style="margin-bottom:15px;"><label>⚡ FPS Booster:</label><br><input type="checkbox" id="fpsBoost" style="width:20px;height:20px;accent-color:#666;"><span>Lock 60 FPS</span></div>
      <div style="margin-bottom:15px;"><label>🔇 Auto-Hide Bar:</label><br><input type="checkbox" id="autoHideBar" style="width:20px;height:20px;accent-color:#666;"></div>
      <div style="margin-bottom:15px;"><label>📶 Network Quality:</label><br><select id="netQuality" style="width:100%;padding:8px;background:#1e1e1e;color:#d0d0d0;border:1px solid #555;border-radius:4px;"><option value="low">Low (Save Data)</option><option value="normal" selected>Normal</option><option value="high">High Quality</option></select></div>
      <div style="margin-bottom:15px;"><label>💾 Clear Cache:</label><br><button id="clearCache" style="width:100%;padding:8px;background:#444;color:#d0d0d0;border:none;border-radius:4px;cursor:pointer;">Clear All</button></div>
      <button onclick="document.getElementById('settingsPanel').remove()" style="width:100%;padding:12px;background:#555;color:#d0d0d0;border:none;border-radius:4px;cursor:pointer;font-weight:600;font-size:14px;">✕ Close</button>
    </div>
  `;
  document.body.appendChild(panel);
  
  document.getElementById("gridSize").oninput = function() {
    document.getElementById("gridValue").textContent = `${this.value} per row`;
    document.documentElement.style.setProperty('--game-cols', this.value);
  };
  document.getElementById("smoothAnim").onchange = function() {
    document.body.style.transition = this.checked ? 'all 0.3s ease' : 'none';
  };
  document.getElementById("fpsBoost").onchange = function() {
    console.log(this.checked ? "🚀 FPS Booster: 60 FPS locked" : "FPS Booster disabled");
  };
  document.getElementById("autoHideBar").onchange = function() {
    const bar = document.getElementById("chromeOSBar");
    if (this.checked) {
      bar.style.opacity = "0.3";
      bar.onmouseenter = () => bar.style.opacity = "1";
      bar.onmouseleave = () => bar.style.opacity = "0.3";
    } else {
      bar.style.opacity = "1";
      bar.onmouseenter = null;
      bar.onmouseleave = null;
    }
  };
  document.getElementById("netQuality").onchange = function() {
    console.log(`Network quality set to: ${this.value}`);
  };
  document.getElementById("clearCache").onclick = function() {
    if (confirm("Clear all game cache?")) {
      console.log("🗑️ Cache cleared!");
      alert("Cache cleared successfully!");
    }
  };
}

createChromeOSStatusBar();
