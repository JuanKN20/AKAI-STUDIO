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

function App() {
  return (
    <Router>
      <div className="w-full">
        <Navbar />
        <main className="w-100vw">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path='/usuarios' element ={<Usuarios/>}/>
            <Route path='/trabajos' element={<Trabajos/>} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;