import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Juegos from "./pages/Juegos";
import Contact from "./pages/Contact";
import Noticias from "./pages/Noticias";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Usuarios from "./components/Usuarios";
import Trabajos from "./pages/Trabajos";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";

function App() {
  const showInternalRoutes = import.meta.env.VITE_SHOW_INTERNAL_ROUTES === "true";

  return (
    <Router>
      <ScrollToTop />
      <div className="akai-shell flex min-h-screen flex-col">
        <Navbar />
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/trabajos" element={<Trabajos />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/usuarios" element={showInternalRoutes ? <Usuarios /> : <Navigate to="/" replace />} />
            <Route path="/login" element={showInternalRoutes ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/noticias" element={showInternalRoutes ? <Noticias /> : <Navigate to="/" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
