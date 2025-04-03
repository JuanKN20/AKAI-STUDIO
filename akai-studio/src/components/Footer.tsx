import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-1000 text-gray-400 py-4  mt-auto">
      <div className="container mx-auto px-4">
        {/* Primera Línea: Logo y Enlaces */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 ">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <img
              src="src/assets/LogoAkai.png"
              alt="AkaiStudioLogo"
              className="h-8"
            />
            {/* Links */}
            <ul className="flex flex-wrap space-x-4 justify-center md:justify-start">
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Prensa
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Seguridad
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Aviso de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Asistencia
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Verificar en Línea
                </a>
              </li>
              <li>
                <a href="#" className="text-red-700 hover:text-white text-sm">
                  Accesibilidad
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-4 mt-4 md:mt-0 justify-center">
            <a href="#" className="hover:text-white">
              <img
                src="src/assets/youtube.png"
                alt="youtube"
                className="w-12 h-12"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="src/assets/tiktok.png"
                alt="tiktok"
                className="w-12 h-12"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="src/assets/linkidin.png"
                alt="LinkedIn"
                className="w-12 h-12"
              />
            </a>
            <a href="#" className="hover:text-white">
              <img
                src="src/assets/instagram.png"
                alt="instagram"
                className="w-12 h-12"
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
