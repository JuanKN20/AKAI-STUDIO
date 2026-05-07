import React from 'react';
const Noticias = () => {
    const noticias = [
        { id: 1, titulo: 'Nuevo Lanzamiento', descripcion: 'Descubre nuestro último proyecto.', imagen: 'src/assets/noticia1.jpg' },
        { id: 2, titulo: 'Actualización Importante', descripcion: 'Mejoras y novedades en desarrollo.', imagen: 'src/assets/noticia2.jpg' },
        { id: 3, titulo: 'Evento Especial', descripcion: 'Únete a nuestro evento exclusivo.', imagen: 'src/assets/noticia3.jpg' },
    ];
    return (React.createElement("div", { className: "w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 px-6 pt-[150px] overflow-hidden" },
        React.createElement("div", { className: "text-center mb-10" },
            React.createElement("h1", { className: "text-3xl font-extrabold text-red-500" }, "Noticias"),
            React.createElement("p", { className: "text-gray-300 mt-2" }, "Mantente informado con las \u00FAltimas novedades.")),
        React.createElement("section", { className: "w-full max-w-screen-lg" },
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center" }, noticias.map((noticia) => (React.createElement("div", { key: noticia.id, className: "bg-gray-800 bg-opacity-40 p-4 rounded-lg shadow-lg text-center border border-gray-600 w-[300px]" },
                React.createElement("img", { src: noticia.imagen, alt: noticia.titulo, className: "w-full h-40 object-cover rounded-md" }),
                React.createElement("h3", { className: "text-xl font-bold text-white mt-4" }, noticia.titulo),
                React.createElement("p", { className: "text-gray-300" }, noticia.descripcion),
                React.createElement("button", { className: "mt-4 px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition" }, "Leer m\u00E1s"))))))));
};
export default Noticias;
