import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Juegos from './pages/Juegos';
import Contact from './pages/Contact';
import Noticias from './pages/Noticias'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Usuarios from './components/Usuarios';
import Trabajos from './pages/Trabajos';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="akai-shell flex min-h-screen flex-col">
        <Navbar />
        <main className="w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/trabajos' element={<Trabajos />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
