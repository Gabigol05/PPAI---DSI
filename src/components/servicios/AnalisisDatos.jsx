import React from 'react';
import './ServiciosDetalle.css';
import imagenServicio from '../../assets/carousel/image1.jpeg';

const AnalisisDatos = () => {
  return (
    <div className="servicio-detalle-container">
      <h2>Análisis de Datos</h2>
      <img src={imagenServicio} alt="Análisis de Datos" className="imagen-servicio" />
    </div>
  );
};

export default AnalisisDatos; 