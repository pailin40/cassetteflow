import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const toggleLike = (songId) => {
    const newLiked = new Set(likedSongs);
    if (newLiked.has(songId)) {
      newLiked.delete(songId);
    } else {
      newLiked.add(songId);
    }
    setLikedSongs(newLiked);
  };

  const isLiked = (songId) => {
    return likedSongs.has(songId);
  };

  const addToRecentlyPlayed = (song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 10); // Keep only last 10
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