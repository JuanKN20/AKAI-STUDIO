import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Políticas */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Políticas</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:text-pink-500 transition">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-pink-500 transition">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="/security" className="hover:text-pink-500 transition">
                Seguridad
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
