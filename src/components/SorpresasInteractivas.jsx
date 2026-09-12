"use client";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function SorpresasInteractivas({ sorpresas }) {
  const [abiertas, setAbiertas] = useState({});

  const alternarCaja = (id) => {
    if (!abiertas[id]) {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.75 },
        colors: ["#fda4af", "#f43f5e", "#fbbf24"],
      });
    }
    setAbiertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="my-10 px-4 max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-center text-gray-800 font-serif mb-1">
        Detallitos para vos 🎁
      </h2>
      <p className="text-xs text-gray-500 text-center mb-4">
        Tocá cada tarjetita para descubrir una sorpresa
      </p>

      <div className="space-y-3">
        {sorpresas.map((item) => {
          const estaAbierta = abiertas[item.id];
          return (
            <div
              key={item.id}
              onClick={() => alternarCaja(item.id)}
              className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-100 shadow-sm cursor-pointer transition-all duration-300 hover:border-rose-200 active:scale-98"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-rose-600">
                  {item.title}
                </span>
                <span className="text-xs text-rose-400">
                  {estaAbierta ? "▲" : "▼"}
                </span>
              </div>

              {estaAbierta && (
                <p className="text-xs text-gray-600 mt-2.5 pt-2.5 border-t border-rose-50 leading-relaxed animate-fadeIn">
                  {item.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}