// src/components/resume/CertificationCard.jsx
// Polished visuals for verifiable vs non-verifiable certifications

import * as React from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function CertificationCard({ item }) {
  const theme = useTheme();
  const { title, issuer, logoSrc, year, verifyUrl, institutionUrl } = item || {};

  const isVerifiable = Boolean(verifyUrl);

  // Custom teal to match your mock instead of generic "success"
  const teal =
    theme.palette.mode === "light" ? "#00b3a4" : "#26d3c3";
  const tealBorder = teal;
  const tealBgHover = alpha(teal, 0.08); // mint-ish

  // Wrapper: full card is a link only when verifiable
  const WrapperComponent = isVerifiable ? "a" : "div";
  const wrapperProps = isVerifiable
    ? {
      href: verifyUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `View verification for ${title}`,
    }
    : {};

  // Logo: for non-verifiable + institutionUrl, logo links to institution
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
        gap: 1,
        p: 1.5,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: isVerifiable ? tealBorder : theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        textDecoration: "none",
        color: "inherit", // avoid blue/purple link titles
        transition: "border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",
        // Hover: strong state ONLY for verifiable cards
        "&:hover": isVerifiable
          ? {
            borderColor: tealBorder,
            backgroundColor: tealBgHover,
            transform: "translateY(-1px)",
            boxShadow: theme.shadows[2],
          }
          : {
            // Non-verifiable: minimal hover (almost neutral)
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
          },
        "&:focus-visible": isVerifiable
          ? {
            outline: `1px solid ${tealBorder}`,
            outlineOffset: 1,
          }
          : undefined,
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
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
                sx={{ ml: 0.25, color: teal }}
              />
            </Tooltip>
          )}
        </Box>
      </Stack>

      {logoSrc && (
        <Box
          component={LogoWrapperComponent}
          {...logoWrapperProps}
          sx={{ display: "inline-flex", ml: 2 }}
        >
          <Avatar
            src={logoSrc}
            alt={issuer || title}
            variant="rounded"
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
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
