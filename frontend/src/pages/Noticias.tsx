import React from "react";

const Noticias: React.FC = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Nuevo lanzamiento",
      descripcion: "Descubre nuestro ultimo proyecto.",
      imagen: "/images/123.png",
    },
    {
      id: 2,
      titulo: "Actualizacion importante",
      descripcion: "Mejoras y novedades en desarrollo.",
      imagen: "/images/1013143.png",
    },
    {
      id: 3,
      titulo: "Evento especial",
      descripcion: "Unete a nuestro evento exclusivo.",
      imagen: "/images/LogoAkai.png",
    },
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 px-6 pt-[150px] overflow-hidden">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-red-500">Noticias</h1>
        <p className="text-gray-300 mt-2">Mantente informado con las ultimas novedades.</p>
      </div>

      <section className="w-full max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="bg-gray-800 bg-opacity-40 p-4 rounded-lg shadow-lg text-center border border-gray-600 w-[300px]"
            >
              <img src={noticia.imagen} alt={noticia.titulo} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-bold text-white mt-4">{noticia.titulo}</h3>
              <p className="text-gray-300">{noticia.descripcion}</p>
              <button className="mt-4 px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition">
                Leer mas
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Noticias;
