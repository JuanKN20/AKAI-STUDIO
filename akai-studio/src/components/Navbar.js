import React, { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
const links = [
    { to: "/home", label: "Inicio" },
    { to: "/juegos", label: "Juegos" },
    { to: "/services", label: "Servicios" },
    { to: "/contact", label: "Contacto" },
    { to: "/noticias", label: "Noticias" },
];
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const dialogId = useId();
    useEffect(() => { setOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape")
            setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
    return (React.createElement("header", { className: "fixed top-0 left-0 z-50 w-full bg-black/70 shadow-lg backdrop-blur pb-4" },
        React.createElement("nav", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8 py-3 lg:py-4" },
            React.createElement(Link, { to: "/home", className: "pl-5 lg:pl-10" },
                React.createElement("img", { src: "/Imagenes/Logo/Logo.png", alt: "Logo Akai Studio", className: "h-auto max-w-[140px] md:max-w-[170px] lg:max-w-[200px]" })),
            React.createElement("nav", { className: "hidden lg:flex items-center gap-6 xl:gap-8" }, links.map(item => (React.createElement(NavLink, { key: item.to, to: item.to, className: ({ isActive }) => `text-sm font-bold uppercase transition-colors ${isActive ? "text-red-500" : "text-red-700 hover:text-red-950"}` }, item.label)))),
            React.createElement("div", { className: "flex items-center gap-2 md:gap-3" },
                React.createElement("div", { className: "hidden lg:flex items-center gap-2 mr-2" },
                    React.createElement("input", { type: "text", placeholder: "Buscar...", className: "rounded-full border border-gray-600 bg-black px-4 py-2 text-sm text-white outline-none" }),
                    React.createElement("button", { className: "rounded-full bg-red-700 p-2 text-white hover:bg-red-950" },
                        React.createElement(Search, { className: "h-5 w-5" }))),
                React.createElement(Link, { to: "/login", className: "hidden lg:inline-flex rounded-full bg-red-700 px-6 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-red-950" }, "Iniciar Sesi\u00F3n"),
                React.createElement("button", { type: "button", onClick: () => setOpen(true), className: "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 lg:hidden", "aria-label": "Abrir men\u00FA", "aria-haspopup": "dialog", "aria-controls": dialogId, "aria-expanded": open },
                    React.createElement(Menu, { className: "h-5 w-5" })))),
        React.createElement("div", { className: `fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`, onClick: () => setOpen(false), "aria-hidden": !open }),
        React.createElement("aside", { id: dialogId, role: "dialog", "aria-modal": "true", "aria-label": "Men\u00FA de navegaci\u00F3n", className: `fixed right-0 top-0 z-50 h-dvh w-[86vw] max-w-[380px] transform border-l border-white/10 bg-zinc-950/95 backdrop-blur transition-transform lg:hidden ${open ? "translate-x-0" : "translate-x-full"}` },
            React.createElement("div", { className: "flex h-16 items-center justify-between px-4" },
                React.createElement("span", { className: "text-sm font-semibold text-zinc-200" }, "Men\u00FA"),
                React.createElement("button", { type: "button", onClick: () => setOpen(false), className: "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500", "aria-label": "Cerrar men\u00FA" },
                    React.createElement(X, { className: "h-5 w-5" }))),
            React.createElement("div", { className: "px-4 pb-6" },
                React.createElement("div", { className: "mb-4 flex items-center gap-2" },
                    React.createElement("input", { type: "text", placeholder: "Buscar\u2026", className: "w-full rounded-full border border-gray-700 bg-black px-4 py-2 text-sm text-white outline-none" }),
                    React.createElement("button", { className: "rounded-xl border border-white/10 p-2 text-white hover:bg-white/5" },
                        React.createElement(Search, { className: "h-5 w-5" }))),
                React.createElement("ul", { className: "flex flex-col gap-1" }, links.map(item => (React.createElement("li", { key: item.to },
                    React.createElement(NavLink, { to: item.to, className: ({ isActive }) => `block rounded-xl px-4 py-3 text-base font-semibold transition ${isActive ? "bg-white/10 text-red-500" : "text-zinc-200 hover:bg-white/5 hover:text-white"}` }, item.label))))),
                React.createElement("div", { className: "mt-6 border-t border-white/10 pt-6" },
                    React.createElement(Link, { to: "/login", className: "block w-full rounded-full bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" }, "Iniciar Sesi\u00F3n"))))));
};
export default Navbar;
