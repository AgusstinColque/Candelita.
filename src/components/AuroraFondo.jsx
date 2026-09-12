// src/components/AuroraFondo.jsx
"use client";
import { motion } from "framer-motion";

export default function AuroraFondo() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-5%", "8%", "-5%"],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #7f1d1d 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          x: ["8%", "-12%", "8%"],
          y: ["5%", "-8%", "5%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, #f5b942 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          x: ["-5%", "6%", "-5%"],
          y: ["10%", "-6%", "10%"],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-[45%] h-[45%] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #be123c 0%, transparent 70%)" }}
      />
    </div>
  );
}