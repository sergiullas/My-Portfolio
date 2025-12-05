// components/CaseStudyCard.jsx

import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function CaseStudyCard({
  title,
  problem,
  role,
  outcomes = [],
  to = "#",
  sx = {},          // ⬅️ allow layout overrides
}) {
  const theme = useTheme();
  const titleId = React.useId();
  const descriptionId = React.useId();

  const baseStyles = {
    display: "block",
    height: "100%",
    p: 0,
    textDecoration: "none",
    color: "inherit",
    borderRadius: 3,
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.08)"
    }`,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
      borderColor: theme.palette.primary.main,
    },
    "&:focus-visible": {
      outline: `3px solid ${theme.palette.primary.main}`,
      outlineOffset: theme.spacing(1),
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[6],
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "&:hover": {
        transform: "none",
        boxShadow: theme.shadows[2],
      },
    },
  };

  return (
    <Card
      component={RouterLink}
      to={to}
      aria-label={`Read case study: ${title}`}
      aria-describedby={descriptionId}
      sx={{ ...baseStyles, ...sx }}
    >
      <CardContent component="div" sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h3"
          id={titleId}
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>

        <Typography
          id={descriptionId}
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {problem}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
        >
          {role}
        </Typography>

        <Box component="ul" sx={{ pl: 3, m: 0, lineHeight: 1.6 }}>
          {outcomes.map((item, index) => (
            <Typography
              key={index}
              component="li"
              variant="body2"
              sx={{ mb: 0.5 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
