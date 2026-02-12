// Site configuration
var sitename = "SiteGames"; 
var subtext = "Play. Explore. Level Up.";
var logoUrl = "https://cdn.discordapp.com/attachments/1466784080916910279/1471179193772675162/Screenshot_20260211-1120012.png?ex=698dfde4&is=698cac64&hm=27b6c612e971a2702ebaf155d7588759e7f57617c2c1bdd384462f24197ec189";

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

// Logo display
const logoContainer = document.createElement("div");
logoContainer.id = "logo";
logoContainer.style.cssText = "text-align: center; margin-bottom: 20px;";
const logoImg = document.createElement("img");
logoImg.src = logoUrl;
logoImg.alt = "SiteGames Logo";
logoImg.style.cssText = "max-width: 120px; height: auto; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);";
logoContainer.appendChild(logoImg);

const titleElement = document.getElementById("title");
if (titleElement && titleElement.parentNode) {
  titleElement.parentNode.insertBefore(logoContainer, titleElement);
}


