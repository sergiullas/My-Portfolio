// -----------------------------------------------------------------------------
// components/EditorialHero.jsx
// Hero component used for editorial-style intros.
//
// - Accepts title, subtitle, and action props; lays them out with typography
//   emphasis and optional media.
// - Stateless; actions bubble up through onClick/links.
//
// Accessibility
// - Uses heading hierarchy with supporting text; ensures buttons/links are labeled.
// - Maintain alt text for any accompanying imagery or icons.
//
// How to customize
// - Swap typography scale, background treatment, or CTA arrangement.
// - Add slot props for illustrations or metrics without changing consumers.
// -----------------------------------------------------------------------------
// Cleaned, structured hero layout with editorial grid, accessible headings,
// consistent spacing, and improved image container behavior.

import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Link as MuiLink,
  Button,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import heroImage from "../assets/hero-sergio.jpg";

export default function EditorialHero({
  kicker = "Senior UX & Product Designer",
  title = "You have to keep learning — because the world keeps changing",
  subtitle = "Actively applying AI knowledge to design scalable, human-centered products",
  imageAlt = "Black and white portrait of the designer",
}) {
  return (
    <section id="editorial-hero">
      <Box sx={{ position: "relative" }}>
        <Grid
          container
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          {/* LEFT: text block */}
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: { xs: "38rem", md: "32rem" } }}>
              {/* Eyebrow / kicker – not a heading */}
              <Typography
                variant="overline"
                component="p"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  mb: 2,
                  opacity: 0.7,
                }}
              >
                {kicker}
              </Typography>

              {/* Primary page-level heading */}
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
              >
                {title}
              </Typography>

              {/* Paragraph description */}
              <Typography
                variant="body1"
                component="p"
                sx={{
                  mt: 3,
                  maxWidth: "40rem",
                }}
              >
                {subtitle}
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT: editorial photo */}
          <Grid item xs={12} md={6}>
            <Box
              sx={(theme) => ({
                maxWidth: 520,
                ml: { xs: 0, md: "auto" },
                aspectRatio: "4 / 3",
                overflow: "hidden",
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              })}
            >
              <Box
                component="img"
                src={heroImage}
                alt={imageAlt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "grayscale(100%) contrast(1.05)",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* CTAs */}
        <Box
          sx={{
            mt: 6,
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: 1,
              width: "100%",
              alignItems: { xs: "stretch", sm: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              component={RouterLink}
              to="/resume"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              View my resume
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/wip"
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              What I'm working on
            </Button>
          </Stack>
        </Box>

        {/* SOCIAL ICONS */}
        <Box
          sx={{
            mt: 6,
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              opacity: 0.7,
              "&:hover": { opacity: 1 },
            }}
          >
            <MuiLink
              href="https://github.com/sergiullas/portfolio"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              sx={{ display: "inline-flex", alignItems: "center", p: 1 }}
            >
              <GitHubIcon fontSize="small" />
            </MuiLink>

            <MuiLink
              href="https://www.linkedin.com/in/santezana/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              sx={{ display: "inline-flex", alignItems: "center", p: 1 }}
            >
              <LinkedInIcon fontSize="small" />
            </MuiLink>

            <MuiLink
              href="#contact"
              aria-label="Email"
              sx={{ display: "inline-flex", alignItems: "center", p: 1 }}
            >
              <MailOutlineIcon fontSize="small" />
            </MuiLink>

          </Stack>
        </Box>
      </Box>
    </section>

  );
}
