import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Boxes, Clapperboard, Code2, Cpu, Gamepad2, Palette, Sparkles, Target, Zap } from 'lucide-react';
import ServicesCarousel from '../components/ServicesCarousel';
import { fallbackProjects } from '../data/fallbackProjects';
import { fallbackServices } from '../data/fallbackServices';
import { getPublicProjects, getPublicServices, ProjectItem, ServiceItem } from '../services/api';

type IconComponent = React.ComponentType<{ className?: string }>;

function resolveServiceIcon(service: ServiceItem): IconComponent {
  const value = `${service.slug} ${service.title}`.toLowerCase();
  if (value.includes('videojuego') || value.includes('game')) return Gamepad2;
  if (value.includes('animacion') || value.includes('animación')) return Clapperboard;
  if (value.includes('modelado') || value.includes('3d')) return Boxes;
  if (value.includes('inteligencia') || value.includes('ia')) return Bot;
  if (value.includes('branding')) return Palette;
  return Code2;
}

function projectStatusLabel(status: ProjectItem['status']): string {
  if (status === 'published') return 'Publicado';
  if (status === 'coming_soon') return 'Próximamente';
  if (status === 'archived') return 'Archivado';
  return 'Borrador';
}

const differentiators = [
  {
    title: 'Creatividad con enfoque técnico',
    description: 'Diseñamos soluciones visuales con base sólida en arquitectura y desarrollo.',
    icon: Zap,
  },
  {
    title: 'Experiencias visualmente impactantes',
    description: 'Construimos productos con identidad estética fuerte y coherencia de marca.',
    icon: Sparkles,
  },
  {
    title: 'Soluciones adaptadas a cada proyecto',
    description: 'Cada propuesta se ajusta a objetivos reales, alcance y tipo de audiencia.',
    icon: Target,
  },
  {
    title: 'Integración de arte, tecnología e innovación',
    description: 'Unimos dirección creativa y ejecución técnica para producir experiencias premium.',
    icon: Cpu,
  },
];

const Home: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      try {
        const apiServices = await getPublicServices();
        if (!mounted) return;
        if (apiServices.length > 0) {
          setServices(apiServices);
        } else {
          setServices(fallbackServices);
        }
      } catch {
        if (!mounted) return;
        setServices(fallbackServices);
      } finally {
        if (mounted) {
          setIsLoadingServices(false);
        }
      }
    };

    const loadProjects = async () => {
      try {
        const apiProjects = await getPublicProjects();
        if (!mounted) return;
        if (apiProjects.length > 0) {
          setProjects(apiProjects);
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        if (!mounted) return;
        setProjects(fallbackProjects);
      } finally {
        if (mounted) {
          setIsLoadingProjects(false);
        }
      }
    };

    void Promise.all([loadServices(), loadProjects()]);

    return () => {
      mounted = false;
    };
  }, []);

  const chips = useMemo(() => services.slice(0, 6).map((service) => service.title), [services]);
  const topServices = useMemo(() => services.slice(0, 6), [services]);
  const featuredProjects = useMemo(() => projects.filter((item) => item.featured).slice(0, 3), [projects]);

  return (
    <div className="w-full">
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(179,23,47,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,59,92,0.14),transparent_40%),linear-gradient(180deg,#0a0b0f_0%,#050506_58%,#08090d_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/75 to-black/95" />

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="space-y-8 animate-fade-up">
              <div className="flex items-center gap-3">
                <div className="akai-hud-line" />
                <span className="text-xs uppercase tracking-[0.24em] text-red-300">Estudio creativo y tecnológico</span>
              </div>

              <div>
                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Yorurei Studio</h1>
                <p className="mt-4 text-lg text-red-200 sm:text-xl">Creamos experiencias digitales, visuales e interactivas.</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Somos un estudio creativo y tecnológico enfocado en desarrollo web, videojuegos, animación, modelado 3D e
                  inteligencia artificial. Transformamos ideas en proyectos visualmente impactantes, funcionales y memorables.
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
                <Link to="/contact" className="text-sm text-zinc-300 underline-offset-4 hover:text-red-200 hover:underline">
                  Contactar
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <article className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-red-300">Misión</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Diseñamos y desarrollamos soluciones digitales, visuales e interactivas que combinan creatividad, tecnología y
                  estrategia para ayudar a marcas, emprendedores y proyectos a construir presencia, productos y experiencias memorables.
                </p>
              </article>
              <article className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-red-300">Visión</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  Consolidarnos como un estudio creativo y tecnológico referente en experiencias digitales, videojuegos, animación,
                  desarrollo web, modelado 3D e inteligencia artificial, destacando por calidad visual, innovación y ejecución técnica.
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
        <h2 className="akai-section-title mt-3">Líneas de negocio de Yorurei Studio</h2>
        <p className="akai-section-subtitle">
          Integramos tecnología, creatividad y producción multimedia para construir soluciones digitales con identidad y alto impacto
          visual.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoadingServices ? (
            <article className="akai-card p-6 md:col-span-2 xl:col-span-3">
              <p className="text-sm text-zinc-300">Cargando servicios principales del estudio...</p>
            </article>
          ) : topServices.length > 0 ? (
            topServices.map((service) => {
              const Icon = resolveServiceIcon(service);
              return (
                <Link key={service.id} to="/services" className="akai-card block p-6" aria-label={`Ver servicios de ${service.title}`}>
                  <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{service.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-red-200">Ver servicios</p>
                </Link>
              );
            })
          ) : (
            <article className="akai-card p-6 md:col-span-2 xl:col-span-3">
              <h3 className="text-lg font-semibold text-white">Servicios principales</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Estamos actualizando esta sección. Puedes revisar todas las capacidades del estudio en la página de servicios.
              </p>
              <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-red-200 underline underline-offset-4">
                Ir a servicios
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="akai-page pt-2 md:pt-2">
        <div className="flex items-center gap-3">
          <div className="akai-hud-line" />
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Destacados</p>
        </div>
        <h2 className="akai-section-title mt-3">Proyectos destacados</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoadingProjects ? (
            <article className="akai-card p-6 md:col-span-2 xl:col-span-3">
              <p className="text-sm text-zinc-300">Cargando proyectos seleccionados...</p>
            </article>
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <Link key={project.id} to="/trabajos" className="akai-card block p-5" aria-label={`Ver proyecto ${project.title}`}>
                <p className="text-xs uppercase tracking-[0.16em] text-red-300">{project.category || 'Proyecto'}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{project.short_description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="akai-chip">{projectStatusLabel(project.status)}</span>
                  {project.featured ? <span className="akai-chip">Destacado</span> : null}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-red-200">Ver proyectos</p>
              </Link>
            ))
          ) : (
            <article className="akai-card p-6 md:col-span-2 xl:col-span-3">
              <h3 className="text-lg font-semibold text-white">Proyectos seleccionados</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Estamos organizando casos para publicación. Puedes visitar la sección de trabajos para ver el portafolio completo.
              </p>
              <Link to="/trabajos" className="mt-4 inline-flex text-sm font-semibold text-red-200 underline underline-offset-4">
                Ir a proyectos
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="akai-page pt-2 md:pt-6">
        <div className="flex items-center gap-3">
          <div className="akai-hud-line" />
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Diferenciales</p>
        </div>
        <h2 className="akai-section-title mt-3">Por qué Yorurei Studio</h2>
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

      <section className="akai-page pb-20 pt-2 md:pt-4">
        <div className="akai-panel p-6 text-center md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Siguiente paso</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Hablemos de tu proyecto</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Si estás construyendo una marca, producto o experiencia digital, en Yorurei Studio podemos ayudarte a diseñarlo y
            desarrollarlo con un enfoque creativo y tecnológico.
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
