(function () {
  const THEME_STORAGE_KEY = "aid-theme";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (_error) {
      // Ignore storage errors (for example private browsing).
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function updateThemeToggle(theme) {
    const toggle = document.getElementById("theme-toggle");
    const icon = document.querySelector(".theme-toggle-icon");
    const label = document.querySelector(".theme-toggle-label");

    if (!toggle || !icon || !label) {
      return;
    }

    const isDark = theme === "dark";

    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    icon.textContent = isDark ? "☀" : "☾";
    label.textContent = isDark ? "Light mode" : "Dark mode";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_error) {
      // Ignore storage errors (for example private browsing).
    }

    updateThemeToggle(theme);
  }

  function initTheme() {
    setTheme(getSavedTheme());

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
      return;
    }

    toggle.addEventListener("click", () => {
      setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
