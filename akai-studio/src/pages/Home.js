import React from "react";
import ServicesCarousel from "../components/ServicesCarousel";
const Home = () => {
    return (React.createElement("div", { className: "w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 pt-[150px] overflow-x-hidden" },
        React.createElement("section", { className: "relative w-full h-screen flex items-center justify-center" },
            React.createElement("video", { autoPlay: true, muted: true, loop: true, className: "absolute top-0 left-0 w-full h-full object-cover" },
                React.createElement("source", { src: "/videos/anime1.mp4", type: "video/mp4" }),
                "Tu navegador no soporta el video."),
            React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center px-8" },
                React.createElement("h1", { className: "text-xl font-semibold" }, "Sombras que narran historias,"),
                React.createElement("h2", { className: "text-3xl md:text-4xl font-extrabold mt-4" }, "que transforman realidades"),
                React.createElement("button", { className: "mt-6 px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-950 transition transform hover:scale-105" }, "Nuestros trabajos"))),
        React.createElement("section", { className: "w-full max-w-7xl px-8 py-16" },
            React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center mb-8" },
                React.createElement("h2", { className: "text-3xl font-bold text-red-500" }, "Actualidad"),
                React.createElement("button", { className: "px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-900 transition" }, "Ver m\u00E1s")),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center" },
                React.createElement("div", { className: "bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg w-[300px] border border-gray-600 transition-transform hover:scale-105" },
                    React.createElement("img", { src: "/images/123.png", alt: "Actualidad 1", className: "w-full h-40 object-cover rounded-md" })),
                React.createElement("div", { className: "bg-gray-800 bg-opacity-40 p-5 rounded-lg shadow-lg w-[300px] border border-gray-600 transition-transform hover:scale-105" },
                    React.createElement("img", { src: "/images/1013143.png", alt: "Actualidad 2", className: "w-full h-40 object-cover rounded-md" })))),
        React.createElement(ServicesCarousel, null)));
};
export default Home;
