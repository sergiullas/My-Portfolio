// -----------------------------------------------------------------------------
// hooks/useHeaderNameVisibility.js
// Determines when the header’s name/branding should appear or hide.
//
// - Observes scroll position and exposes a boolean/flag to toggle UI elements.
// - State lives inside the hook; consuming components read the visibility value.
//
// Accessibility
// - Prevent abrupt layout shifts that could disorient users relying on focus.
// - Combine with aria-live regions only if the visibility change conveys status.
//
// How to customize
// - Adjust scroll thresholds, debounce timing, or triggers for different layouts.
// - Expose more metadata (e.g., current section) if header behavior becomes richer.
// -----------------------------------------------------------------------------
