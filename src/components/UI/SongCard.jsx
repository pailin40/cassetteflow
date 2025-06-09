import React from 'react';
import { Play, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useLibrary } from '../../context/LibraryContext';

const SongCard = ({ song, showDuration = false, layout = 'grid' }) => {
  const { playSong } = usePlayer();
  const { toggleLike, isLiked } = useLibrary();

  if (layout === 'list') {
    return (
      <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group">
        <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg" />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{song.title}</h4>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(song);
          }}
          className={`p-2 rounded-full transition-colors ${
            isLiked(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={16} fill={isLiked(song.id) ? 'currentColor' : 'none'} />
        </button>
        {showDuration && (
          <span className="text-gray-400 text-sm">{song.duration}</span>
        )}
        <button
          onClick={() => playSong(song)}
          className="p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
        >
          <Play size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer group">
      <div className="relative mb-3">
        <img src={song.cover} alt={song.title} className="w-full aspect-square rounded-lg" />
        <button
          onClick={() => playSong(song)}
          className="absolute bottom-2 right-2 p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
        >
          <Play size={16} />
        </button>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1 truncate">{song.title}</h3>
      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;