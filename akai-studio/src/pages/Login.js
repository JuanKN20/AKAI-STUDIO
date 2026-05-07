import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
    return (React.createElement("div", { className: "\r\n        w-screen                         /* ocupa TODO el ancho del viewport */\r\n        min-h-screen                     /* ocupa TODO el alto del viewport */\r\n        flex items-center justify-center /* centra el contenido */\r\n        bg-gradient-to-b from-black to-gray-900\r\n        pt-24 pb-12 px-4                 /* espacio para el navbar fijo + respiraci\u00F3n abajo */\r\n        overflow-x-hidden                /* evita scroll raro horizontal */\r\n      " },
        React.createElement("div", { className: "w-full max-w-md bg-black/80 border border-red-800/40 rounded-2xl shadow-2xl px-6 py-8 backdrop-blur" },
            React.createElement("div", { className: "flex flex-col items-center mb-6" },
                React.createElement("img", { src: "/Imagenes/Logo/Logo.png", alt: "Akai Studio", className: "h-12 mb-2" }),
                React.createElement("h1", { className: "text-xl font-semibold text-red-500" }, "Inicia sesi\u00F3n en Akai Studio"),
                React.createElement("p", { className: "mt-1 text-xs text-gray-400 text-center" }, "Accede al panel para gestionar proyectos, juegos y servicios.")),
            React.createElement("form", { className: "space-y-4" },
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-semibold text-gray-300 mb-1" }, "Correo electr\u00F3nico"),
                    React.createElement("input", { type: "email", placeholder: "tucorreo@ejemplo.com", className: "w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" })),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-xs font-semibold text-gray-300 mb-1" }, "Contrase\u00F1a"),
                    React.createElement("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" })),
                React.createElement("div", { className: "flex items-center justify-between text-[11px] text-gray-400" },
                    React.createElement("label", { className: "flex items-center gap-2" },
                        React.createElement("input", { type: "checkbox", className: "h-3 w-3 rounded border-gray-600 bg-black" }),
                        "Recu\u00E9rdame"),
                    React.createElement("button", { type: "button", className: "text-red-500 hover:text-red-400" }, "\u00BFOlvidaste tu contrase\u00F1a?")),
                React.createElement("button", { type: "submit", className: "mt-2 w-full rounded-full bg-red-700 py-2 text-sm font-semibold text-white hover:bg-red-800 transition-transform hover:scale-[1.01]" }, "Iniciar Sesi\u00F3n")),
            React.createElement("div", { className: "mt-4 text-center text-[11px] text-gray-400" },
                React.createElement("p", null,
                    "\u00BFA\u00FAn no tienes cuenta?",
                    " ",
                    React.createElement("span", { className: "text-red-500 hover:text-red-400 cursor-pointer" }, "(Pendiente de registro)")),
                React.createElement(Link, { to: "/home", className: "mt-2 inline-block text-gray-500 hover:text-red-500 text-[10px]" }, "\u2190 Volver al inicio")))));
};
export default Login;
