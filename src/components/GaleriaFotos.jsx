"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GaleriaFotos({ fotos }) {
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  // Inclinaciones sutiles para darle el efecto de fotos reales desparramadas
  const rotaciones = ["-rotate-2", "rotate-2", "-rotate-1"];

  return (
    <section className="my-10 px-4">
      <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto">
        {fotos.slice(0, 3).map((foto, index) => (
          <motion.div
            key={foto.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setFotoSeleccionada(foto)}
            className={`w-full max-w-[310px] bg-white pt-3 px-3 pb-5 rounded-sm shadow-md border border-gray-200/60 cursor-pointer transform ${
              rotaciones[index % rotaciones.length]
            } transition-all duration-300 active:scale-95`}
          >
            {/* Foto cuadrada con marco interior fino */}
            <div className="w-full aspect-[4/4] overflow-hidden bg-rose-50 border border-gray-200/80">
              <img
                src={foto.url}
                alt={foto.caption || "Recuerdo"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Parte inferior de la Polaroid: corazoncito y frase opcional */}
            <div className="pt-3 pb-1 flex flex-col items-center justify-center">
              <span className="text-rose-500 text-lg select-none leading-none">
                ❤️
              </span>
              {foto.caption && (
                <p className="text-[11px] text-gray-500 mt-1.5 font-serif italic text-center px-1">
                  {foto.caption}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para ver la foto en grande al tocarla */}
      {fotoSeleccionada && (
        <div
          onClick={() => setFotoSeleccionada(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-white p-3 rounded-lg max-w-xs w-full shadow-2xl">
            <img
              src={fotoSeleccionada.url}
              alt="Recuerdo en grande"
              className="w-full rounded object-contain max-h-[65vh]"
            />
            <div className="text-center pt-3 pb-1">
              <span className="text-rose-500 text-base">❤️</span>
              {fotoSeleccionada.caption && (
                <p className="text-xs text-gray-700 font-serif italic mt-1">
                  {fotoSeleccionada.caption}
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-2">Tocá para cerrar</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}