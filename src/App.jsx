// -----------------------------------------------------------------------------
// App.jsx
// Top-level router and page composition.
//
// - Defines routes for the landing experience (sections) and dedicated pages.
// - Accepts `mode` and `setMode` from main.jsx and passes them to LayoutShell/Header
//   for theme toggling UI.
// - Uses scroll helpers so navigation between sections is smooth and predictable.
//
// Accessibility
// - Routes render semantic <section> landmarks with headings for screen-reader
//   navigation.
// - Works with the router to avoid jarring focus loss on in-page jumps.
//
// How to customize
// - Add or remove routes by importing new pages and updating the <Routes> map.
// - Reorder or swap landing sections directly in the home route’s JSX.
// - Extend scroll handling to move focus on “virtual page changes.”
// -----------------------------------------------------------------------------

import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import PortfolioPage from "./pages/Portfolio";
import LayoutShell from "./components/LayoutShell.jsx";
import MyResumePage from "./pages/MyResume.jsx";
import { usePageMeta } from "./hooks/usePageMeta";

// Phase 2 section wrappers
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import PhilosophySection from "./sections/PhilosophySection.jsx";
import HowIWork from "./sections/HowIWork.jsx";
import WhatImWorkingOn from "./pages/WhatImWorkingOn.jsx";
import CaseStudyLowCode from "./pages/CaseStudyLowCode.jsx";
import CaseStudyPortfolioSystem from "./pages/CaseStudyPortfolioSystem.jsx";

// App receives mode + setMode from main.jsx
export default function App({ mode, setMode }) {
  const location = useLocation();

  const scrollToId = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Handle deep links AND scroll-to-top on route change
  React.useEffect(() => {
    // 1) Home with hash: /#about, /#contact, etc.
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return; // ⬅️ stop here, do NOT scroll to top
      }
    }

    // 2) Any other route (or home without hash): scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // or omit behavior for instant jump
    });
  }, [location.pathname, location.hash]);

  return (
    <LayoutShell mode={mode} setMode={setMode} scrollToId={scrollToId}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/resume" element={<MyResumePage />} />
        <Route path="/wip" element={<WhatImWorkingOn />} />
        <Route
          path="/case-studies/low-code-case-management"
          element={<CaseStudyLowCode />}
        />
        <Route
          path="/case-studies/portfolio-and-resume-system"
          element={<CaseStudyPortfolioSystem />}
        />
      </Routes>
    </LayoutShell>
  );
}

// ---------------- HOME PAGE ----------------

function HomePage() {
  usePageMeta({
    title: "Sergio Antezana – Principal Product & UX Designer",
    description:
      "Principal Product & UX Designer focused on systems-level UX, design operations, and accessibility for complex federal programs and enterprise tools.",
  });

  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PHILOSOPHY SECTION */}
      <PhilosophySection />

      {/* HOW I WORK SECTION */}
      <HowIWork />

      {/* CONTACT SECTION */}
      <ContactSection />
    </>
  );
}
