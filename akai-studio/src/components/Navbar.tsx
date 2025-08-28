import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
<header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 shadow-lg z-50 flex items-center justify-between px-8 py-4 flex-wrap">      <div className="flex items-center gap-8">
        <div className="Logo">
        <Link to="/home" className="Logo">
          <img 
          src="/Imagenes/Logo/Logo.png" 
          alt="Logo" 
          className="max-w-[200px] h-auto cursor-pointer" />
        </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link to="/home" className="text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950">Inicio</Link>
          <Link to="/juegos" className="text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950">Juegos</Link>
          <Link to="/services" className="text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950">Servicios</Link>
          <Link to="/contact" className="text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950">Contacto</Link>
          <Link to="/noticias" className="text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950">Noticias</Link>

        </nav>
      </div>

      {/* Barra de búsqueda y botón de inicio de sesión */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden md:flex items-center gap-2 mr-8">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 text-white bg-black border border-gray-600 rounded-full outline-none text-sm"
          />
          <button className="bg-red-700 text-white rounded-full p-2 text-sm hover:bg-red-950">
          <Search className='w-5 h-5'></Search>
          </button>
        </div>
        <button className="px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-950 transition transform hover:scale-105">
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
