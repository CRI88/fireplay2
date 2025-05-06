import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
export default function RootLayout({ children }: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <Header />
        <main>{children}</main>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#a855f7" />
        <Footer />
      </body>
    </html>
  );
}