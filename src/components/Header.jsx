// Updated: 2025-11-29 ·  // Saturday, November 29, 2025

// -----------------------------------------------------------------------------
// components/Header.jsx
// Site header with navigation, theme controls, and accessibility info.
//
// - Receives `mode`, `setMode`, active section info, and scroll handlers from
//   LayoutShell/App.
// - Manages small local state for menus or responsive toggles (e.g., drawer).
//
// Accessibility
// - Uses nav landmarks and lists for links; ensures focusable elements for menu
//   toggles.
// - Theme switch and nav links include aria-labels and keyboard support.
// - Accessibility popover describes structural and behavioral features.
// -----------------------------------------------------------------------------

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Popover,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";

const PRIMARY_SECTIONS = [
  { id: "about", label: "About", to: "/" },
  { id: "resume", label: "Resume", to: "/resume" },
  { id: "portfolio", label: "Portfolio", to: "/portfolio" },
  { id: "contact", label: "Contact", to: "/#contact" },
];

export default function Header({ mode, setMode }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  // Accessibility popover anchor (used for both desktop icon and mobile menu item)
  const [accessibilityAnchor, setAccessibilityAnchor] = React.useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { showName } = useHeaderNameVisibility();
  const location = useLocation();
  const navigate = useNavigate();

  // scroll shadow/blur
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const isMenuOpen = Boolean(menuAnchor);
  const mobileMenuId = "primary-navigation-menu";

  const isAccessibilityOpen = Boolean(accessibilityAnchor);
  const accessibilityPopoverId = isAccessibilityOpen
    ? "accessibility-popover"
    : undefined;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // clicking the name → scroll to top of current page
  const handleNameClick = (event) => {
    event.preventDefault(); // always prevent route change
    scrollToTop();
  };

  // handle primary nav clicks
  const handlePrimaryClick = (event, item) => {
    if (item.id === "about") {
      // About should always take user to "/" and scroll to top
      event.preventDefault();

      const doScroll = () => {
        // allow React to finish navigation/render first
        setTimeout(scrollToTop, 0);
      };

      if (location.pathname !== "/") {
        navigate("/");
        doScroll();
      } else {
        scrollToTop();
      }
    }
    // other items use normal RouterLink navigation
  };

  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleOpenAccessibility = (anchorEl) => {
    setAccessibilityAnchor(anchorEl);
  };

  const handleCloseAccessibility = () => {
    setAccessibilityAnchor(null);
  };

  return (
    <AppBar
      component="header"
      position="fixed"
      elevation={scrolled ? 3 : 0}
      color="transparent"
      sx={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
        transition:
          "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        backgroundColor: (t) =>
          scrolled
            ? t.palette.mode === "light"
              ? "rgba(255,255,255,0.9)"
              : "rgba(10,10,10,0.9)"
            : "transparent",
        color: (t) => t.palette.text.primary,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, sm: 4 },
          minHeight: { xs: 56, sm: 72 },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* LEFT: desktop nav OR spacer */}
        {isDesktop ? (
          <Stack
            direction="row"
            spacing={3}
            component="nav"
            aria-label="Primary"
            sx={{ flex: 1 }}
          >
            {PRIMARY_SECTIONS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                size="small"
                disableRipple
                sx={(t) => ({
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  "&:hover": {
                    textDecoration: "underline",
                    textUnderlineOffset: "0.25em",
                    backgroundColor: "transparent",
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${t.palette.primary.main}`,
                    outlineOffset: 3,
                  },
                })}
                component={RouterLink}
                to={item.to}
                onClick={(event) => handlePrimaryClick(event, item)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}

        {/* ⭐ NAME – visibility controlled by HeaderNameVisibilityContext */}
        <Box sx={{ px: 2 }}>
          {showName && (
            <Box
              component={RouterLink}
              to="/"
              onClick={handleNameClick}
              aria-label="Scroll to top"
              sx={(t) => ({
                display: "flex",
                alignItems: "center",
                padding: t.spacing(0.75, 1.5),
                borderRadius: "999px",
                background: "transparent",
                cursor: "pointer",
                font: "inherit",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: t.palette.text.primary,
                outline: "none",
                "&:hover": {
                  backgroundColor: t.palette.action.hover,
                },
                "&:focus-visible": {
                  outline: `2px solid ${t.palette.primary.main}`,
                  outlineOffset: 3,
                },
              })}
            >
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ fontWeight: 600 }}
              >
                Sergio Antezana
              </Typography>
            </Box>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Accessibility icon – desktop only */}
          {isDesktop && (
            <Tooltip title="Accessibility information">
              <IconButton
                color="inherit"
                aria-label="Open accessibility information"
                aria-describedby={accessibilityPopoverId}
                onClick={(event) =>
                  handleOpenAccessibility(event.currentTarget)
                }
                sx={{ ml: 0.5 }}
              >
                <AccessibilityNewRoundedIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Theme toggle */}
          <IconButton
            color="inherit"
            onClick={toggleMode}
            aria-label="Toggle light and dark mode"
            sx={{ ml: 0.5 }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Mobile hamburger */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? mobileMenuId : undefined}
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile nav menu */}
      {!isDesktop && (
        <Menu
          anchorEl={menuAnchor}
          id={mobileMenuId}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {PRIMARY_SECTIONS.map((item) => (
            <MenuItem
              key={item.id}
              component={RouterLink}
              to={item.to}
              onClick={(event) => {
                handleCloseMenu();
                handlePrimaryClick(event, item);
              }}
            >
              <Typography
                textTransform="uppercase"
                sx={{ letterSpacing: "0.12em", fontSize: "0.8rem" }}
              >
                {item.label}
              </Typography>
            </MenuItem>
          ))}

          {/* Accessibility item inside mobile menu */}
          <MenuItem
            onClick={(event) => {
              handleOpenAccessibility(event.currentTarget);
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessibilityNewRoundedIcon fontSize="small" />
              <Typography
                textTransform="uppercase"
                sx={{ letterSpacing: "0.12em", fontSize: "0.8rem" }}
              >
                Accessibility
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      )}

      {/* Accessibility popover – shared for desktop + mobile */}
      <Popover
        id={accessibilityPopoverId}
        open={isAccessibilityOpen}
        anchorEl={accessibilityAnchor}
        onClose={handleCloseAccessibility}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: (t) => ({
              p: 2.5,
              pt: 3.5, // extra space for the close button
              maxWidth: 460,
              borderRadius: 2,
              boxShadow: t.shadows[8],
              position: "relative",
              bgcolor:
                t.palette.mode === "dark"
                  ? "rgba(18,18,18,0.98)"
                  : "rgba(255,255,255,0.98)",
            }),
          },
        }}
      >
        <Stack spacing={1.5}>
          {/* Close button – top-right */}
          <IconButton
            size="small"
            aria-label="Close accessibility information"
            onClick={handleCloseAccessibility}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Accessibility on this site
          </Typography>

          <Typography variant="body2">
            This portfolio is designed to work well with keyboard, assistive
            technologies, and different visual preferences.
          </Typography>

          <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
            <Typography component="li" variant="body2">
              <strong>Skip link and landmarks:</strong> A skip-to-content link
              and <code>&lt;main&gt;</code> region let keyboard users bypass the
              header, and sections reuse semantic landmarks for clear structure.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Navigation and tab order:</strong> Primary navigation
              lives in a <code>&lt;nav&gt;</code> landmark with predictable tab
              order, visible focus outlines, and descriptive labels for menus
              and the site name link.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Headings and section structure:</strong> Each section uses
              a shared <code>Section</code> wrapper with consistent headings and{" "}
              <code>aria-labelledby</code> so screen readers can understand the
              page outline.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Forms and live feedback:</strong> The contact form has
              labels, required indicators, helper/error text, and success/error
              alerts that are announced to assistive technologies. A hidden
              honeypot field helps block bots without adding friction.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Resume navigation and sidebar:</strong> Resume filters are
              exposed as a named <code>&lt;nav&gt;</code> with{" "}
              <code>aria-current</code> on the active view, and supporting
              details are grouped in a complementary region for context.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Motion and visual preferences:</strong> Scroll cues and
              subtle animations respect{" "}
              <code>prefers-reduced-motion</code>, and you can switch between
              light and dark themes to adjust contrast.
            </Typography>

            <Typography component="li" variant="body2">
              <strong>Descriptive labels:</strong> Social icons, case study
              links, and other interactive cards include descriptive ARIA labels
              so their purpose is announced clearly.
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary">
            Automated checks also verify headings, landmarks, and focusable
            elements. If you encounter any accessibility issues, please{" "}
            <Box
              component={RouterLink}
              to="/#contact"
              onClick={handleCloseAccessibility}
              sx={{
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: "0.15em",
              }}
            >
              send me a message
            </Box>
            .
          </Typography>
        </Stack>
      </Popover>
    </AppBar>
  );
}
