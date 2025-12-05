// src/components/Resume/ResumeView.jsx
// Consolidated resume view with all internal components
// Migrated from separate files on 2025-12-05
// Version 2.0: Theme-first styling

import * as React from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Collapse,
  IconButton,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

// Icons
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import FlagIcon from "@mui/icons-material/Flag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PlaceIcon from "@mui/icons-material/Place";
import GppGoodIcon from "@mui/icons-material/GppGood";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SecurityIcon from "@mui/icons-material/Security";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

// Data
import { HERO, META, RECRUITER_ESSENTIALS as RE } from "../../content/resumeData.js";
import { EDUCATION, CERTIFICATIONS } from "../../content/educationData.js";
import { EXPERIENCE } from "../../content/resumeData.js";

// Assets
import headshot from "../../assets/headshot-sergio.png";

// Hooks
import { useLocalTime } from "../../hooks/useLocalTime.js";
import { computeTimeDiff } from "../../utils/timeZone.js";

const EN_AUDIO_SRC = "/audio/SergioAntezana-US.mp3";
const ES_AUDIO_SRC = "/audio/SergioAntezana-BO.mp3";
const US_FLAG_SRC = "/flags/us.svg";
const BO_FLAG_SRC = "/flags/bo.svg";

// ============================================================================
// INTERNAL COMPONENTS
// ============================================================================

/**
 * Flag component for pronunciation buttons
 */
function Flag({ src, alt }) {
  const theme = useTheme();

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: theme.spacing(2.25),
        height: theme.spacing(1.5),
        display: "block",
        borderRadius: theme.spacing(0.5),
        objectFit: "cover",
        m: 0,
      }}
    />
  );
}

/**
 * Name with pronunciation audio buttons
 */
function NameWithPronunciation({ name }) {
  const theme = useTheme();
  const enRef = React.useRef(null);
  const esRef = React.useRef(null);
  const [playingId, setPlayingId] = React.useState(null);

  const stopAll = () => {
    [enRef.current, esRef.current].forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const handleToggle = (id) => {
    const ref = id === "en" ? enRef.current : esRef.current;
    if (!ref) return;

    if (playingId === id && !ref.paused) {
      ref.pause();
      ref.currentTime = 0;
      setPlayingId(null);
      return;
    }

    stopAll();

    ref
      .play()
      .then(() => setPlayingId(id))
      .catch(() => {});
  };

  React.useEffect(() => {
    const en = enRef.current;
    const es = esRef.current;
    if (!en && !es) return;

    const handleEnded = () => setPlayingId(null);

    en?.addEventListener("ended", handleEnded);
    es?.addEventListener("ended", handleEnded);

    return () => {
      en?.removeEventListener("ended", handleEnded);
      es?.removeEventListener("ended", handleEnded);
    };
  }, []);

  const pillSx = (isActive) => ({
    minWidth: "auto",
    padding: theme.spacing(0.25, 0.75),
    gap: theme.spacing(1),
    borderRadius: 999,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      fontSize: theme.typography.body1.fontSize,
      margin: 0,
    },
    boxShadow: isActive
      ? `0 0 0 ${theme.spacing(0.375)} ${alpha(theme.palette.primary.main, 0.2)}`
      : "none",
    transition: theme.transitions.create(["box-shadow"], {
      duration: theme.transitions.duration.short,
    }),
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(0.25) }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: theme.spacing(1),
          rowGap: theme.spacing(0.75),
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: theme.typography.fontWeightSemiBold }}
        >
          {name}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Hear English pronunciation">
            <span>
              <Button
                size="small"
                variant={playingId === "en" ? "contained" : "outlined"}
                onClick={() => handleToggle("en")}
                aria-label="Play English pronunciation of Sergio Antezana"
                sx={pillSx(playingId === "en")}
              >
                <Flag src={US_FLAG_SRC} alt="US flag" />
                <VolumeUpIcon />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Escuchar pronunciación en español">
            <span>
              <Button
                size="small"
                variant={playingId === "es" ? "contained" : "outlined"}
                onClick={() => handleToggle("es")}
                aria-label="Reproducir pronunciación en español de Sergio Antezana"
                sx={pillSx(playingId === "es")}
              >
                <Flag src={BO_FLAG_SRC} alt="Bandera de Bolivia" />
                <VolumeUpIcon />
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Box>

      <audio ref={enRef} src={EN_AUDIO_SRC} preload="none" />
      <audio ref={esRef} src={ES_AUDIO_SRC} preload="none" />
    </Box>
  );
}

/**
 * Meta row for contact/availability info
 */
function MetaRow({ icon, primary, secondary, href }) {
  const theme = useTheme();
  const Wrapper = href ? "a" : Box;
  const wrapperProps = href
    ? {
        href,
        style: { textDecoration: "none", color: "inherit" },
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
          borderRadius: theme.spacing(1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.action.hover,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Box
          component={Wrapper}
          {...wrapperProps}
          sx={{
            display: "block",
            fontWeight: theme.typography.fontWeightMedium,
            ...theme.typography.body2,
          }}
        >
          {primary}
        </Box>
        {secondary && (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {secondary}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

/**
 * Label-value row for recruiter essentials
 */
function LabelValueRow({ icon, label, value }) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.action.hover,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: theme.spacing(0.25) }}
        >
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </Box>
    </Stack>
  );
}

/**
 * Single experience era item with expand/collapse
 */
function EraItem({ era, open, onToggle, isLast }) {
  const theme = useTheme();
  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.divider;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "stretch",
        gap: theme.spacing(2),
        pb: isLast ? 0 : theme.spacing(3),
        position: "relative",
        "&:hover .era-icon-box": {
          borderColor: open ? activeColor : theme.palette.text.primary,
          transform: "scale(1.05)",
        },
      }}
    >
      {/* Left Column: Icon + Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: theme.spacing(4),
        }}
      >
        <Box
          className="era-icon-box"
          sx={{
            width: theme.spacing(4),
            height: theme.spacing(4),
            borderRadius: "50%",
            border: `${theme.spacing(0.25)} solid`,
            borderColor: open ? activeColor : inactiveColor,
            color: open ? activeColor : theme.palette.text.secondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            transition: theme.transitions.create(["all"], {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeOut,
            }),
            boxShadow: open
              ? `0 0 0 ${theme.spacing(0.5)} ${alpha(activeColor, 0.16)}`
              : "none",
          }}
        >
          <WorkOutlineIcon sx={{ fontSize: theme.typography.body1.fontSize }} />
        </Box>

        {!isLast && (
          <Box
            sx={{
              width: theme.spacing(0.25),
              bgcolor: open ? alpha(activeColor, 0.4) : inactiveColor,
              flexGrow: 1,
              mt: theme.spacing(-0.5),
              transition: theme.transitions.create(["background-color"], {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeOut,
              }),
            }}
          />
        )}
      </Box>

      {/* Right Column */}
      <Box sx={{ flexGrow: 1, pt: theme.spacing(0.5) }}>
        <Box
          component="button"
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${era.id}-content`}
          aria-label={`${era.title} details`}
          sx={{
            width: "100%",
            border: "none",
            background: "none",
            padding: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: theme.spacing(1),
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{
                fontWeight: theme.typography.fontWeightSemiBold,
                lineHeight: theme.typography.subtitle1.lineHeight,
                color: open ? activeColor : theme.palette.text.primary,
                transition: theme.transitions.create(["color"], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeOut,
                }),
              }}
            >
              {era.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: theme.spacing(0.5) }}>
              {era.subtitle}
            </Typography>
          </Box>

          <Box sx={{ color: theme.palette.text.secondary, mt: theme.spacing(0.25) }}>
            {open ? "▲" : "▼"}
          </Box>
        </Box>

        <Collapse in={open}>
          <Box id={`${era.id}-content`}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: theme.spacing(1), maxWidth: "70ch" }}
            >
              {era.intro}
            </Typography>
            <Box
              component="ul"
              sx={{
                pl: theme.spacing(2.5),
                m: 0,
                mt: theme.spacing(1),
                maxWidth: "70ch",
              }}
            >
              {era.bullets.map((item) => (
                <li key={item}>
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>

            {era.tags?.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: theme.spacing(1.75),
                  flexWrap: "wrap",
                  gap: theme.spacing(1),
                }}
              >
                {era.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: theme.spacing(1),
                      ...theme.typography.caption,
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}

/**
 * Education card component
 */
function EducationCard({ item }) {
  const theme = useTheme();
  const { degree, school, year, logoSrc, institutionUrl } = item || {};

  const LogoWrapperComponent = institutionUrl ? "a" : "div";
  const logoWrapperProps = institutionUrl
    ? {
        href: institutionUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Visit ${school || degree}`,
      }
    : {};

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(1),
        p: theme.spacing(1.5),
        borderRadius: theme.spacing(2.5),
        border: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        transition: theme.transitions.create(["border-color", "background-color"], {
          duration: theme.transitions.duration.shorter,
        }),
        "&:hover": {
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Stack spacing={0.25} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
          {degree}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {school}
          {year ? ` · ${year}` : null}
        </Typography>
      </Stack>

      {logoSrc && (
        <Box component={LogoWrapperComponent} {...logoWrapperProps} sx={{ display: "inline-flex", ml: theme.spacing(2) }}>
          <Avatar
            src={logoSrc}
            alt={school || degree}
            variant="rounded"
            sx={{
              width: theme.spacing(5),
              height: theme.spacing(5),
              borderRadius: theme.spacing(2),
            }}
          />
        </Box>
      )}
    </Box>
  );
}

/**
 * Certification card component
 */
function CertificationCard({ item }) {
  const theme = useTheme();
  const { title, issuer, logoSrc, year, verifyUrl, institutionUrl } = item || {};

  const isVerifiable = Boolean(verifyUrl);

  const verifiedColor = theme.palette.info.main;
  const verifiedBgHover = alpha(theme.palette.info.main, 0.08);

  const WrapperComponent = isVerifiable ? "a" : "div";
  const wrapperProps = isVerifiable
    ? {
        href: verifyUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `View verification for ${title}`,
      }
    : {};

  const LogoWrapperComponent = !isVerifiable && institutionUrl ? "a" : "div";
  const logoWrapperProps =
    !isVerifiable && institutionUrl
      ? {
          href: institutionUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `Visit ${issuer || title}`,
        }
      : {};

  return (
    <Box
      component={WrapperComponent}
      {...wrapperProps}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing(1),
        p: theme.spacing(1.5),
        borderRadius: theme.spacing(2.5),
        border: `${theme.spacing(0.125)} solid ${
          isVerifiable ? verifiedColor : theme.palette.divider
        }`,
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        color: "inherit",
        transition: theme.transitions.create(
          ["border-color", "background-color", "box-shadow", "transform"],
          { duration: theme.transitions.duration.shorter }
        ),
        "&:hover": isVerifiable
          ? {
              borderColor: verifiedColor,
              backgroundColor: verifiedBgHover,
              transform: `translateY(-${theme.spacing(0.125)})`,
              boxShadow: theme.shadows[2],
            }
          : {
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.background.paper,
            },
        "&:focus-visible": isVerifiable
          ? {
              outline: `${theme.spacing(0.125)} solid ${verifiedColor}`,
              outlineOffset: 1,
            }
          : undefined,
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {issuer}
            {year ? ` · ${year}` : null}
          </Typography>

          {isVerifiable && (
            <Tooltip title="View online verification">
              <VerifiedOutlinedIcon
                fontSize="small"
                sx={{ ml: theme.spacing(0.25), color: verifiedColor }}
              />
            </Tooltip>
          )}
        </Box>
      </Stack>

      {logoSrc && (
        <Box component={LogoWrapperComponent} {...logoWrapperProps} sx={{ display: "inline-flex", ml: theme.spacing(2) }}>
          <Avatar
            src={logoSrc}
            alt={issuer || title}
            variant="rounded"
            sx={{
              width: theme.spacing(5),
              height: theme.spacing(5),
              borderRadius: theme.spacing(2),
              "& img": {
                objectFit: "contain",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ResumeView = React.forwardRef(function ResumeView(_props, ref) {
  const theme = useTheme();
  const localTime = useLocalTime("America/New_York");
  const timeDiff = computeTimeDiff("America/New_York");

  const timeSecondary =
    timeDiff === "Same time" ? "Same time – Eastern Time (ET)" : `${timeDiff} – Eastern Time (ET)`;

  const timeSecondaryRE =
    timeDiff === "Same time" ? `Same time – ${RE.timeZoneLabel}` : `${timeDiff} – ${RE.timeZoneLabel}`;

  const certsByCategory = React.useMemo(() => {
    const aiCerts = CERTIFICATIONS.filter((c) => c.category === "AI");
    const uxRelatedCerts = CERTIFICATIONS.filter((c) =>
      ["UX", "Human Factors", "Accessibility"].includes(c.category)
    );
    const agileCerts = CERTIFICATIONS.filter((c) => c.category === "Agile");

    return { aiCerts, uxRelatedCerts, agileCerts };
  }, []);

  const [openEras, setOpenEras] = React.useState(() => {
    const initial = {};
    EXPERIENCE.eras.forEach((era) => {
      initial[era.id] = era.id === "era4";
    });
    return initial;
  });

  const [showFederalPrograms, setShowFederalPrograms] = React.useState(false);

  const toggleEra = (id) => {
    setOpenEras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box>
      {/* ======== HERO SECTION ======== */}
      <Box id="resume-hero" ref={ref}>
        <Typography
          variant="overline"
          sx={{
            textTransform: "uppercase",
            letterSpacing: theme.typography.button.letterSpacing,
            color: theme.palette.primary.main,
            display: "inline-flex",
            alignItems: "center",
            gap: theme.spacing(0.75),
            "&::before": {
              content: "''",
              display: "inline-block",
              width: theme.spacing(1),
              height: theme.spacing(1),
              borderRadius: 999,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {HERO.roleTag}
        </Typography>

        <Box
          sx={{
            mt: theme.spacing(1),
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
            columnGap: theme.spacing(2),
            rowGap: theme.spacing(2),
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Avatar
            alt={HERO.name}
            src={headshot}
            sx={{
              width: theme.spacing(18.75),
              height: theme.spacing(18.75),
              justifySelf: { xs: "flex-start", md: "flex-start" },
            }}
          />

          <Box>
            <NameWithPronunciation name={HERO.name} />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: theme.spacing(1),
                maxWidth: "40rem",
                fontWeight: theme.typography.fontWeightSemiBold,
              }}
            >
              {HERO.blurb[0]}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: theme.spacing(1), maxWidth: "40rem" }}>
              {HERO.blurb[1]}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ======== META CARD ======== */}
      <Box
        role="complementary"
        aria-label="Current role and contact information"
        sx={{
          borderRadius: theme.spacing(2),
          border: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.common.white,
          boxShadow: theme.shadows[3],
          px: { xs: theme.spacing(2), md: theme.spacing(3) },
          py: { xs: theme.spacing(2), md: theme.spacing(2.5) },
          mt: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            mb: theme.spacing(1.5),
          }}
        >
          <Typography
            variant="caption"
            sx={{
              letterSpacing: theme.typography.button.letterSpacing,
              textTransform: "uppercase",
              color: theme.palette.text.secondary,
            }}
          >
            Current role & availability
          </Typography>
        </Box>

        <Grid container columnSpacing={{ xs: 2, md: 4 }} rowSpacing={{ xs: 1.75, md: 1.5 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1.5}>
              <MetaRow icon={<WorkOutlineIcon fontSize="small" />} primary={META.title} secondary={META.subtitle} />
              <MetaRow icon={<WorkOutlineIcon fontSize="small" />} primary={META.openTo} />
              <MetaRow icon={<FlagIcon fontSize="small" />} primary={META.location} />
              <MetaRow icon={<AccessTimeIcon fontSize="small" />} primary={localTime} secondary={timeSecondary} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1.5}>
              <MetaRow icon={<EmailIcon fontSize="small" />} primary={META.email} href={`mailto:${META.email}`} />
              <MetaRow icon={<LanguageIcon fontSize="small" />} primary={META.linkedinLabel} href={META.linkedin} />
              <MetaRow icon={<LanguageIcon fontSize="small" />} primary={META.githubLabel} href={META.github} />
              <MetaRow icon={<WcIcon fontSize="small" />} primary={META.pronouns} />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* ======== RECRUITER ESSENTIALS CARD ======== */}
      <Box
        sx={{
          borderRadius: theme.spacing(2),
          border: `${theme.spacing(0.125)} solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.common.white,
          boxShadow: theme.shadows[3],
          px: { xs: theme.spacing(2), md: theme.spacing(3) },
          py: { xs: theme.spacing(2), md: theme.spacing(2.5) },
          mt: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: theme.spacing(2),
            gap: theme.spacing(1),
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: theme.typography.button.letterSpacing,
                textTransform: "uppercase",
                color: theme.palette.text.secondary,
              }}
            >
              Recruiter essentials
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: theme.spacing(0.25) }}>
              Common EEO, work authorization, and clearance answers.
            </Typography>
          </Box>

          <Tooltip title="These answers match the standard screening questions I fill on job applications." arrow>
            <IconButton size="small" aria-label="More information about this metadata">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container columnSpacing={{ xs: 2, md: 4 }} rowSpacing={{ xs: 2, md: 0 }}>
          <Grid item xs={12} md={8}>
            <Stack spacing={1.75}>
              <LabelValueRow
                icon={<ContactMailIcon fontSize="small" />}
                label="Contact information"
                value={
                  <>
                    {RE.email}
                    <br />
                    {RE.phone}
                  </>
                }
              />
              <LabelValueRow icon={<PlaceIcon fontSize="small" />} label="Location" value={RE.location} />
              <LabelValueRow
                icon={<AccessTimeIcon fontSize="small" />}
                label="Time zone"
                value={
                  <>
                    {localTime}
                    <br />
                    <Typography variant="caption" color="text.secondary" component="span">
                      {timeSecondaryRE}
                    </Typography>
                  </>
                }
              />
              <LabelValueRow icon={<WcIcon fontSize="small" />} label="Gender / pronouns" value={RE.pronouns} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={1.75}>
              <LabelValueRow
                icon={<GppGoodIcon fontSize="small" />}
                label="Citizenship / work authorization"
                value={RE.citizenship}
              />
              <LabelValueRow
                icon={<MilitaryTechIcon fontSize="small" />}
                label="Protected veteran status"
                value={RE.veteranStatus}
              />
              <LabelValueRow icon={<Diversity3Icon fontSize="small" />} label="Race / ethnicity" value={RE.raceEthnicity} />
              <LabelValueRow icon={<SecurityIcon fontSize="small" />} label="US clearance" value={RE.clearanceStatus} />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* ======== EXPERIENCE SECTION ======== */}
      <Box id="experience" sx={{ mt: theme.spacing(4) }}>
        <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightSemiBold }}>
          {EXPERIENCE.company}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: theme.spacing(0.5) }}>
          {EXPERIENCE.tenure}
        </Typography>

        <Box sx={{ mt: theme.spacing(1.5) }}>
          <Chip label={EXPERIENCE.currentEraLabel} size="small" color="primary" variant="outlined" />
        </Box>

        <Box sx={{ mt: theme.spacing(2.5) }}>
          {EXPERIENCE.eras.map((era, index) => (
            <EraItem
              key={era.id}
              era={era}
              open={openEras[era.id]}
              onToggle={() => toggleEra(era.id)}
              isLast={index === EXPERIENCE.eras.length - 1}
            />
          ))}
        </Box>

        <Box sx={{ mt: theme.spacing(3) }}>
          <Box sx={{ mt: theme.spacing(2) }}>
            <Box
              component="button"
              type="button"
              sx={{
                background: "none",
                border: "none",
                padding: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                textAlign: "left",
                color: "inherit",
                font: "inherit",
              }}
              onClick={() => setShowFederalPrograms((prev) => !prev)}
              aria-expanded={showFederalPrograms ? "true" : "false"}
              aria-controls="federal-programs-panel"
              aria-label={
                showFederalPrograms
                  ? "Collapse federal programs experience"
                  : "Expand federal programs experience"
              }
            >
              <Typography variant="subtitle2">Federal programs experience</Typography>

              <ExpandMoreIcon
                fontSize="small"
                sx={{
                  transform: showFederalPrograms ? "rotate(180deg)" : "rotate(0deg)",
                  transition: theme.transitions.create(["transform"], {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              />
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: theme.spacing(0.5) }}>
              18+ federal programs across FBI, DoD, DHS, DOJ, FDA, DIA, ODNI, and more.
            </Typography>

            <Collapse in={showFederalPrograms} timeout="auto">
              <Box
                component="ul"
                id="federal-programs-panel"
                sx={{
                  mt: theme.spacing(1),
                  pl: theme.spacing(2.5),
                  m: 0,
                  display: "grid",
                  rowGap: theme.spacing(0.75),
                }}
              >
                {EXPERIENCE.federalPrograms?.map((program) => (
                  <Typography
                    key={program}
                    component="li"
                    variant="body2"
                    sx={{ listStylePosition: "outside" }}
                  >
                    {program}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>

      {/* ======== EDUCATION & CERTIFICATIONS ======== */}
      <Box id="education-certifications" sx={{ mt: theme.spacing(4) }}>
        <Stack spacing={3} sx={{ mt: theme.spacing(1) }}>
          {/* Certifications */}
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: theme.typography.button.letterSpacing,
                  color: theme.palette.text.secondary,
                }}
              >
                AI & Emerging Technology
              </Typography>

              <Grid container spacing={2} sx={{ "& > .MuiGrid-item": { display: "flex" } }}>
                {certsByCategory.aiCerts.map((cert) => (
                  <Grid key={cert.id || cert.title} item xs={12} sm={12} md={12} lg={6}>
                    <CertificationCard item={cert} />
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Stack spacing={1.5}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: theme.typography.button.letterSpacing,
                  color: theme.palette.text.secondary,
                }}
              >
                UX, Human Factors & Accessibility
              </Typography>

              <Grid container spacing={2} sx={{ "& > .MuiGrid-item": { display: "flex" } }}>
                {certsByCategory.uxRelatedCerts.map((cert) => (
                  <Grid key={cert.id || cert.title} item xs={12} sm={12} md={12} lg={6}>
                    <CertificationCard item={cert} />
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Stack spacing={1.5}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: theme.typography.button.letterSpacing,
                  color: theme.palette.text.secondary,
                }}
              >
                Agile & Coaching
              </Typography>

              <Grid container spacing={2} sx={{ "& > .MuiGrid-item": { display: "flex" } }}>
                {certsByCategory.agileCerts.map((cert) => (
                  <Grid key={cert.id || cert.title} item xs={12} sm={12} md={12} lg={6}>
                    <CertificationCard item={cert} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>

          {/* Education */}
          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              component="h3"
              sx={{
                letterSpacing: theme.typography.button.letterSpacing,
                color: theme.palette.text.secondary,
              }}
            >
              Education & Professional Development
            </Typography>

            <Grid container spacing={2} sx={{ "& > .MuiGrid-item": { display: "flex" } }}>
              {EDUCATION.map((item) => (
                <Grid key={item.id || `${item.school}-${item.degree}`} item xs={12} sm={12} md={12} lg={6}>
                  <EducationCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
});

export default ResumeView;
