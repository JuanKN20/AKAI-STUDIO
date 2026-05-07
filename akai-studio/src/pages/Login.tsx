import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div
      className="
        w-screen                         /* ocupa TODO el ancho del viewport */
        min-h-screen                     /* ocupa TODO el alto del viewport */
        flex items-center justify-center /* centra el contenido */
        bg-gradient-to-b from-black to-gray-900
        pt-24 pb-12 px-4                 /* espacio para el navbar fijo + respiración abajo */
        overflow-x-hidden                /* evita scroll raro horizontal */
      "
    >
      <div className="w-full max-w-md bg-black/80 border border-red-800/40 rounded-2xl shadow-2xl px-6 py-8 backdrop-blur">
        {/* Logo arriba */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Imagenes/Logo/Logo.png"
            alt="Akai Studio"
            className="h-12 mb-2"
          />
          <h1 className="text-xl font-semibold text-red-500">
            Inicia sesión en Akai Studio
          </h1>
          <p className="mt-1 text-xs text-gray-400 text-center">
            Accede al panel para gestionar proyectos, juegos y servicios.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-600 bg-black"
              />
              Recuérdame
            </label>
            <button
              type="button"
              className="text-red-500 hover:text-red-400"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-red-700 py-2 text-sm font-semibold text-white hover:bg-red-800 transition-transform hover:scale-[1.01]"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace registro / volver */}
        <div className="mt-4 text-center text-[11px] text-gray-400">
          <p>
            ¿Aún no tienes cuenta?{" "}
            <span className="text-red-500 hover:text-red-400 cursor-pointer">
              (Pendiente de registro)
            </span>
          </p>
          <Link
            to="/home"
            className="mt-2 inline-block text-gray-500 hover:text-red-500 text-[10px]"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
