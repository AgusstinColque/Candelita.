"use client";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function PantallaBienvenida({ alAbrir, nombre, datosBienvenida }) {
  const manejarApertura = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#fda4af", "#fb7185", "#f43f5e", "#fbbf24", "#fef08a"],
    });
    alAbrir();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF5F6] via-[#FFF0F2] to-[#FFE8EC] px-6 text-center"
    >
      <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-medium tracking-wide mb-6 shadow-sm">
        {datosBienvenida.badge}
      </span>

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-6 cursor-pointer drop-shadow-md select-none active:scale-95 transition-transform"
        onClick={manejarApertura}
      >
        🎁
      </motion.div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
        Para: <span className="text-rose-600">{nombre}</span>
      </h1>
      <p className="text-gray-600 mb-8 max-w-xs text-sm leading-relaxed">
        {datosBienvenida.teaser}
      </p>

      <button
        onClick={manejarApertura}
        className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-300/60 active:scale-95 transition-all text-sm flex items-center gap-2"
      >
        <span>{datosBienvenida.buttonText}</span>
        <span className="text-xs">✨</span>
      </button>
    </motion.div>
  );
}