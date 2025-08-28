import React from "react";
import ServicesCarousel from "../components/ServicesCarousel";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 pt-[150px] overflow-x-hidden">
      {/* Sección con el video de fondo y eslogan */}
      <section className="relative w-full h-screen flex items-center justify-center">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/LogoAkai.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Texto encima del video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-8">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Sombras que narran historias
          </h1>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4">
            que transforman realidades
          </h2>
          <Link to="/trabajos">
            <button
              className="mt-6 px-8 py-3 bg-red-700 text-white font-semibold rounded-full text-base hover:bg-red-900 transition"
            >
              Nuestros trabajos
            </button>
          </Link>
        </div>
      </section>

      {/* Sección de actualidad */}
      <section className="w-full max-w-7xl px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-red-500">Actualidad</h2>

          <button className="px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition">
            Ver más
          </button>
        </div>

        {/* actualidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          <div className="bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg w-[300px] border border-gray-600 transition-transform hover:scale-105">
            <img src="/images/123.png" alt="Actualidad 1" className="w-full h-40 object-cover rounded-md" />
          </div>
          <div className="bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg w-[300px] border border-gray-600 transition-transform hover:scale-105">
            <img src="/images/1013143.png" alt="Actualidad 2" className="w-full h-40 object-cover rounded-md" />
          </div>
        </div>
      </section>

      <ServicesCarousel />
    </div>
  );
};

export default Home;
