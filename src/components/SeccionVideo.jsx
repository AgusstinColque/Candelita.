"use client";
import { Film } from "lucide-react";

export default function SeccionVideo({ datosVideo }) {
  return (
    <section className="my-10 px-4 max-w-sm mx-auto text-center">
      {/* Insignia / Título */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-semibold tracking-wide mb-2 shadow-sm">
        <Film size={13} />
        {datosVideo.badge}
      </span>
      <h2 className="text-xl font-bold text-gray-800 font-serif mb-1">
        {datosVideo.title}
      </h2>
      <p className="text-xs text-gray-500 mb-4 px-2 leading-relaxed">
        {datosVideo.subtitle}
      </p>

      {/* Contenedor del video con marco elegante */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-rose-100/80 bg-black aspect-[9/16] sm:aspect-video w-full max-h-[500px]">
        <video
          src={datosVideo.videoSrc}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-contain"
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>

      <p className="text-[11px] text-gray-400 mt-2 italic">
        Dale play para revivir estos momentos ✨
      </p>
    </section>
  );
}