import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SeismicReviewSystem from './components/SeismicReviewSystem';
import './App.css'; // Si tienes estilos CSS
import Navbar from './components/Navbar';
import Servicios from './components/Servicios';
import CerrarOrden from './components/servicios/CerrarOrden';
import RegistrarRevision from './components/servicios/RegistrarRevision';
import GestionReportes from './components/servicios/GestionReportes';
import AnalisisDatos from './components/servicios/AnalisisDatos';
import Contacto from './components/Contacto';
import EventoSeleccionado from './components/servicios/EventoSeleccionado';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seismic-review" element={<SeismicReviewSystem />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/cerrar-orden" element={<CerrarOrden />} />
          <Route path="/servicios/registrar-revision" element={<RegistrarRevision />} />
          <Route path="/servicios/gestion-reportes" element={<GestionReportes />} />
          <Route path="/servicios/analisis-datos" element={<AnalisisDatos />} />
          <Route path="/servicios/evento/:eventId" element={<EventoSeleccionado />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;