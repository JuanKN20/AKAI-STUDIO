import React from 'react';
import ServicesCarousel from'../components/ServicesCarousel';

const Home: React.FC = () => {
  return (
    <div>
      {/* Sección con el video de fondo y eslogan */}
      <div className="relative w-full h-[90vh] top-5">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="src/assets/Itachi.mp4" type="video/mp4" />
          Tu navegador no soporta el video
        </video>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-8 text-center">
          <h1 className="py-2 px-4 text-xl font-semibold">Sombras que narran historias,</h1>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">que transforman realidades</h1>
          <button className="mt-6 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full text-sm hover:bg-pink-600 transition transform hover:scale-105">
            Nuestros trabajos
          </button>
        </div>
      </div>

      {/* Sección actualidad */}
      <section className="px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3x1 font-bold text-gray-800">Actualidad</h2>
          <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full text-sm hover:bg-pink-600 transition transform hover:scale-105">
            Ver más
          </button>
        </div>
        {/* Imágenes de actualidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src="src\assets\123.png"
              alt="Actualidad 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src="src/assets/1013143.png"
              alt="Actualidad 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
       {/* Sección servicios */}
       <ServicesCarousel />

    </div>
  );
};

export default Home;
