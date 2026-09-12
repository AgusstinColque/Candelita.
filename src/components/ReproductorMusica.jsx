"use client";
import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";

export default function ReproductorMusica({ cancion }) {
  const [estaSonando, setEstaSonando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const audioRef = useRef(null);

  const alternarPlay = () => {
    if (!audioRef.current) return;
    if (estaSonando) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setEstaSonando(!estaSonando);
  };

  const actualizarProgreso = () => {
    if (audioRef.current) {
      const actual = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      setProgreso((actual / total) * 100);
    }
  };

  const cambiarTiempo = (e) => {
    const barra = e.currentTarget;
    const rect = barra.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const nuevoPorcentaje = clickX / rect.width;

    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = nuevoPorcentaje * audioRef.current.duration;
      setProgreso(nuevoPorcentaje * 100);
    }
  };

  return (
    <div className="w-full max-w-[340px] mx-auto my-6">
      {/* Caja negra con bordes curvos igual a la imagen */}
      <div className="bg-[#111111] text-white rounded-2xl p-3.5 shadow-[0_20px_40px_-15px_rgba(127,29,29,0.35)] flex items-center gap-3">
        {/* Portada cuadrada */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700 flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          {cancion.coverImg ? (
            <img
              src={cancion.coverImg}
              alt="Portada"
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="text-neutral-500" size={24} />
          )}
        </div>

        {/* Info y Controles */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-[13px] font-semibold tracking-wide truncate text-neutral-100">
            {cancion.artist} - {cancion.title}
          </p>

          {/* Barra de progreso interactiva */}
          <div
            onClick={cambiarTiempo}
            className="w-full bg-neutral-700 rounded-full h-1 my-2.5 cursor-pointer relative"
          >
            <div
              className="bg-white h-full rounded-full transition-all duration-150 relative"
              style={{ width: `${progreso}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow" />
            </div>
          </div>

          {/* Botones de control */}
          <div className="flex items-center justify-center gap-6 mt-1 text-white">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
              className="hover:opacity-75 active:scale-95 transition-all text-neutral-300"
            >
              <SkipBack size={16} fill="currentColor" />
            </button>

            <button
              onClick={alternarPlay}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_8px_16px_-4px_rgba(127,29,29,0.4)]"
            >
              {estaSonando ? (
                <Pause size={15} fill="black" />
              ) : (
                <Play size={15} fill="black" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime += 10;
              }}
              className="hover:opacity-75 active:scale-95 transition-all text-neutral-300"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-500 text-center mt-2 italic">
        (Click al play)
      </p>

      <audio
        ref={audioRef}
        src={cancion.audioSrc}
        onTimeUpdate={actualizarProgreso}
        onEnded={() => setEstaSonando(false)}
      />
    </div>
  );
}