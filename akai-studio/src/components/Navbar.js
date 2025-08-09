import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (React.createElement("header", { className: "fixed top-0 left-0 w-full bg-black bg-opacity-90 shadow-lg z-50 flex items-center justify-between px-8 py-4 flex-wrap" },
        "      ",
        React.createElement("div", { className: "flex items-center gap-8" },
            React.createElement("div", { className: "Logo" },
                React.createElement(Link, { to: "/", className: "Logo" },
                    React.createElement("img", { src: "src/assets/LogoAkai.png", alt: "Logo", className: "max-w-[200px] h-auto cursor-pointer" }))),
            React.createElement("nav", { className: "hidden md:flex gap-8" },
                React.createElement(Link, { to: "/home", className: "text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950" }, "Inicio"),
                React.createElement(Link, { to: "/juegos", className: "text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950" }, "Juegos"),
                React.createElement(Link, { to: "/services", className: "text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950" }, "Servicios"),
                React.createElement(Link, { to: "/contact", className: "text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950" }, "Contacto"),
                React.createElement(Link, { to: "/noticias", className: "text-red-700 text-sm font-bold uppercase transition-colors hover:text-red-950" }, "Noticias"))),
        React.createElement("div", { className: "flex items-center gap-4 ml-auto" },
            React.createElement("div", { className: "hidden md:flex items-center gap-2 mr-8" },
                React.createElement("input", { type: "text", placeholder: "Buscar...", className: "px-4 py-2 text-white bg-black border border-gray-600 rounded-full outline-none text-sm" }),
                React.createElement("button", { className: "bg-red-700 text-white rounded-full p-2 text-sm hover:bg-red-950" },
                    React.createElement("img", { src: "src/assets/lupa.png", alt: "Lupa", className: "w-5 h-5" }))),
            React.createElement("button", { className: "px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-950 transition transform hover:scale-105" }, "Iniciar Sesi\u00F3n"))));
};
export default Navbar;
