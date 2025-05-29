import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ServiciosDetalle.css';

const RegistrarRevision = () => {
  const [eventosSismicos, setEventosSismicos] = useState([
    {
      "id": "evento123",
      "fecha_hora": "2023-10-27 10:30:00",
      "ubicacion": {
        "epicentro": { "lat": "-31.5", "lon": "-64.2", "profundidad": "10 km" },
        "hipocentro": { "lat": "-31.5", "lon": "-64.2", "profundidad": "5 km" }
      },
      "magnitud": "5.5",
      "alcance": "Regional",
      "clasificacion": "Tectónico",
      "origen": "Servicio Sismológico Nacional",
      "series_temporales": [
        {
          "estacion": "EstacionA",
          "muestras": [
            { "tiempo": "0s", "velocidad": "10 mm/s", "frecuencia": "5 Hz", "longitud": "20 m" },
            { "tiempo": "1s", "velocidad": "12 mm/s", "frecuencia": "6 Hz", "longitud": "22 m" }
          ]
        },
        {
          "estacion": "EstacionB",
          "muestras": [
            { "tiempo": "0s", "velocidad": "8 mm/s", "frecuencia": "4 Hz", "longitud": "18 m" },
            { "tiempo": "1s", "velocidad": "11 mm/s", "frecuencia": "5.5 Hz", "longitud": "21 m" }
          ]
        }
      ]
    },
    {
      "id": "evento456",
      "fecha_hora": "2023-10-26 15:00:00",
      "ubicacion": {
        "epicentro": { "lat": "-32.0", "lon": "-65.0", "profundidad": "12 km" },
        "hipocentro": { "lat": "-32.0", "lon": "-65.0", "profundidad": "8 km" }
      },
      "magnitud": "4.1",
      "alcance": "Local",
      "clasificacion": "Volcánico",
      "origen": "Observatorio Vulcanológico",
      "series_temporales": []
    },
    {
      "id": "evento789",
      "fecha_hora": "2023-10-25 08:45:00",
      "ubicacion": {
        "epicentro": { "lat": "-33.2", "lon": "-66.3", "profundidad": "15 km" },
        "hipocentro": { "lat": "-33.2", "lon": "-66.3", "profundidad": "12 km" }
      },
      "magnitud": "6.2",
      "alcance": "Global",
      "clasificacion": "Impacto",
      "origen": "Centro de Alerta de Tsunamis",
      "series_temporales": []
    },
    {
      "id": "evento101",
      "fecha_hora": "2023-10-24 22:15:00", 
      "ubicacion": {
        "epicentro": { "lat": "-30.8", "lon": "-63.5", "profundidad": "8 km" },
        "hipocentro": { "lat": "-30.8", "lon": "-63.5", "profundidad": "5 km" }
      },
      "magnitud": "3.8",
      "alcance": "Local",
      "clasificacion": "Antropogénico",
      "origen": "Mina local",
      "series_temporales": []
    },
    {
      "id": "evento202",
      "fecha_hora": "2023-10-23 16:30:00",
      "ubicacion": {
        "epicentro": { "lat": "-34.5", "lon": "-68.2", "profundidad": "20 km" },
        "hipocentro": { "lat": "-34.5", "lon": "-68.2", "profundidad": "18 km" }
      },
      "magnitud": "5.9",
      "alcance": "Regional",
      "clasificacion": "Tectónico",
      "origen": "Servicio Sismológico Provincial",
      "series_temporales": []
    }
  ]);

  const navigate = useNavigate();
  const { eventId } = useParams(); // Obtener el eventId de la URL

  const [selectedEvent, setSelectedEvent] = useState(null);

  // Efecto para seleccionar el evento cuando cambia el eventId en la URL
  useEffect(() => {
    if (eventId) {
      const event = eventosSismicos.find(e => e.id === eventId);
      setSelectedEvent(event || null);
    } else {
      setSelectedEvent(null);
    }
  }, [eventId, eventosSismicos]); // Dependencias: eventId y eventosSismicos

  const handleSeleccionarEvento = (id) => {
    // Navega a la ruta de detalles del evento
    navigate(`/servicios/evento/${id}`);
    // Nota: El useEffect anterior manejará la carga de datos en la página de detalles
  };

  return (
    <div className="servicio-detalle-container">
      <div className="servicio-contenido">
        <h4>Eventos Sísmicos Autodetectados sin revisar:</h4>
        <ul>
          {eventosSismicos.map(evento => (
            <li 
              key={evento.id} 
              className={`evento-item ${selectedEvent && selectedEvent.id === evento.id ? 'selected' : ''}`}
            >
              <p><strong>ID:</strong> {evento.id}</p>
              <p><strong>Fecha y Hora:</strong> {evento.fecha_hora}</p>
              <p><strong>Ubicación (Epicentro):</strong> Lat: {evento.ubicacion.epicentro.lat}, Lon: {evento.ubicacion.epicentro.lon}, Profundidad: {evento.ubicacion.epicentro.profundidad}</p>
              <p><strong>Magnitud:</strong> {evento.magnitud}</p>
              <button 
                className="servicio-btn"
                onClick={() => handleSeleccionarEvento(evento.id)}
              >
                Seleccionar Evento
              </button>
            </li>
          ))}
        </ul>

        {/* Mostrar detalles del evento seleccionado si existe */}
        {selectedEvent && (
          <div className="detalles-evento-seleccionado">
            <h4>Detalles del Evento Seleccionado ({selectedEvent.id}):</h4>
            <p><strong>Alcance:</strong> {selectedEvent.alcance}</p>
            <p><strong>Classificación:</strong> {selectedEvent.clasificacion}</p>
            <p><strong>Origen:</strong> {selectedEvent.origen}</p>

            {/* Mostrar series temporales si existen */}
            {selectedEvent.series_temporales && selectedEvent.series_temporales.length > 0 && (
              <div>
                <h5>Series Temporales:</h5>
                {selectedEvent.series_temporales.map((serie, index) => (
                  <div key={index} className="serie-temporal-item">
                    <h6>Estación: {serie.estacion}</h6>
                    <ul>
                      {serie.muestras.map((muestra, mIndex) => (
                        <li key={mIndex}>Tiempo: {muestra.tiempo}, Velocidad: {muestra.velocidad}, Frecuencia: {muestra.frecuencia}, Longitud: {muestra.longitud}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
             {/* Botón para Generar Sismograma (paso 9.3) */}
             <button className="servicio-btn-small" style={{ marginTop: '1rem' }}>Generar Sismograma</button>

          </div>
        )}

      </div>
    </div>
  );
};

export default RegistrarRevision; 