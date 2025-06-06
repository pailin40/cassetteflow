import React from 'react';
import { Play } from 'lucide-react';

const PlaylistCard = ({ playlist, layout = 'grid' }) => {
  if (layout === 'horizontal') {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer flex items-center space-x-4">
        <img src={playlist.cover} alt={playlist.name} className="w-16 h-16 rounded-lg" />
        <div>
          <h3 className="text-white font-semibold">{playlist.name}</h3>
          <p className="text-gray-400 text-sm">{playlist.songs} songs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer group">
      <div className="relative mb-3">
        <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square rounded-lg" />
        <button className="absolute bottom-2 right-2 p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
          <Play size={16} />
        </button>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1 truncate">{playlist.name}</h3>
      <p className="text-gray-400 text-xs truncate">{playlist.songs} songs</p>
    </div>
  );
};

export default PlaylistCard;