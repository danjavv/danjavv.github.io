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
}

// Toggle between light and dark mode
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark-mode');

  // Save preference to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  updateToggleButton();
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

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
