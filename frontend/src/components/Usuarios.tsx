import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/usuarios`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="akai-page">
      <h1 className="akai-section-title">Usuarios registrados</h1>
      <p className="akai-section-subtitle">
        Vista interna de prueba conectada al endpoint <code>/api/usuarios</code> del backend configurado. Esta ruta no forma parte de la navegación pública.
      </p>

      <ul className="mt-8 space-y-3">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="akai-card p-4 text-sm text-zinc-200 break-all">
            <span className="font-semibold text-white">{usuario.nombre}</span>
            <span className="mx-2 text-zinc-500">•</span>
            <span>{usuario.correo}</span>
          </li>
        ))}
      </ul>

      {usuarios.length === 0 && (
        <p className="mt-6 text-sm text-zinc-400">
          No hay usuarios para mostrar o el backend local no está disponible.
        </p>
      )}
    </div>
  );
};

export default Usuarios;
