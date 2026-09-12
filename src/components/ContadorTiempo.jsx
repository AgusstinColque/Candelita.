// src/components/ContadorTiempo.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FECHA_INICIO = new Date("2024-02-16T00:00:00");

function calcularTiempo() {
  const ahora = new Date();
  const diferencia = ahora - FECHA_INICIO;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

export default function ContadorTiempo() {
  const [tiempo, setTiempo] = useState(calcularTiempo());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const unidades = [
    { valor: tiempo.dias, label: "días" },
    { valor: tiempo.horas, label: "horas" },
    { valor: tiempo.minutos, label: "min" },
    { valor: tiempo.segundos, label: "seg" },
  ];

  return (
    <section className="my-10 px-4">
      <div className="max-w-sm mx-auto text-center">
        <p className="text-xs text-gray-500 font-editorial italic tracking-wide mb-4">
          Hace este tiempo que compartimos historia
        </p>

        <div className="flex justify-center gap-2 sm:gap-3">
          {unidades.map((unidad) => (
            <div
              key={unidad.label}
              className="flex-1 max-w-[75px] bg-white rounded-xl py-3 px-1 shadow-[0_20px_40px_-15px_rgba(127,29,29,0.25)] border border-gray-200/60"
            >
              <motion.p
                key={unidad.valor}
                initial={{ opacity: 0.4, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-2xl sm:text-3xl font-bold text-[#7f1d1d] font-editorial tabular-nums"
              >
                {unidad.valor}
              </motion.p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">
                {unidad.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 font-editorial italic mt-4">
          y sigue sumando, segundo a segundo.
        </p>
      </div>
    </section>
  );
}