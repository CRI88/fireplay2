# 🎮 Fireplay – Tienda de Videojuegos Online

Fireplay es una aplicación web moderna que simula una tienda de videojuegos online. Desarrollada como práctica final de los módulos M7, M8 y M9, utiliza tecnologías de última generación como **Next.js 15**, **React 19**, **Tailwind CSS 4**, **Firebase** y más.

## 🚀 Tecnologías utilizadas

- ✅ **Next.js 15** (App Router + Server Components)
- ✅ **React 19**
- ✅ **Tailwind CSS 4**
- ✅ **Firebase** (Authentication + Firestore)
- ✅ **RAWG API** (datos de videojuegos)
- ✅ **LocalStorage y Cookies** (almacenamiento persistente)
- ✅ **next-pwa** para convertir en Progressive Web App
- ✅ **Framer Motion** para animaciones
- ✅ **Vite** como herramienta de desarrollo rápida

## 📷 Capturas

> (Aquí puedes incluir imágenes de diferentes pantallas: landing, login, catálogo, favoritos, carrito, etc.)

---

## 📁 Estructura de páginas y funcionalidades

| Ruta                         | Funcionalidad obligatoria                                                   |
|-----------------------------|-----------------------------------------------------------------------------|
| `/`                         | Landing page con secciones informativas, CTA y diseño responsive.           |
| `/login`                    | Login con Firebase Auth.                                                    |
| `/register`                 | Registro de usuario.                                                        |
| `/games`                    | Catálogo dinámico desde RAWG API con paginación.                           |
| `/search`                   | Buscador de juegos.                                                         |
| `/game/[slug]`             | Detalle del videojuego (capturas, descripción, rating, requisitos).        |
| `/product-sheety/[slug]`    | Precio ficticio, opiniones, añadir al carrito.                              |
| `/favorites`                | Juegos favoritos guardados en Firestore.                                   |
| `/cart`                     | Carrito guardado en Firestore o LocalStorage.                              |
| `/contact`                  | Formulario de contacto validado.                                            |
| `/info`                     | Información del proyecto.                                                   |
| `/dashboard`                | Panel privado del usuario (email, nombre, favoritos, mensajes, etc.).       |
| `/404`                      | Página de error personalizada.                                             |

---

## 🔐 Funcionalidades clave

- 🔐 **Autenticación con Firebase**
- 💾 **Carrito persistente con Firestore o LocalStorage**
- ❤️ **Favoritos con guardado en Firestore**
- 📩 **Formulario de contacto funcional**
- 🧑‍💻 **Panel de usuario privado**
- 📱 **Diseño completamente responsive**
- 🔄 **Animaciones suaves con framer-motion**
- 📦 **PWA lista para instalar como app**

---

## 🛠️ Instalación local

```bash
git clone https://github.com/TU_USUARIO/fireplay.git
cd fireplay
npm install
cp .env.example .env.local # Configura las claves de Firebase aquí
npm run dev

Abre localhost:3000 en el navegador
