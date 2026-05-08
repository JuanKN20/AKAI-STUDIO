import React, { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Usuarios Registrados</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id} className="mb-2">
            {usuario.nombre} - {usuario.correo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
