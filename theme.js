(function () {
  const THEME_STORAGE_KEY = "aid-theme";

  const themes = {
    dark: {
      colorScheme: "dark",
      bodyBackground:
        "radial-gradient(circle at 12% 5%, #1c2b56 0%, #0b1020 40%, #060a16 100%)",
      showGlow: true,
      vars: {
        "--bg": "#0b1020",
        "--bg-gradient-1": "#1c2b56",
        "--bg-gradient-2": "#060a16",
        "--glow-1": "rgba(104, 130, 240, 0.25)",
        "--glow-2": "rgba(88, 212, 197, 0.12)",
        "--panel": "rgba(17, 26, 50, 0.68)",
        "--panel-border": "rgba(255, 255, 255, 0.14)",
        "--surface": "rgba(5, 8, 17, 0.52)",
        "--surface-strong": "rgba(5, 9, 19, 0.58)",
        "--surface-card": "rgba(5, 8, 15, 0.65)",
        "--text": "#e8edff",
        "--text-soft": "#dce6ff",
        "--text-muted": "#a7b1d6",
        "--text-subtle": "#b8c5ef",
        "--label": "#ccd8ff",
        "--placeholder": "#9ba7cf",
        "--footer": "#b2bde2",
        "--accent": "#74a3ff",
        "--accent-border": "rgba(116, 163, 255, 0.45)",
        "--accent-bg": "rgba(17, 26, 50, 0.55)",
        "--tab-bg": "rgba(9, 14, 29, 0.76)",
        "--tab-border": "rgba(255, 255, 255, 0.16)",
        "--tab-active-bg":
          "linear-gradient(to right, rgba(46, 86, 180, 0.65), rgba(33, 55, 107, 0.65))",
        "--input-border": "rgba(255, 255, 255, 0.2)",
        "--card-border": "rgba(255, 255, 255, 0.12)",
        "--empty-border": "rgba(255, 255, 255, 0.22)",
        "--shadow": "0 10px 35px rgba(0, 0, 0, 0.32)",
        "--toggle-bg": "rgba(17, 26, 50, 0.72)",
        "--toggle-border": "rgba(255, 255, 255, 0.18)",
      },
    },
    light: {
      colorScheme: "light",
      bodyBackground: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      showGlow: false,
      vars: {
        "--bg": "#ffffff",
        "--bg-gradient-1": "#f8fafc",
        "--bg-gradient-2": "#ffffff",
        "--glow-1": "rgba(37, 99, 235, 0.08)",
        "--glow-2": "rgba(16, 185, 129, 0.06)",
        "--panel": "#ffffff",
        "--panel-border": "rgba(15, 23, 42, 0.1)",
        "--surface": "#ffffff",
        "--surface-strong": "#f8fafc",
        "--surface-card": "#ffffff",
        "--text": "#0f172a",
        "--text-soft": "#1e293b",
        "--text-muted": "#64748b",
        "--text-subtle": "#475569",
        "--label": "#334155",
        "--placeholder": "#94a3b8",
        "--footer": "#64748b",
        "--accent": "#2563eb",
        "--accent-border": "rgba(37, 99, 235, 0.28)",
        "--accent-bg": "#eff6ff",
        "--tab-bg": "#ffffff",
        "--tab-border": "rgba(15, 23, 42, 0.12)",
        "--tab-active-bg":
          "linear-gradient(to right, rgba(37, 99, 235, 0.12), rgba(59, 130, 246, 0.08))",
        "--input-border": "rgba(15, 23, 42, 0.14)",
        "--card-border": "rgba(15, 23, 42, 0.08)",
        "--empty-border": "rgba(15, 23, 42, 0.16)",
        "--shadow": "0 8px 24px rgba(15, 23, 42, 0.06)",
        "--toggle-bg": "#ffffff",
        "--toggle-border": "rgba(15, 23, 42, 0.12)",
      },
    },
  };

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

  function applyThemeVariables(theme) {
    const config = themes[theme];
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    root.classList.toggle("theme-light", theme === "light");
    root.classList.toggle("theme-dark", theme === "dark");
    root.style.colorScheme = config.colorScheme;

    Object.entries(config.vars).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    if (document.body) {
      document.body.style.background = config.bodyBackground;
      document.body.style.color = config.vars["--text"];
    }

    const glow = document.querySelector(".background-glow");
    if (glow) {
      glow.style.display = config.showGlow ? "block" : "none";
    }
  }

  function setTheme(theme) {
    applyThemeVariables(theme);
    updateThemeToggle(theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_error) {
      // Ignore storage errors (for example private browsing).
    }
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

  window.__applyAidTheme = applyThemeVariables;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
