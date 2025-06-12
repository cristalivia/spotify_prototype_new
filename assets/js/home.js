// Quick pick interactions
document.addEventListener("DOMContentLoaded", () => {
  const quickPickItems = document.querySelectorAll(".quick-pick-item")

  quickPickItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Music card interactions
  const musicCards = document.querySelectorAll(".music-card")

  musicCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})


document.addEventListener("DOMContentLoaded", updateGreeting)


