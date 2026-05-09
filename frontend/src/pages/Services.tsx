import React from "react";
import { Link } from "react-router-dom";
import { Bot, Boxes, Clapperboard, Code2, Gamepad2, Palette } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const services: Service[] = [
  {
    id: 1,
    title: "Desarrollo web",
    description:
      "Creamos sitios web, landing pages, plataformas, dashboards y aplicaciones modernas, rápidas y escalables.",
    deliverables: ["Arquitectura frontend/backend", "Interfaces responsivas y optimizadas"],
    icon: Code2,
  },
  {
    id: 2,
    title: "Videojuegos",
    description:
      "Diseñamos y desarrollamos experiencias de juego desde la conceptualización hasta prototipos funcionales.",
    deliverables: ["Diseño de mecánicas", "Prototipos jugables y dirección visual"],
    icon: Gamepad2,
  },
  {
    id: 3,
    title: "Animación 2D/3D",
    description:
      "Producimos piezas animadas, personajes, escenas y storytelling visual para marcas y productos.",
    deliverables: ["Animaciones para contenido", "Narrativa visual con enfoque de marca"],
    icon: Clapperboard,
  },
  {
    id: 4,
    title: "Modelado 3D",
    description:
      "Desarrollamos assets, objetos y escenarios para entretenimiento, visualización de productos y experiencias interactivas.",
    deliverables: ["Assets y entornos 3D", "Optimización para uso digital e interactivo"],
    icon: Boxes,
  },
  {
    id: 5,
    title: "Inteligencia artificial",
    description:
      "Exploramos soluciones con IA para automatización, generación de contenido y experiencias digitales inteligentes.",
    deliverables: ["Prototipos asistidos por IA", "Automatización de flujos y tareas"],
    icon: Bot,
  },
  {
    id: 6,
    title: "Branding y contenido digital",
    description:
      "Construimos identidad visual, piezas gráficas y contenido multimedia para fortalecer presencia de marca.",
    deliverables: ["Sistema visual de marca", "Contenido digital para comunicación"],
    icon: Palette,
  },
];

const Services: React.FC = () => {
  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Servicios</p>
      </div>
      <h1 className="akai-section-title mt-3">Servicios corporativos de Yorurei Studio</h1>
      <p className="akai-section-subtitle">
        Diseñamos y construimos soluciones digitales que combinan estrategia, arte y tecnología
        para empresas, productos y experiencias de entretenimiento.
      </p>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="akai-card p-6">
            <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
              <service.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">{service.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{service.description}</p>
            <ul className="mt-4 space-y-1 text-sm text-zinc-300">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-red-200 hover:text-red-100">
              Solicitar información →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Services;
