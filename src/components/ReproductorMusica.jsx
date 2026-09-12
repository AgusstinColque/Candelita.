"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";

// Extrae el ID de video de distintos formatos de URL de YouTube:
// watch?v=ID, youtu.be/ID, embed/ID, con o sin parámetros extra.
function extraerIdYoutube(url) {
  if (!url) return null;
  const patrones = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const patron of patrones) {
    const match = url.match(patron);
    if (match) return match[1];
  }
  return null;
}

export default function ReproductorMusica({ cancion }) {
  const [estaSonando, setEstaSonando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [listo, setListo] = useState(false);

  const audioRef = useRef(null); // fallback mp3 (si no hay youtubeUrl)
  const playerRef = useRef(null); // instancia del player de YouTube
  const contenedorRef = useRef(null); // <div> persistente donde se monta el player
  const intervaloRef = useRef(null);

  const youtubeId = extraerIdYoutube(cancion.youtubeUrl);
  const usaYoutube = Boolean(youtubeId);

  // Si no se especificó coverImg a mano, usamos la miniatura del propio video de YouTube.
  const portada =
    cancion.coverImg || (usaYoutube ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null);

  // --- Carga de la API de YouTube y creación del player ---
  // Hecho a prueba de que React (en desarrollo, con Strict Mode) ejecute
  // este efecto dos veces: en cada intento se limpia el contenedor y se
  // crea un <div> hijo nuevo, en vez de depender de un id fijo que ya
  // pudo haber sido reemplazado por un <iframe> en el intento anterior.
  useEffect(() => {
    if (!usaYoutube) return;
    let cancelado = false;

    const crearPlayer = () => {
      if (cancelado || !contenedorRef.current) return;

      contenedorRef.current.innerHTML = "";
      const elementoObjetivo = document.createElement("div");
      contenedorRef.current.appendChild(elementoObjetivo);

      playerRef.current = new window.YT.Player(elementoObjetivo, {
        videoId: youtubeId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (!cancelado) setListo(true);
          },
          onStateChange: (evento) => {
            if (cancelado) return;
            if (evento.data === window.YT.PlayerState.PLAYING) {
              setEstaSonando(true);
            } else if (evento.data === window.YT.PlayerState.PAUSED) {
              setEstaSonando(false);
            } else if (evento.data === window.YT.PlayerState.ENDED) {
              setEstaSonando(false);
              setProgreso(0);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      crearPlayer();
    } else {
      window.__ytApiCallbacks = window.__ytApiCallbacks || [];
      window.__ytApiCallbacks.push(crearPlayer);

      if (!document.getElementById("youtube-iframe-api")) {
        const script = document.createElement("script");
        script.id = "youtube-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          (window.__ytApiCallbacks || []).forEach((cb) => cb());
          window.__ytApiCallbacks = [];
        };
      }
    }

    return () => {
      cancelado = true;
      setListo(false);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      if (contenedorRef.current) contenedorRef.current.innerHTML = "";
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [youtubeId, usaYoutube]);

  // --- Polling del progreso mientras suena (YouTube no emite "timeupdate") ---
  useEffect(() => {
    if (!usaYoutube) return;
    if (estaSonando) {
      intervaloRef.current = setInterval(() => {
        const player = playerRef.current;
        if (player && player.getCurrentTime && player.getDuration) {
          const actual = player.getCurrentTime();
          const total = player.getDuration() || 1;
          setProgreso((actual / total) * 100);
        }
      }, 400);
    } else if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [estaSonando, usaYoutube]);

  const alternarPlay = () => {
    if (usaYoutube) {
      const player = playerRef.current;
      if (!player || !listo || typeof player.playVideo !== "function") return;
      if (estaSonando) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      return;
    }

    // Fallback: audio mp3 local
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
    const nuevoPorcentaje = Math.min(Math.max(clickX / rect.width, 0), 1);

    if (usaYoutube) {
      if (playerRef.current && playerRef.current.getDuration) {
        const total = playerRef.current.getDuration() || 0;
        playerRef.current.seekTo(nuevoPorcentaje * total, true);
        setProgreso(nuevoPorcentaje * 100);
      }
      return;
    }

    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = nuevoPorcentaje * audioRef.current.duration;
      setProgreso(nuevoPorcentaje * 100);
    }
  };

  const retroceder = () => {
    if (usaYoutube) {
      if (playerRef.current && playerRef.current.seekTo) {
        playerRef.current.seekTo(0, true);
      }
      return;
    }
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const avanzar = () => {
    if (usaYoutube) {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, true);
      }
      return;
    }
    if (audioRef.current) audioRef.current.currentTime += 10;
  };

  return (
    <div className="w-full max-w-[340px] mx-auto my-6">
      {/* Caja negra con bordes curvos igual a la imagen */}
      <div className="bg-[#111111] text-white rounded-2xl p-3.5 shadow-[0_20px_40px_-15px_rgba(127,29,29,0.35)] flex items-center gap-3">
        {/* Portada cuadrada */}
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700 flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          {portada ? (
            <img
              src={portada}
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
              onClick={retroceder}
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
              onClick={avanzar}
              className="hover:opacity-75 active:scale-95 transition-all text-neutral-300"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* Player de YouTube oculto: solo se usa como motor de audio */}
      {usaYoutube && (
        <div
          ref={contenedorRef}
          className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Fallback: audio mp3 local si no se cargó youtubeUrl */}
      {!usaYoutube && (
        <audio
          ref={audioRef}
          src={cancion.audioSrc}
          onTimeUpdate={actualizarProgreso}
          onEnded={() => {
            setEstaSonando(false);
            setProgreso(0);
          }}
        />
      )}
    </div>
  );
}