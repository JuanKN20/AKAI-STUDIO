import React from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-400 py-6 mt-auto border-t border-red-800/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Primera Línea */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Logo */}
            <Link
              to="/home"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center hover:opacity-90 transition"
            >
              <img
                src="/Imagenes/Logo/Logo.png"
                alt="AkaiStudioLogo"
                className="h-10"
              />
            </Link>

            {/* Enlaces */}
            <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start text-sm">
              {[
                "Prensa",
                "Seguridad",
                "Legal",
                "Aviso de Privacidad",
                "Términos de Servicio",
                "Asistencia",
                "Verificar en Línea",
                "Accesibilidad",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-red-600 hover:text-red-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales (react-icons) */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://www.youtube.com/channel/UCyPRSLaqSn6jiuHRjz-952g/posts?pvf=CAE%253D"
              className="text-red-600 hover:text-red-400 transition-transform transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube className="w-8 h-8" />
            </a>
            <a
              href="https://www.tiktok.com/@akai_studio"
              className="text-red-600 hover:text-red-400 transition-transform transform hover:scale-110"
              aria-label="TikTok"
            >
              <FaTiktok className="w-8 h-8" />
            </a>
            {/* <a
              href="#"
              className="text-red-600 hover:text-red-400 transition-transform transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-8 h-8" />
            </a> */}
            <a
              href="https://www.instagram.com/akai__studio/"
              className="text-red-600 hover:text-red-400 transition-transform transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Segunda Línea */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            Preferencias de cookies | © 2024 Akai Studio, Inc. Todos los derechos
            reservados.
          </p>
          <a
            href="#top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-gray-400 hover:text-red-500 mt-4 md:mt-0 transition-colors"
          >
            IR AL INICIO ▲
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
