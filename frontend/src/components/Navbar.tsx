import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/services", label: "Servicios" },
  { to: "/trabajos", label: "Proyectos" },
  { to: "/juegos", label: "Juegos" },
  { to: "/contact", label: "Contacto" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
    isActive
      ? "bg-red-900/40 text-red-200 border border-red-500/45"
      : "text-zinc-300 border border-transparent hover:border-red-500/30 hover:bg-red-950/30 hover:text-white"
  }`;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const dialogId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-red-900/30 bg-black/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/Logo/Logo.png" alt="Yorurei Studio" className="h-10 w-auto sm:h-11" />
          <div className="hidden md:block">
            <p className="text-xs uppercase tracking-[0.24em] text-red-300/80">Yorurei Studio</p>
            <p className="text-sm text-zinc-300">Creative Tech Studio</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-700/40 bg-black/40 text-zinc-100 transition hover:border-red-400/70 hover:bg-red-950/35 lg:hidden"
          aria-label="Abrir menú"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/75 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-sm border-l border-red-900/40 bg-akai-dark/95 p-6 backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-red-200/85">Navegación</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-700/40 bg-black/40 text-zinc-100 transition hover:border-red-400/70 hover:bg-red-950/35"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {links.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </header>
  );
};

export default Navbar;
