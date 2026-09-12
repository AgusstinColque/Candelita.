"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function PantallaBienvenida({ alAbrir, nombre, datosBienvenida }) {
  const manejarApertura = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#7f1d1d", "#be123c", "#f5b942", "#fef3c7", "#ffffff"],
    });
    alAbrir();
  };

  const globos = [
    { emoji: "🎈", color: "#7f1d1d", left: "12%", delay: 0 },
    { emoji: "🎈", color: "#f5b942", left: "78%", delay: 0.4 },
    { emoji: "🎈", color: "#be123c", left: "50%", delay: 0.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF8F0] via-[#FFF3E0] to-[#FFE8EC] px-6 text-center overflow-hidden"
    >
      {/* Globos flotando de fondo, decorativos */}
      {globos.map((globo, i) => (
        <motion.div
          key={i}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: [0, -18, 0], opacity: 0.35 }}
          transition={{
            y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: globo.delay },
            opacity: { duration: 0.8, delay: globo.delay },
          }}
          className="absolute text-6xl select-none pointer-events-none"
          style={{ left: globo.left, top: `${15 + i * 8}%`, color: globo.color }}
        >
          {globo.emoji}
        </motion.div>
      ))}

      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#7f1d1d] text-[#fef3c7] rounded-full text-xs font-semibold tracking-wide mb-6 shadow-[0_10px_25px_-10px_rgba(127,29,29,0.5)]"
      >
        🎉 {datosBienvenida.badge}
      </motion.span>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -4, 4, 0],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-6 cursor-pointer drop-shadow-md select-none active:scale-95 transition-transform"
        onClick={manejarApertura}
      >
        🎁
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-2 font-serif"
      >
        ¡Feliz cumpleaños, <span className="text-[#7f1d1d]">{nombre}</span>!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-gray-600 mb-8 max-w-xs text-sm leading-relaxed"
      >
        {datosBienvenida.teaser}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        onClick={manejarApertura}
        className="px-8 py-3.5 rounded-full bg-[#7f1d1d] hover:bg-[#921f1f] text-white font-medium shadow-[0_15px_35px_-10px_rgba(127,29,29,0.6)] active:scale-95 transition-all text-sm flex items-center gap-2"
      >
        <span>{datosBienvenida.buttonText}</span>
        <span className="text-xs">🎂</span>
      </motion.button>
    </motion.div>
  );
}