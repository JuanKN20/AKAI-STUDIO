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

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const apiServices = await getPublicServices();
        if (!mounted) return;
        if (apiServices.length > 0) {
          setServices(apiServices);
          setUsingFallback(false);
        }
      } catch {
        if (!mounted) return;
        setServices(fallbackServices);
        setUsingFallback(true);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  const activeServices = useMemo(() => services.filter((service) => service.is_active), [services]);

  return (
    <div className="akai-page">
      <div className="flex items-center gap-3">
        <div className="akai-hud-line" />
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Servicios</p>
      </div>
      <h1 className="akai-section-title mt-3">Servicios corporativos de Yorurei Studio</h1>
      <p className="akai-section-subtitle">
        Diseñamos y construimos soluciones digitales que combinan estrategia, arte y tecnología para empresas, productos y
        experiencias de entretenimiento.
      </p>
      {usingFallback ? (
        <p className="mt-3 text-xs text-zinc-400">Mostrando datos locales de respaldo.</p>
      ) : null}

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activeServices.map((service) => {
          const Icon = resolveServiceIcon(service);
          return (
            <article key={service.id} className="akai-card p-6">
              <div className="inline-flex rounded-xl border border-red-500/35 bg-red-950/40 p-2 text-red-200">
                <Icon className="h-5 w-5" />
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
          );
        })}
      </section>
    </div>
  );
};

export default Services;
