import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const toggleLike = (song) => {
    const isAlreadyLiked = likedSongs.some(s => s.id === song.id);

    let updated;
    if (isAlreadyLiked) {
      updated = likedSongs.filter(s => s.id !== song.id);
      toast.success(`Removed "${song.title}" from favorites`);
    } else {
      updated = [song, ...likedSongs];
      toast.success(`Added "${song.title}" to favorites`);
    }

    setLikedSongs(updated);
  };

  const isLiked = (songId) => {
    return likedSongs.some(s => s.id === songId);
  };

  const addToRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 10);
    });
  };

  const value = {
    likedSongs,
    recentlyPlayed,
    toggleLike,
    isLiked,
    addToRecentlyPlayed
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
