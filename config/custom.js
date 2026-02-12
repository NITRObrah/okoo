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
  darkModeToggle.textContent = "🌓";
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

  // Loading effect for games
  window.addEventListener("load", () => {
    const loader = document.createElement("div");
    loader.id = "pageLoader";
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.background = "black";
    loader.style.display = "flex";
    loader.style.justifyContent = "center";
    loader.style.alignItems = "center";
    loader.style.color = "white";
    loader.style.fontSize = "24px";
    loader.style.zIndex = "99999";
    loader.innerHTML = "Loading Games...";
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.6s ease";
      setTimeout(() => loader.remove(), 600);
    }, 1200);
  });
});

