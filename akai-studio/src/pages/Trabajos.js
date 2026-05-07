import React from "react";
const mockTrabajos = [
    {
        id: 1,
        titulo: "corto",
        descripcion: "una",
        imagen: "/imagenes/123.png",
        categoria: "animacion"
    }
];
const Trabajos = () => {
    return (React.createElement("div", { className: "w-screen min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-[150px] px-8" },
        React.createElement("h1", { className: "text-4xl font-bold text-red-500 mb-8 text-center" }, "Nuestros Trabajos"),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" }, mockTrabajos.map((trabajo) => (React.createElement("div", { key: trabajo.id, className: "bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg border border-gray-600 transition-transform hover:scale-105" },
            React.createElement("img", { src: trabajo.imagen, alt: trabajo.titulo, className: "w-full h-48 object-cover rounded-md mb-4" }),
            React.createElement("h2", { className: "text-xl font-bold text-red-400" }, trabajo.titulo),
            React.createElement("p", { className: "text-sm text-gray-300 mt-2" }, trabajo.descripcion),
            React.createElement("span", { className: "mt-4 inline-block px-3 py-1 text-xs font-semibold bg-red-700 rounded-full" }, trabajo.categoria)))))));
};
export default Trabajos;
