import React from 'react';
import { Home, Search, Library } from 'lucide-react';
import { playlists } from '../../data/playlists';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' }
  ];

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black p-6 min-h-screen w-64 border-r border-gray-800">
      {/* Logo */}
      <div className="text-2xl font-bold text-orange-400 mb-8 flex items-center">
        <div className="w-8 h-6 bg-orange-400 rounded-sm mr-2 relative">
          <div className="absolute inset-1 bg-black rounded-sm"></div>
          <div className="absolute top-2 left-2 w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-orange-400 rounded-full"></div>
        </div>
        CassetteFy
      </div>
      
      {/* Main Navigation */}
      <div className="space-y-2">
        {navigationItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === id 
                ? 'bg-orange-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Playlists */}
      <div className="mt-8">
        <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
          Playlists
        </h3>
        <div className="space-y-2">
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              className="w-full text-left text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;