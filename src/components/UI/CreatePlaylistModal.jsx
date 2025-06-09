import React, { useState } from 'react';
import Button from './Button';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg font-semibold mb-4">Create Playlist</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="bg-gray-700 text-white">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-orange-500 text-white hover:bg-orange-600">Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
