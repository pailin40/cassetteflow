// src/components/Layout/Header.jsx
import React from 'react';
import Logo from '../UI/Logo';
import { Search, UserCircle, X } from 'lucide-react'; // Import X icon

const Header = ({ searchTerm, setSearchTerm }) => {
  const handleClearSearch = () => {
    setSearchTerm(''); // Clears the search term
  };

  return (
    <header className="px-8 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-sm flex items-center justify-between">
      {/* Logo on the far left */}
      <div className="flex-shrink-0 mr-6">
        <Logo />
      </div>

      {/* Search Input Field - Occupies available space, remains centered within that space */}
      <div className="relative flex-grow max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for songs, artists, or playlists"
          className="w-full py-2 px-4 pl-10 pr-10 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Search icon positioned inside the input field */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

        {/* Clear Search Button (X icon) - Conditionally rendered */}
        {searchTerm && ( // Only show if searchTerm is not empty
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            aria-label="Clear search"
          >
            <X size={18} /> {/* Lucide X icon */}
          </button>
        )}
      </div>

      {/* Right-aligned elements (e.g., user profile, settings, login/signup) */}
      <div className="flex-shrink-0 ml-6">
        <button className="text-gray-400 hover:text-white flex items-center gap-2">
          <UserCircle size={32} />
        </button>
      </div>
    </header>
  );
};

export default Header;