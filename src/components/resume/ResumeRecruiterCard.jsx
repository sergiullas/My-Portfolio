// -----------------------------------------------------------------------------
// components/resume/ResumeRecruiterCard.jsx
// Card aimed at recruiters with quick highlights.
//
// - Consumes resumeData to present availability, role interests, or key metrics.
// - Stateless; interactions (email/links) bubble via anchor elements.
//
// Accessibility
// - Structured with headings and lists so screen readers can skim quickly.
// - Maintain sufficient contrast on badges/labels.
//
// How to customize
// - Swap highlighted fields to target different audiences.
// - Add CTA buttons (book a call) with clear aria-labels.
// -----------------------------------------------------------------------------
import * as React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";

import ContactMailIcon from "@mui/icons-material/ContactMail";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WcIcon from "@mui/icons-material/Wc";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SecurityIcon from "@mui/icons-material/Security";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useLocalTime } from "../../hooks/useLocalTime.js";
import { computeTimeDiff } from "../../utils/timeZone.js";
import { RECRUITER_ESSENTIALS as RE } from "../../content/resumeData.js";

// Shared row: icon + label (caption) + value (body2)
function LabelValueRow({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={(t) => ({
          width: 28,
          height: 28,
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            t.palette.mode === "dark"
              ? t.palette.grey[900]
              : t.palette.action.hover,
          flexShrink: 0,
        })}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 0.25 }}
        >
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Stack>
  );
}

export default function ResumeRecruiterCard() {
  const localTime = useLocalTime("America/New_York");
  const timeDiff = computeTimeDiff("America/New_York");

  const timeSecondary =
    timeDiff === "Same time"
      ? `Same time — ${RE.timeZoneLabel}`
      : `${timeDiff} — ${RE.timeZoneLabel}`;

  return (
    <Box
      sx={(t) => ({
        borderRadius: 2,
        border: `1px solid ${t.palette.divider}`,
        backgroundColor:
          t.palette.mode === "dark"
            ? t.palette.background.paper
            : t.palette.common.white,
        boxShadow:
          t.palette.mode === "dark" ? t.shadows[3] : "0 10px 30px rgba(0,0,0,0.04)",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 2.5 },
        mt: 2,
      })}
    >
      {/* Header + tooltip on the right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          gap: 1,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Recruiter essentials
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.25 }}
          >
            Common EEO, work authorization, and clearance answers.
          </Typography>
        </Box>

        <Tooltip
          title="These answers match the standard screening questions I fill on job applications."
          arrow
        >
          <IconButton
            size="small"
            aria-label="More information about this metadata"
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

     <Grid container columnSpacing={{ xs: 2, md: 4 }} rowSpacing={{ xs: 2, md: 0 }}>
        {/* LEFT: contact & logistics */}
        <Grid item xs={12} md={8}>
          <Stack spacing={1.75}>
            <LabelValueRow
              icon={<ContactMailIcon fontSize="small" />}
              label="Contact information"
              value={
                <>
                  {RE.email}
                  <br />
                  {RE.phone}
                </>
              }
            />

            <LabelValueRow
              icon={<PlaceIcon fontSize="small" />}
              label="Location"
              value={RE.location}
            />

            <LabelValueRow
              icon={<AccessTimeIcon fontSize="small" />}
              label="Time zone"
              value={
                <>
                  {localTime}
                  <br />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="span"
                  >
                    {timeSecondary}
                  </Typography>
                </>
              }
            />

            <LabelValueRow
              icon={<WcIcon fontSize="small" />}
              label="Gender / pronouns"
              value={RE.pronouns}
            />
          </Stack>
        </Grid>

        {/* RIGHT: authorization & identity */}
        <Grid item xs={12} md={4}>
          <Stack spacing={1.75}>
            <LabelValueRow
              icon={<GppGoodIcon fontSize="small" />}
              label="Citizenship / work authorization"
              value={RE.citizenship}
            />

            <LabelValueRow
              icon={<MilitaryTechIcon fontSize="small" />}
              label="Protected veteran status"
              value={RE.veteranStatus}
            />

            <LabelValueRow
              icon={<Diversity3Icon fontSize="small" />}
              label="Race / ethnicity"
              value={RE.raceEthnicity}
            />

            <LabelValueRow
              icon={<SecurityIcon fontSize="small" />}
              label="US clearance"
              value={RE.clearanceStatus}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
