// -----------------------------------------------------------------------------
// hooks/useActiveSection.js
// Tracks which page section is currently active in the viewport.
//
// - Uses IntersectionObserver or scroll listeners to set active section ID/state.
// - Exposes the active section and callbacks so nav elements can highlight links.
//
// Accessibility
// - Helps keep skip links and navigation in sync with visible content for keyboard
//   and screen-reader users.
// - Ensure focus handling complements the visual active state.
//
// How to customize
// - Tune thresholds/margins for when a section becomes “active.”
// - Extend return values to include scrollTo helpers or focus management.
// -----------------------------------------------------------------------------
import * as React from "react";

export function useActiveSection(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = React.useState(
    sectionIds?.[0] ?? null
  );

  React.useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const handleScroll = () => {
      let currentId = sectionIds[0];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          currentId = id;
        }
      });

      setActiveSection(currentId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}

export default useActiveSection;
