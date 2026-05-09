import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Briefcase, Boxes, ClipboardList, LayoutDashboard, LogOut, Menu, Settings, X } from 'lucide-react';
import { clearAdminToken } from './adminApi';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Proyectos', icon: Briefcase },
  { to: '/admin/services', label: 'Servicios', icon: Settings },
  { to: '/admin/products', label: 'Productos', icon: Boxes },
  { to: '/admin/contacts', label: 'Contactos', icon: ClipboardList },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition ${
    isActive
      ? 'border-red-500/65 bg-red-900/30 text-red-100'
      : 'border-transparent text-zinc-300 hover:border-red-600/35 hover:bg-red-950/25 hover:text-white'
  }`;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 px-3 py-4 sm:px-5 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="akai-panel sticky top-4 p-4">
            <div className="mb-6 flex items-center gap-3 border-b border-red-900/35 pb-4">
              <img src="/images/Logo/Logo.png" alt="Yorurei Studio" className="h-10 w-auto" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-300/85">Admin Panel</p>
                <p className="text-sm font-semibold text-zinc-100">Yorurei Studio</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {adminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-2 border-t border-red-900/35 pt-4">
              <Link
                to="/"
                className="rounded-xl border border-red-700/45 bg-black/35 px-3 py-2 text-sm text-red-100 transition hover:border-red-500/70 hover:bg-red-950/30"
              >
                Ver sitio
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-700/45 bg-black/35 px-3 py-2 text-sm text-red-100 transition hover:border-red-500/70 hover:bg-red-950/30"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="akai-panel mb-4 flex items-center justify-between gap-3 p-3 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-700/50 bg-black/45 text-zinc-100"
              aria-label="Abrir menú admin"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="text-sm font-semibold text-red-100">Yorurei Studio Admin</p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-700/50 bg-black/45 text-zinc-100"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/70 transition ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } lg:hidden`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        className={`fixed left-0 top-0 z-[60] h-dvh w-80 max-w-[90vw] border-r border-red-900/45 bg-akai-dark/95 p-4 backdrop-blur-xl transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-red-900/35 pb-3">
          <p className="text-sm font-semibold text-red-100">Yorurei Admin</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-700/50 bg-black/45 text-zinc-100"
            aria-label="Cerrar menú admin"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-2 border-t border-red-900/35 pt-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-red-700/45 bg-black/35 px-3 py-2 text-sm text-red-100"
          >
            Ver sitio
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-700/45 bg-black/35 px-3 py-2 text-sm text-red-100"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminLayout;
