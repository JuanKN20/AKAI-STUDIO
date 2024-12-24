import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-1000 text-gray-400 py-4">
      <div className="container mx-auto px-4">
        {/* Primera Línea: Logo y Enlaces */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <img
              src="src/assets/Recurso 1.png"
              alt="Riot Games Logo"
              className="h-8"
            />
            {/* Links */}
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Prensa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Seguridad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Aviso de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Asistencia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Verificar en Línea
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-sm">
                  Accesibilidad
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Twitter"
                className="h-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                className="h-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
                alt="LinkedIn"
                className="h-6"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="YouTube"
                className="h-6"
              />
            </a>
          </div>
        </div>

        {/* Segunda Línea: Políticas */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            Preferencias de cookies | © 2024 Akai Studio, Inc. Todos los derechos reservados.
          </p>
          <a
            href="#top"
            className="text-sm text-gray-400 hover:text-white mt-4 md:mt-0"
          >
            IR AL INICIO ▲
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;