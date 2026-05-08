import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  video: string;
  link: string;
  cta: string;
};

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Desarrollo de videojuegos",
    description:
      "Creamos prototipos y experiencias jugables donde se combinan narrativa, arte y tecnología.",
    video: "/videos/videojuegos.mp4",
    link: "/juegos",
    cta: "Explorar división de juegos",
  },
  {
    id: 2,
    title: "Animación y modelado 3D",
    description:
      "Desarrollamos piezas visuales, personajes y escenas para contenido, marca y entretenimiento.",
    video: "/videos/animacion.mp4",
    link: "/services",
    cta: "Ver servicios",
  },
  {
    id: 3,
    title: "Plataformas web",
    description:
      "Construimos productos digitales modernos, escalables y alineados con objetivos de negocio.",
    video: "/videos/web.mp4",
    link: "/services",
    cta: "Conocer capacidades",
  },
  {
    id: 4,
    title: "Soluciones interactivas e IA",
    description:
      "Exploramos automatización y experiencias inteligentes para nuevas líneas de producto.",
    video: "/videos/modelado.mp4",
    link: "/contact",
    cta: "Hablar con Akai Studio",
  },
];

const ServicesCarousel: React.FC = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const currentService = services[currentServiceIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      void videoRef.current.play();
    }
  }, [currentServiceIndex]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pt-10 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Servicios destacados</p>
      </div>
      <h2 className="akai-section-title mt-3">Capacidades de Akai Studio</h2>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-red-900/40 shadow-akai-soft">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          preload="metadata"
          className="h-[420px] w-full object-cover md:h-[520px]"
          onEnded={() => setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length)}
        >
          <source src={currentService.video} type="video/mp4" />
          Tu navegador no soporta video.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />

        <div className="absolute inset-0 flex items-end p-5 sm:p-8 md:p-10">
          <div className="max-w-xl space-y-4 rounded-2xl border border-red-700/30 bg-black/40 p-5 backdrop-blur-md md:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-red-200">Línea de negocio</p>
            <h3 className="text-2xl font-bold text-white md:text-3xl">{currentService.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-200 md:text-base">{currentService.description}</p>
            <button
              type="button"
              onClick={() => navigate(currentService.link)}
              className="akai-btn-primary gap-2 px-5 py-2.5"
            >
              {currentService.cta}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="absolute right-5 top-5 flex flex-col gap-2">
          {services.map((service, index) => (
            <button
              type="button"
              key={service.id}
              onClick={() => setCurrentServiceIndex(index)}
              className={`h-2.5 w-10 rounded-full transition ${
                index === currentServiceIndex
                  ? "bg-red-400 shadow-[0_0_16px_rgba(255,59,92,0.65)]"
                  : "bg-zinc-400/45"
              }`}
              aria-label={`Ver ${service.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
