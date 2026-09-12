"use client";

export default function CartaDigital({ datosCarta, remitente }) {
  return (
    <section className="my-10 px-4 max-w-sm mx-auto">
      <div className="relative bg-[#FFFDF9] rounded-3xl p-6 shadow-[0_20px_40px_-15px_rgba(127,29,29,0.25)] border border-gray-200/70 overflow-hidden">
        {/* Detalle sutil de sello o sobre arriba */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#7f1d1d]/10 text-[#7f1d1d] mb-2 shadow-inner">
            💌
          </div>
          <h2 className="text-lg font-bold text-gray-800 font-serif">
            {datosCarta.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#7f1d1d]/30 mx-auto mt-2 rounded-full" />
        </div>

        {/* Saludo inicial: antes rosa, ahora negro y en negrita */}
        <p
          className="font-bold text-gray-900 mb-3 text-sm"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {datosCarta.salutation}
        </p>

        {/* Párrafos de la carta: tipografía Times New Roman en vez de sans-serif genérica */}
        <div
          className="space-y-3.5 text-[13px] text-gray-700 leading-relaxed"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          {datosCarta.paragraphs.map((parrafo, idx) => (
            <p key={idx}>{parrafo}</p>
          ))}
        </div>

        {/* Despedida y firma: "Agus" antes rosa, ahora negro y en negrita */}
        <div className="text-right mt-6 pt-3 border-t border-gray-200/70">
          <p
            className="text-xs text-gray-500"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {datosCarta.signature}
          </p>
          <p
            className="text-base font-bold text-gray-900 mt-0.5 tracking-wide"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {remitente}
          </p>
        </div>
      </div>
    </section>
  );
}