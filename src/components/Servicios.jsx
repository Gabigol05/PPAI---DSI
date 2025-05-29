import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Servicios.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Servicios = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const servicios = [
    {
      id: 1,
      titulo: "Cerrar orden de inspección",
      descripcion: "Proceso para finalizar y documentar las inspecciones realizadas, incluyendo la generación de reportes y la actualización de registros en el sistema.",
      icono: "📋",
      ruta: "/servicios/cerrar-orden"
    },
    {
      id: 2,
      titulo: "Registrar resultado de revisión manual",
      descripcion: "Sistema para documentar y almacenar los resultados de las revisiones manuales realizadas, permitiendo un seguimiento detallado de cada inspección.",
      icono: "🔍",
      ruta: "/servicios/registrar-revision"
    },
    {
      id: 3,
      titulo: "Gestión de reportes",
      descripcion: "Herramienta para generar, almacenar y gestionar reportes detallados de las inspecciones y revisiones realizadas.",
      icono: "📊",
      ruta: "/servicios/gestion-reportes"
    },
    {
      id: 4,
      titulo: "Análisis de datos",
      descripcion: "Plataforma para analizar y visualizar los datos recopilados durante las inspecciones, facilitando la toma de decisiones.",
      icono: "📈",
      ruta: "/servicios/analisis-datos"
    }
  ];

  const toggleAcordeon = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleAccederServicio = (ruta) => {
    navigate(ruta);
  };

  return (
    <div className="servicios-container">
      <h1>Servicios</h1>
      
      <div className="acordeon-container">
        {servicios.map((servicio, index) => (
          <div 
            key={servicio.id} 
            className={`acordeon-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div 
              className="acordeon-header"
              onClick={() => toggleAcordeon(index)}
            >
              <div className="acordeon-titulo">
                <span className="acordeon-icono">{servicio.icono}</span>
                <h3>{servicio.titulo}</h3>
              </div>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className="acordeon-contenido">
              <p>{servicio.descripcion}</p>
              <button 
                className="servicio-btn"
                onClick={() => handleAccederServicio(servicio.ruta)}
              >
                Acceder al servicio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios; 