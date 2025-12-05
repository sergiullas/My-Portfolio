// -----------------------------------------------------------------------------
// main.jsx
// Application entry point that mounts the React app.
//
// - Decides the initial color mode (saved preference → system preference → light)
//   and keeps it in state; persists updates to localStorage.
// - Creates the MUI theme via getAppTheme(mode) and provides it through ThemeProvider,
//   alongside CssBaseline and BrowserRouter for routing.
// - Passes `mode` and `setMode` into <App> so all pages can toggle themes.
//
// Accessibility
// - Router + Theme providers live here to keep the tree consistent for focus/scroll
//   management and predictable color contrast across the app.
// - Ensure the root element in index.html has a `lang` attribute and logical title,
//   since this is the hydration point.
//
// How to customize
// - Add global providers (analytics, i18n, feature flags) around <App>.
// - Swap BrowserRouter for a different router or hydration entry when needed.
// - Extend getInitialMode to support more schemes (high-contrast, sepia).
// -----------------------------------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { getAppTheme } from "./theme.js";
// if you already had: import "./index.css"; you can keep it

// Decide the initial theme mode:
// 1) use saved preference if present
// 2) else use system preference
// 3) else default to "light"
function getInitialMode() {
  if (typeof window === "undefined") return "light";

  // Saved preference
  const stored = window.localStorage.getItem("theme-mode");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  // System preference
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function Root() {
  // controls the light/dark theme
  const [mode, setMode] = React.useState(getInitialMode);

  // build the theme once per mode change
  const appTheme = React.useMemo(() => getAppTheme(mode), [mode]);

  // keep user preference in localStorage
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <App mode={mode} setMode={setMode} />
        {/* 👆 We pass theme state DOWN to App */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

export default Root;
