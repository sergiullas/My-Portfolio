// -----------------------------------------------------------------------------
// hooks/useLocalTime.js
// Custom hook for deriving local time info.
//
// - Manages internal state for current time and updates on an interval.
// - Returns formatted strings/objects to display availability or greetings.
//
// Accessibility
// - Avoid overly frequent updates to prevent screen reader churn.
// - Consumers should render times inside semantic <time> elements.
//
// How to customize
// - Accept options for update frequency, time zones, or formatting styles.
// - Memoize heavy computations if you add locale-sensitive logic.
// -----------------------------------------------------------------------------
import * as React from "react";

export function useLocalTime(timeZone) {
  const [localTime, setLocalTime] = React.useState("");

  React.useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
        ...(timeZone ? { timeZone } : {}),
      }).format(new Date());

    setLocalTime(format());
    const id = window.setInterval(() => setLocalTime(format()), 60_000);

    return () => window.clearInterval(id);
  }, [timeZone]);

  return localTime;
}
