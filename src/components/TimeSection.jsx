import React from 'react';
import { Clock } from 'lucide-react';

const TimeSection = ({ eventData, onChange }) => (
  <div className="border-t pt-4">
    <h3 className="font-medium mb-3">Horarios</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          <Clock className="w-4 h-4 inline mr-1" />
          Hora del Evento
        </label>
        <input
          type="datetime-local"
          value={eventData.eventTime}
          onChange={(e) => onChange('eventTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          <Clock className="w-4 h-4 inline mr-1" />
          Hora de Ocurrencia
        </label>
        <input
          type="datetime-local"
          value={eventData.occurrenceTime}
          onChange={(e) => onChange('occurrenceTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

export default TimeSection;