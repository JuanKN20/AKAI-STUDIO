import React, { useEffect, useState } from 'react';
const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/usuarios')
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.error('Error:', err));
    }, []);
    return (React.createElement("div", { className: "text-white p-8" },
        React.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Usuarios Registrados"),
        React.createElement("ul", null, usuarios.map(usuario => (React.createElement("li", { key: usuario.id, className: "mb-2" },
            usuario.nombre,
            " - ",
            usuario.correo))))));
};
export default Usuarios;
