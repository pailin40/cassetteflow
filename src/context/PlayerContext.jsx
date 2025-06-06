import React, { createContext, useContext } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const playerProps = useAudioPlayer();

  return (
    <PlayerContext.Provider value={playerProps}>
      {children}
    </PlayerContext.Provider>
  );
};
