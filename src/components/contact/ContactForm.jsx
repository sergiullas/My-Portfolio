import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialValues = {
  name: "",
  email: "",
  message: "",
  company: "", // honeypot
};

// Input (field) appearance – dark background, light text, teal borders
const inputSlotStyle = (theme) => ({
  backgroundColor: "rgba(0,0,0,0.35)",
  color: "rgba(255,255,255,0.9)",
  borderRadius: 4,
  "& fieldset": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover fieldset": {
    borderColor: theme.palette.primary.light,
  },
  "&.Mui-focused fieldset": {
    borderColor: theme.palette.primary.main,
  },
});

// Label appearance – high contrast, readable in both themes
const labelSlotStyle = (theme) => ({
  color: "rgba(255,255,255,0.87)", // bright, accessible
  "&.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "&.Mui-error": {
    color: theme.palette.error.main,
  },
});

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    setFieldErrors({});

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("company", values.company);

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.ok) {
        setSuccess(true);
        setValues(initialValues);
        return;
      }

      if (response.status === 400 && data?.errors) {
        setFieldErrors(data.errors);
        return;
      }

      setError(data?.error || "Something went wrong. Please try again later.");
    } catch (fetchError) {
      console.error("Contact form submission failed", fetchError);
      setError("Unable to send your message right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Thank you for reaching out. I will get back to you shortly.
          </Alert>
        )}

        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* NAME FIELD */}
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="medium"
          error={Boolean(fieldErrors.name)}
          helperText={fieldErrors.name || ""}
          autoComplete="name"
          slotProps={{
            input: {
              sx: inputSlotStyle,
            },
            inputLabel: {
              sx: labelSlotStyle,
            },
          }}
        />

        {/* EMAIL FIELD */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="medium"
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email || ""}
          autoComplete="email"
          slotProps={{
            input: {
              sx: inputSlotStyle,
            },
            inputLabel: {
              sx: labelSlotStyle,
            },
          }}
        />

        {/* MESSAGE FIELD */}
        <TextField
          label="Message"
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          size="medium"
          multiline
          minRows={4}
          error={Boolean(fieldErrors.message)}
          helperText={fieldErrors.message || ""}
          slotProps={{
            input: {
              sx: inputSlotStyle,
            },
            inputLabel: {
              sx: labelSlotStyle,
            },
          }}
        />

        {/* Honeypot field (for bots) */}
        <Box
          sx={{
            position: "absolute",
            left: "-9999px",
            width: 1,
            height: 0,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={handleChange}
          />
        </Box>

        {/* BUTTON */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              minWidth: 170,
              py: 1.2,
              borderRadius: 1.5,
              fontWeight: 600,
            }}
          >
            {loading ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={20} color="inherit" />
                <Typography variant="button" component="span">
                  Sending
                </Typography>
              </Stack>
            ) : (
              "Send message"
            )}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
