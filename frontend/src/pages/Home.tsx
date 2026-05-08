import React from "react";
import { Link } from "react-router-dom";
import {
  Boxes,
  Clapperboard,
  Code2,
  Cpu,
  Gamepad2,
  Palette,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import ServicesCarousel from "../components/ServicesCarousel";

const chips = [
  "Videojuegos",
  "Animación",
  "Desarrollo Web",
  "Modelado 3D",
  "Inteligencia Artificial",
  "Experiencias Interactivas",
];

const areas = [
  {
    title: "Desarrollo de videojuegos",
    description: "Conceptos, prototipos y productos jugables con narrativa, arte y tecnología.",
    icon: Gamepad2,
  },
  {
    title: "Desarrollo web",
    description: "Sitios, plataformas y aplicaciones escalables alineadas con objetivos de negocio.",
    icon: Code2,
  },
  {
    title: "Animación 2D/3D",
    description: "Storytelling visual para marcas, productos y experiencias multimedia.",
    icon: Clapperboard,
  },
  {
    title: "Modelado y visualización 3D",
    description: "Assets, personajes y escenas para entretenimiento y soluciones digitales.",
    icon: Boxes,
  },
  {
    title: "Inteligencia artificial",
    description: "Automatización, asistentes y experiencias inteligentes para nuevos productos.",
    icon: Cpu,
  },
  {
    title: "Experiencias interactivas",
    description: "Integración de arte, tecnología e interacción para resultados memorables.",
    icon: Sparkles,
  },
  {
    title: "Branding y contenido digital",
    description: "Identidad visual y comunicación multimedia con enfoque estratégico.",
    icon: Palette,
  },
];

const differentiators = [
  {
    title: "Creatividad con enfoque técnico",
    description: "Diseñamos soluciones visuales con base sólida en arquitectura y desarrollo.",
    icon: Zap,
  },
  {
    title: "Experiencias visualmente impactantes",
    description: "Construimos productos con identidad estética fuerte y coherencia de marca.",
    icon: Sparkles,
  },
  {
    title: "Soluciones adaptadas a cada proyecto",
    description: "Cada propuesta se ajusta a objetivos reales, alcance y tipo de audiencia.",
    icon: Target,
  },
  {
    title: "Integración de arte, tecnología e innovación",
    description: "Unimos dirección creativa y ejecución técnica para producir experiencias premium.",
    icon: Cpu,
  },
];

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
        >
          <source src="/videos/LogoAkai.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/75 to-black/95" />

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-3">
                <div className="akai-hud-line" />
                <span className="text-xs uppercase tracking-[0.24em] text-red-300">
                  Estudio creativo y tecnológico
                </span>
              </div>

              <div>
                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Akai Studio
                </h1>
                <p className="mt-4 text-lg text-red-200 sm:text-xl">
                  Creamos experiencias digitales, visuales e interactivas.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Somos un estudio creativo y tecnológico enfocado en desarrollo web, videojuegos,
                  animación, modelado 3D e inteligencia artificial. Transformamos ideas en
                  proyectos visualmente impactantes, funcionales y memorables.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={chip} className="akai-chip">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/services" className="akai-btn-primary">
                  Explorar servicios
                </Link>
                <Link to="/trabajos" className="akai-btn-secondary">
                  Ver proyectos
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-zinc-300 underline-offset-4 hover:text-red-200 hover:underline"
                >
                  Contactar
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <article className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-red-300">Misión</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Ofrecer soluciones creativas e innovadoras en animación, videojuegos, desarrollo
                  web, modelado 3D e inteligencia artificial, diseñadas para resolver necesidades
                  de clientes y crear entretenimiento de alta calidad.
                </p>
              </article>
              <article className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-red-300">Visión</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Ser un estudio referente en la creación de experiencias innovadoras y visualmente
                  impactantes, destacando por calidad, creatividad, pasión, innovación y uso de
                  tecnologías de vanguardia.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="akai-page pt-8 md:pt-10">
        <div className="flex items-center gap-3">
          <div className="akai-hud-line" />
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Qué hacemos</p>
        </div>
        <h2 className="akai-section-title mt-3">Líneas de negocio de Akai Studio</h2>
        <p className="akai-section-subtitle">
          Integramos tecnología, creatividad y producción multimedia para construir soluciones
          digitales con identidad y alto impacto visual.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <article key={area.title} className="akai-card p-6">
              <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                <area.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{area.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="akai-page pt-2 md:pt-6">
        <div className="flex items-center gap-3">
          <div className="akai-hud-line" />
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Diferenciales</p>
        </div>
        <h2 className="akai-section-title mt-3">Por qué Akai Studio</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {differentiators.map((item) => (
            <article key={item.title} className="akai-card p-6">
              <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ServicesCarousel />

      <section className="akai-page pt-2 md:pt-4 pb-20">
        <div className="akai-panel p-6 md:p-8 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Siguiente paso</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">Hablemos de tu proyecto</h2>
          <p className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-zinc-300">
            Si estás construyendo una marca, producto o experiencia digital, en Akai Studio
            podemos ayudarte a diseñarlo y desarrollarlo con un enfoque creativo y tecnológico.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="akai-btn-primary">
              Iniciar conversación
            </Link>
            <Link to="/services" className="akai-btn-secondary">
              Revisar servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
