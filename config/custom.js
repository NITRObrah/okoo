// Custom site scripts
document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll to top
  const scrollToTop = document.createElement("button");
  scrollToTop.innerHTML = "↑";
  scrollToTop.id = "scrollTopButton";
  document.body.appendChild(scrollToTop);

  scrollToTop.style.position = "fixed";
  scrollToTop.style.bottom = "25px";
  scrollToTop.style.right = "25px";
  scrollToTop.style.padding = "10px 15px";
  scrollToTop.style.background = "#4b87f7";
  scrollToTop.style.color = "white";
  scrollToTop.style.border = "none";
  scrollToTop.style.borderRadius = "5px";
  scrollToTop.style.cursor = "pointer";
  scrollToTop.style.opacity = "0";
  scrollToTop.style.transition = "opacity 0.3s ease";
  scrollToTop.style.zIndex = "9999";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTop.style.opacity = "1";
    } else {
      scrollToTop.style.opacity = "0";
    }
  });

  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Dark mode toggle
  const darkModeToggle = document.createElement("button");
  darkModeToggle.textContent = "🤓";
  darkModeToggle.id = "darkModeToggle";
  darkModeToggle.style.position = "fixed";
  darkModeToggle.style.top = "20px";
  darkModeToggle.style.right = "25px";
  darkModeToggle.style.padding = "8px 12px";
  darkModeToggle.style.background = "#333";
  darkModeToggle.style.color = "white";
  darkModeToggle.style.border = "none";
  darkModeToggle.style.borderRadius = "5px";
  darkModeToggle.style.cursor = "pointer";
  darkModeToggle.style.zIndex = "10000";
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

  // Fade-in effect for game cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  const games = document.querySelectorAll(".game");
  games.forEach((game) => {
    game.style.opacity = "0";
    game.style.transform = "translateY(20px)";
    game.style.transition = "all 0.6s ease-out";
    observer.observe(game);
  });

  // Add visible class for smooth animation
  const style = document.createElement("style");
  style.innerHTML = `
    .game.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Floating title animation
  const title = document.getElementById("title");
  if (title) {
    title.animate([
      { transform: "translateY(0px)" },
      { transform: "translateY(-8px)" },
      { transform: "translateY(0px)" }
    ], {
      duration: 3000,
      iterations: Infinity,
      easing: "ease-in-out"
    });
  }

  // === PURPLE SNOW LOADING SCREEN ===
  let loadProgress = 0;
  const loader = document.createElement("div");
  loader.id = "snowLoader";
  loader.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #1a0033, #330066, #440088);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    color: #aa66ff; font-family: ubuntu; z-index: 99999;
    text-align: center; transition: opacity 1s ease;
  `;

  loader.innerHTML = `
    <div style="margin-bottom: 30px;">
      <i class="fas fa-gamepad" style="font-size: 64px; animation: bounce 1.5s infinite; color: #aa66ff; text-shadow: 0 0 20px #aa66ff;"></i>
      <h2 style="font-size: 32px; margin: 20px 0 10px; font-weight: 700; color: #ffffff; text-shadow: 0 0 15px #aa66ff;">SIGHT.W Games</h2>
    </div>
    <div class="snow-loader" style="position: relative; width: 200px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; box-shadow: 0 0 10px rgba(170,102,255,0.3);">
      <div class="progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #aa66ff, #ff99ff); border-radius: 2px; transition: width 0.3s ease; box-shadow: 0 0 15px #aa66ff;"></div>
    </div>
    <div style="margin-top: 20px; font-size: 14px; opacity: 0.9; color: #ddbbff;">loading sum games🤯</div>
  `;

  // Purple animations
  const loaderStyle = document.createElement("style");
  loaderStyle.innerHTML = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
      40% { transform: translateY(-12px) scale(1.05); }
      60% { transform: translateY(-6px) scale(1.02); }
    }
    @keyframes snowfall-loader {
      0% { transform: translateY(-120%) rotate(0deg); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
    }
    .snow-loader-flake {
      position: absolute; color: #aa66ff; font-size: 14px;
      text-shadow: 0 0 8px #aa66ff;
      animation: snowfall-loader 4s linear infinite;
    }
  `;
  document.head.appendChild(loaderStyle);

  // 20 Purple snowflakes
  for (let i = 0; i < 20; i++) {
    const flake = document.createElement("i");
    flake.className = "fas fa-snowflake snow-loader-flake";
    flake.style.left = (Math.random() * 90 + 5) + "%";
    flake.style.animationDelay = (Math.random() * 4) + "s";
    flake.style.animationDuration = (3 + Math.random() * 3) + "s";
    loader.appendChild(flake);
  }

  document.body.prepend(loader);

  // Progress bar animation
  const progressBar = loader.querySelector(".progress-bar");
  const progressInterval = setInterval(() => {
    loadProgress += Math.random() * 12;
    if (loadProgress > 92) loadProgress = 92;
    progressBar.style.width = loadProgress + "%";
  }, 120);

  // Hide loader with sparkle
  setTimeout(() => {
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    
    const sparkle = document.createElement("i");
    sparkle.className = "fas fa-star";
    sparkle.style.cssText = `
      position: absolute; top: 50%; left: 50%; 
      font-size: 30px; color: #ff99ff; 
      animation: sparkle 0.5s ease-out; 
      z-index: 100000; transform: translate(-50%, -50%);
    `;
    loader.appendChild(sparkle);
    
    const sparkleStyle = document.createElement("style");
    sparkleStyle.innerHTML = `
      @keyframes sparkle { 
        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; } 
        50% { opacity: 1; } 
        100% { transform: translate(-50%, -50%) scale(2) rotate(180deg); opacity: 0; } 
    `;
    document.head.appendChild(sparkleStyle);
    
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 1000);
    }, 500);
  }, 4500);
});
