import React, { useState, useEffect } from 'react';

const ServicesCarousel: React.FC = () => {
  const servicesH = [
    {
      id: 1,
      title: 'Desarrollo de videojuegos',
      video: 'src/assets/2D Animation Reel 2022.mp4',
      link: '/services/videojuegos',
    },
    {
      id: 2,
      title: 'Animación 2D y 3D',
      video: 'src/assets/2D Animation Reel 2022.mp4',
      link: '/services/animacion',
    },
    {
      id: 3,
      title: 'Diseño gráfico',
      video: 'src/assets/2D Animation Reel 2022.mp4',
      link: '/services/diseno',
    },
    {
      id: 4,
      title: 'Narrativa y guion',
      video: 'src/assets/2D Animation Reel 2022.mp4',
      link: '/services/narrativa',
    },
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % servicesH.length);
    }, 5000); // Cambia de servicio cada 5 segundos
    return () => clearInterval(interval);
  }, [servicesH.length]);

  const currentService = servicesH[currentServiceIndex];

  return (
    <section className="relative px-8 py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <h2 className="text-3xl font-bold text-gray-200 mb-8">Servicios</h2>
      <div className="relative w-full h-[60vh] rounded-lg overflow-hidden shadow-lg">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src={currentService.video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">{currentService.title}</h3>
          <button
            onClick={() => (window.location.href = currentService.link)}
            className="mt-6 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full text-sm hover:bg-pink-600 transition transform hover:scale-105"
          >
            Ver más
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {servicesH.map((serviceH, index) => (
          <button
            key={serviceH.id}
            onClick={() => setCurrentServiceIndex(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentServiceIndex ? 'bg-pink-500' : 'bg-gray-400'
            } hover:bg-pink-600 transition`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default ServicesCarousel;
