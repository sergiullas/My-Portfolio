// -----------------------------------------------------------------------------
// components/resume/ResumeExperience.jsx
// Renders work experience entries.
//
// - Maps over experience data to output role, company, timeframe, and bullets.
// - Stateless; formatting driven by data and theme tokens.
//
// Accessibility
// - Uses headings and lists for duties/achievements; ensures date text is readable.
// - Include aria-labels for external links and keep focus states visible.
//
// How to customize
// - Add filters (by role/industry) or expandable details per job.
// - Support condensed and detailed variants via props.
// -----------------------------------------------------------------------------
import * as React from "react";
import { Box, Stack, Typography, Collapse, IconButton, Chip } from "@mui/material";


import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme, alpha } from "@mui/material/styles";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { EXPERIENCE } from "../../content/resumeData.js";

function EraItem({ era, open, onToggle, isLast }) {
  const theme = useTheme();
  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.divider;


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        pb: isLast ? 0 : 3,
        position: "relative",
        "&:hover .era-icon-box": {
          borderColor: open ? activeColor : theme.palette.text.primary,
          transform: "scale(1.05)",
        },
      }}
    >
      {/* Left Column: Icon + Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 32,
        }}
      >
        <Box
          className="era-icon-box"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: open ? activeColor : inactiveColor,
            color: open ? activeColor : theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            transition: "all 0.25s ease-out",
            boxShadow: open ? `0 0 0 4px ${alpha(activeColor, 0.16)}` : "none",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: "1.1rem" }} />
        </Box>

        {!isLast && (
          <Box
            sx={{
              width: 2,
              bgcolor: open ? alpha(activeColor, 0.4) : inactiveColor,
              flexGrow: 1,
              mt: -0.5,
              transition: "background-color 0.25s ease-out",
            }}
          />
        )}
      </Box>

      {/* Right Column */}
      <Box sx={{ flexGrow: 1, pt: 0.5 }}>
        <Box
          component="button"
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${era.id}-content`}
          aria-label={`${era.title} details`}
          sx={{
            width: "100%",
            border: "none",
            background: "none",
            padding: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.2,
                color: open ? activeColor : "text.primary",
                transition: "color 0.2s ease-out",
              }}
            >
              {era.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {era.subtitle}
            </Typography>
          </Box>

          <Box sx={{ color: "text.secondary", mt: 0.25 }}>
            {open ? "▲" : "▼"}
          </Box>
        </Box>

        <Collapse in={open}>
          <Box id={`${era.id}-content`}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, maxWidth: "70ch" }}
            >
              {era.intro}
            </Typography>
            <Box
              component="ul"
              sx={{ pl: 2.5, m: 0, mt: 1, maxWidth: "70ch" }}
            >
              {era.bullets.map((item) => (
                <li key={item}>
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>

            {era.tags?.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.75, flexWrap: "wrap", gap: 1 }}
              >
                {era.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1,
                      fontSize: "0.75rem",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}


export default function ResumeExperience() {
  const [openEras, setOpenEras] = React.useState(() => {
    const initial = {};
    EXPERIENCE.eras.forEach((era) => {
      initial[era.id] = era.id === "era4"; // keep current era open by default
    });
    return initial;
  });

  const [showFederalPrograms, setShowFederalPrograms] = React.useState(false);
  const toggleEra = (id) => {
    setOpenEras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {EXPERIENCE.company}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {EXPERIENCE.tenure}
      </Typography>

      <Box sx={{ mt: 1.5 }}>
        <Chip
          label={EXPERIENCE.currentEraLabel}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box sx={{ mt: 2.5 }}>
        {EXPERIENCE.eras.map((era, index) => (
          <EraItem
            key={era.id}
            era={era}
            open={openEras[era.id]}
            onToggle={() => toggleEra(era.id)}
            isLast={index === EXPERIENCE.eras.length - 1}
          />
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ mt: 2 }}>
          {/* Header row: label + toggle icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setShowFederalPrograms((prev) => !prev)}
            aria-expanded={showFederalPrograms ? "true" : "false"}
            aria-controls="federal-programs-panel"
          >
            <Typography variant="subtitle2">
              Federal programs experience
            </Typography>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowFederalPrograms((prev) => !prev);
              }}
              aria-label={
                showFederalPrograms
                  ? "Collapse federal programs experience"
                  : "Expand federal programs experience"
              }
              sx={{
                transform: showFederalPrograms ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 150ms ease",
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Short summary line always visible */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            18+ federal programs across FBI, DoD, DHS, DOJ, FDA, DIA, ODNI, and more.
          </Typography>

          {/* Collapsible content */}
          <Collapse in={showFederalPrograms} timeout="auto">
            <Stack
              id="federal-programs-panel"
              spacing={0.5}
              sx={{ mt: 1, pl: 0.5 }}
            >
              <Typography variant="body2">
                08/2023 – Current — Chameleon Project — Federal Bureau of Investigation (FBI)
              </Typography>
              <Typography variant="body2">
                09/2022 – 07/2023 — DELTA Project — Federal Bureau of Investigation (FBI)
              </Typography>
              <Typography variant="body2">
                01/2021 – 09/2022 — NGNCP Project — Federal Bureau of Investigation (FBI)
              </Typography>
              <Typography variant="body2">
                02/2021 – 11/2021 — IPAS Project — U.S. EUCOM and Joint Analysis Center (JAC)
              </Typography>
              <Typography variant="body2">
                10/2020 – 03/2021 — CDRH Project — Food and Drug Administration (FDA)
              </Typography>
              <Typography variant="body2">
                08/2019 – 10/2020 — EPAS Project — Federal Bureau of Investigation (FBI)
              </Typography>
              <Typography variant="body2">
                05/2016 – 07/2019 — USTP Project — Department of Justice (DoJ)
              </Typography>
              <Typography variant="body2">
                09/2017 – 07/2018 — JIDO Project — Department of Defense (DoD)
              </Typography>
              <Typography variant="body2">
                01/2016 – 09/2016 — D3 Project — Defense Intelligence Agency (DIA)
              </Typography>
              <Typography variant="body2">
                04/2015 – 10/2015 — SEVIS Project — Department of Homeland Security (DHS)
              </Typography>
              <Typography variant="body2">
                09/2013 – 10/2015 — OSCAR Project — Defense Intelligence Agency (DIA)
              </Typography>
              <Typography variant="body2">
                04/2014 – 10/2014 — COUGAR Project — Defense Intelligence Agency (DIA)
              </Typography>
              <Typography variant="body2">
                10/2013 – 03/2014 — Black Forest Project — Defense Intelligence Agency (DIA)
              </Typography>
              <Typography variant="body2">
                02/2013 – 08/2013 — CRATE Project — Defense Intelligence Agency (DIA)
              </Typography>
              <Typography variant="body2">
                08/2012 – 02/2013 — ICE CMM Project — Department of Homeland Security (DHS)
              </Typography>
              <Typography variant="body2">
                06/2010 – 08/2012 — DRAMRS Project — Director of National Intelligence (ODNI)
              </Typography>
              <Typography variant="body2">
                09/2009 – 06/2010 — ICE SEVIS II Project — Department of Homeland Security (DHS)
              </Typography>
              <Typography variant="body2">
                11/2008 – 09/2010 — RAMP Project — Department of Homeland Security (DHS)
              </Typography>
            </Stack>
          </Collapse>
        </Box>
      </Box>

    </>
  );
}
