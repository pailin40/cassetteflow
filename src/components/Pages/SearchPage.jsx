// src/components/Pages/SearchPage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { playlists } from '../../data/playlists'; // Assuming you have playlist data
import { artists } from '../../data/artists';   // Assuming you have artist data
import { songs } from '../../data/songs';     // Assuming you have song data
import useSearch from '../../hooks/useSearch'; // Assuming you have a useSearch hook

// Import UI components for displaying search results
import SongCard from '../UI/SongCard';
import ArtistCard from '../UI/ArtistCard';
import PlaylistCard from '../UI/PlaylistCard';

// Mock data for browse categories (you can expand this as needed)
const browseCategories = [
  { id: 'genre-pop', name: 'Pop', color: 'bg-indigo-500', imageUrl: '/assets/images/album-covers/pop_category.jpg' },
  { id: 'genre-rock', name: 'Rock', color: 'bg-red-500', imageUrl: '/assets/images/album-covers/rock_category.jpg' },
  { id: 'genre-hiphop', name: 'Hip Hop', color: 'bg-green-500', imageUrl: '/assets/images/album-covers/hiphop_category.jpg' },
  { id: 'genre-jazz', name: 'Jazz', color: 'bg-purple-500', imageUrl: '/assets/images/album-covers/jazz_category.jpg' },
  { id: 'genre-electronic', name: 'Electronic', color: 'bg-blue-500', imageUrl: '/assets/images/album-covers/electronic_category.jpg' },
  { id: 'genre-classical', name: 'Classical', color: 'bg-yellow-500', imageUrl: '/assets/images/album-covers/classical_category.jpg' },
  { id: 'genre-mood', name: 'Mood', color: 'bg-pink-500', imageUrl: '/assets/images/album-covers/mood_category.jpg' },
  { id: 'genre-workout', name: 'Workout', color: 'bg-teal-500', imageUrl: '/assets/images/album-covers/workout_category.jpg' },
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Assuming useSearch hook handles searching across your data sources
  const { filteredSongs, filteredArtists, filteredPlaylists } = useSearch(searchTerm, songs, artists, playlists);

  // Determine if there are any search results
  const hasSearchResults = searchTerm.trim() !== '' &&
                           (filteredSongs.length > 0 || filteredArtists.length > 0 || filteredPlaylists.length > 0);

  return (
    <div className="p-8 space-y-8"> {/* Added p-8 for consistent page padding */}
      {/* Search Input Field */}
      <div className="relative w-full max-w-lg mx-auto"> {/* Centered input for aesthetic */}
        <input
          type="text"
          placeholder="Search for songs, artists, or playlists"
          className="w-full py-3 px-4 pl-12 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Conditional Rendering: Browse Categories vs. Search Results */}
      {!hasSearchResults ? (
        // Browse Categories Section (shown when no search term or no results)
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {browseCategories.map((category) => (
              <div
                key={category.id}
                className={`relative p-4 rounded-lg shadow-lg overflow-hidden h-36 flex items-end cursor-pointer transform hover:scale-105 transition-transform duration-200 ${category.color}`}
                style={{
                  backgroundImage: category.imageUrl ? `url(${category.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h3 className="text-xl font-bold text-white z-10">{category.name}</h3>
                {/* Optional: Add an overlay for better text readability on images */}
                {category.imageUrl && <div className="absolute inset-0 bg-black opacity-30"></div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Search Results Section (shown when there are search results)
        <div className="space-y-10">
          {filteredSongs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          )}

          {filteredArtists.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </div>
          )}

          {filteredPlaylists.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            </div>
          )}

          {/* No Results Found */}
          {filteredSongs.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 && (
            <p className="text-gray-400 text-center text-lg">No results found for "{searchTerm}". Try a different search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;