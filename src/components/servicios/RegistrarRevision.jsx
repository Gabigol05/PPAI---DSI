import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ServiciosDetalle.css';

const API_URL = 'http://localhost:8080';

const fetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  credentials: 'include'
};

const RegistrarRevision = () => {
  const [eventosSismicos, setEventosSismicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventoBloqueado, setEventoBloqueado] = useState(null);

  const navigate = useNavigate();
  const { eventId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Efecto para cargar los eventos sísmicos
  useEffect(() => {
    const fetchEventosSismicos = async () => {
      try {
        const response = await fetch(`${API_URL}/eventos-sismos`, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`Error al cargar los eventos sísmicos: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Transformar los datos al formato que espera el componente
        const eventosTransformados = data.map(evento => ({
          id: evento.id,
          fecha_hora: new Date(evento.fechaHoraOcurrencia).toLocaleString(),
          ubicacion: {
            epicentro: {
              lat: evento.latitudEpicentro?.toString() || 'N/A',
              lon: evento.longitudEpicentro?.toString() || 'N/A'
            },
            hipocentro: {
              lat: evento.latitudHipocentro?.toString() || 'N/A',
              lon: evento.longitudHipocentro?.toString() || 'N/A'
            }
          },
          magnitud: evento.valorMagnitud?.toString() || 'N/A'
        }));
        
        setEventosSismicos(eventosTransformados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventosSismicos();
  }, []);

  // Efecto para seleccionar el evento cuando cambia el eventId en la URL
  useEffect(() => {
    if (eventId) {
      const event = eventosSismicos.find(e => e.id === parseInt(eventId));
      setSelectedEvent(event || null);
    } else {
      setSelectedEvent(null);
    }
  }, [eventId, eventosSismicos]);

  const handleSeleccionarEvento = async (evento) => {
    try {
      // Realizar la llamada PUT al endpoint de bloqueo
      const response = await fetch(`${API_URL}/eventos-sismos/eventos/${evento.id}/bloquear`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al bloquear el evento');
      }

      // Navegamos al detalle del evento, pasando el evento bloqueado
      navigate(`/servicios/evento/${evento.id}`, {
        state: { 
          eventoBloqueado: evento
        }
      });

    } catch (error) {
      console.error('Error en handleSeleccionarEvento:', error);
      setError('No se pudo bloquear el evento. Por favor, intente nuevamente. Detalles: ' + error.message);
    }
  };

  const handleGenerarSismograma = async (eventoId) => {
    try {
      const response = await fetch(`${API_URL}/sismogramas/${eventoId}`, {
        ...fetchOptions,
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Error al generar el sismograma');
      }
      
      const data = await response.json();
      console.log('Sismograma generado:', data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="servicio-detalle-container">Cargando eventos sísmicos...</div>;
  }

  if (error) {
    return <div className="servicio-detalle-container">Error: {error}</div>;
  }

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
              <p><strong>Fecha y Hora:</strong> {evento.fecha_hora}</p>
              <p><strong>Ubicación (Epicentro):</strong> Lat: {evento.ubicacion.epicentro.lat}, Lon: {evento.ubicacion.epicentro.lon}</p>
              <p><strong>Ubicación (Hipocentro):</strong> Lat: {evento.ubicacion.hipocentro.lat}, Lon: {evento.ubicacion.hipocentro.lon}</p>
              <p><strong>Magnitud:</strong> {evento.magnitud}</p>
              <button 
                className="servicio-btn"
                onClick={() => handleSeleccionarEvento(evento)}
              >
                Seleccionar Evento
              </button>
            </li>
          ))}
        </ul>

        {selectedEvent && (
          <div className="detalles-evento-seleccionado">
            <h4>Detalles del Evento Seleccionado:</h4>
            <p><strong>Fecha y Hora:</strong> {selectedEvent.fecha_hora}</p>
            <p><strong>Ubicación Epicentro:</strong> Lat: {selectedEvent.ubicacion.epicentro.lat}, Lon: {selectedEvent.ubicacion.epicentro.lon}</p>
            <p><strong>Ubicación Hipocentro:</strong> Lat: {selectedEvent.ubicacion.hipocentro.lat}, Lon: {selectedEvent.ubicacion.hipocentro.lon}</p>
            <p><strong>Magnitud:</strong> {selectedEvent.magnitud}</p>

            <button 
              className="servicio-btn-small" 
              style={{ marginTop: '1rem' }}
              onClick={() => handleGenerarSismograma(selectedEvent.id)}
            >
              Generar Sismograma
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrarRevision; 