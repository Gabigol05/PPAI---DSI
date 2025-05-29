import React, { useState } from 'react';
import { ArrowLeft, XCircle } from 'lucide-react';

const RejectEventForm = ({ onBack }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);

  const handleReasonChange = (reason) => {
    setSelectedReasons(prev => 
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = () => {
    if (selectedReasons.length === 0) {
      alert('Por favor seleccione al menos un motivo de rechazo');
      return;
    }
    alert('Evento rechazado exitosamente');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <XCircle className="w-5 h-5 mr-2 text-red-500" />
          Rechazar Evento
        </h2>
        <button 
          onClick={onBack} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h3 className="font-medium text-white mb-4">Motivos de Rechazo</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <span className="text-white block">No hay sismos detectados pendientes de revisión</span>
              <p className="text-sm text-gray-400 mt-1">No se han detectado eventos sísmicos que requieran análisis en este momento.</p>
            </div>
            <div className="flex-shrink-0">
              <input 
                type="checkbox" 
                className="h-5 w-5 text-red-500 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-800"
                onChange={() => handleReasonChange('no_sismos')}
                checked={selectedReasons.includes('no_sismos')}
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <span className="text-white block">Datos del evento sísmico incorrectos</span>
              <p className="text-sm text-gray-400 mt-1">La información proporcionada no coincide con los datos registrados.</p>
            </div>
            <div className="flex-shrink-0">
              <input 
                type="checkbox" 
                className="h-5 w-5 text-red-500 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-800"
                onChange={() => handleReasonChange('datos_incorrectos')}
                checked={selectedReasons.includes('datos_incorrectos')}
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer">
            <div className="flex-1 pr-4">
              <span className="text-white block">Datos insuficientes para el análisis</span>
              <p className="text-sm text-gray-400 mt-1">La información disponible no es suficiente para realizar un análisis adecuado.</p>
            </div>
            <div className="flex-shrink-0">
              <input 
                type="checkbox" 
                className="h-5 w-5 text-red-500 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-800"
                onChange={() => handleReasonChange('datos_insuficientes')}
                checked={selectedReasons.includes('datos_insuficientes')}
              />
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
      >
        <XCircle className="w-5 h-5 mr-2" />
        Confirmar Rechazo
      </button>
    </div>
  );
};

export default RejectEventForm;