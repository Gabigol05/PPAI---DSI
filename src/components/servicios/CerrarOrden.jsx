import React from 'react';
import './ServiciosDetalle.css';
import imagenServicio from '../../assets/carousel/image1.jpeg';

const CerrarOrden = () => {
  return (
    <div className="servicio-detalle-container">
      <h2>Cerrar Orden de Inspección</h2>
      <img src={imagenServicio} alt="Cerrar Orden de Inspección" className="imagen-servicio" />
    </div>
  );
};

export default CerrarOrden; 