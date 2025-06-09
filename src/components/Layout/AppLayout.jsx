import React, { useState } from 'react';
import Header from './Header';
import Sidebar from '../Navigation/Sidebar';
import CassettePlayer from '../Player/CassettePlayer';
import HomePage from '../Pages/HomePage';
import SearchPage from '../Pages/SearchPage';
import LibraryPage from '../Pages/LibraryPage';
import FavoritesPage from '../Pages/FavoritesPage';
import PlaylistDetailPage from '../Pages/PlaylistDetailPage'; 

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null); 

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
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
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        onSelectPlaylist={(id) => {
          setSelectedPlaylistId(id);            
          setCurrentPage('playlist');
        }}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-y-auto">{renderPage()}</main>
        <div className="p-6 bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
          <CassettePlayer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
