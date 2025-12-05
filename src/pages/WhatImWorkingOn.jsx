// -----------------------------------------------------------------------------
// pages/WhatImWorkingOn.jsx
// Dedicated page showcasing current work streams.
// -----------------------------------------------------------------------------

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Button,
} from "@mui/material";

import portfolioHero from "../assets/portfolio-hero.png";
import uxKatarzisHero from "../assets/ux-katarzis-hero.png";
import { usePageMeta } from "../hooks/usePageMeta";

export default function WhatImWorkingOn() {
  const theme = useTheme();

  usePageMeta({
    title: "What I’m working on – Sergio Antezana | UX Experiments & UX Katarzis",
    description:
      "Current projects from Sergio Antezana, including his React + MUI portfolio build and UX Katarzis, a UX-focused GPT companion for product and UX designers.",
  });

  return (
    <Box
      component="div"
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header / title band – same bg as header */}
      <Box
        sx={{
          pt: { xs: 8, md: 8 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ fontWeight: 600 }}
          >
            What I&apos;m working on.
          </Typography>
        </Container>
      </Box>

      {/* Sections – each one brings in the soft gray band */}
      <FullBleedSection
        eyebrow="Now"
        title="SergioAntezana.com — my portfolio"
        paragraphs={[
          "I am not a big fan of traditional UX portfolios. They tend to over-emphasize visuals and under-represent the real work: system-level thinking, decisions, and how you work with teams.",
          "Since the industry still expects one, I decided to build a portfolio that reflects how I actually think — and to build it myself with a small, modern tech stack: React, MUI, Figma, GitHub, and AI as a writing and thinking partner.",
          "The goal is a simple, honest site that is easy to maintain and explains the work clearly instead of putting on a case-study show.",
        ]}
        linkHref="https://sergioantezana.com"
        linkLabel="See the portfolio I’m building"
        image={portfolioHero}
        imageAlt="Sergio Antezana portfolio preview"
        imageLeft
      />

      <FullBleedSection
        eyebrow="In progress"
        title="UX Katarzis — my UX-focused GPT"
        paragraphs={[
          "I have been using ChatGPT since the very beginning and noticed that my prompts for UX and product work became very patterned — especially around goals, workflows, and systems thinking.",
          "UX Katarzis is built from those patterns. It is meant to be a companion for both new and experienced designers, helping them frame problems, reduce cognitive load, and build clearer flows and structures.",
          "I treat it as a living tool: something I refine as I learn more about how designers actually use AI in real projects.",
        ]}
        linkHref="https://chatgpt.com/g/g-U8o9KZ3e3-ux-katarzis"
        linkLabel="Use UX Katarzis as your design companion"
        image={uxKatarzisHero}
        imageAlt="UX Katarzis GPT preview"
        imageLeft={false}
      />
    </Box>
  );
}

/**
 * Full-width Microsoft-style band:
 * big image + text on the same row (never stacked on desktop).
 */
function FullBleedSection({
  eyebrow,
  title,
  paragraphs,
  linkHref,
  linkLabel,
  image,
  imageAlt,
  imageLeft = true,
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: isLight ? "#f5f5f7" : theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          sx={{
            flexDirection: {
              xs: "column",
              md: imageLeft ? "row" : "row-reverse",
            },
          }}
        >
          {/* IMAGE SIDE */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: isLight
                  ? "0 40px 80px rgba(0,0,0,.18)"
                  : "0 40px 80px rgba(0,0,0,.7)",
                height: { xs: 260, sm: 320, md: 420 },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={imageAlt}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          {/* TEXT SIDE */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                  mb: 1,
                }}
              >
                {eyebrow}
              </Typography>
            )}

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {title}
            </Typography>

            {paragraphs?.map((p) => (
              <Typography
                key={p.slice(0, 30)}
                variant="body1"
                color="text.secondary"
                sx={{ mb: 1.5, maxWidth: 480 }}
              >
                {p}
              </Typography>
            ))}

            {linkHref && (
              <Button
                component="a"
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="medium"
                sx={{
                  mt: 3,
                  px: 2.75,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: isLight ? "#ffffff" : "#000000",
                  color: isLight
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
                  borderColor: isLight
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: isLight
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,0,0,0.9)",
                    borderColor: isLight
                      ? theme.palette.primary.dark
                      : theme.palette.primary.main,
                  },
                  "& .cta-arrow": {
                    transition: "transform 150ms ease-out",
                  },
                  "&:hover .cta-arrow": {
                    transform: "translateX(3px)",
                  },
                }}
              >
                <span>{linkLabel}</span>
                <Box
                  component="span"
                  className="cta-arrow"
                  aria-hidden="true"
                  sx={{ ml: 0.75 }}
                >
                  →
                </Box>
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
