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
  source: 'project' | 'product';
  tags: string[];
  demoUrl?: string | null;
  repositoryUrl?: string | null;
};

const capabilities = [
  {
    title: 'Prototipado jugable',
    description: 'Construimos prototipos funcionales para validar ideas, ritmo, objetivos y experiencia de usuario.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Mecánicas y gameplay',
    description: 'Diseñamos sistemas de juego con equilibrio entre diversión, desafío, progresión y retención.',
    icon: Gamepad2,
  },
  {
    title: 'Narrativa y mundos',
    description: 'Desarrollamos universos, tono narrativo y dirección artística para experiencias con identidad.',
    icon: Layers3,
  },
  {
    title: 'Arte visual e interfaces',
    description: 'Integramos estilo gráfico, HUD y UI para reforzar inmersión y claridad durante la jugabilidad.',
    icon: Palette,
  },
  {
    title: 'Experiencias interactivas',
    description: 'Aplicamos lógica interactiva para productos lúdicos, demostraciones y activaciones digitales.',
    icon: Sparkles,
  },
  {
    title: 'Innovación técnica',
    description: 'Exploramos automatización, IA y nuevas tecnologías para potenciar productos interactivos.',
    icon: Cpu,
  },
];

const projectTypes = [
  {
    title: 'Conceptos y vertical slices',
    description: 'Validación temprana de ideas, tono visual y pilares de jugabilidad.',
  },
  {
    title: 'Prototipos para pitch',
    description: 'Versiones funcionales para presentar proyectos a aliados, clientes o inversionistas.',
  },
  {
    title: 'Experiencias para marca',
    description: 'Juegos y dinámicas interactivas para campañas, activaciones y comunicación digital.',
  },
];

const processSteps = [
  'Definición del concepto, objetivos y alcance del proyecto.',
  'Diseño de mecánicas, flujo de juego y dirección visual.',
  'Desarrollo del prototipo y validación iterativa.',
  'Ajustes finales y planificación de siguientes fases.',
];

function includesGameTerm(value: string | null | undefined): boolean {
  const content = String(value || '').toLowerCase();
  return (
    content.includes('juego') ||
    content.includes('videojuego') ||
    content.includes('game') ||
    content.includes('jugable') ||
    content.includes('interactivo') ||
    content.includes('narrativa')
  );
}

function isValidExternalUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function canShowRepository(value: string | null | undefined): boolean {
  if (!isValidExternalUrl(value)) return false;
  return String(value).toLowerCase().includes('github.com/');
}

function mapGameProject(project: ProjectItem): GameHighlight {
  return {
    id: `project-${project.id}`,
    title: project.title,
    description: project.short_description || 'Proyecto interactivo desarrollado desde el estudio.',
    meta: project.category || 'Proyecto',
    status: project.status === 'coming_soon' ? 'Próximamente' : 'Publicado',
    source: 'project',
    tags: Array.isArray(project.technologies) ? project.technologies.filter(Boolean).slice(0, 4) : [],
    demoUrl: project.demo_url,
    repositoryUrl: project.repository_url,
  };
}

function mapGameProduct(product: ProductItem): GameHighlight {
  return {
    id: `product-${product.id}`,
    title: product.title,
    description: product.short_description || 'Producto interactivo en evolución.',
    meta: `Producto ${product.type}`,
    status: product.status === 'coming_soon' ? 'Próximamente' : 'Publicado',
    source: 'product',
    tags: Array.isArray(product.tags) ? product.tags.filter(Boolean).slice(0, 4) : [],
  };
}

const Juegos: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [showCatalogNotice, setShowCatalogNotice] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [apiProjects, apiProducts] = await Promise.all([getPublicProjects(), getPublicProducts()]);
        if (!mounted) return;

        const hasProjects = apiProjects.length > 0;
        const hasProducts = apiProducts.length > 0;

        if (hasProjects || hasProducts) {
          if (hasProjects) setProjects(apiProjects);
          if (hasProducts) setProducts(apiProducts);
          setShowCatalogNotice(false);
        } else {
          setProjects(fallbackProjects);
          setProducts(fallbackProducts);
          setShowCatalogNotice(true);
        }
      } catch {
        if (!mounted) return;
        setProjects(fallbackProjects);
        setProducts(fallbackProducts);
        setShowCatalogNotice(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const highlights = useMemo(() => {
    const gameProjects = projects
      .filter(
        (item) =>
          item.status !== 'draft' &&
          (includesGameTerm(item.title) ||
            includesGameTerm(item.category) ||
            item.technologies.some((tech) => includesGameTerm(tech)) ||
            includesGameTerm(item.short_description)),
      )
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

    const gameProducts = products
      .filter(
        (item) =>
          item.status !== 'draft' &&
          (item.type.toLowerCase() === 'game' ||
            item.tags.some((tag) => includesGameTerm(tag)) ||
            includesGameTerm(item.title) ||
            includesGameTerm(item.short_description)),
      )
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

    return [...gameProjects.map(mapGameProject), ...gameProducts.map(mapGameProduct)].slice(0, 6);
  }, [products, projects]);

  return (
    <div className="akai-page">
      <section>
        <div className="flex items-center gap-3">
          <div className="akai-hud-line" />
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Línea de videojuegos</p>
        </div>
        <h1 className="akai-section-title mt-3">Videojuegos y experiencias interactivas</h1>
        <p className="akai-section-subtitle">
          Diseñamos conceptos, prototipos, mecánicas, interfaces y experiencias jugables que combinan narrativa visual, tecnología y
          dirección artística.
        </p>
        <p className="mt-3 max-w-4xl text-sm text-zinc-300 md:text-base">
          Esta línea de negocio está orientada a marcas, estudios y equipos que necesitan desarrollar ideas jugables, validar conceptos
          o construir experiencias interactivas con identidad visual y base técnica sólida.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="akai-btn-primary">
            Hablemos de una idea
          </Link>
          <Link to="/trabajos" className="akai-btn-secondary">
            Ver proyectos
          </Link>
          <Link to="/services" className="akai-btn-secondary">
            Explorar servicios
          </Link>
        </div>
      </section>

      {isLoading ? (
        <section className="mt-8">
          <article className="akai-card p-6">
            <h2 className="text-lg font-semibold text-white">Capacidades de videojuegos</h2>
            <p className="mt-2 text-sm text-zinc-300">Cargando información de la línea de desarrollo interactivo...</p>
          </article>
        </section>
      ) : null}

      {!isLoading ? (
        <>
          {showCatalogNotice ? (
            <section className="mt-8">
              <article className="akai-card p-5">
                <p className="text-sm text-zinc-300">
                  Esta sección muestra referencias actuales de la línea de videojuegos del estudio.
                </p>
              </article>
            </section>
          ) : null}

          <section className="mt-10">
            <div className="flex items-center gap-3">
              <div className="akai-hud-line" />
              <p className="text-xs uppercase tracking-[0.24em] text-red-300">Qué desarrollamos</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((item) => (
                <article key={item.title} className="akai-card p-6">
                  <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="akai-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-red-300">Tipos de proyectos</p>
              <div className="mt-4 space-y-4">
                {projectTypes.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="akai-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-red-300">Proceso creativo</p>
              <ol className="mt-4 space-y-3">
                {processSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-zinc-300">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/45 bg-black/45 text-xs text-red-200">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          </section>

          {highlights.length > 0 ? (
            <section className="mt-10">
              <div className="flex items-center gap-3">
                <div className="akai-hud-line" />
                <p className="text-xs uppercase tracking-[0.24em] text-red-300">Referencias relacionadas</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {highlights.map((item) => {
                  const hasDemo = item.source === 'project' && isValidExternalUrl(item.demoUrl);
                  const hasRepository = item.source === 'project' && canShowRepository(item.repositoryUrl);

                  return (
                    <article key={item.id} className="akai-card p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-red-300">{item.meta}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="akai-chip">{item.status}</span>
                        {item.tags.length > 0
                          ? item.tags.map((tag) => (
                              <span key={`${item.id}-${tag}`} className="akai-chip">
                                {tag}
                              </span>
                            ))
                          : null}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/contact" className="akai-btn-primary">
                          Hablar de un proyecto
                        </Link>
                        <Link to="/trabajos" className="akai-btn-secondary">
                          Ver proyectos
                        </Link>
                        {hasDemo ? (
                          <a
                            href={item.demoUrl as string}
                            target="_blank"
                            rel="noreferrer"
                            className="akai-btn-secondary"
                            aria-label={`Ver demo de ${item.title}`}
                          >
                            Ver demo
                          </a>
                        ) : null}
                        {hasRepository ? (
                          <a
                            href={item.repositoryUrl as string}
                            target="_blank"
                            rel="noreferrer"
                            className="akai-btn-secondary"
                            aria-label={`Ver repositorio de ${item.title}`}
                          >
                            Repositorio
                          </a>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="mt-10">
              <article className="akai-card p-6">
                <h2 className="text-lg font-semibold text-white">Referencias en evolución</h2>
                <p className="mt-2 text-sm text-zinc-300">
                  Estamos consolidando nuevos casos para esta línea. Si tienes una idea de juego o experiencia interactiva, podemos
                  evaluarla contigo y construir una ruta de desarrollo.
                </p>
                <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-red-200 underline underline-offset-4">
                  Hablemos de una idea
                </Link>
              </article>
            </section>
          )}
        </>
      ) : null}

      <section className="pt-12">
        <div className="akai-panel p-6 text-center md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Siguiente paso</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Convirtamos tu idea en experiencia jugable</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Si quieres desarrollar un concepto de videojuego, prototipo o producto interactivo, diseñamos contigo una propuesta clara,
            visual y técnicamente viable.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="akai-btn-primary">
              Hablemos de una idea
            </Link>
            <Link to="/services" className="akai-btn-secondary">
              Explorar servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Juegos;
