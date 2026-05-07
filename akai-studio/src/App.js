import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Juegos from './pages/Juegos';
import Contact from './pages/Contact';
import Noticias from './pages/Noticias';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Usuarios from './components/Usuarios';
import Trabajos from './pages/Trabajos';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
function App() {
    return (React.createElement(Router, null,
        React.createElement(ScrollToTop, null),
        React.createElement("div", { className: "w-full" },
            React.createElement(Navbar, null),
            React.createElement("main", { className: "w-full" },
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/juegos", element: React.createElement(Juegos, null) }),
                    React.createElement(Route, { path: "/services", element: React.createElement(Services, null) }),
                    React.createElement(Route, { path: "/contact", element: React.createElement(Contact, null) }),
                    React.createElement(Route, { path: "/home", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/noticias", element: React.createElement(Noticias, null) }),
                    React.createElement(Route, { path: '/usuarios', element: React.createElement(Usuarios, null) }),
                    React.createElement(Route, { path: '/trabajos', element: React.createElement(Trabajos, null) }),
                    React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }))),
            React.createElement(Footer, null))));
}
export default App;
