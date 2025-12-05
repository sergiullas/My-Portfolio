// -----------------------------------------------------------------------------
// src/pages/CaseStudyPortfolioSystem.jsx
// Case study: Designing my portfolio and résumé system.
// Editorial, typography-led, single-column layout.
// Updated: 2025-12-03
// -----------------------------------------------------------------------------

import * as React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SectionTitle({ children }) {
  const theme = useTheme();
  return (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontWeight: 600,
        letterSpacing: 0.2,
        mb: 2,
        mt: { xs: 4, md: 6 },
        scrollMarginTop: theme.spacing(10),
      }}
    >
      {children}
    </Typography>
  );
}

export default function CaseStudyPortfolioSystem() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          "& > * + *": {
            mt: 2,
          },
        }}
      >
        {/* Tagline */}
        <Typography
          variant="overline"
          component="p"
          sx={{
            textTransform: "none",
            letterSpacing: 1.5,
            color: "text.secondary",
          }}
        >
          Building a portfolio that behaves like a system, not a gallery.
        </Typography>

        {/* Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.1,
            mt: 1,
            mb: 2,
          }}
        >
          Designing My Portfolio and Résumé System
        </Typography>

        <Divider
          sx={{
            my: { xs: 3, md: 4 },
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
          }}
        />

        {/* Opening narrative */}
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I am not a big fan of traditional UX portfolios. They tend to
          over-emphasize visuals and under-represent the real work: system-level
          thinking, decisions, and how you work with teams.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Since the industry still expects one, I decided to build a portfolio
          that reflects how I actually think and to build it myself with a
          small, modern tech stack: React, MUI, Figma, GitHub, and AI as a
          writing and thinking partner. What started as a quick refresh became
          one of the most revealing design challenges I have taken on. It forced
          me to define my own voice, standards, and identity as a systems-level
          designer.
        </Typography>

        <SectionTitle>Understanding the Challenge</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          A portfolio is not just a website. A résumé is not just a document.
          They are both artifacts of how I think, and they needed to communicate
          systems architecture, interaction models, accessibility rigor,
          DesignOps thinking, leadership maturity, and a coherent professional
          story.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          At the same time, there is a practical tension. Hiring teams need
          clarity and speed. I want to show depth and nuance. With NDAs
          preventing me from showing real UI from most of my work, I needed a
          system that could communicate complexity without relying on
          screenshots.
        </Typography>

        <SectionTitle>The Problem Behind the Problem</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          As I evaluated what to keep, what to evolve, and what to discard, it
          became clear that my old portfolio was not wrong. It simply reflected
          an earlier version of myself. It was flat, static, and not
          narrative-driven. It felt visually safe and operationally
          inconsistent, and it did not represent the full scope of my current
          work.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          My résumé had the same problem. It no longer expressed the range or
          maturity of my experience. If I wanted hiring teams to understand how
          I think about complex systems, then the portfolio itself needed to be
          a system, not a gallery.
        </Typography>

        <SectionTitle>Defining What Success Looks Like</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I defined success across a few dimensions.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          First, the site had to communicate who I am through structure, not
          decoration. That meant an editorial, precise, minimal layout that was
          comfortable to read and free of visual noise.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Second, it had to tell stories in the way I naturally think. I wanted
          case studies that focused on decisions, constraints, and systems
          instead of artifact collections or process dumps.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Third, it needed to work around NDAs without losing impact. That
          required impact-first narratives, generalized language, and
          high-level systems reasoning that did not depend on visuals.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Finally, it had to reflect a modern, modular UX architecture: reusable
          components, a clear information hierarchy, composable sections, and
          adaptable layouts. It also needed to feel alive through subtle
          micro-interactions, without overwhelming users who prefer reduced
          motion.
        </Typography>

        <SectionTitle>Building the System</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I approached the project the same way I would approach a complex
          product: by building the system first, then the screens.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          1. Establishing the foundation
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I began with the underlying architecture. A shared layout shell owns
          the header, the main landmark, and the skip link for keyboard users.
          Navigation logic is centralized so that both desktop and mobile share
          the same behavior. Global spacing and typography tokens keep the
          visual system coherent, and dark and light modes remain in sync.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          2. Turning the résumé into structured data
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Instead of treating the résumé as a static PDF, I designed it as a
          structured content model. Identity, meta information, about,
          experience, responsibilities, achievements, skills, education, and
          certifications all live as data. This allows the same source of truth
          to power the long-form web résumé, recruiter-friendly summaries,
          ATS-optimized exports, and interactive components such as copyable
          metadata and expandable sections.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          3. Designing an editorial storytelling layout
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I created a narrative scaffold for case studies that mirrors how
          senior designers actually communicate: start with clarity, introduce
          tension, show the decisions, reveal the systems behind the scenes, and
          land on impact. This structure became the blueprint for all case
          studies, including the low-code case management platform story.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          4. Creating a password-protected case study environment
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          NDAs are a quiet constraint in this field, so I designed a friendly
          password gate for sensitive work. It explains why access is
          restricted, accepts a recruiter password, stores unlock state locally,
          and handles errors accessibly. This creates a safe space to describe
          high-stakes systems work without exposing confidential details.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          5. Designing a bento-style case study hub
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          For the case study hub, I designed a bento-style grid. Instead of four
          identical tiles, the layout pairs wide and narrow cards in an
          asymmetric 2-by-2 pattern. On desktop, the first row places a wide
          primary story beside a narrow supporting one, and the second row
          reverses the proportions. On smaller screens, everything collapses
          into a single, readable column. The grid feels intentional, modern,
          and calm.
        </Typography>

        <SectionTitle>What I Led</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Beyond implementation, this project required me to act as both the
          design lead and the client. I had to define standards, challenge my
          own assumptions, and confront the gap between how I describe my work
          and how it actually operates.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I stripped away elements that no longer felt accurate, rewrote content
          to match my current level of responsibility, and created harmony
          between the résumé, portfolio, and case studies. Each iteration made
          the system more honest and more aligned with the designer I am today.
        </Typography>

        <SectionTitle>Outcome</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The result is a portfolio that feels like reading me. It is not
          flashy, but it is intentional. It relies on typography,
          spacing, and narrative rather than decoration. Case studies focus on
          decisions, constraints, and systems instead of artifacts.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The résumé now operates like a small product. It adapts to different
          contexts, exports cleanly, and can be transformed programmatically. It
          finally reflects the breadth of my leadership experience rather than a
          compressed list of job titles.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Most importantly, the work produced a repeatable foundation. New case
          studies, new layouts, and new storytelling patterns can all plug into
          the same system without compromising clarity or cohesion.
        </Typography>

        <SectionTitle>Looking Ahead</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          This platform opens the door to future enhancements: story-based
          leadership résumés, interactive timelines, richer visuals where
          appropriate, and multi-modal content such as audio and motion. Each
          new addition can build on the same principles of clarity, systems
          thinking, and accessible design.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 0 }}>
          In many ways, designing my own portfolio has been the purest
          expression of my design philosophy: solve the right problem, reduce
          noise until clarity emerges, design the system before the screens, and
          let the work reflect the person behind it.
        </Typography>
      </Container>
    </Box>
  );
}
