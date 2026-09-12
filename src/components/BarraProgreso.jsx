// src/components/BarraProgreso.jsx
"use client";

import { motion, useScroll } from "framer-motion";

export default function BarraProgreso({ containerRef }) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#7f1d1d] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}