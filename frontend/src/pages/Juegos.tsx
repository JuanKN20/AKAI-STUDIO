import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Gamepad2, Layers3, Palette, SlidersHorizontal, Sparkles } from 'lucide-react';
import { fallbackProducts } from '../data/fallbackProducts';
import { fallbackProjects } from '../data/fallbackProjects';
import { getPublicProducts, getPublicProjects, ProductItem, ProjectItem } from '../services/api';

type GameHighlight = {
  id: string;
  title: string;
  description: string;
  meta: string;
  status: string;
};

const areas = [
  {
    title: 'Prototipado',
    description: 'Diseñamos prototipos jugables para validar ideas, ritmo y experiencia de usuario.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Diseño de mecánicas',
    description: 'Definimos sistemas de juego que equilibren diversión, desafío y progresión.',
    icon: Gamepad2,
  },
  {
    title: 'Narrativa y mundos',
    description: 'Creamos universos, tono visual y estructuras narrativas con identidad propia.',
    icon: Layers3,
  },
  {
    title: 'Arte visual',
    description: 'Integramos dirección de arte, estilo gráfico y coherencia audiovisual.',
    icon: Palette,
  },
  {
    title: 'Interfaces y experiencia',
    description: 'Diseñamos HUD e interfaces claras para mejorar inmersión y jugabilidad.',
    icon: Sparkles,
  },
  {
    title: 'Innovación técnica',
    description: 'Exploramos IA y nuevas tecnologías para potenciar la experiencia interactiva.',
    icon: Cpu,
  },
];

function includesGameTerm(value: string | null | undefined): boolean {
  const content = String(value || '').toLowerCase();
  return (
    content.includes('juego') ||
    content.includes('videojuego') ||
    content.includes('game') ||
    content.includes('jugable') ||
    content.includes('narrativa')
  );
}

function mapGameProject(project: ProjectItem): GameHighlight {
  return {
    id: `project-${project.id}`,
    title: project.title,
    description: project.short_description,
    meta: project.category || 'Proyecto',
    status: project.status === 'coming_soon' ? 'Próximamente' : 'Publicado',
  };
}

function mapGameProduct(product: ProductItem): GameHighlight {
  return {
    id: `product-${product.id}`,
    title: product.title,
    description: product.short_description,
    meta: `Producto ${product.type}`,
    status: product.status === 'coming_soon' ? 'Próximamente' : 'Publicado',
  };
}

const Juegos: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [apiProjects, apiProducts] = await Promise.all([getPublicProjects(), getPublicProducts()]);
        if (!mounted) return;
        if (apiProjects.length > 0) setProjects(apiProjects);
        if (apiProducts.length > 0) setProducts(apiProducts);
        setUsingFallback(false);
      } catch {
        if (!mounted) return;
        setProjects(fallbackProjects);
        setProducts(fallbackProducts);
        setUsingFallback(true);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const highlights = useMemo(() => {
    const gameProjects = projects.filter(
      (item) =>
        includesGameTerm(item.title) ||
        includesGameTerm(item.category) ||
        item.technologies.some((tech) => includesGameTerm(tech)) ||
        includesGameTerm(item.short_description),
    );

    const gameProducts = products.filter(
      (item) =>
        item.type.toLowerCase() === 'game' ||
        item.tags.some((tag) => includesGameTerm(tag)) ||
        includesGameTerm(item.title) ||
        includesGameTerm(item.short_description),
    );

    return [...gameProjects.map(mapGameProject), ...gameProducts.map(mapGameProduct)].slice(0, 4);
  }, [products, projects]);

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Game Division</p>
      </div>
      <h1 className="akai-section-title mt-3">Desarrollo de videojuegos en Yorurei Studio</h1>
      <p className="akai-section-subtitle">
        En Yorurei Studio exploramos el desarrollo de videojuegos como una forma de unir narrativa, arte, tecnología e interacción.
        Creamos conceptos, prototipos y experiencias jugables pensadas para entretener y construir mundos memorables.
      </p>
      {usingFallback ? <p className="mt-3 text-xs text-zinc-400">Mostrando datos locales de respaldo.</p> : null}

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

      {highlights.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-center gap-3">
            <div className="akai-hud-line" />
            <p className="text-xs uppercase tracking-[0.24em] text-red-300">Proyectos y productos relacionados</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.id} className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-red-300">{item.meta}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                <span className="mt-4 inline-flex rounded-full border border-red-500/45 bg-black/40 px-3 py-1 text-xs text-red-100">
                  {item.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <div className="akai-panel p-6 text-center md:p-8">
          <h2 className="text-2xl font-bold text-white">¿Tienes un concepto de juego en mente?</h2>
          <p className="mt-3 text-sm text-zinc-300 md:text-base">
            Desde la idea inicial hasta el prototipo, te acompañamos para construir experiencias jugables con identidad visual y enfoque
            técnico.
          </p>
          <Link to="/contact" className="mt-6 akai-btn-primary">
            Desarrolla tu idea con Yorurei Studio
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Juegos;
