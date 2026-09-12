"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CorazonesFlotantes() {
  const [corazones, setCorazones] = useState([]);

  useEffect(() => {
    const generados = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 14 + 14,
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 4,
    }));
    setCorazones(generados);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {corazones.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.55, 0] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "easeInOut",
          }}
          style={{ left: `${c.left}%`, fontSize: `${c.size}px` }}
          className="absolute select-none text-rose-300/40"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}