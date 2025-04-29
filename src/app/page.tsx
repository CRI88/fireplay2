'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 overflow-hidden shadow-lg">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-30">
          <img
            src="https://universidadeuropea.com/resources/media/images/tipos-videojuegos-800x450.width-1200.format-webp.webp"
            alt="Imagen destacada"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
            ¡Bienvenido a Fireplay!
          </h2>
          <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1.5s">
            Descubre los mejores videojuegos, juega y comparte tus experiencias con la comunidad.
          </p>
          <Link
            href="/games"
            className="bg-yellow-500 hover:bg-yellow-400 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s"
          >
            Explora los Juegos
          </Link>
        </div>
      </section>

      <section className="relative py-16 px-4 min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url("https://web-assets.esetstatic.com/tn/-x700/wls/2021/08/por-qu%C3%A9-compa%C3%B1%C3%ADas-videojuegos-son-blanco-atractivo-cibercriminales.jpg")' }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">¿Qué es Fireplay?</h2>
          <p className="text-lg text-white mb-4 animate__animated animate__fadeIn">
            Fireplay es una plataforma dedicada a los amantes de los videojuegos, donde podrás descubrir,
            jugar y compartir tus juegos favoritos con una comunidad activa.
          </p>
        </div>
      </section>

      <section className="relative py-16 px-4 min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url("https://espacio.fundaciontelefonica.com/wp-content/uploads/2019/12/videojuegos-educacion-creatividad-1400x600.jpg")' }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="max-w-3xl text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">¿Cómo funciona?</h2>
          <div className="space-y-8 text-left text-white">
            <div className="flex items-start space-x-4">
              <div className="text-4xl font-bold text-blue-600">1</div>
              <div>
                <h3 className="text-xl font-semibold">Descubre los juegos</h3>
                <p>Explora una amplia variedad de juegos que puedes probar y disfrutar.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-4xl font-bold text-blue-600">2</div>
              <div>
                <h3 className="text-xl font-semibold">Añade a tus favoritos</h3>
                <p>Guarda tus juegos favoritos para acceder a ellos rápidamente.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-4xl font-bold text-blue-600">3</div>
              <div>
                <h3 className="text-xl font-semibold">Comparte y comenta</h3>
                <p>Interactúa con otros jugadores dejando comentarios y recomendaciones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
