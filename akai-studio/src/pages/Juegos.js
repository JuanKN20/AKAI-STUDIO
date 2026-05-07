import React from 'react';
const Juegos = () => {
    const juegosDisponibles = [
        { id: 1, nombre: 'Juego 1', descripcion: 'Un increíble juego de acción', imagen: 'src/assets/juego1.png' },
        { id: 2, nombre: 'Juego 2', descripcion: 'Aventura épica te espera', imagen: 'src/assets/juego2.png' },
        { id: 3, nombre: 'Juego 3', descripcion: 'Un reto para tu mente', imagen: 'src/assets/juego3.png' },
    ];
    const juegosEnDesarrollo = [
        { id: 4, nombre: 'Juego 4', descripcion: 'Próximamente disponible', imagen: 'src/assets/juego4.png' },
    ];
    return (React.createElement("div", { className: "w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 pt-[150px] overflow-x-hidden" },
        React.createElement("div", { className: "w-full max-w-screen-xl mx-auto" },
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h1", { className: "text-3xl font-extrabold text-red-500" }, "Nuestros Juegos"),
                React.createElement("p", { className: "text-gray-300 mt-2" }, "Explora nuestros t\u00EDtulos disponibles y descubre lo que est\u00E1 por venir.")),
            React.createElement("section", { className: "mb-12 flex flex-col items-center" },
                React.createElement("h2", { className: "text-2xl font-bold text-red-500 mb-4 text-center" }, "Juegos Disponibles"),
                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center" }, juegosDisponibles.map((juego) => (React.createElement("div", { key: juego.id, className: "bg-red-800 bg-opacity-30 p-4 rounded-lg shadow-lg text-center border border-red-600 w-[300px]" },
                    React.createElement("img", { src: juego.imagen, alt: juego.nombre, className: "w-full h-40 object-cover rounded-md" }),
                    React.createElement("h3", { className: "text-xl font-bold text-white mt-4" }, juego.nombre),
                    React.createElement("p", { className: "text-gray-300" }, juego.descripcion),
                    React.createElement("button", { className: "mt-4 px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition" }, "Jugar Ahora")))))),
            React.createElement("section", { className: " py-12 w-full mb-12 flex flex-col items-center justify-center" },
                React.createElement("h2", { className: "text-2xl font-bold text-red-500 mb-4 text-center" }, "Pr\u00F3ximamente"),
                React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center" }, juegosEnDesarrollo.map((juego) => (React.createElement("div", { key: juego.id, className: "bg-gray-700 bg-opacity-30 p-4 rounded-lg shadow-lg text-center border border-gray-500 w-[300px] " },
                    React.createElement("img", { src: juego.imagen, alt: juego.nombre, className: "w-full h-40 object-cover rounded-md opacity-50" }),
                    React.createElement("h3", { className: "text-xl font-bold text-gray-300 mt-4" }, juego.nombre),
                    React.createElement("p", { className: "text-gray-400" }, juego.descripcion)))))))));
};
export default Juegos;
