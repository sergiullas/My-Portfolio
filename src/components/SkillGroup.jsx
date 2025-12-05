// -----------------------------------------------------------------------------
// components/SkillGroup.jsx
// Displays grouped skills or tools.
//
// - Receives an array of skills and renders them as chips/list items.
// - Stateless; formatting controlled by props or theme tokens.
//
// Accessibility
// - Use list semantics so screen readers understand grouped items.
// - Ensure chip styles keep focus outlines visible and text readable.

// How to customize
// - Add proficiency indicators or categories.
// - Make layout responsive (columns/rows) via additional props.
// -----------------------------------------------------------------------------

import * as React from "react";
import { Card, CardContent, Typography, Stack, Chip, Grid } from "@mui/material";

export default function SkillGroup({ title, skills }) {
  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}