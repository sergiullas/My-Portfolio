// -----------------------------------------------------------------------------
// components/resume/ResumeSectionNav.jsx
// Side or top navigation for jumping between resume sections.
//
// - Receives list of sections and active section id; highlights the active link.
// - Uses click/scroll handlers passed from parent to manage navigation state.
//
// Accessibility
// - Uses nav + list semantics; links are keyboard focusable with visible outlines.
// - Consider moving focus to target section headings when clicking nav items.
//
// How to customize
// - Add tooltips, icons, or progress indicators to nav items.
// - Support vertical/horizontal layouts based on available space.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Box, Stack } from "@mui/material";

export default function ResumeSectionNav({
  items,
  activeSection,
  onNavClick,
}) {
  return (
    <Box
      component="nav"
      aria-label="Resume sections"
      sx={(t) => ({
        display: { xs: "none", sm: "block" },
        position: { xs: "static", md: "sticky" },
        top: { md: 88 },
        zIndex: 1,
        mt: 3,
        mb: 3,

        // pill container
        borderRadius: 999,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor:
          t.palette.mode === "light"
            ? t.palette.common.white
            : t.palette.background.paper,
        boxShadow:
          t.palette.mode === "light"
            ? "0 8px 24px rgba(0,0,0,0.06)"
            : t.shadows[4],

        px: { xs: 1.5, md: 2 },
        py: 0.5,
      })}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        sx={{
          overflowX: "auto",
          py: 0.25,
        }}
      >
        {items.map(({ id, label }) => {
          const isActive = activeSection === id;

          return (
            <Box
              key={id}
              component="button"
              type="button"
              onClick={() => onNavClick?.(id)}
              aria-current={isActive ? "true" : undefined}
              sx={(t) => {
                const isDark = t.palette.mode === "dark";

                return {
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  letterSpacing: 0,
                  cursor: "pointer",
                  outline: "none",
                  outlineOffset: 3,
                  whiteSpace: "nowrap",
                  position: "relative",

                  // base contrast + weight
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? t.palette.primary.dark || t.palette.primary.main
                    : t.palette.text.primary,
                  opacity: isActive ? 1 : 0.75,

                  transition:
                    "color 150ms ease, opacity 150ms ease, background-color 150ms ease, box-shadow 150ms ease",

                  // hover – text in primary, subtle bg
                  "&:hover": {
                    color: t.palette.primary.main,
                    opacity: 1,
                  },

                  // keyboard focus ring
                  "&:focus-visible": {
                    outline: `2px solid ${t.palette.primary.main}`,
                    outlineOffset: 3,
                    boxShadow: isDark
                      ? `0 0 0 1px ${t.palette.primary.main}`
                      : `0 0 0 1px ${t.palette.primary.main}40`,
                  },

                  // underline for active tab
                  ...(isActive && {
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: "22%",
                      right: "22%",
                      bottom: 4,
                      height: 2,
                      borderRadius: 2,
                      backgroundColor: t.palette.primary.main,
                    },
                  }),
                };
              }}
            >
              {label}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
