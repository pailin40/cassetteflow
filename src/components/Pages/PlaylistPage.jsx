import React from 'react';
import { Heart, Play } from 'lucide-react';

const PlaylistPage = ({ 
  songs, 
  playlists, 
  likedSongs, 
  toggleLike, 
  playSong 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Your Library</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Recently Played</h3>
          <div className="space-y-2">
            {songs.slice(0, 5).map(song => (
              <div key={song.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group">
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{song.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
                <button
                  onClick={() => toggleLike(song.id)}
                  className={`p-2 rounded-full transition-colors ${
                    likedSongs.has(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={likedSongs.has(song.id) ? 'currentColor' : 'none'} />
                </button>
                <span className="text-gray-400 text-sm">{song.duration}</span>
                <button
                  onClick={() => playSong(song)}
                  className="p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Play size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Made For You</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists.map(playlist => (
              <div key={playlist.id} className="bg-gray-800/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer group">
                <div className="relative mb-3">
                  <img src={playlist.cover} alt={playlist.name} className="w-full aspect-square rounded-lg" />
                  <button className="absolute bottom-2 right-2 p-2 bg-orange-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <Play size={16} />
                  </button>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 truncate">{playlist.name}</h3>
                <p className="text-gray-400 text-xs truncate">{playlist.songs} songs</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;