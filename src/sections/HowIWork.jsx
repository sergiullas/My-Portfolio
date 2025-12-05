// -----------------------------------------------------------------------------
// sections/HowIWork.jsx
// Walkthrough of process or working style.
//
// - Iterates over step data to render timeline/process cards.
// - Stateless aside from any optional hover/focus UI handled inline.
//
// Accessibility
// - Prefer ordered lists for process steps and maintain heading hierarchy.
// - Include clear labels for links/downloads and ensure focus visibility.
//
// How to customize
// - Swap steps or add visuals (icons, illustrations) with descriptive alt text.
// - Adjust spacing/breakpoints to keep steps readable on small screens.
// -----------------------------------------------------------------------------

import * as React from "react";
import { Stack, Typography, Button } from "@mui/material";
import Section from "../components/Section";

import { Link as RouterLink } from "react-router-dom";

export default function HowIWork() {
  return (
    <Section id="how_work" title="How I Work" variant="soft" layout="split">
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="h3" color="text.secondary">
          I start with the user’s goal.
        </Typography>
        <Typography variant="h4" color="text.secondary">
          When that is clear, every other decision becomes easier.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          I look at design from several angles—UI patterns, information architecture, visual design, usability, and accessibility. Seeing the problem from these different perspectives helps me find the simple structure underneath the complexity.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          I bring product and engineering in early because their insights make the work real. Together, we figure out the constraints and the opportunities, and that usually leads to a clearer solution.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          In the end, I try to create patterns and structures that make things easier for users and simpler for teams to build. When everyone knows where they are heading, the work feels lighter and we can move faster with less friction.
        </Typography>

      </Stack>
    </Section>
  );
}
