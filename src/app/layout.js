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

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${montserrat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}