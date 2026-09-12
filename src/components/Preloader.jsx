// src/components/Preloader.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const SEGUNDO_PAUSA = 3;
const TOQUES_NECESARIOS = 5;

const ANIMACION_IDLE = {
  scale: [1, 1.025, 1],
  rotate: [0, -0.6, 0.6, 0],
  y: [0, -6, 0],
  transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
};

export default function Preloader({ onFinish, nombre }) {
  const [fase, setFase] = useState("orbitando");
  const [toques, setToques] = useState(0);
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const videoRef = useRef(null);
  const pausadoRef = useRef(false);
  const controls = useAnimation();

  // Arranca el "respirar" en cuanto el video se congela esperando toques
  useEffect(() => {
    if (fase === "esperando") {
      controls.start(ANIMACION_IDLE);
    }
  }, [fase, controls]);

  const manejarTiempo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!pausadoRef.current && video.currentTime >= SEGUNDO_PAUSA) {
      video.pause();
      pausadoRef.current = true;
      setFase("esperando");
    }

    if (fase === "final" && video.duration) {
      const restante = video.duration - video.currentTime;
      if (restante < 1.5 && !mostrarTexto) setMostrarTexto(true);
    }
  };

  const manejarToque = async () => {
    if (fase !== "esperando") return;
    const nuevoConteo = toques + 1;
    setToques(nuevoConteo);

    // Reacción inmediata al toque: interrumpe el idle con un "rebote" más marcado
    await controls.start({
      scale: [1, 0.93, 1.07, 1],
      rotate: [0, -3, 3, 0],
      transition: { duration: 0.45, ease: "easeOut" },
    });

    if (nuevoConteo >= TOQUES_NECESARIOS) {
      setFase("final");
      videoRef.current?.play();
    } else {
      controls.start(ANIMACION_IDLE); // vuelve a respirar
    }
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {fase !== "saliendo" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] bg-[#FFF8F0] overflow-hidden"
        >
          <motion.video
            ref={videoRef}
            animate={controls}
            autoPlay
            muted
            playsInline
            onTimeUpdate={manejarTiempo}
            onEnded={() => setTimeout(() => setFase("saliendo"), 1000)}
            className="w-full h-full object-cover"
          >
            <source src="/video/apertura-regalo.mp4" type="video/mp4" />
          </motion.video>

          {fase === "esperando" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onClick={manejarToque}
              className="absolute inset-0 flex flex-col items-center justify-end pb-20 cursor-pointer"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-[#7f1d1d] text-sm tracking-[0.2em] uppercase font-editorial mb-4"
              >
                Tocá para desenvolver
              </motion.p>

              <div className="flex gap-2">
                {Array.from({ length: TOQUES_NECESARIOS }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i < toques ? 1.2 : 1,
                      backgroundColor: i < toques ? "#7f1d1d" : "#d1a3a3",
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {mostrarTexto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-sm tracking-[0.3em] uppercase text-[#7f1d1d] font-editorial mb-2"
                >
                  Hoy es tu día
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-4xl sm:text-5xl font-carta text-[#7f1d1d] leading-tight"
                >
                  Feliz Cumpleaños
                </motion.h1>
                {nombre && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-3xl font-carta text-gray-800 mt-1"
                  >
                    {nombre}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}