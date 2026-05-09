import React, { useEffect, useMemo, useState } from 'react';
import { fallbackProjects } from '../data/fallbackProjects';
import { getPublicProjects, ProjectItem } from '../services/api';

function getDisplayStatus(status: ProjectItem['status']): string {
  if (status === 'published') return 'Publicado';
  if (status === 'coming_soon') return 'Próximamente';
  if (status === 'archived') return 'Archivado';
  return 'Borrador interno';
}

function getCtaByStatus(status: ProjectItem['status']): string {
  if (status === 'published') return 'Caso publicado';
  if (status === 'coming_soon') return 'Próximamente';
  if (status === 'archived') return 'Archivo';
  return 'En desarrollo';
}

const Trabajos: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const apiProjects = await getPublicProjects();
        if (!mounted) return;
        if (apiProjects.length > 0) {
          setProjects(apiProjects);
          setUsingFallback(false);
        }
      } catch {
        if (!mounted) return;
        setProjects(fallbackProjects);
        setUsingFallback(true);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const orderedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.sort_order === b.sort_order) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return a.sort_order - b.sort_order;
      }),
    [projects],
  );

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Proyectos</p>
      </div>
      <h1 className="akai-section-title mt-3">Casos y proyectos representativos</h1>
      <p className="akai-section-subtitle">
        Presentamos proyectos representativos de Yorurei Studio en desarrollo web, contenido digital, experiencias interactivas y
        soluciones visuales de alto impacto.
      </p>
      {usingFallback ? <p className="mt-3 text-xs text-zinc-400">Mostrando datos locales de respaldo.</p> : null}

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {orderedProjects.map((project) => (
          <article key={project.id} className="akai-card overflow-hidden">
            <div className="relative">
              <img
                src={project.cover_image_url || '/images/1013143.png'}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full border border-red-500/45 bg-black/65 px-3 py-1 text-xs text-red-100">
                {getDisplayStatus(project.status)}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-white">{project.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-red-300">{project.category || 'Categoría general'}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.short_description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tag) => (
                  <span key={tag} className="akai-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="mt-5 inline-flex rounded-full border border-red-500/45 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-red-100"
              >
                {getCtaByStatus(project.status)}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Trabajos;
