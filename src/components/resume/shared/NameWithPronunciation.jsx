// -----------------------------------------------------------------------------
// components/resume/shared/NameWithPronunciation.jsx
// Displays the candidate’s name with pronunciation guidance.
//
// - Accepts name text and optional pronunciation link/audio cue.
// - Stateless; simply formats text and auxiliary info from props.
//
// Accessibility
// - Provide aria-labels for pronunciation links or audio controls.
// - Ensure pronunciation text is readable and distinguishable from the name.
//
// How to customize
// - Add audio playback controls or IPA notation.
// - Swap layout (inline vs. stacked) to fit different hero designs.
// -----------------------------------------------------------------------------

import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { alpha } from "@mui/material/styles";

const EN_AUDIO_SRC = "/audio/SergioAntezana-US.mp3";
const ES_AUDIO_SRC = "/audio/SergioAntezana-BO.mp3";

const US_FLAG_SRC = "/flags/us.svg";
const BO_FLAG_SRC = "/flags/bo.svg";

function Flag({ src, alt }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: 18,
        height: 12,
        display: "block",
        borderRadius: 0.5,
        objectFit: "cover",
        m: 0, // no margins
      }}
    />
  );
}

export default function NameWithPronunciation({ name }) {
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

    ref.play()
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

  const pillSx = (isActive) => (theme) => ({
    minWidth: "auto",
    padding: "2px 6px",
    gap: 1,
    borderRadius: 999,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      fontSize: "1.05rem",
      margin: 0,
    },
    boxShadow: isActive
      ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
      : "none",
    transition: "box-shadow 160ms ease",
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 1,
          rowGap: 0.75,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          {/* ENGLISH */}
          <Tooltip title='Hear English pronunciation'>
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

          {/* SPANISH */}
          <Tooltip title='Escuchar pronunciación en español'>
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

      {/* Audio elements */}
      <audio ref={enRef} src={EN_AUDIO_SRC} preload="none" />
      <audio ref={esRef} src={ES_AUDIO_SRC} preload="none" />
    </Box>
  );
}
