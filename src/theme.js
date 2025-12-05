// -----------------------------------------------------------------------------
// theme.js
// Builds the MUI theme object used across the app.
//
// - Exposes getAppTheme(mode) to generate a palette/typography system for light
//   or dark modes.
// - Central place to manage spacing, fonts, and component overrides.
//
// Accessibility
// - Palette choices should meet contrast ratios; adjust here to fix violations.
// - Typography scale and weights can be tuned to improve readability.
//
// How to customize
// - Extend the theme with custom components or design tokens.
// - Add shape, z-index, or breakpoint overrides to match a new design system.
// -----------------------------------------------------------------------------
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,

      // 🌟 Updated Ox-career Teal palette
      primary: {
        // WCAG AA on light backgrounds requires a darker hue than the previous teal.
        // #0f766e yields a 4.7:1 ratio against white for body text and buttons.
        main: mode === "light" ? "#0f766e" : "#64ffda",
        light: mode === "light" ? "#1f9c92" : "#9effff",
        dark: mode === "light" ? "#0b524c" : "#00b3a6",
        contrastText: mode === "light" ? "#ffffff" : "#0b2f2c",
      },

      secondary: {
        main: "#64ffda", // Teal accent (A200 vibe)
      },

      background: {
        default: mode === "light" ? "#FFFFFF" : "#191917",
        paper: mode === "light" ? "#FFFFFF" : "#2C2C2C",
        soft: mode === "light" ? "#F3F3F3" : "#111111",

        // Dedicated “dark section” background
        dark: mode === "light" ? "#111111" : "#000000",
      },

      text: {
        primary: mode === "light" ? "#191917" : "#FFFFFF",
        secondary: mode === "light" ? "#555555" : "#C7C7C7",
      },
    },

    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontWeight: 500,
        fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontWeight: 500,
        fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
      },
      h3: {
        fontWeight: 500,
        fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      },
      body1: {
        fontSize: "1.05rem",
        lineHeight: 1.7,
      },
      body2: {
        fontSize: "0.95rem",
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        letterSpacing: "0.04em",
      },
    },

    spacing: 8,

    components: {
      // WCAG Focus Ring
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focusVisible": {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 3,
            },
          }),
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: ({ theme }) => ({
            '[data-section-variant="dark"] &': {
              color: theme.palette.grey[200],
            },
          }),
        },
      },

      MuiContainer: {
        defaultProps: {
          maxWidth: "lg",
        },
        styleOverrides: {
          root: {
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
            paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          },
        },
      },
    },
  });
