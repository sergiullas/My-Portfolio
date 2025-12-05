// src/components/resume/EducationCard.jsx
// Neutral education cards; logo may link to institution

import * as React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function EducationCard({ item }) {
  const theme = useTheme();
  const { degree, school, year, logoSrc, institutionUrl } = item || {};

  const LogoWrapperComponent = institutionUrl ? "a" : "div";
  const logoWrapperProps = institutionUrl
    ? {
        href: institutionUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Visit ${school || degree}`,
      }
    : {};

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        p: 1.5,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        transition: "border-color 120ms ease, background-color 120ms ease",
        // Very subtle hover (or you can remove this entirely)
        "&:hover": {
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Stack spacing={0.25} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {degree}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {school}
          {year ? ` · ${year}` : null}
        </Typography>
      </Stack>

      {logoSrc && (
        <Box
          component={LogoWrapperComponent}
          {...logoWrapperProps}
          sx={{ display: "inline-flex", ml: 2 }}
        >
          <Avatar
            src={logoSrc}
            alt={school || degree}
            variant="rounded"
            sx={{ width: 40, height: 40, borderRadius: 2 }}
          />
        </Box>
      )}
    </Box>
  );
}
