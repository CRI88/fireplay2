import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
export default function RootLayout({ children }: { children: ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}