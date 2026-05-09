import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, Boxes, ClipboardList, LayoutDashboard, LogOut, Menu, Settings, X } from 'lucide-react';
import { clearAdminToken } from './adminApi';

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Proyectos', icon: Briefcase },
  { to: '/admin/services', label: 'Servicios', icon: Settings },
  { to: '/admin/products', label: 'Productos', icon: Boxes },
  { to: '/admin/contacts', label: 'Contactos', icon: ClipboardList },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
    isActive
      ? 'border-red-500/70 bg-red-950/45 text-red-100 shadow-akai-glow'
      : 'border-transparent bg-black/20 text-zinc-300 hover:border-red-700/55 hover:bg-red-950/25 hover:text-white'
  }`;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 px-3 py-4 sm:px-5 lg:px-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="admin-surface sticky top-4 p-4">
            <div className="mb-5 border-b border-red-900/40 pb-4">
              <p className="admin-kicker">Yorurei Studio</p>
              <p className="mt-1 text-lg font-semibold text-zinc-100">Panel interno</p>
              <p className="mt-1 text-xs text-zinc-400">Gestión de contenido corporativo</p>
            </div>

            <nav aria-label="Navegación de administración" className="space-y-2">
              {adminLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} className={navClass}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-6 space-y-2 border-t border-red-900/40 pt-4">
              <Link to="/" className="admin-btn-secondary w-full">
                Ver sitio
              </Link>
              <button type="button" onClick={handleLogout} className="admin-btn-danger w-full gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="admin-surface mb-4 flex items-center justify-between gap-3 p-3 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="admin-btn-secondary h-10 w-10 p-0"
              aria-label="Abrir menú admin"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="text-center">
              <p className="admin-kicker">Yorurei Studio</p>
              <p className="text-sm font-semibold text-zinc-100">Panel interno</p>
            </div>

            <button type="button" onClick={handleLogout} className="admin-btn-danger h-10 w-10 p-0" aria-label="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </button>
          </header>

          <main className="flex-1 pb-6">
            <Outlet />
          </main>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/70 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} lg:hidden`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <aside
        className={`fixed left-0 top-0 z-[60] h-dvh w-80 max-w-[88vw] border-r border-red-900/45 bg-akai-dark/95 p-4 backdrop-blur-xl transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-red-900/40 pb-3">
          <div>
            <p className="admin-kicker">Yorurei Studio</p>
            <p className="text-sm font-semibold text-zinc-100">Panel interno</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="admin-btn-secondary h-9 w-9 p-0" aria-label="Cerrar menú admin">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Navegación de administración móvil" className="space-y-2">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={navClass}>
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-6 space-y-2 border-t border-red-900/40 pt-4">
          <Link to="/" className="admin-btn-secondary w-full">
            Ver sitio
          </Link>
          <button type="button" onClick={handleLogout} className="admin-btn-danger w-full gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminLayout;
