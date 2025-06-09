import React, { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import CreatePlaylistModal from './CreatePlaylistModal';

const AddToPlaylistMenu = ({ song }) => {
  const { playlists, addToPlaylist, createPlaylist } = useLibrary();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  const handleAdd = (playlistId) => {
    if (playlistId && song) {
      addToPlaylist(playlistId, song);
    }
    setOpen(false);
  };

  // 🔐 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-gray-400 hover:text-white"
      >
        <MoreHorizontal size={18} />
      </button>

      {/* Dropdown Menu */}
      {open && (
      <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <ul className="py-2">
          {playlists.map((pl) => (
              <li
              key={pl.id}
              onClick={() => handleAdd(pl.id)}
              className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
              {pl.name}
              </li>
          ))}
          <li
              onClick={() => {
              setOpen(false);
              setModalOpen(true);
              }}
              className="px-4 py-2 text-sm text-orange-400 hover:bg-gray-700 cursor-pointer font-semibold"
          >
              + Create New Playlist
          </li>
          </ul>
      </div>
      )}


      {/* Modal */}
      <CreatePlaylistModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createPlaylist}
      />
    </div>
  );
};

export default AddToPlaylistMenu;
