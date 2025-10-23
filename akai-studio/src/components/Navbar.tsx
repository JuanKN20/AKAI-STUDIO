import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

const links = [
  { to: "/home", label: "Inicio" },
  { to: "/juegos", label: "Juegos" },
  { to: "/services", label: "Servicios" },
  { to: "/contact", label: "Contacto" },
  { to: "/noticias", label: "Noticias" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dialogId = useId();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/70 shadow-lg backdrop-blur pb-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8 py-3 lg:py-4">
        {/* Logo (tamaños responsivos + no forzar wrap) */}
        <Link to="/home" className="pl-5 lg:pl-10">
          <img
            src="/Imagenes/Logo/Logo.png"
            alt="Logo Akai Studio"
            className="h-auto max-w-[140px] md:max-w-[170px] lg:max-w-[200px]"
          />
        </Link>

        {/* NAV escritorio: oculto hasta lg */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-bold uppercase transition-colors ${isActive ? "text-red-500" : "text-red-700 hover:text-red-950"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Lado derecho */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Búsqueda: solo en desktop (>=lg) */}
          <div className="hidden lg:flex items-center gap-2 mr-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="rounded-full border border-gray-600 bg-black px-4 py-2 text-sm text-white outline-none"
            />
            <button className="rounded-full bg-red-700 p-2 text-white hover:bg-red-950">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* CTA: en desktop botón completo; en móvil/tablet compacto */}
          <Link
            to="/login"
            className="hidden lg:inline-flex rounded-full bg-red-700 px-6 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-red-950"
          >
            Iniciar Sesión
          </Link>

          {/* Botón hamburguesa visible hasta lg-1 (móvil y tablet) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:hidden"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-controls={dialogId}
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Backdrop (móvil/tablet) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Drawer lateral (móvil/tablet) */}
      <aside
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-[380px] transform border-l border-white/10 bg-zinc-950/95 backdrop-blur transition-transform lg:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-sm font-semibold text-zinc-200">Menú</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-6">
          {/* Búsqueda compacta en móvil/tablet */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar…"
              className="w-full rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-white outline-none"
            />
            <button className="rounded-xl border border-white/10 p-2 text-white hover:bg-white/5">
              <Search className="h-5 w-5" />
            </button>
          </div>

          <ul className="flex flex-col gap-1">
            {links.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-semibold transition ${isActive ? "bg-white/10 text-red-500" : "text-zinc-200 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-6">
            <Link
              to="/login"
              className="block w-full rounded-full bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;
