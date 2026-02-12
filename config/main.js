// Site configuration
var sitename = "Sight.w"; 
var subtext = "desktop-bypasser is da goat.";

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

// GREY Chrome OS Bottom Status Bar (ADDED ONLY)
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
    background: rgba(64, 64, 64, 0.6); padding: 4px 12px; 
    border-radius: 6px; border: 1px solid rgba(160, 160, 160, 0.5);
  `;
  clockDiv.textContent = "--:--:--";
  
  const batteryDiv = document.createElement("div");
  batteryDiv.id = "chromeBattery";
  batteryDiv.style.cssText = `display: flex; align-items: center; gap: 8px;`;
  
  const batteryIcon = document.createElement("div");
  batteryIcon.id = "batteryIcon";
  batteryIcon.style.cssText = `
    width: 22px; height: 12px; border: 2px solid #a0a0a0; 
    border-radius: 4px; position: relative; background: #151515;
  `;
  
  const batteryFill = document.createElement("div");
  batteryFill.id = "batteryFill";
  batteryFill.style.cssText = `
    position: absolute; top: 2px; left: 2px; bottom: 2px; right: 2px;
    border-radius: 2px; transition: all 0.4s ease; background: #c0c0c0;
  `;
  
  const batteryText = document.createElement("span");
  batteryText.id = "batteryText";
  batteryText.textContent = "87%";
  
  batteryIcon.appendChild(batteryFill);
  batteryDiv.appendChild(batteryIcon);
  batteryDiv.appendChild(batteryText);
  
  statusBar.appendChild(clockDiv);
  statusBar.appendChild(batteryDiv);
  document.body.appendChild(statusBar);
  
  function updateClock() {
    clockDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  document.body.style.paddingBottom = "40px";
}

createChromeOSStatusBar();





