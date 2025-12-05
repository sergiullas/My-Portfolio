// src/hooks/usePageMeta.js
import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Sergio Antezana is a Principal Product & UX Designer specializing in systems-level UX, design operations, and accessibility for complex products.";

/**
 * Simple per-page meta management:
 * - Updates document.title
 * - Updates (or creates) <meta name="description"> in <head>
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const nextContent = description || DEFAULT_DESCRIPTION;

    let meta =
      document.querySelector('meta[name="description"]') ||
      createDescriptionMeta();

    const previous = meta.getAttribute("content") || "";
    meta.setAttribute("content", nextContent);

    // Optional: restore previous on unmount
    return () => {
      meta.setAttribute("content", previous);
    };
  }, [title, description]);
}

function createDescriptionMeta() {
  const meta = document.createElement("meta");
  meta.name = "description";
  document.head.appendChild(meta);
  return meta;
}
