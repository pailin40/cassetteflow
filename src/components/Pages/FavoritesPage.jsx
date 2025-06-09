import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { usePlayer } from '../../context/PlayerContext';
import { songs } from '../../data/songs';
import { Heart, Play } from 'lucide-react';

const FavoritesPage = () => {
  const { likedSongs, toggleLike } = useLibrary();
  const { playSong } = usePlayer();

  const favoriteSongs = songs.filter(song =>
    likedSongs.some(liked => liked.id === song.id)
  );


  if (favoriteSongs.length === 0) {
    return <div className="text-white p-8">No liked songs yet ❤️</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-white">❤️ Favorite Songs</h2>
      <div className="space-y-2">
        {favoriteSongs.map(song => (
          <div
            key={song.id}
            onClick={() => playSong(song)}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
          >
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
              className="text-red-500 p-2"
            >
              <Heart size={16} fill="currentColor" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playSong(song);
              }}
              className="p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              <Play size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
