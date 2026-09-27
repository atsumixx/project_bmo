import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Project BMO — Autonomous FSL Translator Kiosk System",
  description:
    "Project BMO by Team SHIELD: an offline-first, on-device Filipino Sign Language (FSL) translator kiosk concept built for Philippine civic counters, hospitals, and academic hubs.",
  icons: {
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmFJcI9nZPkDsO54ySE-7cvSiDqc5Rp9UoHuo43_8UQW4MmXKXkTWU9xQno1rP1WwHiy7s1cB3ntQhIjygpTEnaPu3Rw6M6h7WqiNNegd8nQHkk71gxXtxD8nohXvXe0hp_oPOGjKi5WM1DMkPiiMkpkLuJchgWbM5INd45GyYcJPSaBqQ-2fTXDzlkDpCHNk9DcSVNK584opE-R1x25PJmkA8lfXaWGQmO4ay9_NUPYs8H1_WvfnTo8hTw1VAVD9gFA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@200..600,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface antialiased selection:bg-accent-soft selection:text-primary min-h-screen flex flex-col relative font-body">
        {children}
      </body>
    </html>
  );
}
