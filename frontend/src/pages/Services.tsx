import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Boxes, Clapperboard, Code2, Gamepad2, Palette } from 'lucide-react';
import { fallbackServices } from '../data/fallbackServices';
import { getPublicServices, ServiceItem } from '../services/api';

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

const idealFor = [
  'Marcas y negocios que necesitan presencia digital sólida.',
  'Emprendedores que buscan lanzar productos o experiencias interactivas.',
  'Equipos creativos y técnicos que requieren ejecución visual y tecnológica.',
];

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [isLoading, setIsLoading] = useState(true);
  const [showCatalogNotice, setShowCatalogNotice] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const apiServices = await getPublicServices();
        if (!mounted) return;

        if (apiServices.length > 0) {
          setServices(apiServices);
          setShowCatalogNotice(false);
        } else if (fallbackServices.length > 0) {
          setServices(fallbackServices);
          setShowCatalogNotice(true);
        } else {
          setServices([]);
          setShowCatalogNotice(false);
        }
      } catch {
        if (!mounted) return;
        if (fallbackServices.length > 0) {
          setServices(fallbackServices);
          setShowCatalogNotice(true);
        } else {
          setServices([]);
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

  const activeServices = useMemo(
    () =>
      services
        .filter((service) => service.is_active)
        .sort((a, b) => a.sort_order - b.sort_order),
    [services],
  );

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Servicios</p>
      </div>
      <h1 className="akai-section-title mt-3">Servicios principales de Yorurei Studio</h1>
      <p className="akai-section-subtitle">
        Servicios creativos y tecnológicos para construir experiencias digitales memorables.
      </p>
      <p className="mt-3 max-w-4xl text-sm text-zinc-300 md:text-base">
        Diseñamos y desarrollamos sitios web, videojuegos, animación, contenido visual, experiencias 3D y soluciones con inteligencia
        artificial para marcas, emprendedores y proyectos digitales.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="akai-btn-primary">
          Cotizar proyecto
        </Link>
        <Link to="/trabajos" className="akai-btn-secondary">
          Ver trabajos
        </Link>
      </div>

      {isLoading ? (
        <section className="mt-8">
          <article className="akai-card p-6">
            <h2 className="text-lg font-semibold text-white">Capacidades disponibles</h2>
            <p className="mt-2 text-sm text-zinc-300">Cargando servicios principales de Yorurei Studio...</p>
          </article>
        </section>
      ) : null}

      {!isLoading && activeServices.length === 0 ? (
        <section className="mt-8">
          <article className="akai-card p-6">
            <h2 className="text-lg font-semibold text-white">Servicios principales</h2>
            <p className="mt-2 text-sm text-zinc-300">
              Estamos actualizando esta sección. Si deseas cotizar, cuéntanos tu proyecto y te recomendaremos la mejor línea de
              servicio.
            </p>
            <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-red-200 underline underline-offset-4">
              Hablar del proyecto
            </Link>
          </article>
        </section>
      ) : null}

      {!isLoading && activeServices.length > 0 ? (
        <>
          {showCatalogNotice ? (
            <section className="mt-8">
              <article className="akai-card p-5">
                <p className="text-sm text-zinc-300">
                  Estas son capacidades disponibles para iniciar tu proyecto hoy mismo.
                </p>
              </article>
            </section>
          ) : null}

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {idealFor.map((item) => (
              <article key={item} className="akai-card p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-red-300">Ideal para</p>
                <p className="mt-3 text-sm text-zinc-300">{item}</p>
              </article>
            ))}
          </section>

          <section className="mt-10">
            <div className="flex items-center gap-3">
              <div className="akai-hud-line" />
              <p className="text-xs uppercase tracking-[0.24em] text-red-300">Capacidades disponibles</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeServices.map((service) => {
                const Icon = resolveServiceIcon(service);
                const deliverables = Array.isArray(service.deliverables) ? service.deliverables.filter(Boolean) : [];

                return (
                  <article key={service.id} className="akai-card p-6">
                    <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-white">{service.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {service.description || 'Soluciones creativas y tecnológicas para marcas, productos y experiencias digitales.'}
                    </p>

                    {deliverables.length > 0 ? (
                      <ul className="mt-4 space-y-1 text-sm text-zinc-300">
                        {deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-zinc-400">Servicio adaptable según alcance, objetivos y etapa del proyecto.</p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to="/contact" className="akai-btn-primary">
                        Solicitar servicio
                      </Link>
                      <Link to="/trabajos" className="akai-btn-secondary">
                        Ver proyectos
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : null}

      <section className="pt-12">
        <div className="akai-panel p-6 text-center md:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-red-300">Siguiente paso</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Hablemos de tu proyecto</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Cuéntanos qué quieres construir y te propondremos una ruta de trabajo clara, visual y técnicamente sólida.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="akai-btn-primary">
              Hablar del proyecto
            </Link>
            <Link to="/trabajos" className="akai-btn-secondary">
              Revisar casos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
