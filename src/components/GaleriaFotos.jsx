"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GaleriaFotos({ fotos }) {
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  const rotaciones = ["-rotate-2", "rotate-2", "-rotate-1"];

  return (
    <section className="my-10 px-4">
      <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto">
        {fotos.slice(0, 3).map((foto, index) => (
          <motion.div
            key={foto.id || index}
            layoutId={`foto-${foto.id || index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onClick={() => setFotoSeleccionada({ ...foto, index })}
            className={`w-full max-w-[310px] bg-white pt-3 px-3 pb-5 rounded-sm shadow-[0_20px_40px_-15px_rgba(127,29,29,0.25)] border border-gray-200/60 cursor-pointer ${
              rotaciones[index % rotaciones.length]
            }`}
          >
            <motion.div
              layoutId={`foto-img-${foto.id || index}`}
              className="w-full aspect-[4/4] overflow-hidden bg-rose-50 border border-gray-200/80 transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={foto.url}
                alt={foto.caption || "Recuerdo"}
                className="w-full h-full object-cover"
              />
            </motion.div>

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

      {/* Modal con shared element transition */}
      <AnimatePresence>
        {fotoSeleccionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFotoSeleccionada(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          >
            <motion.div
              layoutId={`foto-${fotoSeleccionada.id || fotoSeleccionada.index}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-3 rounded-lg max-w-xs w-full shadow-[0_25px_50px_-12px_rgba(127,29,29,0.35)]"
            >
              <motion.div
                layoutId={`foto-img-${fotoSeleccionada.id || fotoSeleccionada.index}`}
                className="w-full overflow-hidden rounded"
              >
                <img
                  src={fotoSeleccionada.url}
                  alt="Recuerdo en grande"
                  className="w-full object-contain max-h-[65vh]"
                />
              </motion.div>
              <div className="text-center pt-3 pb-1">
                <span className="text-rose-500 text-base">❤️</span>
                {fotoSeleccionada.caption && (
                  <p className="text-xs text-gray-700 font-serif italic mt-1">
                    {fotoSeleccionada.caption}
                  </p>
                )}
                <p className="text-[10px] text-gray-400 mt-2">Tocá para cerrar</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}