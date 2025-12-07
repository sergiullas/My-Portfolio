// -----------------------------------------------------------------------------
// components/resume/shared/MetaRow.jsx
// Shared row component for label/value pairs in resume cards.
//
// - Receives label, value, and optional icon; renders a single row consistently.
// - Stateless; styling controlled by parent/resume theme.
//
// Accessibility
// - Use semantic markup (e.g., <div role="listitem"> or dl/dt/dd patterns) to
//   convey relationships.
// - Icons should be aria-hidden unless they convey meaning.
//
// How to customize
// - Add tooltip/supporting text props or allow custom render functions.
// - Adjust spacing/alignment to match new card designs.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Box, Stack, Typography, Link as MuiLink } from "@mui/material";

export default function MetaRow({ icon, primary, secondary, href }) {
  const Wrapper = href ? MuiLink : Box;

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={(t) => ({
          width: 28,
          height: 28,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            t.palette.mode === "dark"
              ? t.palette.grey[900]
              : t.palette.action.hover,
        })}
      >
        {icon}
      </Box>

      <Box>
        <Wrapper
          {...(href
            ? {
                href,
                underline: "hover",
                color: "inherit",
                target: href.startsWith("http") ? "_blank" : undefined,
                rel: href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined,
              }
            : {})}
          sx={{ display: "block", fontWeight: 500, fontSize: "0.9rem" }}
        >
          {primary}
        </Wrapper>
        {secondary && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {secondary}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
