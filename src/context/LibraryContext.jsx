import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const toggleLike = (song) => {
    const isCurrentlyLiked = likedSongs.some(liked => liked.id === song.id);

    if (isCurrentlyLiked) {
      setLikedSongs(prev => prev.filter(liked => liked.id !== song.id));
      toast.success(`Removed "${song.title}" from favorites`, toastStyle);
    } else {
      setLikedSongs(prev => [...prev, song]);
      toast.success(`Added "${song.title}" to favorites`, toastStyle);
    }
  };

  const isLiked = (songId) => {
    return likedSongs.some(song => song.id === songId);
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      cover: 'https://via.placeholder.com/150'
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    toast.success(`Playlist "${name}" created`, toastStyle);
  };

  const addToPlaylist = (playlistId, song) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId && !pl.songs.some(s => s.id === song.id)
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
    toast.success(`Added "${song.title}" to playlist`, toastStyle);
  };

  const toastStyle = {
    duration: 2000,
    style: {
      background: '#1f2937',
      color: '#fff',
      border: '1px solid #374151'
    }
  };

  const value = {
    likedSongs,
    playlists,
    toggleLike,
    isLiked,
    createPlaylist,
    addToPlaylist
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
