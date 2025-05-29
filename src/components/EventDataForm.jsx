import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CoordinatesSection from './CoordinatesSection';
import TimeSection from './TimeSection';
import ActionButtons from './ActionButtons';

const EventDataForm = ({ eventData, onChange, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Datos del Evento Sísmico</h2>
        <button 
          onClick={onBack} 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-gray-600 rounded-md transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Magnitud
          </label>
          <input
            type="number"
            step="0.1"
            value={eventData.magnitude}
            onChange={(e) => onChange('magnitude', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Alcance (km)
          </label>
          <input
            type="number"
            value={eventData.range}
            onChange={(e) => onChange('range', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Origen de Generación
          </label>
          <input
            type="text"
            value={eventData.origin}
            onChange={(e) => onChange('origin', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frecuencia
          </label>
          <input
            type="text"
            value={eventData.frequency}
            onChange={(e) => onChange('frequency', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      <CoordinatesSection coordinates={eventData.coordinates} onChange={onChange} />
      <TimeSection eventData={eventData} onChange={onChange} />
      <ActionButtons />
    </div>
  );
};

export default EventDataForm;
