export const birthdayData = {
  // Datos principales
  girlfriendName: "Candelita",
  yourName: "Agus", // Cambialo por el apodo o nombre que uses con ella
  age: "", // Si querés mostrar los años poné por ejemplo "21", sino dejalo vacío ""

  // Pantalla de apertura
  welcome: {
    badge: "Para alguien muy especial ✨",
    buttonText: "Abrí tu sorpresa ♥",
    teaser: "Preparé un rinconcito digital para celebrar tu día...",
  },

  // Encabezado principal
  hero: {
    badge: "🎂 ¡Feliz Cumpleaños!",
    title: "Hoy el mundo festeja que existís",
    subtitle: "Y yo festejo la suerte inmensa de tenerte en mi vida y compartir tus sonrisas.",
  },

  // Canción de Milo J
  music: {
    title: "M.A.I",
    artist: "Milo J",
    youtubeUrl: "https://www.youtube.com/watch?v=MldGX_mbS-o&list=RDMldGX_mbS-o&start_radio=1", // Pegá acá el link del tema en YouTube
    audioSrc: "/music/maia.mp3", // Fallback si no cargás youtubeUrl (dejalo por las dudas)
    // coverImg: "/photos/retrato-principal.jpg", // Opcional: si lo dejás vacío, se usa la miniatura del video de YouTube
    dedication: "Dale play: una canción que me hace pensar en vos ♥",
  },

  // Foto destacada de Candelita
  portrait: {
    badge: "La cumpleañera más hermosa",
    title: "La protagonista de este día ✨",
    image: "/photos/retrato-principal.jpg",
    quote: "Que nunca se te apague esa alegría tan linda que ilumina todo alrededor.",
  },

  // Galería de fotos / recuerdos
  gallery: [
    {
      id: 1,
      url: "/photos/foto1.jpeg",
      caption: "Nuestro 2do Año Nuevo juntos!!",
    },
    {
      id: 2,
      url: "/photos/foto2.jpeg",
      caption: "Hace un año en el Arakur!!",
    },
    {
      id: 3,
      url: "/photos/foto3.jpeg",
      caption: "Un hermoso viaje al lado tuyo, el primero de muchos",
    },
    {
      id: 4,
      url: "/photos/foto4.jpg",
      caption: "Hacés que todo sea más lindo",
    },
  ],

  // Video recopilatorio
  video: {
    badge: "Momentos juntos 🎥",
    title: "Un pequeño momento de nuestro viaje",
    subtitle: "Espero siempre estes con una sonrisa y asi de feliz!",
    videoSrc: "/video/video1.mp4", // Ruta dentro de public/video/
  },

 // Carta de cumpleaños
  letter: {
    title: "Unas palabras para vos ",
    salutation: "Mi Candelita,",
    paragraphs: [
      "Hoy que cumplís años quiero recordarte la personita increíble que sos. Ya es el tercer cumpleaños tuyo que paso a tu lado, ¡y ojalá que sigan siendo muchísimos más!",
      "Sé que cumplir 22 se siente raro. Parece que fue ayer cuando teníamos 19 y recién nos estábamos poniendo de novios, y hoy estamos a nada de comenzar una vida adulta. Pero quiero que sepas que siempre voy a estar para vos; siempre que me necesites sabés que contás conmigo, ¡con tu quejoso!",
      "Gracias por todas las risas, momentos, viajes, nuevas experiencias y por todo el amor y cariño que me demostrás día a día. Estoy seguro de que vas a lograr todo lo que te propongas, porque sos capaz de todo.",
      "Que tengas un hermoso cumpleaños y que seas muy feliz. ¡Feliz cumple, mi amor!"
    ],
    signature: "Te amo muchísimo,",
  },

  // Cajitas interactivas desplegables
  surprises: [
    {
      id: 1,
      title: "¿Por qué sos tan especial? ♥",
      content: "Por tu ternura única, tu manera de hacerme sonreír aun en los días raros y la luz hermosa que transmitís siempre.",
    },
    {
      id: 2,
      title: "Un deseo para tus nuevos años 🎈",
      content: "Que la vida te regrese triplicado todo el amor, la bondad y las sonrisas que le das a quienes te rodean.",
    },
    {
      id: 3,
      title: "Un secreto que ya sabés... 🤫",
      content: "¡Sos lo más lindo que me pasó y te amo con todo el corazón!",
    },
  ],

  // Mensaje de cierre
  finalMessage: {
    title: "¡Que seas inmensamente feliz hoy y siempre! 🎂 ♥",
    subtext: "Gracias por existir y por hacerme tan feliz.",
    footer: "Hecho con mucho amor para Candelita",
    footer: "PD: TU ARMY BOOM LLEGA EN ESTE SEMANA ajajaj",
  }
};