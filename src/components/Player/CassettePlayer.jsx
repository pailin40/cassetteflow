import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const CassettePlayer = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    volume,
    isShuffling,
    repeatMode,
    togglePlayPause,
    toggleShuffle,
    toggleRepeat,
    setVolumeLevel
  } = usePlayer();

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
      {/* Cassette Body */}
      <div className="bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl p-6 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Cassette Reels */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className={`w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
          <div className={`w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '2s'}}>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Tape Window */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 relative z-10">
          <div className="h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full mb-2 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-orange-100 text-sm font-mono">
            {currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'Select a song'}
          </div>
        </div>

        {/* Cassette Label */}
        <div className="bg-white rounded-lg p-3 relative z-10">
          <div className="text-center">
            <div className="text-xs font-bold text-gray-800 mb-1">MIXTAPE</div>
            <div className="text-sm text-gray-600">{currentSong?.album || 'No album selected'}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button 
          onClick={toggleShuffle}
          className={`p-2 rounded-full transition-colors ${isShuffling ? 'text-orange-400 bg-orange-400/20' : 'text-gray-400 hover:text-white'}`}
        >
          <Shuffle size={16} />
        </button>
        <button className="p-3 text-gray-300 hover:text-white transition-colors">
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-4 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors shadow-lg"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="p-3 text-gray-300 hover:text-white transition-colors">
          <SkipForward size={20} />
        </button>
        <button 
          onClick={toggleRepeat}
          className={`p-2 rounded-full transition-colors ${repeatMode !== 'off' ? 'text-orange-400 bg-orange-400/20' : 'text-gray-400 hover:text-white'}`}
        >
          <Repeat size={16} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Volume2 size={16} className="text-gray-400" />
        <div className="flex-1 bg-gray-700 rounded-full h-1">
          <div 
            className="bg-orange-500 h-1 rounded-full transition-all"
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CassettePlayer;