import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Mail } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Inicio" },
  { to: "/services", label: "Servicios" },
  { to: "/trabajos", label: "Proyectos" },
  { to: "/juegos", label: "Juegos" },
  { to: "/contact", label: "Contacto" },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-red-900/30 bg-black/55">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="akai-panel p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <img
                src="/images/Logo/Logo.png"
                alt="Akai Studio"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
              <p className="text-sm leading-relaxed text-zinc-300">
                Experiencias digitales, visuales e interactivas.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Navegación</h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link className="text-sm text-zinc-300 transition hover:text-red-200" to={item.to}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Conectar</h3>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.youtube.com/channel/UCyPRSLaqSn6jiuHRjz-952g/posts?pvf=CAE%253D"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@akai_studio"
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/akai__studio/"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-700/45 bg-black/45 text-red-200 transition hover:-translate-y-0.5 hover:border-red-400/70 hover:text-white"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
                <Mail className="h-4 w-4 text-red-300" />
                contacto@akai-studio.dev
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-red-900/30 pt-5 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
            <p>© {year} Akai Studio. Todos los derechos reservados.</p>
            <p>Empresa creativa y tecnológica en desarrollo.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
