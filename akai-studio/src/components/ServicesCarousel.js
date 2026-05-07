import React, { useState, useEffect, useRef } from 'react';
const ServicesCarousel = () => {
    const servicesH = [
        {
            id: 1,
            title: 'Desarrollo de videojuegos',
            video: 'src/assets/videojuegos.mp4',
            link: '/services/videojuegos',
        },
        {
            id: 2,
            title: 'Animación',
            video: 'src/assets/animacion.mp4',
            link: '/services/animacion',
        },
        {
            id: 3,
            title: 'Web',
            video: 'src/assets/web.mp4',
            link: '/services/diseno',
        },
        {
            id: 4,
            title: 'Modelado 3D',
            video: 'src/assets/modelado.mp4',
            link: '/services/narrativa',
        },
    ];
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const videoRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % servicesH.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [servicesH.length]);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [currentServiceIndex]);
    const changeService = (index) => {
        setCurrentServiceIndex(index);
    };
    const currentService = servicesH[currentServiceIndex];
    return (React.createElement("section", { className: "relative px-8 py-16 bg-gradient-to-b  to-blak" },
        React.createElement("h2", { className: "text-3xl font-bold text-red-700 mb-8" }, "Servicios"),
        React.createElement("div", { className: "relative w-full h-[60vh] rounded-lg overflow-hidden shadow-lg" },
            React.createElement("video", { ref: videoRef, autoPlay: true, muted: true, loop: true, className: "w-full h-full object-cover", onEnded: () => setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % servicesH.length) },
                React.createElement("source", { src: currentService.video, type: "video/mp4" }),
                "Tu navegador no soporta el video."),
            React.createElement("div", { className: "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-8 text-center" },
                React.createElement("h3", { className: "text-2xl md:text-3xl font-semibold" }, currentService.title),
                React.createElement("button", { onClick: () => (window.location.href = currentService.link), className: "mt-6 px-6 py-2 bg-red-700 text-white font-semibold rounded-full text-sm hover:bg-red-950 transition transform hover:scale-105" }, "Ver m\u00E1s"))),
        React.createElement("div", { className: "flex justify-center mt-8 space-x-4" }, servicesH.map((serviceH, index) => (React.createElement("button", { key: serviceH.id, onClick: () => changeService(index), className: `w-4 h-4 rounded-full ${index === currentServiceIndex ? 'bg-red-600' : 'bg-gray-400'} hover:bg-red-950 transition` }))))));
};
export default ServicesCarousel;
