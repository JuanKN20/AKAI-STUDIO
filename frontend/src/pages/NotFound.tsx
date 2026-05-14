import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="akai-page">
      <section className="akai-panel p-6 text-center md:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-red-300">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Página no encontrada</h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
          La ruta <span className="inline-block break-all font-semibold text-red-200">{location.pathname}</span> no existe o fue
          movida. Puedes volver al inicio o navegar a una sección principal.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="akai-btn-primary">
            Ir al inicio
          </Link>
          <Link to="/services" className="akai-btn-secondary">
            Ver servicios
          </Link>
          <Link to="/contact" className="akai-btn-secondary">
            Contacto
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
