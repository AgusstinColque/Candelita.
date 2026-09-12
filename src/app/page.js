"use client";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/content";

import CorazonesFlotantes from "@/components/CorazonesFlotantes";
import PantallaBienvenida from "@/components/PantallaBienvenida";
import ReproductorMusica from "@/components/ReproductorMusica";
import GaleriaFotos from "@/components/GaleriaFotos";
import SeccionVideo from "@/components/SeccionVideo";
import CartaDigital from "@/components/CartaDigital";
import SorpresasInteractivas from "@/components/SorpresasInteractivas";
import BarraProgreso from "@/components/BarraProgreso";

export default function Home() {
  const [abierta, setAbierta] = useState(false);
  const containerRef = useRef(null);

  return (
    <>
      {/* Barra de progreso fija arriba de todo */}
      <BarraProgreso containerRef={containerRef} />

      <main
        ref={containerRef}
        className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-white text-gray-900 relative"
      >
        {/* Corazones sutiles flotando de fondo */}
        <CorazonesFlotantes />

        {/* Pantalla sorpresa al inicio (overlay, no ocupa snap) */}
        <AnimatePresence>
          {!abierta && (
            <PantallaBienvenida
              nombre={birthdayData.girlfriendName}
              datosBienvenida={birthdayData.welcome}
              alAbrir={() => setAbierta(true)}
            />
          )}
        </AnimatePresence>

        {/* SECCIÓN 1: Encabezado + Reproductor */}
        <section id="inicio" className="min-h-screen snap-start flex flex-col justify-center">
          <div className="max-w-[380px] mx-auto px-4 relative z-10">
            <header className="text-center pt-2 pb-1 relative">
              <div className="flex justify-start pl-2 mb-1">
                <svg width="44" height="32" viewBox="0 0 50 35" fill="none">
                  <path
                    d="M12 18 C8 10, 0 10, 2 20 C4 28, 12 32, 12 32 C12 32, 20 28, 22 20 C24 10, 16 10, 12 18 Z"
                    fill="#881337"
                    opacity="0.85"
                  />
                  <path
                    d="M22 14 C19 7, 12 7, 14 15 C15 22, 22 25, 22 25 C22 25, 29 22, 30 15 C32 7, 25 7, 22 14 Z"
                    fill="#be123c"
                    opacity="0.65"
                  />
                  <path
                    d="M2 15 Q 16 -4, 46 8"
                    stroke="#881337"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </div>

              <p className="text-sm sm:text-base text-gray-700 tracking-wide font-editorial">
                Para la cumpleañera más linda
              </p>

              <h1 className="text-5xl sm:text-6xl text-[#7f1d1d] font-carta leading-tight my-1 select-none">
                Feliz Cumpleaños
              </h1>

              <p className="text-3xl text-gray-800 font-carta mt-0.5">
                {birthdayData.girlfriendName}
              </p>

              <div className="my-5 text-gray-600 font-editorial italic text-xs sm:text-sm space-y-1">
                <p>El sonido de todo lo que siento por vos...</p>
                <p>La canción que me hace pensarte siempre.</p>
              </div>
            </header>

            <ReproductorMusica cancion={birthdayData.music} />
          </div>
        </section>

        {/* SECCIÓN 2: Galería de fotos */}
        <section id="galeria" className="min-h-screen snap-start flex flex-col justify-center">
          <div className="max-w-[380px] mx-auto px-4 relative z-10">
            <GaleriaFotos fotos={birthdayData.gallery} />
          </div>
        </section>

        {/* SECCIÓN 3: Video */}
        <section id="video" className="min-h-screen snap-start flex flex-col justify-center">
          <div className="max-w-[380px] mx-auto px-4 relative z-10">
            <SeccionVideo datosVideo={birthdayData.video} />
          </div>
        </section>

        {/* SECCIÓN 4: Carta digital */}
        <section id="carta" className="min-h-screen snap-start flex flex-col justify-center">
          <div className="max-w-[380px] mx-auto px-4 relative z-10">
            <CartaDigital
              datosCarta={birthdayData.letter}
              remitente={birthdayData.yourName}
            />
          </div>
        </section>

        {/* SECCIÓN 5: Sorpresas + cierre final */}
        <section id="final" className="min-h-screen snap-start flex flex-col justify-center">
          <div className="max-w-[380px] mx-auto px-4 relative z-10 pb-16">
            <SorpresasInteractivas sorpresas={birthdayData.surprises} />

            <footer className="text-center pt-8 pb-4 px-2">
              <p className="text-2xl font-carta text-[#7f1d1d]">
                {birthdayData.finalMessage.title}
              </p>
              <p className="text-xs text-gray-500 font-editorial mt-1 italic">
                {birthdayData.finalMessage.subtext}
              </p>
              <div className="w-12 h-0.5 bg-rose-200 mx-auto my-4 rounded-full" />
              <p className="text-[11px] text-gray-400 tracking-wide">
                {birthdayData.finalMessage.footer}
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}