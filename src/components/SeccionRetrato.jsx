"use client";

export default function SeccionRetrato({ datosRetrato }) {
  return (
    <section className="my-8 text-center bg-white/75 backdrop-blur-sm p-4 rounded-3xl border border-rose-100 shadow-sm max-w-sm mx-auto transition-all">
      <span className="inline-block px-3 py-0.5 bg-rose-50 text-rose-500 rounded-full text-[11px] font-semibold tracking-wide mb-2">
        {datosRetrato.badge}
      </span>
      <h2 className="text-lg font-bold text-gray-800 font-serif">
        {datosRetrato.title}
      </h2>

      {/* Foto tipo retrato */}
      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 my-3 shadow-inner border border-rose-100/50">
        <img
          src={datosRetrato.image}
          alt="Retrato de Candelita"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-xs text-rose-600/90 italic font-medium px-2 leading-relaxed">
        "{datosRetrato.quote}"
      </p>
    </section>
  );
}