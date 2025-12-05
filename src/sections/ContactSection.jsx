// -----------------------------------------------------------------------------
// sections/ContactSection.jsx
// Contact/CTA block for outreach.
//
// - Renders contact channels (email, socials) and possibly a contact form/CTA.
// - Stateless beyond click handlers; data passed from parent or constants.
//
// Accessibility
// - Use a clear heading and descriptive link text; ensure tap targets are large.
// - Provide aria-labels for icon-only links and respect focus outlines.
//
// How to customize
// - Add calendars, forms, or availability widgets; wire submissions to services.
// - Rearrange channels to prioritize preferred contact methods.
// -----------------------------------------------------------------------------
// Wrapper around <Section> for the "Contact" content on the home page.

import * as React from "react";
import { Stack, Typography, Box, Link, Paper } from "@mui/material";
import Section from "../components/Section";
import ContactForm from "../components/contact/ContactForm";

export default function ContactSection() {
  return (
    <Section id="contact" title="Contact" variant="dark" layout="split" sx={{ width: "900px !important", }} >
      {/* Add this INSIDE your existing Contact section container,
    AFTER your current contact paragraph text */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
          gap: { xs: 3, md: 2 },
          mt: { xs: 4, md: 6 },
        }}
      >
        {/* LEFT COLUMN – “How to get in touch” */}
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 0.75 }}
            >
              How to get in touch
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Send over an email or message me on LinkedIn.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              Email
            </Typography>
            <Link
              href="mailto:santezana@nayas.com"
              underline="hover"
              color="inherit"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 500,
              }}
            >
              {/* you can add an icon here if you want */}
              <span>santezana@nayas.com</span>
            </Link>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              LinkedIn
            </Typography>
            <Link
              href="https://www.linkedin.com/in/santezana/"
              target="_blank"
              rel="noreferrer"
              underline="hover"
              color="inherit"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 500,
              }}
            >
              {/* LinkedIn icon here if you like */}
              <span>@santezana</span>
            </Link>
          </Box>
        </Stack>

        {/* RIGHT COLUMN – “Let us talk” */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            // Always dark, in both light + dark themes
            bgcolor: "rgba(255,255,255,0.04)",
            width: "100%",
            maxWidth: { xs: "100%", md: "82ch" },
            alignSelf: "flex-start",
            justifySelf: { xs: "stretch", md: "end" },
          }}
        >

          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Let us talk
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                I am open to discussing new product ideas, UX challenges, or
                interesting opportunities. Feel free to reach out.
              </Typography>
            </Box>

            <ContactForm />
          </Stack>
        </Paper>
      </Box>

    </Section>
  );
}
