import React, { useState } from 'react';
import { songs } from '../../data/songs';
import { useLibrary } from '../../context/LibraryContext';
import { usePlayer } from '../../context/PlayerContext';
import { Search, Heart, Play } from 'lucide-react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleLike, isLiked } = useLibrary();
  const { playSong } = usePlayer();

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Search</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {searchTerm ? (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Search Results</h3>
          <div className="space-y-2">
            {filteredSongs.map(song => (
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
                {/* Heart button (click won't bubble up) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering play
                    toggleLike(song);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart size={16} fill={isLiked(song.id) ? 'currentColor' : 'none'} />
                </button>
                <span className="text-gray-400 text-sm">{song.duration}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering play
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
      ) : (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Browse All</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B'].map(genre => (
              <div
                key={genre}
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
              >
                <h4 className="text-white font-bold text-lg">{genre}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;