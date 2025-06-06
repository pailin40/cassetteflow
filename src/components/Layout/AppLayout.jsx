import React, { useState } from 'react';
import Sidebar from '../Navigation/Sidebar';
import CassettePlayer from '../Player/CassettePlayer';
import HomePage from '../Pages/HomePage';
import SearchPage from '../Pages/SearchPage';
import LibraryPage from '../Pages/LibraryPage';
import Header from './Header';

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'search': return <SearchPage />;
      case 'library': return <LibraryPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
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




