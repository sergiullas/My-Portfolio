// -----------------------------------------------------------------------------
// components/resume/ResumeSection.jsx
// Container for resume sub-sections (experience, education, skills).
//
// - Accepts title/id and children; coordinates spacing and anchors for navigation.
// - Stateless; any filtering/pagination happens in child components.
//
// Accessibility
// - Renders as <section> with proper heading levels to maintain hierarchy.
// - Provides ids for skip links and side navigation targeting.
//
// How to customize
// - Add props for variant styling or collapsible behavior.
// - Include optional description text or metadata near the heading.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Box, Divider, Typography, Link as MuiLink, Tooltip } from "@mui/material";

export default function ResumeSection({ id, label, children }) {

  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fail silently
    }
  };

  const headingId = `${id}-heading`;

  return (
    <Box
      id={id}
      component="section"
      aria-labelledby={headingId}
      sx={{ scrollMarginTop: { xs: 96, md: 120 } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          id={headingId}
          variant="overline"
          component="h2"
          sx={{
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            mb: 1,
            opacity: 0.7,
          }}
        >
          {label}
        </Typography>

        <Tooltip title={copied ? "Copied!" : "Copy link"}>
          <MuiLink
            component="button"
            type="button"
            onClick={handleCopyLink}
            underline="none"
            sx={{
              mb: 1,
              fontSize: 12,
              opacity: copied ? 1 : 0.6,
              fontFamily: "monospace",
              transition: "all 0.25s ease",
              "&:hover": { opacity: 1 },
            }}
            aria-label={`Copy link to ${label} section`}
          >
            {copied ? "✓" : "§"}
          </MuiLink>
        </Tooltip>

      </Box>

      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );
}
