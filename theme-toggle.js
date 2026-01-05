// Theme Toggle Functionality

// Initialize theme on page load
function initTheme() {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Use saved theme, or fall back to system preference, or default to light
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');

  if (theme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }

  updateToggleButton();
  updateProfilePicture();
}

// Toggle between light and dark mode
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark-mode');

  // Save preference to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  updateToggleButton();
  updateProfilePicture();
}

// Update the toggle button icon
function updateToggleButton() {
  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    toggleButton.innerHTML = isDarkMode ? '☀️' : '🌙';
    toggleButton.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Update the profile picture based on theme
function updateProfilePicture() {
  const profilePic = document.getElementById('profile-pic');
  const profileLink = document.getElementById('profile-link');
  if (profilePic && profileLink) {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    const imagePath = isDarkMode ? 'images/profilepic2.png' : 'images/profilepic.jpg';

    // Only animate if the image source is different
    if (profilePic.src !== new URL(imagePath, window.location.href).href) {
      // Preload the new image
      const newImage = new Image();
      newImage.src = imagePath;

      // Once the new image is loaded, do the transition
      newImage.onload = () => {
        // Fade out
        profilePic.style.opacity = '0';

        // Wait for fade out transition, then change image and fade in
        setTimeout(() => {
          profilePic.src = imagePath;
          profileLink.href = imagePath;

          // Fade in
          setTimeout(() => {
            profilePic.style.opacity = '1';
          }, 10); // Small delay to ensure the new image is rendered
        }, 200); // Match the CSS transition duration
      };
    }
  }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
