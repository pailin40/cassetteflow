import { useState, useRef, useEffect } from 'react';
import { PLAYER_STATES, REPEAT_MODES } from '../utils/constants';

export const useAudioPlayer = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.STOPPED);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [repeatMode, setRepeatMode] = useState(REPEAT_MODES.OFF);
  const [isShuffling, setIsShuffling] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song) => {
    setCurrentSong(song);
    setPlayerState(PLAYER_STATES.PLAYING);
    setProgress(0);
  };

  const togglePlayPause = () => {
    if (playerState === PLAYER_STATES.PLAYING) {
      setPlayerState(PLAYER_STATES.PAUSED);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
    }
  };

  const stop = () => {
    setPlayerState(PLAYER_STATES.STOPPED);
    setProgress(0);
  };

  const seekTo = (percentage) => {
    setProgress(percentage);
    if (audioRef.current) {
      audioRef.current.currentTime = (percentage / 100) * duration;
    }
  };

  return {
    currentSong,
    playerState,
    progress,
    duration,
    volume,
    repeatMode,
    isShuffling,
    audioRef,
    playSong,
    togglePlayPause,
    stop,
    seekTo,
    setVolume,
    setRepeatMode,
    setIsShuffling
  };
};
