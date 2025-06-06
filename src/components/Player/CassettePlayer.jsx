// src/components/Player/CassettePlayer.jsx
import React from 'react';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import { usePlayer } from '../../context/PlayerContext';
import { Volume2 } from 'lucide-react';

const CassettePlayer = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    volume,
    togglePlayPause,
    setIsShuffling,
    isShuffling,
    repeatMode,
    setRepeatMode
  } = usePlayer();

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
      <div className="bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl p-6 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className={`w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
          <div className={`w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }}>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mb-4 relative z-10">
          <ProgressBar progress={progress} />
          <div className="text-center text-orange-100 text-sm font-mono">
            {currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'Select a song'}
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 relative z-10">
          <div className="text-center">
            <div className="text-xs font-bold text-gray-800 mb-1">MIXTAPE</div>
            <div className="text-sm text-gray-600">{currentSong?.album || 'No album selected'}</div>
          </div>
        </div>
      </div>

      <PlayerControls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        isShuffling={isShuffling}
        setIsShuffling={setIsShuffling}
        repeatMode={repeatMode}
        setRepeatMode={setRepeatMode}
      />

      <div className="flex items-center space-x-3">
        <Volume2 size={16} className="text-gray-400" />
        <div className="flex-1 bg-gray-700 rounded-full h-1">
          <div className="bg-orange-500 h-1 rounded-full transition-all" style={{ width: `${volume * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CassettePlayer;


// import React from 'react';

// const CassettePlayer = () => (
//   <div className="bg-gray-800 p-4 text-white">Cassette Player (mock)</div>
// );

// export default CassettePlayer;
