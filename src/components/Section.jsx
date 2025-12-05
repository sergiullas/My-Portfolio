// -----------------------------------------------------------------------------
// components/Section.jsx
// Reusable section wrapper for landing-page blocks.
//
// - Accepts id, title, and children to render a consistent heading + content area.
// - May apply theme-aware styling and spacing; minimal to no internal state.
//
// Accessibility
// - Renders semantic <section> with an <h2>/<h3> based on props for SR navigation.
// - Supports skip links/anchor targets via the provided id.
//
// How to customize
// - Add props for variant (compact, spacious) or alignment.
// - Extend to include optional description, breadcrumbs, or section-level actions.
// -----------------------------------------------------------------------------
// Layout primitive for page sections with optional title, variants, and layouts.

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

/**
 * Section
 *
 * Props:
 * - id: string → used for anchors (/#about) and aria-labelledby
 * - title: string (optional)
 * - titleComponent: string → heading element ("h2" by default)
 * - showTitle: boolean → render the visual title or not
 * - variant: "white" | "soft" | "dark"
 * - fullHeight: boolean → min-height: 100vh + vertical centering
 * - layout: "stack" | "split"
 *    - "stack": title above content (default)
 *    - "split": sticky title in left column, content in right
 */

const BG_MAP = {
  white: "background.default",
  soft: "background.soft",
  dark: "background.dark",
};

export default function Section({
  id,
  title,
  titleComponent = "h2",
  showTitle = true,
  children,
  variant = "white",
  as = "section",
  align = "left",
  fullHeight = false,
  layout = "stack", // "stack" | "split"
}) {
  // Used to connect <section> with its heading for assistive tech
  const headingId = React.useMemo(() => {
    if (!id || !title || !showTitle) return undefined;
    return `${id}-title`;
  }, [id, title, showTitle]);

  return (
    <Box
      id={id}
      component={as}
      data-section-variant={variant}
      aria-labelledby={headingId}
      sx={{
        bgcolor: BG_MAP[variant] ?? "transparent",
        color: "inherit",
        minHeight: fullHeight ? "100vh" : "auto",
        display: "flex",
        alignItems: fullHeight ? "center" : "flex-start",
        overflow: "visible",
        position: "relative",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 10, md: 16 },
          display: "flex",
          flexDirection: "column",
        }}
      >
          {layout === "split" ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(12rem, 16rem) minmax(0, 1fr)",
                },
                columnGap: { xs: 4, md: 8 },
                rowGap: { xs: 4, md: 0 },
              }}
            >
            {/* LEFT: sticky title column */}
            <Box
              sx={(theme) => ({
                position: { md: "sticky" },
                top: { md: theme.spacing(12) },
                alignSelf: "flex-start",
                mb: { xs: 2, md: 0 },
              })}
            >
              {title && showTitle && (
                <Typography
                  variant="h2"
                  component={titleComponent}
                  id={headingId}
                  sx={{
                    fontWeight: 500,
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>

            {/* RIGHT: content column – always aligned to same x-position */}
            <Box
              sx={{
                maxWidth: "65ch",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                "& > *": {
                  width: "100%",
                },
              }}
            >
              {children}
            </Box>
          </Box>
        ) : (
          // DEFAULT STACK LAYOUT (hero etc.)
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: align === "center" ? "center" : "flex-start",
            }}
          >
            {title && showTitle && (
              <Typography
                variant="h2"
                component={titleComponent}
                id={headingId}
                sx={{ mb: 3, fontWeight: 500 }}
              >
                {title}
              </Typography>
            )}

            {children}
          </Box>
        )}
      </Container>
    </Box>
  );
}
