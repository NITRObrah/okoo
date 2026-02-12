// Custom site enhancements

document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll to top button
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "Top";
  scrollBtn.id = "scrollTop";
  scrollBtn.style.cssText = `
    position: fixed; bottom: 25px; right: 25px; padding: 10px 15px;
    background: #4b87f7; color: white; border: none; border-radius: 5px;
    cursor: pointer; opacity: 0; transition: opacity 0.3s; z-index: 9999;
    font-size: 14px;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", () => {
    scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
  });

  scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Game card fade-in animation
  const games = document.querySelectorAll(".game");
  games.forEach((game, index) => {
    game.style.opacity = "0";
    game.style.transform = "translateY(20px)";
    game.style.transition = "all 0.6s ease";
    
    setTimeout(() => {
      game.style.opacity = "1";
      game.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Page load effect
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: black; display: flex; justify-content: center; align-items: center;
    color: white; font-size: 20px; z-index: 99999;
  `;
  loader.textContent = "Loading games...";
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s";
    setTimeout(() => loader.remove(), 500);
  }, 1500);

});

// Background gradient code (for your CSS):
// In your CSS :root section, use this:
--[[
--background-color: linear-gradient(135deg, #000000 0%, #333333 50%, #555555 100%);
body { background: var(--background-color); }
--]]
