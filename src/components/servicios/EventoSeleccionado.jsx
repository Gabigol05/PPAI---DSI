import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventoSeleccionado.css';

const EventoSeleccionado = () => {
  const { eventId } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcodeo de datos de ejemplo para simular la búsqueda por ID
  // En una aplicación real, aquí harías una llamada a la API para obtener los detalles del evento
  const eventosEjemplo = [
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
        // Simulación de datos de series temporales por estación
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
      "series_temporales": [
        {
          "estacion": "EstacionC",
          "muestras": [
            { "tiempo": "0s", "velocidad": "6 mm/s", "frecuencia": "3 Hz", "longitud": "15 m" },
            { "tiempo": "1s", "velocidad": "7 mm/s", "frecuencia": "3.5 Hz", "longitud": "16 m" }
          ]
        },
        {
          "estacion": "EstacionD",
          "muestras": [
            { "tiempo": "0s", "velocidad": "5 mm/s", "frecuencia": "2.8 Hz", "longitud": "14 m" },
            { "tiempo": "1s", "velocidad": "6.5 mm/s", "frecuencia": "3.2 Hz", "longitud": "15.5 m" }
          ]
        }
      ]
    }
    // ... más eventos con datos completos si se necesita
  ];

  useEffect(() => {
    // Simula la búsqueda del evento por ID
    const foundEvento = eventosEjemplo.find(e => e.id === eventId);

    if (foundEvento) {
      setEvento(foundEvento);
      setLoading(false);
    } else {
      setError("Evento no encontrado.");
      setLoading(false);
    }
  }, [eventId]); // Se ejecuta cada vez que eventId cambia

  if (loading) {
    return <div className="servicio-detalle-container">Cargando detalles del evento...</div>;
  }

  if (error) {
    return <div className="servicio-detalle-container">Error: {error}</div>;
  }

  if (!evento) {
    return <div className="servicio-detalle-container">No hay datos del evento disponibles.</div>;
  }

  // Aquí iría la lógica para mostrar los detalles completos (paso 9)
  return (
    <div className="servicio-detalle-container">
      <h2>Detalles del Evento Sísmico - {evento.id}</h2>
      <div className="servicio-contenido">
        {/* Datos del evento (paso 9.1) */}
        <p><strong>Fecha y Hora:</strong> {evento.fecha_hora}</p>
        <p><strong>Ubicación (Epicentro):</strong> Lat: {evento.ubicacion.epicentro.lat}, Lon: {evento.ubicacion.epicentro.lon}, Profundidad: {evento.ubicacion.epicentro.profundidad}</p>
        <p><strong>Magnitud:</strong> {evento.magnitud}</p>
        <p><strong>Alcance:</strong> {evento.alcance}</p>
        <p><strong>Clasificación:</strong> {evento.clasificacion}</p>
        <p><strong>Origen:</strong> {evento.origen}</p>

        {/* Datos de series temporales y muestras (paso 9.2) */}
        <h3>Series Temporales por Estación Sismológica:</h3>
        {evento.series_temporales && evento.series_temporales.length > 0 ? (
          evento.series_temporales.map((serie, index) => (
            <div key={index} className="serie-item">
              <h4>Estación: {serie.estacion}</h4>
              <ul>
                {serie.muestras.map((muestra, mIndex) => (
                  <li key={mIndex}>Tiempo: {muestra.tiempo}, Velocidad: {muestra.velocidad}, Frecuencia: {muestra.frecuencia}, Longitud: {muestra.longitud}</li>
                ))}
              </ul>
              {/* Aquí podrías llamar a Generar Sismograma (paso 9.3) */}
              <button className="servicio-btn-small">Generar Sismograma</button>
            </div>
          ))
        ) : (
          <p>No hay datos de series temporales disponibles para este evento.</p>
        )}

        {/* Espacio para la visualización del Sismograma (paso 9.3) */}
        {/* <div className="sismograma-placeholder">Aquí se mostraría el sismograma</div> */}

      </div>
    </div>
  );
};

export default EventoSeleccionado; 