import { Great_Vibes, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "¡Feliz Cumpleaños, Candelita! 🎂❤️",
  description: "Un regalo muy especial para celebrar tu día.",
};

// viewport-fit=cover: permite pintar por debajo del notch/isla y del home
// indicator en iPhone, en vez de dejar esas franjas con el color por
// defecto de Safari. themeColor pinta la propia barra de Safari (arriba)
// del mismo crema que la página, para que se integre en vez de notarse
// como un recuadro aparte al hacer scroll.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF8F0",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFF8F0] text-gray-900">
        {children}
      </body>
    </html>
  );
}