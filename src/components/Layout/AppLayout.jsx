import React, { useState } from 'react'; // Removed useEffect as it's no longer needed for search state
import Header from './Header';
import Sidebar from '../Navigation/Sidebar';
import CassettePlayer from '../Player/CassettePlayer';
import HomePage from '../Pages/HomePage';
import LibraryPage from '../Pages/LibraryPage';
import FavoritesPage from '../Pages/FavoritesPage';
import PlaylistDetailPage from '../Pages/PlaylistDetailPage';

import { songs } from '../../data/songs';
import { playlists } from '../../data/playlists';
import { artists } from '../../data/artists';
import useSearch from '../../hooks/useSearch';

import SongListItem from '../UI/SongListItem';
import ArtistCard from '../UI/ArtistCard';
import PlaylistCard from '../UI/PlaylistCard';

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  // Removed: const [showSearchResultsSection, setShowSearchResultsSection] = useState(false);
  // Removed: useEffect hook for showSearchResultsSection

  const { filteredSongs, filteredArtists, filteredPlaylists } = useSearch(searchTerm, songs, artists, playlists);

  const hasSearchResults = filteredSongs.length > 0 || filteredArtists.length > 0 || filteredPlaylists.length > 0;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'library':
        return <LibraryPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'playlist':
        return <PlaylistDetailPage playlistId={selectedPlaylistId} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        setCurrentPage={(page) => {
          setCurrentPage(page);
          // When navigating via sidebar, always clear the search bar
          setSearchTerm(''); // Clear search term to ensure main content reflects selected page
        }}
        currentPage={currentPage}
        onSelectPlaylist={(id) => {
          setSelectedPlaylistId(id);
          setCurrentPage('playlist');
          // When navigating to a playlist detail page, clear the search bar
          setSearchTerm(''); // Clear search term
        }}
      />
      <div className="flex-1 flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Main content area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {searchTerm.trim() !== '' ? ( // CONDITION: If there's a search term, show search results
            <div className="space-y-10">
              <h2 className="text-2xl font-bold text-white mb-6">Search Results for "{searchTerm}"</h2>

              {filteredSongs.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Songs</h3>
                  <div className="flex flex-col space-y-2">
                    {filteredSongs.map((song) => (
                      <SongListItem key={song.id} song={song} />
                    ))}
                  </div>
                </div>
              )}

              {filteredArtists.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Artists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredArtists.map((artist) => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
                  </div>
                </div>
              )}

              {filteredPlaylists.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Playlists</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredPlaylists.map((playlist) => (
                      <PlaylistCard key={playlist.id} playlist={playlist} />
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Found Message */}
              {!hasSearchResults && (
                <p className="text-gray-400 text-center text-lg mt-10">No results found for "{searchTerm}". Try a different search.</p>
              )}
            </div>
          ) : (
            // CONDITION: If search term is empty, render the current page based on currentPage state
            renderPage()
          )}
        </main>

        <div className="p-6 bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
          <CassettePlayer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;