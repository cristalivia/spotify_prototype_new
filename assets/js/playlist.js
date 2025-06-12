const playlistTracks = []
const playlistData = {
  title: "My Playlist #1",
  description: "",
  cover: null,
}

// Add song to playlist
function addSongToPlaylist(songId) {
  const songs = {
    "shape-of-you": {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      duration: "3:53",
      image: "/placeholder.svg?height=40&width=40",
    },
    "blinding-lights": {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      image: "/placeholder.svg?height=40&width=40",
    },
    "watermelon-sugar": {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      duration: "2:54",
      image: "/placeholder.svg?height=40&width=40",
    },
    levitating: {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      image: "/placeholder.svg?height=40&width=40",
    },
    "good-4-u": {
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      image: "/placeholder.svg?height=40&width=40",
    },
  }

  const song = songs[songId]
  if (song && !playlistTracks.find((track) => track.id === songId)) {
    playlistTracks.push({
      id: songId,
      ...song,
      dateAdded: new Date().toLocaleDateString(),
    })

    updatePlaylistUI()
    showNotification(`Added "${song.title}" to playlist`)
  }
}

// Update playlist UI
function updatePlaylistUI() {
  const songCount = document.getElementById("songCount")
  const playlistTracksSection = document.getElementById("playlistTracks")
  const tracksList = document.getElementById("tracksList")

  // Update song count
  songCount.textContent = `${playlistTracks.length} song${playlistTracks.length !== 1 ? "s" : ""}`

  // Show tracks section if there are tracks
  if (playlistTracks.length > 0) {
    playlistTracksSection.style.display = "block"

    // Populate tracks list
    tracksList.innerHTML = playlistTracks
      .map(
        (track, index) => `
            <div class="track-item">
                <div class="track-number">${index + 1}</div>
                <div class="track-info">
                    <img src="${track.image}" alt="${track.title}">
                    <div class="track-details">
                        <h6>${track.title}</h6>
                        <p>${track.artist}</p>
                    </div>
                </div>
                <div class="track-album">${track.album}</div>
                <div class="track-date">${track.dateAdded}</div>
                <div class="track-duration">${track.duration}</div>
            </div>
        `,
      )
      .join("")
  } else {
    playlistTracksSection.style.display = "none"
  }
}


// Options
function showMoreOptions() {
  const options = ["Edit details", "Delete playlist", "Add to profile", "Share", "Download"]
  showNotification("More options: " + options.join(", "))
}

// Handle playlist title and description changes
document.addEventListener("DOMContentLoaded", () => {
  const playlistTitle = document.getElementById("playlistTitle")
  const playlistDescription = document.getElementById("playlistDescription")

  if (playlistTitle) {
    playlistTitle.addEventListener("input", function () {
      playlistData.title = this.value
    })
  }

  if (playlistDescription) {
    playlistDescription.addEventListener("input", function () {
      playlistData.description = this.value
    })
  }

  // Handle cover image upload
  const coverInput = document.getElementById("coverInput")
  if (coverInput) {
    coverInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const coverPlaceholder = document.getElementById("coverPlaceholder")
          coverPlaceholder.style.backgroundImage = `url(${e.target.result})`
          coverPlaceholder.style.backgroundSize = "cover"
          coverPlaceholder.style.backgroundPosition = "center"
          coverPlaceholder.innerHTML = ""

          playlistData.cover = e.target.result
          showNotification("Playlist cover updated")
        }
        reader.readAsDataURL(file)
      }
    })
  }
})

