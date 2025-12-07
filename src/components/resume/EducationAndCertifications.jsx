// src/components/resume/EducationAndCertifications.jsx
// Education + Certifications section with small cards.
//
// Updated: 2025-12-01

import * as React from "react";
import { Stack, Typography, Grid } from "@mui/material";

import { EDUCATION, CERTIFICATIONS } from "../../content/educationData.js";
import EducationCard from "./EducationCard.jsx";
import CertificationCard from "./CertificationCard.jsx";

export default function EducationAndCertifications() {
  const hasEducation = EDUCATION && EDUCATION.length > 0;
  const hasCerts = CERTIFICATIONS && CERTIFICATIONS.length > 0;

  if (!hasEducation && !hasCerts) return null;

  return (
    <Stack spacing={3} sx={{ mt: 1 }}>
     
      {/* Certifications */}
      {hasCerts && (
        <Stack spacing={3}>
          {/* AI & Emerging Tech */}
          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1, color: "text.secondary" }}
            >
              AI & Emerging Technology
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{ "& > .MuiGrid-item": { display: "flex" } }}
            >
              {CERTIFICATIONS.filter((c) => c.category === "AI").map((cert) => (
                <Grid
                  key={cert.id || cert.title}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <CertificationCard item={cert} />
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* UX / HCI / Accessibility */}
          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1, color: "text.secondary" }}
            >
              UX, Human Factors & Accessibility
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{ "& > .MuiGrid-item": { display: "flex" } }}
            >
              {CERTIFICATIONS.filter((c) =>
                ["UX", "Human Factors", "Accessibility"].includes(c.category)
              ).map((cert) => (
                <Grid
                  key={cert.id || cert.title}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <CertificationCard item={cert} />
                </Grid>
              ))}
            </Grid>
          </Stack>

          {/* Agile & Coaching */}
          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1, color: "text.secondary" }}
            >
              Agile & Coaching
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{ "& > .MuiGrid-item": { display: "flex" } }}
            >
              {CERTIFICATIONS.filter((c) => c.category === "Agile").map((cert) => (
                <Grid
                  key={cert.id || cert.title}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                >
                  <CertificationCard item={cert} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
        
      )}
       {/* Education */}
      {hasEducation && (
        <Stack spacing={1.5}>
          <Typography
            variant="overline"
            component="h3"
            sx={{ letterSpacing: 1, color: "text.secondary" }}
          >
            Education & Professional Development
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ "& > .MuiGrid-item": { display: "flex" } }}
          >
            {EDUCATION.map((item) => (
              <Grid
                key={item.id || `${item.school}-${item.degree}`}
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
              >
                <EducationCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
