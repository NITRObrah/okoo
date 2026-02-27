// Custom site scripts - SIGHT.W Orbiting Stars Edition
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll to top
  const scrollToTop = document.createElement("button");
  scrollToTop.innerHTML = "↑";
  scrollToTop.id = "scrollTopButton";
  document.body.appendChild(scrollToTop);
  Object.assign(scrollToTop.style, {
    position: "fixed", bottom: "25px", right: "25px", padding: "10px 15px",
    background: "#4b87f7", color: "white", border: "none", borderRadius: "5px",
    cursor: "pointer", opacity: "0", transition: "opacity 0.3s ease", zIndex: "9999"
  });

  window.addEventListener("scroll", () => {
    scrollToTop.style.opacity = window.scrollY > 300 ? "1" : "0";
  });
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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

  // Fade-in effect for game cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  const games = document.querySelectorAll(".game");
  games.forEach((game) => {
    Object.assign(game.style, { opacity: "0", transform: "translateY(20px)", transition: "all 0.6s ease-out" });
    observer.observe(game);
  });

  const style = document.createElement("style");
  style.innerHTML = `.game.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // Floating title animation
  const title = document.getElementById("title");
  if (title) {
    title.animate([{ transform: "translateY(0px)" }, { transform: "translateY(-8px)" }, { transform: "translateY(0px)" }], {
      duration: 3000, iterations: Infinity, easing: "ease-in-out"
    });
  }

  // === ORBITING STARS LOADING SCREEN ===
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
      <div style="font-size: 64px; animation: bounce 1.5s infinite; color: #aa66ff; text-shadow: 0 0 20px #aa66ff;">✦</div>
      <h2 style="font-size: 32px; margin: 20px 0 10px; font-weight: 700; color: #ffffff; text-shadow: 0 0 15px #aa66ff;">SIGHT.W Games</h2>
    </div>
    <div class="stars-loader" style="position: relative; width: 200px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; box-shadow: 0 0 10px rgba(170,102,255,0.3);">
      <div class="progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #aa66ff, #ff99ff); border-radius: 2px; transition: width 0.3s ease; box-shadow: 0 0 15px #aa66ff;"></div>
    </div>
    <div style="margin-top: 20px; font-size: 14px; opacity: 0.9; color: #ddbbff;">loading sum games🤯</div>
  `;

  // Stars animations CSS
  const loaderStyle = document.createElement("style");
  loaderStyle.innerHTML = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
      40% { transform: translateY(-12px) scale(1.05); }
      60% { transform: translateY(-6px) scale(1.02); }
    }
    @keyframes orbit {
      0% { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg) scale(1); }
      33% { transform: rotate(120deg) translateX(var(--orbit-r)) rotate(-120deg) scale(1.1); }
      66% { transform: rotate(240deg) translateX(var(--orbit-r)) rotate(-240deg) scale(0.9); }
      100% { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg) scale(1); }
    }
    .orbit-star { position: absolute; color: #aa66ff; text-shadow: 0 0 8px #aa66ff; }
  `;
  document.head.appendChild(loaderStyle);

  // 20 Orbiting stars in loader
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.innerHTML = "✦";
    star.className = "orbit-star";
    star.style.cssText = `
      left: ${15 + Math.random()*70}%; top: ${20 + Math.random()*60}%;
      font-size: ${8 + Math.random()*6}px;
      animation: orbit ${2 + Math.random()*3}s linear infinite;
      animation-delay: ${Math.random()*3}s;
      --orbit-r: ${12 + Math.random()*25}px;
    `;
    loader.appendChild(star);
  }

  document.body.prepend(loader);

  // Progress bar
  const progressBar = loader.querySelector(".progress-bar");
  const progressInterval = setInterval(() => {
    loadProgress += Math.random() * 12;
    if (loadProgress > 92) loadProgress = 92;
    progressBar.style.width = loadProgress + "%";
  }, 120);

  // Hide loader
  setTimeout(() => {
    clearInterval(progressInterval);
    progressBar.style.width = "100%";
    
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✦";
    Object.assign(sparkle.style, {
      position: "absolute", top: "50%", left: "50%",
      fontSize: "30px", color: "#ff99ff",
      animation: "sparkle 0.5s ease-out",
      zIndex: "100000", transform: "translate(-50%, -50%)"
    });
    loader.appendChild(sparkle);
    
    const sparkleStyle = document.createElement("style");
    sparkleStyle.innerHTML = `@keyframes sparkle { 
      0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; } 
      50% { opacity: 1; } 
      100% { transform: translate(-50%, -50%) scale(2) rotate(180deg); opacity: 0; } 
    }`;
    document.head.appendChild(sparkleStyle);
    
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 1000);
    }, 500);
  }, 4500);

  // Background orbiting stars
  const orbitContainer = document.createElement("div");
  Object.assign(orbitContainer.style, {
    position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
    pointerEvents: "none", zIndex: "1"
  });
  orbitContainer.className = "orbit-container";
  document.body.appendChild(orbitContainer);

  for (let i = 0; i < 10; i++) {
    const star = document.createElement("div");
    star.innerHTML = "✦";
    star.className = "orbit-star";
    star.style.cssText = `
      left: ${Math.random() * 90}%; top: ${Math.random() * 90}%;
      font-size: ${6 + Math.random()*8}px;
      animation: orbit ${3 + Math.random()*3}s linear infinite;
      animation-delay: ${Math.random()*4}s;
      --orbit-r: ${15 + Math.random()*30}px;
    `;
    orbitContainer.appendChild(star);
  }
});
