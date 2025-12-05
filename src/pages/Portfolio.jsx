// -----------------------------------------------------------------------------
// src/pages/Portfolio.jsx
// Portfolio landing page aggregating hero and core sections.
//
// - Acts as the "case study hub" once unlocked.
// - Uses CaseStudyCard for a concise, clearance-safe overview of each story.
// -----------------------------------------------------------------------------
import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import Section from "../components/Section";
import CaseStudyCard from "../components/CaseStudyCard";
import { usePageMeta } from "../hooks/usePageMeta";

const CASE_STUDY_PASSWORD =
  import.meta.env.VITE_CASE_STUDY_PASSWORD || "Youarehired!";

export default function PortfolioPage() {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("portfolio-unlocked") === "true";
  });

  usePageMeta({
    title: "Portfolio – Sergio Antezana | UX Systems & Design Ops",
    description:
      "Selected UX and product design work by Sergio Antezana, focusing on systems-level UX, design systems, and design operations for high-stakes, complex products.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CASE_STUDY_PASSWORD) {
      setUnlocked(true);
      setError("");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-unlocked", "true");
      }
    } else {
      setError("Check the password and try again.");
    }
  };

  // 🔐 Locked view
  if (!unlocked) {
    return (
      <Section variant="white" layout="stack" fullHeight>
        <Box
          sx={{
            maxWidth: "sm",
            margin: "0 auto",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            My Work
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These case studies are restricted and require a password to view. If
            you received a password in a recruiting email or conversation, enter
            it below to unlock a view of my work.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Do not have a password yet? Feel free to reach out via email or
            LinkedIn on the homepage and I will share more context when
            appropriate.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Password"
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                error={Boolean(error)}
                helperText={error || " "}
                FormHelperTextProps={{
                  role: error ? "alert" : undefined,
                }}
                autoComplete="off"
                fullWidth
              />
              <Button type="submit" variant="contained">
                Unlock portfolio
              </Button>
            </Stack>
          </Box>
        </Box>
      </Section>
    );
  }

  // 🔓 Unlocked view – hero + 2×2 bento grid
  return (
    <Section variant="white" titleComponent="h1">
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
        {/* Hero */}
        <Box
          sx={{
            mb: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              textTransform: "none",
              letterSpacing: 1.5,
              color: "text.secondary",
            }}
          >
           When users ask for simplicity, they want things to be clear, predictable, and empowering... not necessarily minimal.
          </Typography>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 720,
            }}
          >
            Systems-level UX for complex, high-stakes work.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 720 }}
          >
            These case studies describe my work at a process and outcomes level,
            with sensitive details abstracted or generalized. They focus on how
            I shape systems, reduce operational friction, and help teams ship
            products that scale.
          </Typography>
          <Typography
            variant="Caption"
            sx={{
              textTransform: "none",
              letterSpacing: 1.5,
              color: "text.secondary",
            }}
          >
            Some Projects Under Non-Disclosure Agreement <br />
            Details might be vague to protect client info.
          </Typography>
        </Box>

        {/* Bento grid: 
            Row 1: [wide][narrow]
            Row 2: [narrow][wide]
        */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(6, 1fr)",
            },
            pb: 4,
          }}
        >
          {/* Row 1 – wide left */}
          <CaseStudyCard
            title="Designing a low-code case management platform"
            problem="Led the end-to-end design of a low-code/no-code platform that empowers users to independently build and manage dynamic forms, workfl ows, user roles, organizational structures, dashboards, and modular widgets. This flexible system significantly reduced development dependency, enabling faster iteration cycles and improving operational efficiency across enterprise teams."
            outcomes={[
              "Enabled non-technical teams to configure workflows without code",
              "Reduced configuration time for new workflows by 30–50%",
              "Improved platform consistency, accessibility, and governance",
              "Created a scalable foundation for future programs and use cases",
            ]}
            to="/case-studies/low-code-case-management"
            sx={{
              gridColumn: { xs: "1 / -1", md: "1 / span 4" },
            }}
          />

          {/* Row 1 – narrow right */}
          <CaseStudyCard
            title="Designing my portfolio and résumé system"
            problem="My previous portfolio and résumé no longer reflected my systems-level work or leadership, and traditional UX portfolios over-emphasize visuals instead of decisions."
            role="Principal UX Designer · Systems & Narrative"
            outcomes={[
              "Rebuilt résumé and portfolio as a modular, data-driven system",
              "Created narrative-first, NDA-safe case study templates",
              "Designed an editorial, typography-led experience that reflects how I actually think",
              "Established a reusable foundation for all future case studies",
            ]}
            to="/case-studies/portfolio-and-resume-system"
            sx={{
              gridColumn: { xs: "1 / -1", md: "5 / span 2" },   // ⬅️ TOP RIGHT
            }}
          />


          {/* Row 2 – narrow left */}
          <CaseStudyCard
            title="Reimagining an internal intelligence platform"
            problem="Critical insights were buried across multiple tools, making it hard for busy stakeholders to get a confident picture quickly."
            role="Lead Product Designer · Research Partner"
            outcomes={[
              "Unified key workflows and views into a single experience",
              "Improved time-to-insight for core tasks",
              "Increased stakeholder confidence in data and decisions",
              "Enabled roadmap for future automation and integrations",
            ]}
            to="#coming-soon"
            sx={{
              gridColumn: { xs: "1 / -1", md: "1 / span 2" },
            }}
          />

          {/* Row 2 – wide right */}
          <CaseStudyCard
            title="Improving decision-making in a high-stakes analytical tool"
            problem="Analysts struggled with cognitive overload due to cluttered interfaces and fragmented information."
            role="Lead UX Researcher · Interaction Designer · Service Designer"
            outcomes={[
              "Improved task success on critical workflows",
              "Reduced cognitive load for expert users",
              "Streamlined triage and comparison flows",
              "Enabled faster, more confident decision-making",
            ]}
            to="#coming-soon"
            sx={{
              gridColumn: { xs: "1 / -1", md: "3 / span 4" },
            }}
          />
        </Box>
      </Box>
    </Section>
  );
}
