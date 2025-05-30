import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServiciosDetalle.css';

const API_URL = 'http://localhost:8080';

const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  credentials: 'include'
};

const EventoDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventoBloqueado } = location.state || {};

  const [mostrarMuestras, setMostrarMuestras] = useState(false);
  const [eventoDetalles, setEventoDetalles] = useState(null);
  const [loadingDetalles, setLoadingDetalles] = useState(true);
  const [errorDetalles, setErrorDetalles] = useState(null);

  // Datos simulados de la serie temporal y sus muestras
  const serieTemporalSimulada = {
    fechaHoraInicio: "21/02/2025 19:05:41",
    frecuenciaMuestreo: "50 Hz",
    alertaAlarma: "False",
    muestras: [
      {
        fechaHora: "21/02/2025 19:05:41",
        velocidadOnda: "7 Km/seg",
        frecuenciaOnda: "10 Hz",
        longitud: "0.7 km/ciclo"
      },
      {
        fechaHora: "21/02/2025 19:10:41",
        velocidadOnda: "7.02 Km/seg",
        frecuenciaOnda: "10 Hz",
        longitud: "0.69 km/ciclo"
      },
      {
        fechaHora: "21/02/2025 19:15:41",
        velocidadOnda: "6.99 Km/seg",
        frecuenciaOnda: "10.01 Hz",
        longitud: "0.7 km/ciclo"
      }
    ]
  };

  useEffect(() => {
    const fetchEventoDetalles = async () => {
      if (!eventoBloqueado?.id) {
        setErrorDetalles('No se proporcionó un ID de evento.');
        setLoadingDetalles(false);
        return;
      }
      setLoadingDetalles(true);
      setErrorDetalles(null);
      try {
        const response = await fetch(`${API_URL}/eventos-sismos/eventos/${eventoBloqueado.id}`, {
          ...fetchOptions,
          method: 'GET'
        });
        
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Error al cargar detalles del evento: ${response.status} ${response.statusText}. Detalles: ${errorBody}`);
        }
        
        const data = await response.json();
        setEventoDetalles(data);
      } catch (err) {
        setErrorDetalles(err.message);
      } finally {
        setLoadingDetalles(false);
      }
    };

    fetchEventoDetalles();
  }, [eventoBloqueado?.id]); // Ejecutar cuando el ID del evento cambie

  if (!eventoBloqueado) {
    return (
      <div className="servicio-detalle-container">
        <p>No se encontró información inicial del evento.</p>
        <button 
          className="servicio-btn"
          onClick={() => navigate('/servicios/registrar-revision')}
        >
          Volver a la lista de eventos
        </button>
      </div>
    );
  }

  if (loadingDetalles) {
    return <div className="servicio-detalle-container">Cargando detalles del evento...</div>;
  }

  if (errorDetalles) {
    return <div className="servicio-detalle-container">Error al cargar detalles: {errorDetalles}</div>;
  }
  
  // Usamos eventoDetalles si está disponible, de lo contrario usamos eventoBloqueado (datos iniciales)
  const eventoParaMostrar = eventoDetalles || eventoBloqueado;

  return (
    <div className="servicio-detalle-container">
      <div className="servicio-contenido">
        <h2>Detalles del Evento Bloqueado</h2>
        
        {/* Sección de Información General */}
        <div className="detalles-seccion">
          <h3>Información General</h3>
          <p><strong>Fecha y Hora:</strong> {eventoParaMostrar.fecha_hora}</p>
          <p><strong>Estado:</strong> {eventoParaMostrar.estado || 'N/A'}</p>
          <p><strong>Fecha de Bloqueo:</strong> {eventoParaMostrar.fechaBloqueo ? new Date(eventoParaMostrar.fechaBloqueo).toLocaleString() : 'N/A'}</p>
          <p><strong>Usuario que Bloqueó:</strong> {eventoParaMostrar.usuarioBloqueo || 'N/A'}</p>
          <p><strong>Magnitud:</strong> {eventoParaMostrar.magnitud}</p>
        </div>

        {/* Sección de Ubicación */}
        <div className="detalles-seccion">
          <h3>Ubicación</h3>
          <h4>Epicentro</h4>
          <p><strong>Latitud:</strong> {eventoParaMostrar.ubicacion?.epicentro?.lat || 'N/A'}</p>
          <p><strong>Longitud:</strong> {eventoParaMostrar.ubicacion?.epicentro?.lon || 'N/A'}</p>
          
          <h4>Hipocentro</h4>
          <p><strong>Latitud:</strong> {eventoParaMostrar.ubicacion?.hipocentro?.lat || 'N/A'}</p>
          <p><strong>Longitud:</strong> {eventoParaMostrar.ubicacion?.hipocentro?.lon || 'N/A'}</p>
        </div>

        {/* Sección Agrupada: Clasificación, Alcance, Origen */}
        <div className="detalles-seccion">
          <h3>Características Adicionales</h3>
          
          <p><strong>Clasificación:</strong> {eventoParaMostrar.clasificacion?.nombre || 'N/A'}</p>
          <p><strong>Alcance del Sismo:</strong> {eventoParaMostrar.alcanceSismo?.nombre || 'N/A'}</p>
          <p><strong>Origen de Generación:</strong> {eventoParaMostrar.origenDeGeneracion?.nombre || 'N/A'}</p>
        </div>

        {/* Sección para la serie temporal */}
        <div className="detalles-seccion serie-temporal-container">
          <h3 onClick={() => setMostrarMuestras(!mostrarMuestras)} style={{ cursor: 'pointer' }}>
            Serie Temporal {mostrarMuestras ? '▼' : '►'}
          </h3>
          {!mostrarMuestras && (
            <div>
              <p><strong>Fecha/Hora inicio:</strong> {serieTemporalSimulada.fechaHoraInicio}</p>
              <p><strong>Frecuencia de muestreo:</strong> {serieTemporalSimulada.frecuenciaMuestreo}</p>
              <p><strong>Alerta de alarma:</strong> {serieTemporalSimulada.alertaAlarma}</p>
            </div>
          )}
          {mostrarMuestras && (
            <div>
              <p><strong>Fecha/Hora inicio:</strong> {serieTemporalSimulada.fechaHoraInicio}</p>
              <p><strong>Frecuencia de muestreo:</strong> {serieTemporalSimulada.frecuenciaMuestreo}</p>
              <p><strong>Alerta de alarma:</strong> {serieTemporalSimulada.alertaAlarma}</p>
              <h4>Muestras:</h4>
              <ul>
                {serieTemporalSimulada.muestras.map((muestra, index) => (
                  <li key={index} className="muestra-item">
                    <p><strong>Fecha/Hora muestra {index + 1}:</strong> {muestra.fechaHora}</p>
                    <p><strong>Velocidad de onda:</strong> {muestra.velocidadOnda}</p>
                    <p><strong>Frecuencia de onda:</strong> {muestra.frecuenciaOnda}</p>
                    <p><strong>Longitud:</strong> {muestra.longitud}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="botones-accion">
          <button 
            className="servicio-btn"
            onClick={() => navigate('/servicios/registrar-revision')}
          >
            Volver a la lista de eventos
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventoDetalle;