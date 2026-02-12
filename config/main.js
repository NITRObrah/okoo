// Site configuration
var sitename = "SiteGames"; 
var subtext = "Play. Explore. Level Up.";

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

// PC Status Bar (Time + Battery)
function createPCStatusBar() {
  const statusBar = document.createElement("div");
  statusBar.id = "pcStatusBar";
  statusBar.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; height: 35px; 
    background: linear-gradient(90deg, #2d1b69, #4a2c7a); 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 0 15px; z-index: 10000; font-family: 'Courier New', monospace;
    color: #e0d7ff; font-size: 13px; box-shadow: 0 2px 10px rgba(45,27,105,0.5);
  `;
  
  // Time
  const timeDiv = document.createElement("div");
  timeDiv.id = "pcTime";
  timeDiv.textContent = new Date().toLocaleTimeString();
  
  // Battery
  const batteryDiv = document.createElement("div");
  batteryDiv.id = "pcBattery";
  batteryDiv.style.display = "flex";
  batteryDiv.style.alignItems = "center";
  batteryDiv.style.gap = "5px";
  
  const batteryIcon = document.createElement("div");
  batteryIcon.id = "batteryIcon";
  batteryIcon.style.cssText = `
    width: 18px; height: 12px; border: 2px solid #b8a6ff; 
    border-radius: 3px; position: relative; background: #1a0f3d;
  `;
  
  const batteryFill = document.createElement("div");
  batteryFill.id = "batteryFill";
  batteryFill.style.cssText = `
    height: 100%; border-radius: 1px; transition: all 0.3s ease;
    background: linear-gradient(180deg, #9f7fff, #6b4eff);
  `;
  
  const batteryText = document.createElement("span");
  batteryText.id = "batteryText";
  batteryText.textContent = "100%";
  
  batteryIcon.appendChild(batteryFill);
  batteryDiv.appendChild(batteryIcon);
  batteryDiv.appendChild(batteryText);
  statusBar.appendChild(timeDiv);
  statusBar.appendChild(batteryDiv);
  document.body.prepend(statusBar);
  
  // Update time every second
  setInterval(() => {
    document.getElementById("pcTime").textContent = new Date().toLocaleTimeString();
  }, 1000);
  
  // Update battery (fallback to 85% if API not supported)
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      function updateBattery() {
        const level = Math.round(battery.level * 100);
        const fill = document.getElementById("batteryFill");
        const text = document.getElementById("batteryText");
        
        fill.style.width = level + "%";
        text.textContent = level + "%";
        
        if (level < 20) {
          fill.style.background = "#ff4d4d";
        } else if (level < 50) {
          fill.style.background = "#ffaa00";
        } else {
          fill.style.background = "linear-gradient(180deg, #9f7fff, #6b4eff)";
        }
      }
      updateBattery();
      battery.addEventListener('levelchange', updateBattery);
    });
  } else {
    document.getElementById("batteryFill").style.width = "85%";
  }
}

createPCStatusBar();



