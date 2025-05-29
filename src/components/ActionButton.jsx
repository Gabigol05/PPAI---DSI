import React from 'react';

const ActionButton = ({ action, label, description, icon: Icon, isSelected, onClick }) => (
  <button
    onClick={() => onClick(action)}
    className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-lg ${
      isSelected 
        ? 'border-yellow-500 bg-yellow-500/10' 
        : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
    }`}
  >
    <div className="flex items-start space-x-3">
      <Icon className={`w-5 h-5 mt-1 ${isSelected ? 'text-yellow-500' : 'text-gray-400'}`} />
      <div>
        <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{label}</h3>
        <p className={`text-sm mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{description}</p>
      </div>
    </div>
  </button>
);

export default ActionButton;