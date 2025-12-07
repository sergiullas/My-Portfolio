// -----------------------------------------------------------------------------
// components/resume/ResumeHero.jsx
// Top banner for the resume page.
//
// - Receives meta data (name, title, location, contact) and renders headline
//   content with key actions.
// - Stateless; data flows in via props from pages/MyResume or sections.
//
// Accessibility
// - Uses <header>/<section> semantics with an <h1>; contact links have clear labels.
// - Ensure any decorative icons are aria-hidden to reduce noise.
//
// How to customize
// - Add social/profile links, availability tags, or download buttons.
// - Adjust layout for print vs. web by toggling typography/spacing props.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import NameWithPronunciation from "./shared/NameWithPronunciation.jsx";
import { HERO } from "../../content/resumeData.js";
import headshot from "../../assets/headshot-sergio.png";

const ResumeHero = React.forwardRef(function ResumeHero(_props, ref) {
  return (
    <Box id="resume-hero" ref={ref}>
      <Typography
        variant="overline"
        sx={(t) => ({
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          opacity: 0.85,
          color: t.palette.primary.main,
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          "&::before": {
            content: '""',
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "999px",
            backgroundColor: t.palette.primary.main,
          },
        })}
      >
        {HERO.roleTag}
      </Typography>

      {/* Avatar + name layout */}
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
          columnGap: 2,
          rowGap: 2,
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Avatar
          alt={HERO.name}
          src={headshot}
          sx={{
            width: 150,
            height: 150,
            justifySelf: { xs: "flex-start", md: "flex-start" },
          }}
        />

        <Box>
          <NameWithPronunciation name={HERO.name} pronouns={HERO.pronouns} />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: "40rem",  fontWeight: 600  }}
          >
            {HERO.blurb[0]}
          </Typography>  
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: "40rem" }}
          >
            {HERO.blurb[1]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default ResumeHero;
