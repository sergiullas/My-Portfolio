// -----------------------------------------------------------------------------
// sections/AboutSection.jsx
// “About me” content block.
//
// - Renders narrative copy and supporting details from props or static content.
// - Typically stateless; any interactions (links, buttons) bubble to parents.
//
// Accessibility
// - Semantic <section> with headings and paragraphs; keep lists marked up properly.
// - Ensure any inline links have clear, specific labels.
//
// How to customize
// - Replace copy or add sub-sections (values, timeline) while keeping hierarchy.
// - Introduce illustrative media with alt text for screen readers.
// -----------------------------------------------------------------------------
// Wrapper around <Section> for the "About me" content on the home page.

// -----------------------------------------------------------------------------
// sections/AboutSection.jsx  — Refined About copy
// -----------------------------------------------------------------------------

import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Section from "../components/Section";

export default function AboutSection() {
  return (
    <Section id="about" title="About me" variant="soft" layout="split">
      <Stack spacing={3} alignItems="flex-start">

        <Typography variant="h3" color="text.secondary">
          When you drive, you think about the destination, not the car.
        </Typography>

        <Typography variant="h4" color="text.secondary">
          I design systems the same way — so people can focus on their goal, not the tool.
        </Typography>

        <Typography variant="body1" color="text.primary">
          For the last 15 years, I’ve designed products where complexity is the default — federal programs, enterprise tools, and systems with many moving parts. My focus has always been the same: make tools easier for people to use and easier for teams to build.
        </Typography>

        <Typography variant="body1" color="text.primary">
          I started in business administration and marketing, and began my U.S. career as a webmaster and web designer. Those early years taught me the fundamentals: clear structure, visual clarity, usability, accessibility, and working closely with engineers to build things that actually work. I supported portals, intranets, CRM systems, government sites, and enterprise tools long before “UX” became a common job title.
        </Typography>

        <Typography variant="body1" color="text.primary">
          When I joined Booz Allen, I moved into human factors, then user experience, and eventually system-level UX. That path shaped how I think: understand the cognitive load, simplify the workflow, build patterns that make sense, and scale what works across teams.
        </Typography>

        <Typography variant="body1" color="text.primary">
          What’s stayed consistent throughout my career is why I do this work: helping people do their jobs without fighting their tools. Clear workflows. Predictable patterns. Interfaces that get out of the way instead of slowing people down. <b>UX designers are key players in any system because usability doesn’t happen by accident, it’s designed, tested, and built with intention</b>.
        </Typography>


      </Stack>
    </Section>
  );
}

