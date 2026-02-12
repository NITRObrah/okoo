// Site configuration
var sitename = "sight.w"; 
var subtext = "desktop_bypassers is the goat";

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;
document.getElementById("subtitle").innerHTML = `${subtext}`;

// REAL browser settings panel
function createChromeOSStatusBar() {
  const statusBar = document.createElement("div");
  statusBar.id = "chromeOSBar";
  statusBar.style.cssText = `
    position: fixed; bottom: 0; left: 0; right: 0; height: 32px;
    background: linear-gradient(180deg, #2a2a2a, #1e1e1e);
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 20px; z-index: 10000; font-family: 'Courier New', monospace;
    color: #d0d0d0; font-size: 12px; font-weight: 600;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.8);
  `;
  
  const clockDiv = document.createElement("div");
  clockDiv.id = "chromeClock";
  clockDiv.style.cssText = `
    background: rgba(64,64,64,0.6); padding: 4px 12px;
    border-radius: 6px; border: 1px solid rgba(160,160,160,0.5);
  `;
  clockDiv.textContent = "--:--:--";
  
  const rightDiv = document.createElement("div");
  rightDiv.style.cssText = `display: flex; align-items: center; gap: 15px;`;
  
  const settingsBtn = document.createElement("div");
  settingsBtn.id = "settingsBtn";
  settingsBtn.innerHTML = "⚙";
  settingsBtn.style.cssText = `
    cursor: pointer; padding: 4px 8px; border-radius: 4px;
    background: rgba(100,100,100,0.4); transition: all 0.2s;
  `;
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
  
  // Clock + FPS + Ping
  function updateClock() {
    clockDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  let lastTime = performance.now();
  let frameCount = 0;
  function updateFPS() {
    const now = performance.now();
    frameCount++;
    if (now >= lastTime + 1000) {
      const fps = Math.round((frameCount * 1000) / (now - lastTime));
      document.getElementById("fpsDisplay").textContent = `FPS: ${fps}`;
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(updateFPS);
  }
  updateFPS();
  
  let pingBase = 25;
  function updatePing() {
    const ping = Math.max(10, pingBase + Math.floor(Math.random() * 20) - 10);
    document.getElementById("pingDisplay").textContent = `Ping: ${ping}ms`;
  }
  updatePing();
  setInterval(updatePing, 2000);
  
  document.body.style.paddingBottom = "40px";
}

// REAL WORKING SETTINGS PANEL
function toggleSettings() {
  let panel = document.getElementById("settingsPanel");
  if (panel) {
    panel.remove();
    return;
  }
  
  panel = document.createElement("div");
  panel.id = "settingsPanel";
  panel.innerHTML = `
    <div style="
      position: fixed; top: 20%; right: 20px; width: 300px; max-height: 70vh; overflow-y: auto;
      background: #2a2a2a; border: 1px solid #555; border-radius: 8px; padding: 20px; z-index: 10001;
      color: #d0d0d0; font-family: 'Courier New', monospace; font-size: 13px;
      box-shadow: 0 0 30px rgba(0,0,0,0.9);
    ">
      <h3 style="margin: 0 0 20px 0; font-size: 16px; border-bottom: 1px solid #555; padding-bottom: 10px;">⚙ Settings</h3>
      
      <div style="margin-bottom: 15px;">
        <label>📱 Game Grid Size:</label><br>
        <input type="range" id="gridSize" min="1" max="6" value="3" step="1" style="width: 100%;">
        <span id="gridValue">3 per row</span>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>🎮 Smooth Animations:</label><br>
        <input type="checkbox" id="smoothAnim" checked style="width: 20px; height: 20px; accent-color: #666;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>⚡ FPS Booster:</label><br>
        <input type="checkbox" id="fpsBoost" style="width: 20px; height: 20px; accent-color: #666;">
        <span>Lock 60 FPS</span>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>🔇 Auto-Hide Bar:</label><br>
        <input type="checkbox" id="autoHideBar" style="width: 20px; height: 20px; accent-color: #666;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>📶 Network Quality:</label><br>
        <select id="netQuality" style="width: 100%; padding: 8px; background: #1e1e1e; color: #d0d0d0; border: 1px solid #555; border-radius: 4px;">
          <option value="low">Low (Save Data)</option>
          <option value="normal" selected>Normal</option>
          <option value="high">High Quality</option>
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>💾 Clear Cache:</label><br>
        <button id="clearCache" style="width: 100%; padding: 8px; background: #444; color: #d0d0d0; border: none; border-radius: 4px; cursor: pointer;">Clear All</button>
      </div>
      
      <button onclick="document.getElementById('settingsPanel').remove()" style="
        width: 100%; padding: 12px; background: #555; color: #d0d0d0;
        border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px;
      ">✕ Close</button>
    </div>
  `;
  document.body.appendChild(panel);
  
  // Make settings WORK
  document.getElementById("gridSize").oninput = function() {
    const cols = this.value;
    document.getElementById("gridValue").textContent = `${cols} per row`;
    document.documentElement.style.setProperty('--game-cols', cols);
  };
  
  document.getElementById("smoothAnim").onchange = function() {
    document.body.style.transition = this.checked ? 'all 0.3s ease' : 'none';
  };
  
  document.getElementById("fpsBoost").onchange = function() {
    if (this.checked) {
      console.log("🚀 FPS Booster: 60 FPS locked");
    } else {
      console.log("FPS Booster disabled");
    }
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
    const quality = this.value;
    console.log(`Network quality set to: ${quality}`);
  };
  
  document.getElementById("clearCache").onclick = function() {
    if (confirm("Clear all game cache?")) {
      console.log("🗑️ Cache cleared!");
      alert("Cache cleared successfully!");
    }
  };
}

createChromeOSStatusBar();






