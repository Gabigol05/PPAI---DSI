import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const ExpertRevisionForm = ({ onBack }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
        Solicitar Revisión de Experto
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
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-yellow-500/10 rounded-lg mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="font-medium text-white text-lg">Revisión de Experto Requerida</h3>
        <p className="text-gray-400 mt-2 max-w-md">
          Se derivará el evento a un experto para análisis especializado.
        </p>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Comentarios para el Experto
      </label>
      <textarea
        rows={4}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        placeholder="Ingrese observaciones o comentarios específicos..."
      />
    </div>

    <button
      onClick={() => {
        alert('Solicitud enviada al experto exitosamente');
        onBack();
      }}
      className="w-full bg-amber-400 text-white py-3 px-4 rounded-md hover:bg-yellow-600 transition-colors font-medium flex items-center justify-center"
    >
      
      Enviar a Experto
    </button>
  </div>
);

export default ExpertRevisionForm;