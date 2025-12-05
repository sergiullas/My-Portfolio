// src/pages/CaseStudyLowCode.jsx
// Low-Code / No-Code Case Management Case Study
// Updated: 2025-12-02

import * as React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SectionTitle({ children }) {
  const theme = useTheme();
  return (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        fontWeight: 600,
        letterSpacing: 0.2,
        mb: 2,
        mt: { xs: 4, md: 6 },
        scrollMarginTop: theme.spacing(10),
      }}
    >
      {children}
    </Typography>
  );
}

export default function CaseStudyLowCode() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          // Slightly narrower column for comfortable reading
          "& > * + *": {
            mt: 2,
          },
        }}
      >
        {/* Tagline */}
        <Typography
          variant="overline"
          component="p"
          sx={{
            textTransform: "none",
            letterSpacing: 1.5,
            color: "text.secondary",
          }}
        >
          Rethinking how complex organizations build, adapt, and scale their
          workflows.
        </Typography>

        {/* Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.1,
            mt: 1,
            mb: 2,
          }}
        >
          Designing a Low-Code Case Management Platform
        </Typography>

        <Divider
          sx={{
            my: { xs: 3, md: 4 },
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
          }}
        />

        {/* Opening narrative */}
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Most case management systems grow by accumulation, with layers of
          customizations, legacy rules, and operational workarounds grafted on
          over years. When I joined the initiative, teams were struggling to
          maintain consistency across programs, and every new workflow required
          engineering support. The result was predictable: slow delivery,
          inconsistent experiences, and limited ability to scale.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          My role centered on creating a product foundation that empowered
          non-technical teams to configure their own workflows while preserving
          consistency, accessibility, and compliance across the organization.
        </Typography>

        <SectionTitle>Understanding the Landscape</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The platform needed to support diverse operational models: multi-step
          intake flows, role-based reviews, evidence submissions, conditional
          approvals, and detailed audit trails. Each team had unique workflows,
          yet they all shared the same fundamental challenge: too many
          dependencies, too little structure, and no clear way to evolve without
          developer intervention.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The opportunity was not to design another tool. It was to design a
          system that could adapt itself.
        </Typography>

        <SectionTitle>Framing the Problem</SectionTitle>

        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1.5 }}>
          Three interconnected problems emerged.
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 2, lineHeight: 1.8 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            <strong>Operational inefficiency.</strong> Configuring or updating
            workflows required engineering time, delaying program launches and
            slowing response to policy shifts.
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            <strong>Inconsistent user experiences.</strong> Teams created their
            own patterns, which led to confusing interactions, duplicated
            components, and accessibility issues.
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Lack of governance.</strong> Without shared standards, the
            platform could not scale reliably or maintain compliance across
            teams.
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          If the system was to grow, it needed a new foundation that separated
          configuration from code, and patterns from personal preference.
        </Typography>

        <SectionTitle>Defining Success</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Before any design work began, I partnered with product and engineering
          to define clear, outcome-focused measures of success:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 2, lineHeight: 1.8 }}>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Reduce time required to configure new workflows by at least 30%
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Reduce engineering involvement in workflow changes by 40% or more
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Improve accessibility and interaction consistency across all modules
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Lower cognitive load for non-technical administrators
          </Typography>
          <Typography component="li" variant="body1">
            Reduce operational errors and support requests generated by
            inconsistent UI behavior
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          These goals became our guardrails and our filter for decision-making.
        </Typography>

        <SectionTitle>Designing the Foundation</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The solution was not a single feature. It was a cohesive interaction
          model that brought stability, predictability, and flexibility to the
          entire platform.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          1. A modular workflow builder
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I designed a library of configurable building blocks, including intake
          steps, review modules, conditional branches, validation rules, and
          document requests. Each block had predictable behaviors and
          configuration parameters. Teams could compose workflows by assembling
          these components rather than inventing their own patterns.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          2. A role-based interaction model
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I defined how different users, such as intake workers, supervisors,
          auditors, and program administrators, interacted with cases throughout
          their lifecycle. This ensured that every workflow, regardless of
          program, shared a coherent mental model and consistent expectations.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          3. A visual rule editor for no-code logic
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          One of the most transformative elements was a rule editor that allowed
          teams to express business logic without writing code. Visibility,
          routing, field requirements, and conditional approvals all became
          configurable in a guided, opinionated way that reduced risk and
          preserved clarity.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          4. A system of UX patterns and design governance
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I established a design system that included accessible form
          components, layout standards, interaction patterns, error-handling
          models, and rules for progressive disclosure. Governance guidelines
          and versioning practices turned the system into a long-term contract
          between design, engineering, and operations.
        </Typography>

        <SectionTitle>How I Led</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          My contribution extended beyond design artifacts. I focused on creating
          alignment, stability, and momentum across disciplines.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          Cross-functional alignment
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I facilitated working sessions with product, engineering, and
          operational teams to unify terminology, map workflow variations, and
          define system boundaries. This reduced misalignment and ensured that
          every team understood how their needs fit within the platform model.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          DesignOps and systems thinking
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I introduced governance models, clarified component ownership, and
          helped engineering define configuration schemas that aligned with the
          UX architecture. This shifted the platform from ad-hoc delivery toward
          a more sustainable and extensible system.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          Accessibility leadership
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I championed WCAG compliance across the platform, ensuring form
          components, navigation, validation, and interactive elements behaved
          consistently and predictably for all users. Accessibility was treated
          as a design constraint, not an afterthought.
        </Typography>

        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: 600, mt: 3, mb: 1.5 }}
        >
          Mentoring and enablement
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          I supported designers working on adjacent modules, helping them operate
          within the new interaction model rather than around it. This increased
          design consistency, improved velocity, and reduced rework.
        </Typography>

        <SectionTitle>Impact</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The transformation was tangible.
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 2, lineHeight: 1.8 }}>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Workflow configuration became significantly faster, often cutting
            build times by 30 to 50 percent
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Reliance on engineering for routine changes dropped sharply
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            The platform matured into a scalable, repeatable system rather than
            a collection of custom-built modules
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Teams experienced fewer user errors and support escalations
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
            Accessibility and compliance improved across the product
          </Typography>
          <Typography component="li" variant="body1">
            New programs onboarded faster because patterns were already
            established
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          The system did not just streamline workflows. It enabled the
          organization to evolve with greater agility and confidence.
        </Typography>

        <SectionTitle>Looking Ahead</SectionTitle>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          As the platform expands, there are clear opportunities to strengthen
          the foundation further. Reusable workflow templates can accelerate
          deployment. Analytics can highlight bottlenecks and identify where
          automation will have the greatest impact. An expanded rule engine can
          support more complex program variations. Integrated onboarding can help
          new teams adopt the platform with less friction.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 0 }}>
          The work laid the groundwork for a platform built not only to scale,
          but to adapt.
        </Typography>
      </Container>
    </Box>
  );
}
