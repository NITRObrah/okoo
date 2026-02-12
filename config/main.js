// Chrome OS Style Bottom Status Bar - GREY THEME ONLY
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
    backdrop-filter: blur(10px);
  `;
  
  // Left: Animated Digital Clock
  const clockDiv = document.createElement("div");
  clockDiv.id = "chromeClock";
  clockDiv.style.cssText = `
    background: rgba(64, 64, 64, 0.6); padding: 4px 12px; 
    border-radius: 6px; border: 1px solid rgba(160, 160, 160, 0.5);
    text-shadow: 0 0 10px rgba(200, 200, 200, 0.6);
  `;
  clockDiv.textContent = "--:--:--";
  
  // Right: Battery
  const batteryDiv = document.createElement("div");
  batteryDiv.id = "chromeBattery";
  batteryDiv.style.cssText = `display: flex; align-items: center; gap: 8px;`;
  
  const batteryIcon = document.createElement("div");
  batteryIcon.id = "batteryIcon";
  batteryIcon.style.cssText = `
    width: 22px; height: 12px; border: 2px solid #a0a0a0; 
    border-radius: 4px; position: relative; background: #151515;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
  `;
  
  const batteryFill = document.createElement("div");
  batteryFill.id = "batteryFill";
  batteryFill.style.cssText = `
    position: absolute; top: 2px; left: 2px; bottom: 2px; right: 2px;
    border-radius: 2px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(45deg, #c0c0c0, #a0a0a0);
    box-shadow: 0 0 8px rgba(160, 160, 160, 0.6);
  `;
  
  const batteryText = document.createElement("span");
  batteryText.id = "batteryText";
  batteryText.style.cssText = `font-weight: 700; color: #d0d0d0;`;
  batteryText.textContent = "100%";
  
  batteryIcon.appendChild(batteryFill);
  batteryDiv.appendChild(batteryIcon);
  batteryDiv.appendChild(batteryText);
  
  statusBar.appendChild(clockDiv);
  statusBar.appendChild(batteryDiv);
  document.body.appendChild(statusBar);
  
  // Cool animated clock update
  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
    clockDiv.textContent = timeString;
    
    // Grey glow pulse effect
    clockDiv.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(200, 200, 200, 0.8)`;
    setTimeout(() => {
      clockDiv.style.boxShadow = `0 0 8px rgba(160, 160, 160, 0.5)`;
    }, 200);
  }
  
  updateClock();
  setInterval(updateClock, 1000);
  
  // Battery API with grey colors
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      function updateBattery() {
        const level = Math.round(battery.level * 100);
        batteryFill.style.width = (level > 100 ? 100 : level) + "%";
        batteryText.textContent = level + "%";
        
        if (level < 20) {
          batteryFill.style.background = "linear-gradient(45deg, #ff4444, #ff6666)";
          batteryFill.style.boxShadow = "0 0 10px rgba(255, 68, 68, 0.8)";
        } else if (level < 50) {
          batteryFill.style.background = "linear-gradient(45deg, #ffaa00, #ffcc44)";
          batteryFill.style.boxShadow = "0 0 10px rgba(255, 170, 0, 0.8)";
        } else {
          batteryFill.style.background = "linear-gradient(45deg, #c0c0c0, #a0a0a0)";
          batteryFill.style.boxShadow = "0 0 8px rgba(160, 160, 160, 0.6)";
        }
      }
      updateBattery();
      battery.addEventListener('levelchange', updateBattery);
    });
  } else {
    batteryFill.style.width = "87%";
  }
  
  // Add padding to body content
  document.body.style.paddingBottom = "40px";
}

// Replace the old function call with this grey version
createChromeOSStatusBar();




