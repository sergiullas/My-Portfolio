// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // jump to top on every route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want an animation
    });
  }, [pathname]);

  return null; // this component does not render anything
}
