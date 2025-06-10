import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  // Memoized toast style to prevent re-creation
  const toastStyle = {
    duration: 2000,
    style: {
      background: '#1f2937',
      color: '#fff',
      border: '1px solid #374151'
    }
  };

  // Memoized functions to prevent infinite re-renders
  const toggleLike = useCallback((song) => {
    const isCurrentlyLiked = likedSongs.some(liked => liked.id === song.id);

    if (isCurrentlyLiked) {
      setLikedSongs(prev => prev.filter(liked => liked.id !== song.id));
      toast.success(`Removed "${song.title}" from favorites`, toastStyle);
    } else {
      setLikedSongs(prev => [...prev, song]);
      toast.success(`Added "${song.title}" to favorites`, toastStyle);
    }
  }, [likedSongs, toastStyle]);

  const isLiked = useCallback((songId) => {
    return likedSongs.some(song => song.id === songId);
  }, [likedSongs]);

  const createPlaylist = useCallback((name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      cover: 'https://via.placeholder.com/150'
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    toast.success(`Playlist "${name}" created`, toastStyle);
  }, [toastStyle]);

  const addToPlaylist = useCallback((playlistId, song) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          const songExists = pl.songs.some(s => s.id === song.id);
          if (!songExists) {
            toast.success(`Added "${song.title}" to playlist`, toastStyle);
            return { ...pl, songs: [...pl.songs, song] };
          } else {
            toast.error(`"${song.title}" is already in this playlist`, toastStyle);
            return pl;
          }
        }
        return pl;
      })
    );
  }, [toastStyle]);

  // NEW: Remove song from playlist function
  const removeFromPlaylist = useCallback((playlistId, songId) => {
    setPlaylists(prev =>
      prev.map(pl => {
        if (pl.id === playlistId) {
          const updatedSongs = pl.songs.filter(s => s.id !== songId);
          const removedSong = pl.songs.find(s => s.id === songId);
          if (removedSong) {
            toast.success(`Removed "${removedSong.title}" from playlist`, toastStyle);
          }
          return { ...pl, songs: updatedSongs };
        }
        return pl;
      })
    );
  }, [toastStyle]);

  // NEW: Delete entire playlist function
  const deletePlaylist = useCallback((playlistId) => {
    setPlaylists(prev => {
      const playlistToDelete = prev.find(pl => pl.id === playlistId);
      if (playlistToDelete) {
        toast.success(`Deleted playlist "${playlistToDelete.name}"`, toastStyle);
      }
      return prev.filter(pl => pl.id !== playlistId);
    });
  }, [toastStyle]);

  // Memoized context value to prevent unnecessary re-renders
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