import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaTiktok, FaInstagram, } from "react-icons/fa";
const Footer = () => {
    return (React.createElement("footer", { className: "bg-gradient-to-t from-gray-900 to-black text-gray-400 py-6 mt-auto border-t border-red-800/20" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-6" },
            React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-6" },
                React.createElement("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6" },
                    React.createElement(Link, { to: "/home", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), className: "flex items-center justify-center hover:opacity-90 transition" },
                        React.createElement("img", { src: "/Imagenes/Logo/Logo.png", alt: "AkaiStudioLogo", className: "h-10" })),
                    React.createElement("ul", { className: "flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start text-sm" }, [
                        "Prensa",
                        "Seguridad",
                        "Legal",
                        "Aviso de Privacidad",
                        "Términos de Servicio",
                        "Asistencia",
                        "Verificar en Línea",
                        "Accesibilidad",
                    ].map((item) => (React.createElement("li", { key: item },
                        React.createElement("a", { href: "#", className: "text-red-600 hover:text-red-400 transition-colors" }, item)))))),
                React.createElement("div", { className: "flex justify-center md:justify-end gap-4" },
                    React.createElement("a", { href: "https://www.youtube.com/channel/UCyPRSLaqSn6jiuHRjz-952g/posts?pvf=CAE%253D", className: "text-red-600 hover:text-red-400 transition-transform transform hover:scale-110", "aria-label": "YouTube" },
                        React.createElement(FaYoutube, { className: "w-8 h-8" })),
                    React.createElement("a", { href: "https://www.tiktok.com/@akai_studio", className: "text-red-600 hover:text-red-400 transition-transform transform hover:scale-110", "aria-label": "TikTok" },
                        React.createElement(FaTiktok, { className: "w-8 h-8" })),
                    React.createElement("a", { href: "https://www.instagram.com/akai__studio/", className: "text-red-600 hover:text-red-400 transition-transform transform hover:scale-110", "aria-label": "Instagram" },
                        React.createElement(FaInstagram, { className: "w-8 h-8" })))),
            React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4" },
                React.createElement("p", { className: "text-sm text-gray-400 text-center md:text-left" }, "Preferencias de cookies | \u00A9 2024 Akai Studio, Inc. Todos los derechos reservados."),
                React.createElement("a", { href: "#top", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), className: "text-sm text-gray-400 hover:text-red-500 mt-4 md:mt-0 transition-colors" }, "IR AL INICIO \u25B2")))));
};
export default Footer;
