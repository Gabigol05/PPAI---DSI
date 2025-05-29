
import React from 'react';

const ActionButtons = () => (
  <div className="flex space-x-4">
    <button
      onClick={() => alert('Evento confirmado y registrado')}
      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
    >
      Confirmar Evento
    </button>
    <button
      onClick={() => alert('Evento rechazado')}
      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
    >
      Rechazar Evento
    </button>
  </div>
);

export default ActionButtons;