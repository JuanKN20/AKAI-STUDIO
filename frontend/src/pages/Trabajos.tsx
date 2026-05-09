import React from "react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  status: "Demo interna" | "Caso en desarrollo" | "Próximamente";
};

const projects: Project[] = [
  {
    id: 1,
    title: "Yorurei Studio Web",
    category: "Marca / Web / Identidad digital",
    description:
      "Sitio oficial de Yorurei Studio, diseñado para presentar la visión, servicios, proyectos y línea creativa del estudio.",
    tags: ["React", "Vite", "Tailwind", "UI/UX", "Branding"],
    image: "/images/Logo/Logo.png",
    status: "Demo interna",
  },
  {
    id: 2,
    title: "Kaleido Lab",
    category: "Desarrollo web / 3D / Gestión colaborativa",
    description:
      "Sistema web para la gestión colaborativa, revisión científica y control de versiones en la producción de modelos 3D.",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma", "3D"],
    image: "/images/1013143.png",
    status: "Caso en desarrollo",
  },
  {
    id: 3,
    title: "DISSAU Wallet",
    category: "Desarrollo web / Fintech / API",
    description:
      "Módulo de billetera digital con consulta de saldo, transferencias entre usuarios e historial de movimientos.",
    tags: [".NET", "React", "API REST", "Wallet"],
    image: "/images/123.png",
    status: "Caso en desarrollo",
  },
  {
    id: 4,
    title: "EMCALI CMS",
    category: "CMS / Automatización / Flujo editorial",
    description:
      "Sistema de gestión de contenidos con flujo editorial, historial de revisiones, publicación programada y automatización.",
    tags: ["React", "CMS", "Node.js", "Editorial Flow"],
    image: "/images/LogoAkai.png",
    status: "Caso en desarrollo",
  },
  {
    id: 5,
    title: "Conceptos de videojuegos",
    category: "Game Dev / Prototipos / Experiencias interactivas",
    description:
      "Exploración de ideas, mecánicas, narrativa visual y prototipos orientados a entretenimiento digital.",
    tags: ["Game Dev", "Narrativa", "3D", "IA"],
    image: "/images/1013143.png",
    status: "Próximamente",
  },
];

const ctaByStatus: Record<Project["status"], string> = {
  "Demo interna": "Demo interna",
  "Caso en desarrollo": "Caso en desarrollo",
  "Próximamente": "Próximamente",
};

const Trabajos: React.FC = () => {
  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Proyectos</p>
      </div>
      <h1 className="akai-section-title mt-3">Casos y proyectos representativos</h1>
      <p className="akai-section-subtitle">
        Presentamos proyectos representativos de Yorurei Studio en desarrollo web, contenido digital,
        experiencias interactivas y soluciones visuales de alto impacto.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="akai-card overflow-hidden">
            <div className="relative">
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full border border-red-500/45 bg-black/65 px-3 py-1 text-xs text-red-100">
                {project.status}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-white">{project.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-red-300">{project.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="akai-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="mt-5 inline-flex rounded-full border border-red-500/45 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-100"
              >
                {ctaByStatus[project.status]}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Trabajos;
