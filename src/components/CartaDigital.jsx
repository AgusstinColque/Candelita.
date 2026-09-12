"use client";

export default function CartaDigital({ datosCarta, remitente }) {
  return (
    <section className="my-10 px-4 max-w-sm mx-auto">
      <div className="relative bg-[#FFFDF9] rounded-3xl p-6 shadow-md border border-rose-200/60 overflow-hidden">
        {/* Detalle sutil de sello o sobre arriba */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-rose-100 text-rose-500 mb-2 shadow-inner">
            💌
          </div>
          <h2 className="text-lg font-bold text-gray-800 font-serif">
            {datosCarta.title}
          </h2>
          <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-2 rounded-full opacity-60" />
        </div>

        {/* Saludo inicial */}
        <p className="font-serif font-semibold text-rose-600 mb-3 text-sm">
          {datosCarta.salutation}
        </p>

        {/* Párrafos de la carta */}
        <div className="space-y-3.5 text-[13px] text-gray-700 leading-relaxed font-sans">
          {datosCarta.paragraphs.map((parrafo, idx) => (
            <p key={idx}>{parrafo}</p>
          ))}
        </div>

        {/* Despedida y firma */}
        <div className="text-right mt-6 pt-3 border-t border-rose-100/60 font-serif">
          <p className="text-xs text-gray-500">{datosCarta.signature}</p>
          <p className="text-base font-bold text-rose-600 mt-0.5 tracking-wide">
            {remitente}
          </p>
        </div>
      </div>
    </section>
  );
}