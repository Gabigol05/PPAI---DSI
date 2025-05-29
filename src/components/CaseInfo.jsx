import React from 'react';

const CaseInfo = ({ formData, onChange }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
    <h2 className="text-lg font-semibold mb-4 text-white">Información del Caso</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Número de Orden
        </label>
        <input
          type="text"
          value={formData.caseNumber}
          onChange={(e) => onChange('caseNumber', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Prioridad
        </label>
        <select
          value={formData.priority}
          onChange={(e) => onChange('priority', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        >
          <option value="">Seleccionar</option>
          <option value="Alto">Alto</option>
          <option value="Medio">Medio</option>
          <option value="Bajo">Bajo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Complejidad
        </label>
        <select
          value={formData.complexity}
          onChange={(e) => onChange('complexity', e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        >
          <option value="">Seleccionar</option>
          <option value="Alta">Alta</option>
          <option value="Mediana">Mediana</option>
          <option value="Baja">Baja</option>
        </select>
      </div>
    </div>
  </div>
);

export default CaseInfo;