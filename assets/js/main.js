let isPlaying = false
const currentSong = null

// User menu toggle
function toggleUserMenu() {
  const dropdown = document.getElementById("userDropdown")
  dropdown.classList.toggle("show")
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const userMenu = document.querySelector(".user-menu")
  const dropdown = document.getElementById("userDropdown")

  if (!userMenu.contains(event.target)) {
    dropdown.classList.remove("show")
  }
})

// Play/Pause function
function togglePlayPause() {
  const playPauseIcon = document.getElementById("playPauseIcon")

  if (isPlaying) {
    playPauseIcon.className = "fas fa-play"
    isPlaying = false
    console.log("Music paused")
  } else {
    playPauseIcon.className = "fas fa-pause"
    isPlaying = true
    console.log("Music playing")
  }
}

// Play track function
function playTrack(trackId) {
  console.log(`Playing track: ${trackId}`)

  const playPauseIcon = document.getElementById("playPauseIcon")
  playPauseIcon.className = "fas fa-pause"
  isPlaying = true
}

// Open playlist function
function openPlaylist(playlistId) {
  console.log(`Opening playlist: ${playlistId}`)
  showNotification(`Opening playlist: ${playlistId.replace("-", " ")}`)
}

// Volume control
document.addEventListener("DOMContentLoaded", () => {
  const volumeBar = document.querySelector(".volume-bar")
  const volumeFill = document.querySelector(".volume-fill")

  if (volumeBar) {
    volumeBar.addEventListener("click", (e) => {
      const rect = volumeBar.getBoundingClientRect()
      const percent = ((e.clientX - rect.left) / rect.width) * 100
      volumeFill.style.width = percent + "%"
      console.log(`Volume set to: ${Math.round(percent)}%`)
    })
  }

  // Progress bar control
  const progressContainer = document.querySelector(".progress-container")
  const progressFill = document.querySelector(".progress-fill")

  if (progressContainer) {
    progressContainer.addEventListener("click", (e) => {
      const rect = progressContainer.getBoundingClientRect()
      const percent = ((e.clientX - rect.left) / rect.width) * 100
      progressFill.style.width = percent + "%"
      console.log(`Progress set to: ${Math.round(percent)}%`)
    })
  }
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.target.matches("input, textarea")) {
    e.preventDefault()
    togglePlayPause()
  }
  if (e.code === "ArrowUp") {
    e.preventDefault()
    adjustVolume(5)
  }
  if (e.code === "ArrowDown") {
    e.preventDefault()
    adjustVolume(-5)
  }
})

function adjustVolume(change) {
  const volumeFill = document.querySelector(".volume-fill")
  const currentWidth = Number.parseFloat(volumeFill.style.width) || 70
  const newWidth = Math.max(0, Math.min(100, currentWidth + change))
  volumeFill.style.width = newWidth + "%"
  console.log(`Volume adjusted to: ${Math.round(newWidth)}%`)
}

// Playback Speed
let currentSpeed = 1.0
const speedControlEnabled = true

function toggleSpeedDropdown() {
  if (!speedControlEnabled) {
    showNotification("Enable playback speed control in settings first")
    return
  }

  const dropdown = document.getElementById("speedDropdown")
  if (dropdown) {
    dropdown.classList.toggle("show")
    console.log("Speed dropdown toggled:", dropdown.classList.contains("show"))
  } else {
    console.log("Speed dropdown element not found")
  }
}

function setPlaybackSpeed(speed) {
  const speedBtn = document.getElementById("speedBtn")
  const speedOptions = document.querySelectorAll(".speed-option")
  const dropdown = document.getElementById("speedDropdown")

  // Remove active class from all options
  speedOptions.forEach((option) => option.classList.remove("active"))

  // Add active class to clicked option
  if (event && event.target) {
    event.target.classList.add("active")
  }

  // Update button with icon and speed
  if (speedBtn) {
    speedBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i><span>${speed}x</span>`
  }

  // Hide dropdown
  if (dropdown) {
    dropdown.classList.remove("show")
  }

  currentSpeed = speed

  console.log(`Playback speed changed to: ${speed}x`)
  showNotification(`Playback speed: ${speed}x (applies to current song only)`)
}

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  const speedControl = document.querySelector(".speed-control")
  const speedDropdown = document.getElementById("speedDropdown")

  if (speedDropdown && speedControl && !speedControl.contains(event.target)) {
    speedDropdown.classList.remove("show")
  }
})

// Playlist Savers
const mockSavers = [
  { id: 1, name: "Sarah", username: "sarah_j", avatar: "../img/user.jpg", playlists: 12 },
  { id: 2, name: "Mike", username: "mike_c", avatar: "../img/user.jpg", playlists: 8 },
  { id: 3, name: "Emma", username: "emma_w", avatar: "../img/user.jpg", playlists: 15 },
  { id: 4, name: "Alex", username: "alex_b", avatar: "../img/user.jpg", playlists: 6 },
  { id: 5, name: "Lisa", username: "lisa_g", avatar: "../img/user.jpg", playlists: 11 },
  { id: 6, name: "David", username: "david_k", avatar: "../img/user.jpg", playlists: 4 },
  { id: 7, name: "Jessica", username: "jess_l", avatar: "../img/user.jpg", playlists: 9 },
  { id: 8, name: "Ryan", username: "ryan_t", avatar: "../img/user.jpg", playlists: 7 },
]

function showPlaylistSavers() {
  const modal = document.getElementById("saversModal")
  const saversList = document.getElementById("saversList")

  if (!modal || !saversList) {
    console.log("Savers modal not found on this page")
    return
  }

  saversList.innerHTML = mockSavers
    .map(
      (saver) => `
    <div class="saver-item" onclick="openUserProfile('${saver.username}')">
      <img src="${saver.avatar}" alt="${saver.name}" class="saver-avatar">
      <div class="saver-info">
        <h4>${saver.name}</h4>
        <p>Profile • ${saver.playlists} Public Playlists</p>
      </div>
    </div>
  `,
    )
    .join("")

  modal.classList.add("show")

  console.log("Showing playlist savers")
}

function closePlaylistSavers() {
  const modal = document.getElementById("saversModal")
  if (modal) {
    modal.classList.remove("show")
  }
}

function openUserProfile(username) {
  console.log(`Opening user profile: ${username}`)
  showNotification(`Opening profile: ${username}`)
  closePlaylistSavers()
}

document.addEventListener("click", (event) => {
  const modal = document.getElementById("saversModal")
  const modalContent = document.querySelector(".modal-content")

  if (modal && modal.classList.contains("show") && !modalContent.contains(event.target)) {
    closePlaylistSavers()
  }
})

// Load theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("spotifyTheme") || "default"
  if (savedTheme !== "default") {
    document.documentElement.setAttribute("data-theme", savedTheme)

    const themeColors = {
      default: {
        primary: "#1db954",
        primaryDark: "#12ed5e",
        gradient: "linear-gradient(180deg, #121212 0%, #121212 50%)",
      },
      pink: {
        primary: "#d14b7c",
        primaryDark: "#eb397a",
        gradient: "linear-gradient(180deg, #4a1c3a 0%, #121212 50%)",
      },
      blue: {
        primary: "#4060b1",
        primaryDark: "#526eb5",
        gradient: "linear-gradient(180deg, #1e3264 0%, #121212 50%)",
      },
      green: {
        primary: "#1db997",
        primaryDark: "#15d2a9",
        gradient: "linear-gradient(180deg,rgb(16, 105, 93) 0%, #121212 50%)",
      },
      purple: {
        primary: "#8b5cf6",
        primaryDark: "#a78bfa",
        gradient: "linear-gradient(180deg,#4c1d95 0%, #121212 50%)",
      },
      orange: {
        primary: "#f97316",
        primaryDark: "#fb923c",
        gradient: "linear-gradient(180deg,rgb(110, 62, 7) 0%, #121212 50%)",
      },
    }

    const colors = themeColors[savedTheme]
    if (colors) {
      const root = document.documentElement
      root.style.setProperty("--primary-color", colors.primary)
      root.style.setProperty("--primary-dark", colors.primaryDark)
      root.style.setProperty("--background-gradient", colors.gradient)

      const mainContent = document.querySelector(".main-content")
      if (mainContent) {
        mainContent.style.background = colors.gradient
      }
    }
  }
})

// Add showNotification function if it doesn't exist
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  const currentTheme = localStorage.getItem("spotifyTheme") || "default"
  const textColor = currentTheme === "default" ? "black" : "white"

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
    }, 300)
  }, 3000)
}
