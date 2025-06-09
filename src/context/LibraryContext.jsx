import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  const toggleLike = (song) => {
    const isCurrentlyLiked = likedSongs.some(liked => liked.id === song.id);
    
    if (isCurrentlyLiked) {
      // Remove from favorites
      setLikedSongs(prev => prev.filter(liked => liked.id !== song.id));
      toast.success(`Removed "${song.title}" from favorites`, {
        duration: 2000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    } else {
      // Add to favorites
      setLikedSongs(prev => [...prev, song]);
      toast.success(`Added "${song.title}" to favorites`, {
        duration: 2000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    }
  };

  const isLiked = (songId) => {
    return likedSongs.some(song => song.id === songId);
  };

  const value = {
    likedSongs,
    toggleLike,
    isLiked
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