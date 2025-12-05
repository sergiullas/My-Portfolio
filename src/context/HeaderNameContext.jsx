// -----------------------------------------------------------------------------
/* eslint-disable react-refresh/only-export-components */
// context/HeaderNameContext.jsx
// Context provider for whether the header should display the name chip.
//
// - Holds `showName` state in a React context so header components can read or
//   toggle the visibility flag.
// - Exposes `HeaderNameVisibilityProvider` to wrap layouts and
//   `useHeaderNameVisibility` to consume the state.
//
// Accessibility
// - Centralizing the visibility flag prevents surprising layout shifts as users
//   navigate or scroll.
// - Hook consumers can coordinate focus management when the name chip appears or
//   hides.
//
// How to customize
// - Add more metadata to the context (e.g., current section) if header behavior
//   expands.
// - Wire in persistence (localStorage) or thresholds if you tie visibility to
//   scroll cues.
// -----------------------------------------------------------------------------

import * as React from "react";

const HeaderNameVisibilityContext = React.createContext({
  showName: true,
  // noop default; real function provided by the provider
  setShowName: () => {},
});

export function HeaderNameVisibilityProvider({ children }) {
  const [showName, setShowName] = React.useState(true);

  const value = React.useMemo(
    () => ({ showName, setShowName }),
    [showName]
  );

  return (
    <HeaderNameVisibilityContext.Provider value={value}>
      {children}
    </HeaderNameVisibilityContext.Provider>
  );
}

export function useHeaderNameVisibility() {
  return React.useContext(HeaderNameVisibilityContext);
}
