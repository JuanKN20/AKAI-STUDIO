// Services.tsx
import React from 'react';
const Services = () => {
    const listaServicios = [
        { id: 1, nombre: 'Animación 2D', descripcion: 'Creación de animaciones dinámicas y atractivas.', imagen: 'src/assets/animacion2d.png' },
        { id: 2, nombre: 'Modelado 3D y Animacion', descripcion: 'Diseño de personajes con estilos únicos.', imagen: 'src/assets/personajes.png' },
        { id: 3, nombre: 'Desarrollo web', descripcion: 'Ilustraciones detalladas y concept art.', imagen: 'src/assets/ilustracion.png' },
        { id: 4, nombre: 'Desarrollo de Videojuegos', descripcion: 'Creación de experiencias interactivas.', imagen: 'src/assets/videojuegos.png' },
    ];
    return (React.createElement("div", { className: 'w-screen min-h-srceen flex flex-col items-center bg-gradiante-to-b from-black to-gray-900 pt-[150px] overflow-x-hidden' },
        React.createElement("div", { className: 'text-center mb-10' },
            React.createElement("h1", { className: 'text-3x1 font extrabold text-red-500' }, "Nuestros listaServicios"),
            React.createElement("p", { className: 'text-gray-300 mt-2' }, "Explora nuestras soluciones creativas para tus proyectos")),
        React.createElement("section", { className: 'mb-12 flex flex-col items-center' },
            React.createElement("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center' }, listaServicios.map((servicio) => (React.createElement("div", { key: servicio.id, className: 'bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg text-center boprder border-gray-600 W-[300px] transition-transform hover:scale-150' },
                React.createElement("img", { src: servicio.imagen, alt: servicio.nombre, className: 'w-full h-40 object-cover rounded-md' }),
                React.createElement("h3", { className: 'text-xl font-bold text-white mt-4' }, servicio.nombre),
                React.createElement("p", { className: 'text-gray-300' }, servicio.descripcion),
                React.createElement("button", { className: 'mt-4 px-6 py-2 bg-red-700 text.white font-semibold rounded-full text-sm hover:bg-red-900 transition' }, "Mas informacion"))))))));
};
export default Services;
