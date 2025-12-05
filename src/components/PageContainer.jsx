// -----------------------------------------------------------------------------
// components/PageContainer.jsx
// Generic container that standardizes page width and padding.
//
// - Wraps children with consistent spacing and optional background styling.
// - Stateless; purely presentational with props for variant or maxWidth.
//
// Accessibility
// - Keeps content width readable to reduce cognitive load.
// - Should preserve semantic structure from child components (no extra landmarks).
//
// How to customize
// - Adjust maxWidth or padding tokens; add variants for full-bleed sections.
// - Introduce responsive props to tune spacing per breakpoint.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Container } from "@mui/material";

function PageContainer({ children, ...props }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, sm: 8, md: 10 },
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default PageContainer;
