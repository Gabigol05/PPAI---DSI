import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Importamos todos los componentes que necesitamos
import ActionButton from './ActionButton';
import CaseInfo from './CaseInfo';
import EventDataForm from './EventDataForm';
import RejectEventForm from './RejectEventForm';
import ExpertRevisionForm from './ExpertRevisionForm';

const SeismicReviewSystem = () => {
  // Estado para los datos del formulario principal
  const [formData, setFormData] = useState({
    caseNumber: '0',
    priority: '',
    complexity: '',
    selectedAction: ''
  });

  // Estado para los datos del evento sísmico
  const [eventData, setEventData] = useState({
    magnitude: '',
    range: '',
    origin: '',
    frequency: '',
    coordinates: { lat: '', lon: '' },
    eventTime: '',
    occurrenceTime: ''
  });

  // Estado para controlar qué vista mostrar
  const [currentView, setCurrentView] = useState('main');

  // Función para manejar cambios en el formulario principal
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Función para manejar cambios en los datos del evento
  const handleEventDataChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEventData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setEventData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Función para manejar la selección de acciones
  const handleActionSelection = (action) => {
    setFormData(prev => ({ ...prev, selectedAction: action }));
    
    switch (action) {
      case 'registrar_datos':
        setCurrentView('eventData');
        break;
      case 'rechazar_evento':
        setCurrentView('reject');
        break;
      case 'solicitar_experto':
        setCurrentView('expert');
        break;
      default:
        setCurrentView('main');
    }
  };

  // Vista principal con opciones de acción
  const renderMainView = () => (
    <div className="space-y-6">
      <CaseInfo formData={formData} onChange={handleFormChange} />
      
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Seleccione una acción:</h2>
        <div className="space-y-3">
          <ActionButton
            action="registrar_datos"
            label="Registrar datos del evento"
            description="Ingresar y confirmar información del evento sísmico detectado"
            icon={CheckCircle}
            isSelected={formData.selectedAction === 'registrar_datos'}
            onClick={handleActionSelection}
          />
          <ActionButton
            action="rechazar_evento"
            label="Rechazar evento"
            description="Rechazar el evento por datos insuficientes o incorrectos"
            icon={XCircle}
            isSelected={formData.selectedAction === 'rechazar_evento'}
            onClick={handleActionSelection}
          />
          <ActionButton
            action="solicitar_experto"
            label="Solicitar revisión de experto"
            description="Derivar el caso a un experto para análisis especializado"
            icon={AlertTriangle}
            isSelected={formData.selectedAction === 'solicitar_experto'}
            onClick={handleActionSelection}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1d1f35]">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Sistema de Revisión Sísmica
          </h1>
          <div className="max-w-4xl mx-auto p-2">
            <span className="text-gray-300">Registro de Análisis Sísmico</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-300">Orden Nro: {formData.caseNumber}</span>
          </div>
        </div>

        {/* Aquí decidimos qué componente mostrar según el estado */}
        {currentView === 'main' && renderMainView()}
        {currentView === 'eventData' && (
          <EventDataForm 
            eventData={eventData} 
            onChange={handleEventDataChange}
            onBack={() => setCurrentView('main')}
          />
        )}
        {currentView === 'reject' && (
          <RejectEventForm onBack={() => setCurrentView('main')} />
        )}
        {currentView === 'expert' && (
          <ExpertRevisionForm onBack={() => setCurrentView('main')} />
        )}

        <div className="mt-8 pt-4 border-t border-gray-700 text-xs text-gray-400">
          <p><strong>Nota:</strong> La operación puede cancelarse en cualquier momento.</p>
        </div>
      </div>
    </div>
  );
};

export default SeismicReviewSystem;