import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-6 pt-[150px] overflow-hidden">

            {/* Encabezado */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-red-500">Contacto</h1>
                <p className="text-gray-300 mt-2">¿Tienes alguna pregunta o propuesta? Contáctanos.</p>
            </div>

            {/* Formulario dentro de SECTION */}
            <section className="w-full flex justify-center">
                <form className="bg-gray-800 bg-opacity-40 p-6 rounded-lg shadow-lg border border-gray-600 w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Nombre</label>
                        <input type="text" className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Tu nombre" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Correo Electrónico</label>
                        <input type="email" className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="correo@ejemplo.com" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Mensaje</label>
                        <textarea className="w-full p-3 h-32 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Escribe tu mensaje aquí..."></textarea>
                    </div>
                    <button className="w-full py-3 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition">
                        Enviar Mensaje
                    </button>
                </form>
            </section>

            {/* Información de Contacto */}
            <div className="text-gray-300 space-y-4 text-left max-w-md mt-10 mb-20">
                <h2 className="text-2xl font-bold text-red-500">Información de Contacto</h2>
                <p><strong>Email:</strong> contacto@tuempresa.com</p>
                <p><strong>Teléfono:</strong> +57 123 456 7890</p>
                <p><strong>Ubicación:</strong> Ciudad, País</p>
            </div>

        </div>
    );
};

export default Contact;
