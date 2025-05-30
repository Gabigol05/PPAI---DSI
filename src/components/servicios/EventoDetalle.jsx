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

// Opciones predefinidas para los combobox
const OPCIONES_CLASIFICACION = [
  'Sismo Superficial',
  'Sismo Intermedio',
  'Sismo Profundo'
];
const OPCIONES_ALCANCE = [
  'Sismo Local',
  'Sismo Regional',
  'Sismo Tele sismos'
];
const OPCIONES_ORIGEN = [
  'Interplaca',
  'Volcánico',
  'Provocado por explosiones de minas'
];

const EventoDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { eventoBloqueado } = location.state || {};

  const [mostrarMuestras, setMostrarMuestras] = useState(false);
  const [datosEvento, setDatosEvento] = useState(null);
  const [loadingDetalles, setLoadingDetalles] = useState(true);
  const [errorDetalles, setErrorDetalles] = useState(null);
  const [alertaConfirmar, setAlertaConfirmar] = useState(null);
  const [alertaRechazar, setAlertaRechazar] = useState(null);
  const [alertaRevisar, setAlertaRevisar] = useState(null);
  const [modalEditar, setModalEditar] = useState(false);
  const [editValues, setEditValues] = useState({
    clasificacion: '',
    alcance: '',
    origen: ''
  });

  useEffect(() => {
    const fetchDatosEvento = async () => {
      if (!eventoBloqueado?.id) {
        setErrorDetalles('No se proporcionó un ID de evento.');
        setLoadingDetalles(false);
        return;
      }
      setLoadingDetalles(true);
      setErrorDetalles(null);
      try {
        const response = await fetch(`${API_URL}/eventos-sismos/eventos/${eventoBloqueado.id}/datos`, fetchOptions);
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Error al cargar datos del evento: ${response.status} ${response.statusText}. Detalles: ${errorBody}`);
        }
        const data = await response.json();
        setDatosEvento(data);
      } catch (err) {
        setErrorDetalles(err.message);
      } finally {
        setLoadingDetalles(false);
      }
    };
    fetchDatosEvento();
  }, [eventoBloqueado?.id]);

  useEffect(() => {
    if (datosEvento) {
      setEditValues({
        clasificacion: datosEvento.clasificacion || '',
        alcance: datosEvento.alcance || '',
        origen: datosEvento.origen || ''
      });
    }
  }, [datosEvento]);

  // Utilidad para formatear fecha/hora
  const formatearFechaHora = (fechaHora) => {
    if (!fechaHora) return 'N/A';
    try {
      return new Date(fechaHora).toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
      });
    } catch (error) {
      return fechaHora;
    }
  };

  // Utilidad para obtener valor de un tipo de dato en detalles de muestra
  const obtenerValorDetalle = (detalles, tipoDato) => {
    const detalle = detalles.find(d => d.tipoDatoDenominacion === tipoDato);
    return detalle ? detalle.valor : 'N/A';
  };

  // Handlers para modal de edición
  const abrirModalEditar = () => setModalEditar(true);
  const cerrarModalEditar = () => setModalEditar(false);

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleGuardarEdicion = () => {
    setDatosEvento({
      ...datosEvento,
      clasificacion: editValues.clasificacion,
      alcance: editValues.alcance,
      origen: editValues.origen
    });
    cerrarModalEditar();
  };

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

  return (
    <div className="servicio-detalle-container">
      <div className="servicio-contenido">
        <h2>Detalles del Evento Bloqueado</h2>
        {/* Alerta de éxito */}
        {alertaConfirmar && (
          <div className="modal-alerta-confirmar">
            <div className="modal-alerta-confirmar-content">
              {alertaConfirmar}
            </div>
          </div>
        )}
        {alertaRechazar && (
          <div className="modal-alerta-rechazar">
            <div className="modal-alerta-rechazar-content">
              {alertaRechazar}
            </div>
          </div>
        )}
        {alertaRevisar && (
          <div className="modal-alerta-revisar">
            <div className="modal-alerta-revisar-content">
              {alertaRevisar}
            </div>
          </div>
        )}
        <div className="detalles-seccion" style={{ position: 'relative' }}>
          <h3>Características Adicionales</h3>
          <p><strong>Clasificación:</strong> {datosEvento?.clasificacion || 'N/A'}</p>
          <p><strong>Alcance del Sismo:</strong> {datosEvento?.alcance || 'N/A'}</p>
          <p><strong>Origen de Generación:</strong> {datosEvento?.origen || 'N/A'}</p>
          <button
            className='servicio-btn'
            style={{ marginTop: '1rem' }}
            onClick={abrirModalEditar}
          >
            Editar características
          </button>
        </div>

        {/* Modal de edición */}
        {modalEditar && (
          <div className="modal-editar-overlay">
            <div className="modal-editar">
              <h4>Editar Características</h4>
              <label>
                Clasificación:
                <select
                  name="clasificacion"
                  value={editValues.clasificacion}
                  onChange={handleEditChange}
                >
                  <option value="">Seleccione...</option>
                  {OPCIONES_CLASIFICACION.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </label>
              <label>
                Alcance:
                <select
                  name="alcance"
                  value={editValues.alcance}
                  onChange={handleEditChange}
                >
                  <option value="">Seleccione...</option>
                  {OPCIONES_ALCANCE.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </label>
              <label>
                Origen:
                <select
                  name="origen"
                  value={editValues.origen}
                  onChange={handleEditChange}
                >
                  <option value="">Seleccione...</option>
                  {OPCIONES_ORIGEN.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-confirmar" onClick={handleGuardarEdicion}>Guardar</button>
                <button className="btn-rechazar" onClick={cerrarModalEditar}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* Clasificación por estación y series */}
        {datosEvento?.clasificacionPorEstacion && datosEvento.clasificacionPorEstacion.length > 0 && (
          <div className="detalles-seccion">
            <h3>Clasificación por Estación Sismológica</h3>
            <div className="estaciones-grid">
              {datosEvento.clasificacionPorEstacion.map((estacion, idxEst) => (
                <div key={idxEst} className="estacion-item">
                  <h4>{estacion.nombreEstacion}</h4>
                  {estacion.series && estacion.series.length > 0 && (
                    <div className="series-grid">
                      {estacion.series.map((serie, idxSerie) => (
                        <div key={serie.id} className="serie-temporal-item">
                          {/* <h5>Serie #{idxSerie + 1}</h5> */}
                          <p><strong>ID Serie:</strong> {serie.id}</p>
                          <p><strong>Condición de Alarma:</strong> {serie.condicionAlarma}</p>
                          <p><strong>Fecha/Hora Registro:</strong> {formatearFechaHora(serie.fechaHoraRegistro)}</p>
                          <p><strong>Fecha/Hora Inicio Muestras:</strong> {formatearFechaHora(serie.fechaHoraInicioMuestras)}</p>
                          <p><strong>Frecuencia de Muestreo:</strong> {serie.frecuenciaMuestras}</p>
                          <p><strong>Número de Muestras:</strong> {serie.muestras?.length || 0}</p>
                          <div className="botones-muestras-sismograma">
                            <button
                              className="servicio-btn-small"
                              style={{ marginBottom: '1rem' }}
                              onClick={() => setMostrarMuestras(m => m === `${idxEst}-${idxSerie}` ? false : `${idxEst}-${idxSerie}`)}
                            >
                              {mostrarMuestras === `${idxEst}-${idxSerie}` ? 'Ocultar Muestras' : 'Ver Muestras'}
                            </button>
                            <button className="btn-sismograma">
                              Generar Sismograma
                            </button>
                          </div>
                          {mostrarMuestras === `${idxEst}-${idxSerie}` && serie.muestras && (
                            <div className="muestras-grid">
                              {serie.muestras.map((muestra, idxMuestra) => (
                                <div key={muestra.id} className="muestra-item">
                                  <h6>Muestra #{idxMuestra + 1}</h6>
                                  <p><strong>Fecha/Hora:</strong> {formatearFechaHora(muestra.fechaHoraMuestra)}</p>
                                  <div className="detalles-muestra">
                                    <p><strong>Velocidad:</strong> {obtenerValorDetalle(muestra.detalles, 'Velocidad')} m/s</p>
                                    <p><strong>Frecuencia:</strong> {obtenerValorDetalle(muestra.detalles, 'Frecuencia')} Hz</p>
                                    <p><strong>Longitud:</strong> {obtenerValorDetalle(muestra.detalles, 'Longitud')} m</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <button className='btn-mapa btn mt-4'>Visualizar en un mapa el Evento Sísmico</button>
        </div>
        <div className="botones-accion">
          <button
            className="btn-confirmar"
            onClick={async () => {
              try {
                await fetch(`${API_URL}/eventos-sismos/eventos/${eventoBloqueado.id}/confirmar`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  mode: 'cors',
                  credentials: 'include',
                });
                setAlertaConfirmar('El evento fue confirmado exitosamente.');
                setTimeout(() => {
                  navigate('/servicios');
                }, 2000);
              } catch (e) {
                setAlerta('Ocurrió un error al rechazar el evento.');
              }
            }}
          >
            Confirmar evento
          </button>
          <button
            className="btn-rechazar"
            onClick={async () => {
              try {
                await fetch(`${API_URL}/eventos-sismos/eventos/${eventoBloqueado.id}/actualizar-estado`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  mode: 'cors',
                  credentials: 'include',
                });
                setAlertaRechazar('El evento fue rechazado exitosamente.');
                setTimeout(() => {
                  navigate('/servicios');
                }, 2000);
              } catch (e) {
                setAlerta('Ocurrió un error al rechazar el evento.');
              }
            }}
          >
            Rechazar evento
          </button>
          <button
            className="btn-revision"
            onClick={() => navigate('/servicios/registrar-revision')}
          >
            Solicitar revisión a experto
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventoDetalle;