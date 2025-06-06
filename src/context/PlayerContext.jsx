import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off, one, all

  useEffect(() => {
    if (isPlaying && currentSong) {
      const interval = setInterval(() => {
        setProgress(prev => (prev + 1) % 100);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => 
      prev === 'off' ? 'one' : 
      prev === 'one' ? 'all' : 'off'
    );
  };

  const setVolumeLevel = (level) => {
    setVolume(Math.max(0, Math.min(1, level)));
  };

  const value = {
    currentSong,
    isPlaying,
    progress,
    volume,
    isShuffling,
    repeatMode,
    playSong,
    togglePlayPause,
    toggleShuffle,
    toggleRepeat,
    setVolumeLevel,
    setProgress
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};