import React from 'react';
import './ServiciosDetalle.css';
import imagenServicio from '../../assets/carousel/image1.jpeg';

const GestionReportes = () => {
  return (
    <div className="servicio-detalle-container">
      <h2>Gestión de Reportes</h2>
      <img src={imagenServicio} alt="Gestión de Reportes" className="imagen-servicio" />
    </div>
  );
};

export default GestionReportes; 