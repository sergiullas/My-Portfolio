// -----------------------------------------------------------------------------
// components/LayoutShell.jsx
// Shared layout wrapper for pages.
//
// - Provides persistent header, main container, and optional footer/skip link.
// - Accepts children content plus props like `mode`/`setMode` for header controls.
// - Manages spacing and max-width so sections stay consistent.
//
// Accessibility
// - Includes skip-to-content patterns and logical landmark structure.
// - Ensures header remains keyboard-accessible and non-obtrusive when sticky.
//
// How to customize
// - Swap header/footer components or adjust max-width/padding tokens.
// - Add global banners (e.g., hiring notices) without touching page components.
// -----------------------------------------------------------------------------
// Wraps the app with HeaderNameVisibilityProvider + Header + <main>.

import * as React from "react";
import { Box, Link as MuiLink } from "@mui/material";
import Header from "./Header.jsx";
import { HeaderNameVisibilityProvider } from "../context/HeaderNameContext.jsx";

export default function LayoutShell({ mode, setMode, children }) {
  return (
    <HeaderNameVisibilityProvider>
      {/* Skip link for keyboard users */}
      <MuiLink
        href="#main"
        sx={(t) => ({
          position: "fixed",
          left: t.spacing(2),
          top: t.spacing(2),
          zIndex: t.zIndex.tooltip + 1,
          transform: "translateY(-200%)",
          "&:focus-visible": {
            transform: "translateY(0)",
            backgroundColor: t.palette.background.paper,
            padding: t.spacing(0.5, 1.5),
            borderRadius: 999,
            boxShadow: t.shadows[2],
          },
        })}
      >
        Skip to main content
      </MuiLink>

      <Header mode={mode} setMode={setMode} />

      <Box
        component="main"
        id="main"
        sx={{
          pt: { xs: 4, sm: 2 }, // pushes content below fixed header
        }}
      >
        {children}
      </Box>
    </HeaderNameVisibilityProvider>
  );
}
