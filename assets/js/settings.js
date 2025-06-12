let currentTheme = "default"
let currentSettingsSection = "display"

// Show settings section
function showSettingsSection(section) {
  const navBtns = document.querySelectorAll(".settings-nav-btn")
  const sections = document.querySelectorAll(".settings-section")

  // Update active nav button
  navBtns.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Show corresponding section
  sections.forEach((section) => section.classList.remove("active"))

  const targetSection = document.getElementById(section + "Section")
  if (targetSection) {
    targetSection.classList.add("active")
  }

  currentSettingsSection = section
  console.log(`Switched to ${section} settings`)
}

function selectTheme(theme) {
  const themeOptions = document.querySelectorAll(".theme-option")

  themeOptions.forEach((option) => option.classList.remove("active"))
  document.querySelector(`[data-theme="${theme}"]`).classList.add("active")

  document.documentElement.setAttribute("data-theme", theme)

  const root = document.documentElement
  const themeColors = {
    default: {
      primary: "#1db954",
      primaryDark: "#ffffff",
      gradient: "linear-gradient(180deg, #000000 0%, #121212 50%)",
    },
    pink: { primary: "#d14b7c", primaryDark: "#eb397a", gradient: "linear-gradient(180deg, #4a1c3a 0%, #121212 50%)" },
    blue: { primary: "#4060b1", primaryDark: "#526eb5", gradient: "linear-gradient(180deg, #1e3264 0%, #121212 50%)" },
    green: {
      primary: "#1db997",
      primaryDark: "#12ed5e",
      gradient: "linear-gradient(180deg,rgb(16, 105, 93)  0%, #121212 50%)",
    },
    purple: {
      primary: "#8b5cf6",
      primaryDark: "#a78bfa",
      gradient: "linear-gradient(180deg,rgb(62, 23, 119) 0%, #121212 50%)",
    },
    orange: {
      primary: "#f97316",
      primaryDark: "#fb923c",
      gradient: "linear-gradient(180deg,rgb(110, 62, 7) 0%, #121212 50%)",
    },
  }

  const colors = themeColors[theme]
  root.style.setProperty("--primary-color", colors.primary)
  root.style.setProperty("--primary-dark", colors.primaryDark)
  root.style.setProperty("--background-gradient", colors.gradient)

  // Update main content background
  const mainContent = document.querySelector(".main-content")
  if (mainContent) {
    mainContent.style.background = colors.gradient
  }

  currentTheme = theme

  // Save theme preference
  localStorage.setItem("spotifyTheme", theme)
  showNotification(`Theme changed to ${theme}`)
  console.log(`Theme changed to: ${theme}`)

}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("spotifyTheme") || "default"
  selectTheme(savedTheme)
}

// Range slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const rangeSliders = document.querySelectorAll(".range-slider")

  rangeSliders.forEach((slider) => {
    const valueDisplay = slider.parentElement.querySelector(".range-value")

    slider.addEventListener("input", function () {
      const value = this.value
      if (valueDisplay) {
        valueDisplay.textContent = value + "s"
      }
      console.log(`Crossfade set to: ${value}s`)
    })
  })

  // Toggle switches
  const toggles = document.querySelectorAll(".toggle-switch input")

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const settingName = this.closest(".setting-item").querySelector("h4").textContent
      console.log(`${settingName}: ${this.checked ? "enabled" : "disabled"}`)

      if (this.id === "speedControlToggle") {
        toggleSpeedControl(this.checked)
      }

      if (this.id === "showSaversToggle") {
        toggleSaversVisibility(this.checked)
      }
    })
  })

  // Load saved theme
  loadSavedTheme()
})

// Toggle speed control visibility
function toggleSpeedControl(enabled) {
  const speedControls = document.querySelectorAll(".speed-control")

  speedControls.forEach((control) => {
    control.style.display = enabled ? "flex" : "none"
  })

  showNotification(`Playback speed control ${enabled ? "enabled" : "disabled"}`)
}

// Toggle savers visibility
function toggleSaversVisibility(enabled) {
  const likesCountElements = document.querySelectorAll(".likes-count")

  likesCountElements.forEach((element) => {
    element.style.display = enabled ? "flex" : "none"
  })

}

// Export theme for other pages
function getCurrentTheme() {
  return currentTheme
}

// Show notification function
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  const currentTheme = localStorage.getItem("spotifyTheme") || "default"

  const textColor = (currentTheme === "default") ? "black" : "white"

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary-color, #1db954);
    color: ${textColor};
    padding: 12px 20px;
    border-radius: 4px;
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 100)
  }, 1000)
}
