// -----------------------------------------------------------------------------
// utils/timeZone.js
// Helper for presenting local time zones.
//
// - Exposes pure functions (e.g., formatting or offset helpers) with no React
//   state.
// - Consumed by components that show availability or current time.
//
// Accessibility
// - Keeps time strings human-readable; pair with <time> elements for better SR
//   support.
// - Ensure formatted values include time zone abbreviations to avoid ambiguity.
//
// How to customize
// - Extend with more formats or locale-aware options.
// - Swap in Intl APIs for richer translations without changing callers.
// -----------------------------------------------------------------------------
export function computeTimeDiff(targetTZ = "America/New_York") {
  try {
    const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    const toTzDate = (tz) =>
      new Date(now.toLocaleString("en-US", { timeZone: tz }));

    const targetDate = toTzDate(targetTZ);
    const userDate = toTzDate(userTZ);

    const diffMs = targetDate - userDate;
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    if (diffHours === 0) return "Same time";
    if (diffHours > 0) return `${diffHours}h ahead`;
    return `${Math.abs(diffHours)}h behind`;
  } catch {
    return "";
  }
}
