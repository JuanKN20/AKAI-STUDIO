import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#130018dc] shadow-lg z-50 flex items-center justify-between px-8 py-4 flex-wrap">
      {/* Sección izquierda: Logo y enlaces */}
      <div className="flex items-center gap-8">
        <div className="Logo">
          <img src="src/assets/Recurso 1.png" alt="Logo" className="max-w-[150px] h-auto" />
        </div>
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-white text-sm font-bold uppercase transition-colors hover:text-pink-500">Inicio</Link>
          <Link to="/about" className="text-white text-sm font-bold uppercase transition-colors hover:text-pink-500">Noticias</Link>
          <Link to="/services" className="text-white text-sm font-bold uppercase transition-colors hover:text-pink-500">Juegos</Link>
          <Link to="/services" className="text-white text-sm font-bold uppercase transition-colors hover:text-pink-500">Servicios</Link>
          <Link to="/contact" className="text-white text-sm font-bold uppercase transition-colors hover:text-pink-500">Contacto</Link>
        </nav>
      </div>

      {/* Barra de búsqueda y botón de inicio de sesión */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden md:flex items-center gap-2 mr-8">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-full outline-none text-sm"
          />
          <button className="bg-pink-500 text-white rounded-full p-2 text-sm hover:bg-pink-600">
            🔍
          </button>
        </div>
        <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full text-sm hover:bg-pink-600 transition transform hover:scale-105">
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
