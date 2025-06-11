// src/components/UI/SongCard.jsx
import React from 'react';
import { Play, Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { useLibrary } from '../../context/LibraryContext';
import AddToPlaylistMenu from '../UI/AddToPlaylistMenu';

const SongCard = ({ song, showDuration = false, layout = 'grid' }) => {
  const { playSong } = usePlayer();
  const { toggleLike, isLiked } = useLibrary();

  if (layout === 'list') {
    return (
      <div
        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group relative cursor-pointer"
        onClick={() => playSong(song)} // Clicking anywhere on the row plays the song
      >
        <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{song.title}</h4>
          <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>

        {/* Action icons and duration */}
        {/* Adjusted order and visibility based on new requirements */}
        <div className="flex items-center space-x-2 flex-shrink-0 ml-auto">
          {/* Heart/Like Button - Always visible */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from firing
              toggleLike(song);
            }}
            className={`p-2 rounded-full transition-colors ${
              isLiked(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
            }`}
            title={isLiked(song.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} fill={isLiked(song.id) ? 'currentColor' : 'none'} />
          </button>

          {/* Duration - Always visible */}
          {showDuration && (
            <span className="text-gray-400 text-sm flex-shrink-0 px-2">
              {song.duration}
            </span>
          )}

          {/* More Options / Add to Playlist Button - Always visible */}
          {/* AddToPlaylistMenu handles its own button, dropdown, and outside click */}
          <AddToPlaylistMenu song={song} />
        </div>
      </div>
    );
  }

  // --- GRID LAYOUT (remains largely the same as before) ---
  return (
    <div className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer group relative">
      <div className="relative mb-3">
        <img src={song.cover} alt={song.title} className="w-full aspect-square rounded-lg" />

        {/* Play Button for grid layout */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playSong(song);
          }}
          className="absolute bottom-2 right-2 p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg"
        >
          <Play size={16} />
        </button>

        {/* Add to Playlist Menu for grid layout */}
        <div className="absolute top-2 right-2 z-20">
          <AddToPlaylistMenu song={song} />
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1 truncate">{song.title}</h3>
      <p className="text-gray-400 text-xs truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;