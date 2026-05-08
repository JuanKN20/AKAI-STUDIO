import React from "react";

const Noticias: React.FC = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Nuevo lanzamiento",
      descripcion: "Descubre nuestro último proyecto.",
      imagen: "/images/123.png",
    },
    {
      id: 2,
      titulo: "Actualización importante",
      descripcion: "Mejoras y novedades en desarrollo.",
      imagen: "/images/1013143.png",
    },
    {
      id: 3,
      titulo: "Evento especial",
      descripcion: "Únete a nuestro evento exclusivo.",
      imagen: "/images/LogoAkai.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 px-4 pt-32 pb-12 sm:px-6">
      <div className="mx-auto mb-10 max-w-7xl text-center">
        <h1 className="text-3xl font-extrabold text-red-500">Noticias</h1>
        <p className="mt-2 text-gray-300">
          Sección editorial en preparación. El contenido se encuentra en fase interna y aún no hace parte de la navegación principal.
        </p>
      </div>

      <section className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <div
              key={noticia.id}
              className="w-full rounded-lg border border-gray-600 bg-gray-800/40 p-4 text-center shadow-lg"
            >
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                loading="lazy"
                decoding="async"
                className="h-40 w-full rounded-md object-cover"
              />
              <h3 className="mt-4 text-xl font-bold text-white">{noticia.titulo}</h3>
              <p className="text-gray-300">{noticia.descripcion}</p>
              <button
                type="button"
                className="mt-4 rounded-full bg-red-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-900"
              >
                Próximamente
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Noticias;
