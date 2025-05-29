import React from 'react';
import { MapPin, Map } from 'lucide-react';

const CoordinatesSection = ({ coordinates, onChange }) => {
  const [showMap, setShowMap] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
          Coordenadas
        </h3>
        <button
          onClick={() => setShowMap(!showMap)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
        >
          <Map className="w-4 h-4 mr-2" />
          {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Latitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={coordinates.latitude}
            onChange={(e) => onChange('coordinates', { ...coordinates, latitude: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Longitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={coordinates.longitude}
            onChange={(e) => onChange('coordinates', { ...coordinates, longitude: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
      </div>

      {showMap && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="aspect-video bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-400">Mapa interactivo aquí</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatesSection;