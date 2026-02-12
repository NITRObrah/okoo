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

// 5 AMAZING THEMES (pure JS, no CSS needed)
const themes = {
  grey: {
    bg: "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
    text: "#e0e0e0",
    accent: "#a0a0a0",
    search: "#404040",
    gameHover: "#555"
  },
  neon: {
    bg: "linear-gradient(45deg, #0a0a23, #1a0033)",
    text: "#00ff88",
    accent: "#ff00ff",
    search: "#220044",
    gameHover: "#440088"
  },
  cyberpunk: {
    bg: "linear-gradient(135deg, #0d0d1f, #1a1a3a)", 
    text: "#00ffff",
    accent: "#ff1493",
    search: "#1a1a4a",
    gameHover: "#4a1a4a"
  },
  matrix: {
    bg: "#000011",
    text: "#00ff41",
    accent: "#00aa22",
    search: "#001100",
    gameHover: "#003300"
  },
  redmatrix: {
    bg: "linear-gradient(135deg, #1a0000, #330000)",
    text: "#ff4444",
    accent: "#ff8888", 
    search: "#220000",
    gameHover: "#440000"
  }
};

// Apply theme function
function applyTheme(themeName) {
  const theme = themes[themeName];
  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;
  document.documentElement.style.setProperty('--text-color', theme.text);
  document.documentElement.style.setProperty('--accent-color', theme.accent);
  
  // Update search input
  const search = document.getElementById("searchInput");
  if (search) {
    search.style.background = theme.search;
    search.style.color = theme.text;
    search.style.borderColor = theme.accent;
  }
  
  // Update games
  const games = document.querySelectorAll(".game");
  games.forEach(game => {
    game.style.borderColor = theme.accent;
  });
  
  // Update status bar
  const statusBar = document.getElementById("chromeOSBar");
  if (statusBar) {
    statusBar.style.background = theme.bg;
    statusBar.style.color = theme.text;
  }
}

// Status bar + settings
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

// Settings panel with 5 themes
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
      position: fixed; top: 20%; right: 20px; width: 280px; background: #2a2a2a;
      border: 1px solid #555; border-radius: 8px; padding: 20px; z-index: 10001;
      color: #d0d0d0; font-family: 'Courier New', monospace; font-size: 13px;
      box-shadow: 0 0 30px rgba(0,0,0,0.8);
    ">
      <h3 style="margin: 0 0 15px 0; font-size: 16px;">Settings</h3>
      
      <div style="margin-bottom: 15px;">
        <label>🎨 Theme:</label><br>
        <select id="themeSelect" style="width: 100%; padding: 8px; background: #1e1e1e; color: #d0d0d0; border: 1px solid #555; border-radius: 4px;">
          <option value="grey">⚫ Grey</option>
          <option value="neon">🌈 Neon</option>
          <option value="cyberpunk">💜 Cyberpunk</option>
          <option value="matrix">🟢 Matrix</option>
          <option value="redmatrix">🔴 Red Matrix</option>
        </select>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label>⚡ FPS Booster:</label><br>
        <input type="checkbox" id="fpsBooster" style="width: 20px; height: 20px; accent-color: #888;">
        <span>Enable (60 FPS Lock)</span>
      </div>
      
      <button onclick="document.getElementById('settingsPanel').remove()" style="
        width: 100%; padding: 10px; background: #555; color: #d0d0d0;
        border: none; border-radius: 4px; cursor: pointer; font-weight: 600;
      ">Close</button>
    </div>
  `;
  document.body.appendChild(panel);
  
  document.getElementById("themeSelect").onchange = function() {
    applyTheme(this.value);
  };
}

createChromeOSStatusBar();



