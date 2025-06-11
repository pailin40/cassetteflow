// src/components/UI/AddToPlaylistMenu.jsx
import React, { useState, useRef } from 'react'; // Removed useEffect
import { MoreHorizontal } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import useOutsideClick from '../../hooks/useOutsideClick';

const AddToPlaylistMenu = ({ song }) => {
  const { createPlaylist, addToPlaylist, playlists: userPlaylists } = useLibrary();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showNewPlaylistInput, setShowNewPlaylistInput] = useState(false);

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      setNewPlaylistName('');
      setShowNewPlaylistInput(false);
    }
  });

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(prevIsDropdownOpen => {
      if (prevIsDropdownOpen) {
        setNewPlaylistName('');
        setShowNewPlaylistInput(false);
      }
      return !prevIsDropdownOpen;
    });
  };

  const handleCreateNewPlaylist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim(), song);
      setNewPlaylistName('');
      setShowNewPlaylistInput(false);
      setIsDropdownOpen(false);
    }
  };

  const handleAddSongToExistingPlaylist = (playlistId, e) => {
    e.stopPropagation();
    addToPlaylist(playlistId, song); // Corrected function name
    setIsDropdownOpen(false);
  };

  const availablePlaylists = userPlaylists || [];

  return (
    <div className="relative z-10" ref={menuRef}>
      <button
        onClick={handleToggleDropdown}
        className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
        title="More options"
      >
        <MoreHorizontal size={16} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg overflow-hidden">
          <ul className="py-1 text-sm text-gray-200">
            {availablePlaylists.length > 0 ? (
              availablePlaylists.map((playlist) => (
                <li
                  key={playlist.id}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer truncate"
                  onClick={(e) => handleAddSongToExistingPlaylist(playlist.id, e)}
                >
                  {playlist.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No playlists yet.</li>
            )}
            <li
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-orange-400 font-medium"
              onClick={(e) => { e.stopPropagation(); setShowNewPlaylistInput(true); }}
            >
              + Create New Playlist
            </li>
          </ul>

          {showNewPlaylistInput && (
            <form onSubmit={handleCreateNewPlaylist} className="p-2 border-t border-gray-600">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New playlist name"
                className="w-full bg-gray-800 text-white text-sm rounded-md px-3 py-1 mb-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 rounded-md"
              >
                Create
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToPlaylistMenu;