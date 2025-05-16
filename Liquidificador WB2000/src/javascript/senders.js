function sendHeight() {
  let height = document.body.scrollHeight - 2
  window.parent.postMessage({ frameHeight: height }, '*')
}

// Send the height when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', sendHeight)

// Update the height at an interval
setInterval(sendHeight, 500)

// Optionally, update the height when the window is resized
window.addEventListener('resize', sendHeight)
