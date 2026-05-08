import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Gamepad2, Layers3, Palette, SlidersHorizontal, Sparkles } from "lucide-react";

const areas = [
  {
    title: "Prototipado",
    description: "Diseñamos prototipos jugables para validar ideas, ritmo y experiencia de usuario.",
    icon: SlidersHorizontal,
  },
  {
    title: "Diseño de mecánicas",
    description: "Definimos sistemas de juego que equilibren diversión, desafío y progresión.",
    icon: Gamepad2,
  },
  {
    title: "Narrativa y mundos",
    description: "Creamos universos, tono visual y estructuras narrativas con identidad propia.",
    icon: Layers3,
  },
  {
    title: "Arte visual",
    description: "Integramos dirección de arte, estilo gráfico y coherencia audiovisual.",
    icon: Palette,
  },
  {
    title: "Interfaces y experiencia",
    description: "Diseñamos HUD e interfaces claras para mejorar inmersión y jugabilidad.",
    icon: Sparkles,
  },
  {
    title: "Innovación técnica",
    description: "Exploramos IA y nuevas tecnologías para potenciar la experiencia interactiva.",
    icon: Cpu,
  },
];

const Juegos: React.FC = () => {
  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Game Division</p>
      </div>
      <h1 className="akai-section-title mt-3">Desarrollo de videojuegos en Akai Studio</h1>
      <p className="akai-section-subtitle">
        En Akai Studio exploramos el desarrollo de videojuegos como una forma de unir narrativa,
        arte, tecnología e interacción. Creamos conceptos, prototipos y experiencias jugables
        pensadas para entretener, emocionar y construir mundos memorables.
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {areas.map((area) => (
          <article key={area.title} className="akai-card p-6">
            <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
              <area.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">{area.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{area.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <div className="akai-panel p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-white">¿Tienes un concepto de juego en mente?</h2>
          <p className="mt-3 text-sm md:text-base text-zinc-300">
            Desde la idea inicial hasta el prototipo, te acompañamos para construir experiencias
            jugables con identidad visual y enfoque técnico.
          </p>
          <Link to="/contact" className="mt-6 akai-btn-primary">
            Desarrolla tu idea con Akai Studio
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Juegos;
