// src/components/Preloader.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const SEGUNDO_CARTEL = 2;
const SEGUNDO_PAUSA = 3;
const TOQUES_NECESARIOS = 5;

const ANIMACION_IDLE = {
  scale: [1, 1.025, 1],
  rotate: [0, -0.6, 0.6, 0],
  y: [0, -6, 0],
  transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
};

// opacity y "y" con transiciones separadas: el fade-in entra una sola vez,
// y el flotado (y) queda en loop infinito sin reiniciar la opacidad.
const ANIMACION_CARTEL = {
  opacity: 1,
  y: [0, -5, 0],
  transition: {
    opacity: { duration: 0.8 },
    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Preloader({ onFinish, nombre }) {
  const [fase, setFase] = useState("orbitando");
  const [toques, setToques] = useState(0);
  const [mostrarCartel, setMostrarCartel] = useState(false);
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

    if (!mostrarCartel && video.currentTime >= SEGUNDO_CARTEL) {
      setMostrarCartel(true);
    }

    if (!pausadoRef.current && video.currentTime >= SEGUNDO_PAUSA) {
      video.pause();
      pausadoRef.current = true;
      setFase("esperando");
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

  // Al terminar el video (moño desatado, tapa abierta, estallido de luz),
  // pasamos directo a la transición hacia el resto de la landing.
  const manejarFinVideo = () => {
    setTimeout(() => setFase("saliendo"), 300);
  };

  const esperandoOrbitando = fase === "orbitando" || fase === "esperando";

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
            onEnded={manejarFinVideo}
            className="w-full h-full object-cover"
          >
            <source src="/video/apertura-regalo.mp4" type="video/mp4" />
          </motion.video>

          {/* Cartel superior: aparece recién al segundo SEGUNDO_CARTEL del video */}
          <AnimatePresence>
            {esperandoOrbitando && mostrarCartel && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={ANIMACION_CARTEL}
                exit={{ opacity: 0, y: -15}}
                transition={{ duration: 0.8 }}
                className="absolute top-24 left-0 right-0 flex justify-center px-6 z-10 pointer-events-none"
              >
                <p className="font-carta text-4xl sm:text-5xl text-[#7f1d1d] text-center leading-tight">
                  Feliz Cumpleaños mi amoor!!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

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
                className="text-[#7f1d1d] text-sm tracking-[0.2em] uppercase font-editorial"
              >
                Tocá para desenvolver
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}