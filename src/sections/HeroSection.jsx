// Updated: 2025-11-20 · 16:45 ET  // 4:45 PM · Thursday, November 20, 2025

// -----------------------------------------------------------------------------
// sections/HeroSection.jsx
// Landing-page hero introducing the portfolio owner.
//
// - Receives props for scroll handlers and theme toggles; renders primary CTA(s).
// - Stateless presentation beyond handling button/link clicks routed upward.
//
// Accessibility
// - Uses a top-level <section> with an <h1> and descriptive text for SR users.
// - Ensure CTAs have aria-labels when icon-only and maintain focus styling.
//
// How to customize
// - Swap imagery, CTA targets, or copy without changing layout logic.
// - Add split-hero variants (media + text) by extending the container styles.
// -----------------------------------------------------------------------------
// Section wrapper for the home page hero, restoring consistent padding/grid.

import * as React from "react";
import Section from "../components/Section";
import EditorialHero from "../components/EditorialHero";
import { ScrollIndicator } from "../components/common/ScrollIndicator";

export default function HeroSection() {
  return (
    <Section
      id="hero"
      variant="white"
      as="header"
      fullHeight
      layout="stack"
      align="left"
    >
      <EditorialHero />
      <ScrollIndicator targetId="about" />
    </Section>
  );
}
