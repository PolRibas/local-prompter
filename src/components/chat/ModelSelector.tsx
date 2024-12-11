import React from 'react';

interface Model {
  id: string;
  name: string;
}

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onModelChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm text-gray-700 font-medium">Modelo:</label>
      <select 
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
      >
        {models.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
