import * as React from "react";
import { Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function ScrollIndicator({ targetId = "about" }) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let behavior = "smooth";
    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersReduced = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      behavior = prefersReduced ? "auto" : "smooth";
    }

    el.scrollIntoView({
      behavior,
      block: "start",
    });
  };

  return (
    <Box
      component="button"
      type="button"
      onClick={handleScroll}
      aria-label="Scroll down to learn more"
      sx={{
        position: "absolute",
        bottom: { xs: 16, sm: 24 },
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "999px",
        border: "1px solid",
        borderColor: "text.primary",
        backgroundColor: "background.paper",
        color: "text.primary",
        cursor: "pointer",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
        boxShadow: 1,
        p: 0,
        outline: "none",
        "&::-moz-focus-inner": {
          border: 0,
        },
        "&:hover": {
          transform: "translateX(-50%) translateY(3px)",
          boxShadow: 3,
          borderColor: "primary.main",
        },
        "&:focus-visible": {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
        },
        "@keyframes bounceDown": {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(4px)" },
        },
        animation: "bounceDown 1.8s infinite ease-in-out",
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      }}
    >
      <KeyboardArrowDownIcon fontSize="medium" />
    </Box>
  );
}
