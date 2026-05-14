import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackProjects } from '../data/fallbackProjects';
import { getPublicProjects, ProjectItem } from '../services/api';

function getDisplayStatus(status: ProjectItem['status']): string {
  if (status === 'published') return 'Publicado';
  if (status === 'coming_soon') return 'Próximamente';
  if (status === 'archived') return 'Archivado';
  return 'En preparación';
}

function isValidExternalUrl(value: string | null): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function canShowRepository(value: string | null): boolean {
  if (!isValidExternalUrl(value)) return false;
  return value.toLowerCase().includes('github.com/');
}

const Trabajos: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [showCatalogNotice, setShowCatalogNotice] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const apiProjects = await getPublicProjects();
        if (!mounted) return;

        if (apiProjects.length > 0) {
          setProjects(apiProjects);
          setShowCatalogNotice(false);
        } else if (fallbackProjects.length > 0) {
          setProjects(fallbackProjects);
          setShowCatalogNotice(true);
        } else {
          setProjects([]);
          setShowCatalogNotice(false);
        }
      } catch {
        if (!mounted) return;
        if (fallbackProjects.length > 0) {
          setProjects(fallbackProjects);
          setShowCatalogNotice(true);
        } else {
          setProjects([]);
          setShowCatalogNotice(false);
        }
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

  const orderedProjects = useMemo(
    () =>
      [...projects]
        .filter((project) => project.status !== 'draft')
        .sort((a, b) => {
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1;
          }
          if (a.sort_order !== b.sort_order) {
            return a.sort_order - b.sort_order;
          }
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }),
    [projects],
  );

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Proyectos</p>
      </div>
      <h1 className="akai-section-title mt-3">Proyectos y experiencias digitales</h1>
      <p className="akai-section-subtitle">
        Trabajos desarrollados por Yorurei Studio: casos, prototipos y experiencias digitales creadas desde el estudio.
      </p>
      <p className="mt-3 max-w-4xl text-sm text-zinc-300 md:text-base">
        Exploramos desarrollo web, videojuegos, modelado 3D, animación, inteligencia artificial y contenido visual para construir
        soluciones memorables y funcionales.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="akai-btn-primary">
          Hablemos de tu proyecto
        </Link>
        <Link to="/services" className="akai-btn-secondary">
          Ver servicios
        </Link>
      </div>

      {isLoading ? (
        <section className="mt-8">
          <article className="akai-card p-6">
            <h2 className="text-lg font-semibold text-white">Proyectos seleccionados</h2>
            <p className="mt-2 text-sm text-zinc-300">Cargando trabajos desarrollados por Yorurei Studio...</p>
          </article>
        </section>
      ) : null}

      {!isLoading && orderedProjects.length === 0 ? (
        <section className="mt-8">
          <article className="akai-card p-6">
            <h2 className="text-lg font-semibold text-white">Proyectos seleccionados</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Pronto publicaremos nuevos proyectos. Mientras tanto, conversemos sobre lo que quieres construir.
            </p>
            <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-red-200 underline underline-offset-4">
              Hablar de un proyecto
            </Link>
          </article>
        </section>
      ) : null}

      {!isLoading && orderedProjects.length > 0 ? (
        <>
          {showCatalogNotice ? (
            <section className="mt-8">
              <article className="akai-card p-5">
                <p className="text-sm text-zinc-300">Proyectos seleccionados disponibles actualmente.</p>
              </article>
            </section>
          ) : null}

          <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {orderedProjects.map((project) => {
              const hasDemo = isValidExternalUrl(project.demo_url);
              const hasRepository = canShowRepository(project.repository_url);
              const techTags = Array.isArray(project.technologies) ? project.technologies.filter(Boolean) : [];

              return (
                <article
                  key={project.id}
                  className={`akai-card overflow-hidden ${project.featured ? 'ring-1 ring-red-500/45 shadow-akai-glow' : ''}`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(179,23,47,0.34),transparent_44%),radial-gradient(circle_at_82%_15%,rgba(255,59,92,0.17),transparent_40%),linear-gradient(135deg,#090a0f_0%,#08090d_50%,#0c0f15_100%)]" />
                    <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

                    {project.cover_image_url ? (
                      <img
                        src={project.cover_image_url}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-red-500/45 bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-red-100">
                        {project.category || 'Categoría general'}
                      </span>
                      {project.featured ? (
                        <span className="rounded-full border border-red-400/60 bg-red-900/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-red-100">
                          Destacado
                        </span>
                      ) : null}
                    </div>

                    <span className="absolute right-4 top-4 rounded-full border border-red-500/45 bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-red-100">
                      {getDisplayStatus(project.status)}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {project.short_description || 'Caso visual y tecnológico orientado a resolver objetivos reales de negocio.'}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {techTags.length > 0 ? (
                        techTags.map((tag) => (
                          <span key={tag} className="akai-chip">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="akai-chip">Solución personalizada</span>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to="/contact" className="akai-btn-primary">
                        Consultar proyecto similar
                      </Link>
                      <Link to="/services" className="akai-btn-secondary">
                        Ver servicios
                      </Link>
                      {hasDemo ? (
                        <a
                          href={project.demo_url as string}
                          target="_blank"
                          rel="noreferrer"
                          className="akai-btn-secondary"
                          aria-label={`Ver demo de ${project.title}`}
                        >
                          Ver demo
                        </a>
                      ) : null}
                      {hasRepository ? (
                        <a
                          href={project.repository_url as string}
                          target="_blank"
                          rel="noreferrer"
                          className="akai-btn-secondary"
                          aria-label={`Ver repositorio de ${project.title}`}
                        >
                          Repositorio
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      ) : null}

      <section className="pt-12">
        <div className="akai-panel p-6 text-center md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Siguiente paso</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">¿Quieres construir algo similar?</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Cuéntanos tu objetivo y diseñaremos una propuesta visual y técnica alineada con tu proyecto.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="akai-btn-primary">
              Hablar de un proyecto
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

export default Trabajos;
