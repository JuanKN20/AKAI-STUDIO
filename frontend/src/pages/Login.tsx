import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 pt-24 pb-12 px-4 overflow-x-hidden">
      <div className="w-full max-w-md bg-black/80 border border-red-800/40 rounded-2xl shadow-2xl px-6 py-8 backdrop-blur">
        <div className="flex flex-col items-center mb-6">
          <p className="text-base font-black uppercase tracking-[0.22em] text-white">Yorurei Studio</p>
          <h1 className="text-xl font-semibold text-red-500">Área interna en desarrollo</h1>
          <p className="mt-1 text-xs text-gray-400 text-center">
            Esta ruta está reservada para acceso interno de Yorurei Studio y aún no está habilitada para clientes.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="????????"
              className="w-full rounded-xl bg-black/80 border border-gray-700 px-3 py-2 text-sm text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <label htmlFor="remember-me" className="flex items-center gap-2">
              <input id="remember-me" type="checkbox" className="h-3 w-3 rounded border-gray-600 bg-black" />
              Recuérdame
            </label>
            <button type="button" className="text-red-500 hover:text-red-400">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-red-700 py-2 text-sm font-semibold text-white hover:bg-red-800 transition-transform hover:scale-[1.01]"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-4 text-center text-[11px] text-gray-400">
          <p>
            ¿Aún no tienes cuenta? <span className="text-red-500 hover:text-red-400 cursor-pointer">(Pendiente de registro)</span>
          </p>
          <Link to="/" className="mt-2 inline-block text-gray-500 hover:text-red-500 text-[10px]">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
