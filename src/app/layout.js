import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Rahin Haque — MERN Stack Developer",
  description:
    "Portfolio of Rahin Haque, a Junior MERN Stack Developer specializing in React, Next.js, Node.js, Express, and MongoDB.",
  keywords: [
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Rahin Haque",
    "Portfolio",
  ],
  authors: [{ name: "Rahin Haque" }],
  openGraph: {
    title: "Rahin Haque — MERN Stack Developer",
    description:
      "Portfolio of Rahin Haque — building clean, functional web interfaces with React, Next.js, Node.js & MongoDB.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased relative">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Ambient Background Glows */}
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-3" aria-hidden="true" />

        {/* Noise Texture Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}