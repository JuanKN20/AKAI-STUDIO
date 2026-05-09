import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { hasAdminToken, saveAdminToken, validateAdminToken } from './adminApi';

type AdminLoginProps = {
  showInternalRoutes: boolean;
};

function resolveFromPath(state: unknown): string {
  if (state && typeof state === 'object' && 'from' in state) {
    const value = state.from;
    if (typeof value === 'string' && value.startsWith('/admin/')) {
      return value;
    }
  }
  return '/admin/dashboard';
}

const AdminLogin: React.FC<AdminLoginProps> = ({ showInternalRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const targetPath = useMemo(() => resolveFromPath(location.state), [location.state]);

  useEffect(() => {
    if (hasAdminToken()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  if (!showInternalRoutes) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanToken = token.trim();

    if (!cleanToken) {
      setError('Debes ingresar el token admin.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await validateAdminToken(cleanToken);
      saveAdminToken(cleanToken);
      navigate(targetPath, { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'No se pudo validar el token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pb-12 pt-24">
      <div className="w-full max-w-md rounded-2xl border border-red-900/40 bg-black/65 p-6 shadow-akai-soft backdrop-blur-xl">
        <div className="mb-6 text-center">
          <img src="/images/Logo/Logo.png" alt="Yorurei Studio" className="mx-auto mb-3 h-12 w-auto" />
          <h1 className="text-xl font-semibold text-red-200">Ingreso Admin</h1>
          <p className="mt-2 text-xs text-zinc-300">
            Ingresa el token interno para acceder al panel de Yorurei Studio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-token" className="mb-1 block text-xs font-medium text-zinc-300">
              Token admin
            </label>
            <input
              id="admin-token"
              type="password"
              autoComplete="off"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="••••••••••••••••"
              className="w-full rounded-xl border border-red-800/40 bg-black/50 px-3 py-2 text-sm text-white outline-none transition focus:border-red-500"
            />
          </div>

          {error ? <p className="rounded-lg border border-red-800/50 bg-red-950/30 px-3 py-2 text-xs text-red-200">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border border-red-500/50 bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Validando token...' : 'Entrar al panel'}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
          <Link to="/" className="transition hover:text-red-200">
            Volver a Inicio
          </Link>
          <button
            type="button"
            onClick={() => {
              setToken('');
              setError('');
            }}
            className="transition hover:text-red-200"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
