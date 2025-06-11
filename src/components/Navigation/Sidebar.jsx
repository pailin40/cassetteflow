import React, { useState } from 'react';
import { Home, Library, Heart, Menu } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import CreatePlaylistModal from '../UI/CreatePlaylistModal';

const Sidebar = ({ currentPage, setCurrentPage, onSelectPlaylist }) => {
  const { playlists, createPlaylist } = useLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`bg-gradient-to-b from-gray-900 to-black p-6 border-r border-gray-800 overflow-y-auto max-h-screen transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>

      {/* Toggle Button - Placed at the top for consistent positioning */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-start'} mb-6`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation (always visible) */}
      <div className="space-y-2">
        {[{ id: 'home', icon: Home, label: 'Home' },
          { id: 'favorites', icon: Heart, label: 'Favorite' }, // Assuming this should be 'Favorite' based on icon
          { id: 'library', icon: Library, label: 'Your Library' }] // Assuming 'Your Library' for Library icon
          .map(({ id, icon: Icon, label }) => (
            <div key={id} className={collapsed && currentPage !== id ? 'flex justify-center' : ''}>
              <button
                onClick={() => setCurrentPage(id)}
                className={`flex items-center text-sm transition-colors
                  ${currentPage === id
                    ? 'bg-orange-600 text-white rounded-md'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 rounded-md'
                  }
                  ${collapsed
                    ? (currentPage === id
                      ? 'w-full justify-center py-3'
                      : 'w-12 h-12 justify-center p-0'
                      )
                    : 'w-full gap-3 px-3 py-3'
                  }`
                }
              >
                <Icon size={20} />
                {!collapsed && <span className="font-medium text-sm">{label}</span>}
              </button>
            </div>
        ))}
      </div>

      {/* Divider - Conditionally rendered */}
      {!collapsed && ( // Only show if sidebar is NOT collapsed
        <div className="my-6 border-t border-gray-700"></div>
      )}

      {/* Conditionally render Playlist List and Create Playlist button */}
      {!collapsed && ( // Only show if sidebar is NOT collapsed
        <>

          {/* Create Playlist Button */}
          <div className="mt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left text-orange-400 hover:text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors font-medium"
            >
              + Create Playlist
            </button>
          </div>

          {/* Playlist List */}
          <div className="space-y-1">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
              >
                {playlist.name}
              </button>
            ))}
          </div>


        </>
      )}

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createPlaylist}
      />
    </nav>
  );
};

export default Sidebar;