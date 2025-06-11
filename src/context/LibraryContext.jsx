// src/context/LibraryContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const LibraryContext = createContext();

// --- NEW: Toggle this boolean to enable/disable localStorage persistence ---
const ENABLE_LOCAL_STORAGE_PERSISTENCE = false; // Set to 'true' to enable persistence
// -------------------------------------------------------------------------

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    if (ENABLE_LOCAL_STORAGE_PERSISTENCE) {
      try {
        const storedLikedSongs = localStorage.getItem('likedSongs');
        return storedLikedSongs ? JSON.parse(storedLikedSongs) : [];
      } catch (error) {
        console.error("Failed to parse liked songs from localStorage:", error);
        return [];
      }
    }
    return []; // Return empty array if persistence is disabled
  });

  const [playlists, setPlaylists] = useState(() => {
    if (ENABLE_LOCAL_STORAGE_PERSISTENCE) {
      try {
        const storedPlaylists = localStorage.getItem('userPlaylists');
        return storedPlaylists ? JSON.parse(storedPlaylists) : [];
      } catch (error) {
        console.error("Failed to parse playlists from localStorage:", error);
        return [];
      }
    }
    return []; // Return empty array if persistence is disabled
  });

  // Effect to persist likedSongs to localStorage whenever it changes
  useEffect(() => {
    if (ENABLE_LOCAL_STORAGE_PERSISTENCE) { // Only run if persistence is enabled
      try {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
      } catch (error) {
        console.error("Failed to save liked songs to localStorage:", error);
      }
    }
  }, [likedSongs]);

  // Effect to persist playlists to localStorage whenever it changes
  useEffect(() => {
    if (ENABLE_LOCAL_STORAGE_PERSISTENCE) { // Only run if persistence is enabled
      try {
        localStorage.setItem('userPlaylists', JSON.stringify(playlists));
      } catch (error) {
        console.error("Failed to save playlists to localStorage:", error);
      }
    }
  }, [playlists]);

  const toastStyle = useMemo(() => ({
    duration: 2000,
    style: {
      background: '#1f2937',
      color: '#fff',
      border: '1px solid #374151'
    }
  }), []);

  const lastToastTime = useRef({});
  const TOAST_COOLDOWN_MS = 50;

  const showToastWithCooldown = useCallback((message, type, actionIdentifier) => {
    const now = Date.now();
    if (!lastToastTime.current[actionIdentifier] || (now - lastToastTime.current[actionIdentifier] > TOAST_COOLDOWN_MS)) {
      if (type === 'success') {
        toast.success(message, toastStyle);
      } else if (type === 'error') {
        toast.error(message, toastStyle);
      }
      lastToastTime.current[actionIdentifier] = now;
    }
  }, [toastStyle]);


  const toggleLike = useCallback((song) => {
    const isCurrentlyLiked = likedSongs.some(liked => liked.id === song.id);

    if (isCurrentlyLiked) {
      setLikedSongs(prev => prev.filter(liked => liked.id !== song.id));
      showToastWithCooldown(`Removed "${song.title}" from favorites`, 'success', `toggleLike-${song.id}`);
    } else {
      setLikedSongs(prev => [...prev, song]);
      showToastWithCooldown(`Added "${song.title}" to favorites`, 'success', `toggleLike-${song.id}`);
    }
  }, [likedSongs, showToastWithCooldown]);

  const isLiked = useCallback((songId) => {
    return likedSongs.some(song => song.id === songId);
  }, [likedSongs]);

  const createPlaylist = useCallback((name, initialSong = null) => {
    const nameExists = playlists.some(playlist => playlist.name.trim() === name.trim());

    if (nameExists) {
      showToastWithCooldown(`A playlist named "${name}" already exists.`, 'error', `createPlaylist-${name}`);
      return;
    }

    const newPlaylist = {
      id: uuidv4(),
      name: name.trim(),
      songs: initialSong ? [initialSong] : [],
      cover: 'https://via.placeholder.com/150'
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    showToastWithCooldown(`Playlist "${name}" created`, 'success', `createPlaylist-${name}`);
  }, [playlists, showToastWithCooldown]);

  const addToPlaylist = useCallback((playlistId, song) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          const songExists = pl.songs.some(s => s.id === song.id);
          if (!songExists) {
            showToastWithCooldown(`Added "${song.title}" to playlist`, 'success', `addToPlaylist-${playlistId}-${song.id}`);
            return { ...pl, songs: [...pl.songs, song] };
          } else {
            showToastWithCooldown(`"${song.title}" is already in this playlist`, 'error', `addToPlaylist-exists-${playlistId}-${song.id}`);
            return pl;
          }
        }
        return pl;
      })
    );
  }, [showToastWithCooldown]);

  const removeFromPlaylist = useCallback((playlistId, songId) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          const updatedSongs = pl.songs.filter(s => s.id !== songId);
          const removedSong = pl.songs.find(s => s.id === songId);
          if (removedSong) {
            showToastWithCooldown(`Removed "${removedSong.title}" from playlist`, 'success', `removeFromPlaylist-${playlistId}-${songId}`);
          }
          return { ...pl, songs: updatedSongs };
        }
        return pl;
      })
    );
  }, [showToastWithCooldown]);

  const deletePlaylist = useCallback((playlistId) => {
    setPlaylists(prev => {
      const playlistToDelete = prev.find(pl => pl.id === playlistId);
      if (playlistToDelete) {
        showToastWithCooldown(`Deleted playlist "${playlistToDelete.name}"`, 'success', `deletePlaylist-${playlistId}`);
      }
      return prev.filter(pl => pl.id !== playlistId);
    });
  }, [showToastWithCooldown]);

  const value = {
    likedSongs,
    playlists,
    toggleLike,
    isLiked,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};