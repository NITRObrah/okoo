// COOL SNOW LOADING SCREEN (starts on page load)
let loadProgress = 0;
const loader = document.createElement("div");
loader.id = "snowLoader";
loader.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #000000, #111111, #222222);
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  color: #4b87f7; font-family: ubuntu; z-index: 99999;
  text-align: center; transition: opacity 1s ease;
`;

loader.innerHTML = `
  <div style="margin-bottom: 30px;">
    <i class="fas fa-gamepad" style="font-size: 64px; animation: bounce 1.5s infinite; color: #4b87f7;"></i>
    <h2 style="font-size: 32px; margin: 20px 0 10px; font-weight: 700;">Games Hub</h2>
  </div>
  <div class="snow-loader" style="position: relative; width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
    <div class="progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #4b87f7, #ffffff); border-radius: 2px; transition: width 0.3s ease;"></div>
  </div>
  <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">❄️ Loading winter games... ❄️</div>
`;

// Add animations
const style = document.createElement("style");
style.innerHTML = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  @keyframes snowfall-loader {
    0% { transform: translateY(-100%) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
  .snow-loader-flake {
    position: absolute; color: #4b87f7; font-size: 16px;
    animation: snowfall-loader 3s linear infinite;
  }
`;
document.head.appendChild(style);

// Add floating snowflakes to loader
for (let i = 0; i < 15; i++) {
  const flake = document.createElement("i");
  flake.className = "fas fa-snowflake snow-loader-flake";
  flake.style.left = Math.random() * 100 + "%";
  flake.style.animationDelay = Math.random() * 3 + "s";
  flake.style.animationDuration = (3 + Math.random() * 2) + "s";
  loader.appendChild(flake);
}

document.body.appendChild(loader);

// Animated progress bar
const progressBar = loader.querySelector(".progress-bar");
const progressInterval = setInterval(() => {
  loadProgress += Math.random() * 15;
  if (loadProgress > 95) loadProgress = 95;
  progressBar.style.width = loadProgress + "%";
}, 150);

// Hide loader after 4 seconds
setTimeout(() => {
  clearInterval(progressInterval);
  progressBar.style.width = "100%";
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.remove();
  }, 1000);
}, 4000);
