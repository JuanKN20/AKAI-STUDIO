import React from "react";

interface Trabajo {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    categoria: string;
}
const mockTrabajos: Trabajo[] = [
    {
        id: 1,
        titulo: "corto",
        descripcion: "una",
        imagen: "/imagenes/123.png",
        categoria: "animacion"
    }
];

const Trabajos: React.FC = () => {
    return (
        <div className="w-screen min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-[150px] px-8">
            <h1 className="text-4xl font-bold text-red-500 mb-8 text-center">Nuestros Trabajos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {mockTrabajos.map((trabajo) => (
                    <div
                        key={trabajo.id}
                        className="bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg border border-gray-600 transition-transform hover:scale-105"
                    >
                        <img
                            src={trabajo.imagen}
                            alt={trabajo.titulo}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-bold text-red-400">{trabajo.titulo}</h2>
                        <p className="text-sm text-gray-300 mt-2">{trabajo.descripcion}</p>
                        <span className="mt-4 inline-block px-3 py-1 text-xs font-semibold bg-red-700 rounded-full">
                            {trabajo.categoria}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trabajos;