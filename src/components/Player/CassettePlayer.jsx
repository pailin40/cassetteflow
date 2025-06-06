import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';
import { usePlayer } from '../../context/PlayerContext';
import { Volume2, Minimize2 } from 'lucide-react';

const CassettePlayer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const CompactPlayer = () => (
    <div 
      className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all"
      onClick={() => setIsFullscreen(true)}
    >
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center space-x-3">
          {currentSong && (
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg"
            />
          )}
          <div>
            <div className="text-white font-medium text-sm">
              {currentSong ? currentSong.title : 'Select a song'}
            </div>
            <div className="text-gray-400 text-xs">
              {currentSong ? currentSong.artist : 'No artist'}
            </div>
          </div>
        </div>

        {/* Mini Controls */}
        <div className="flex items-center space-x-4">
          <PlayerControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            isShuffling={isShuffling}
            setIsShuffling={setIsShuffling}
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
            compact={true}
          />
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3">
        <ProgressBar progress={progress} compact={true} />
      </div>
    </div>
  );

  const FullscreenPlayer = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => setIsFullscreen(false)}
            className="text-gray-400 hover:text-white p-2"
          >
            <Minimize2 size={24} />
          </button>
        </div>

        {/* Main Cassette Player */}
        <div className="bg-gradient-to-b from-orange-400 to-orange-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Cassette body gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 to-orange-700/20 rounded-2xl"></div>
          
          {/* Top section with reels */}
          <div className="flex justify-between items-start mb-6 relative z-10">
            {/* Left reel */}
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                <div className="w-10 h-10 bg-gray-600 rounded-full relative">
                  <div className="absolute inset-2 bg-gray-500 rounded-full"></div>
                </div>
                {/* Tape lines */}
                <div className="absolute inset-0 border-2 border-gray-600 rounded-full opacity-30"></div>
                <div className="absolute inset-1 border border-gray-500 rounded-full opacity-20"></div>
              </div>
              <div className="text-xs text-orange-100 mt-2 font-mono">A</div>
            </div>

            {/* Right reel */}
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }}>
                <div className="w-10 h-10 bg-gray-600 rounded-full relative">
                  <div className="absolute inset-2 bg-gray-500 rounded-full"></div>
                </div>
                {/* Tape lines */}
                <div className="absolute inset-0 border-2 border-gray-600 rounded-full opacity-30"></div>
                <div className="absolute inset-1 border border-gray-500 rounded-full opacity-20"></div>
              </div>
              <div className="text-xs text-orange-100 mt-2 font-mono">B</div>
            </div>
          </div>

          {/* Tape section */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6 relative z-10">
            <ProgressBar progress={progress} />
            <div className="text-center text-orange-100 text-lg font-mono mt-2">
              {currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'Select a song'}
            </div>
          </div>

          {/* Label section */}
          <div className="bg-white rounded-lg p-4 relative z-10">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800 mb-1">MIXTAPE</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {currentSong?.album || 'CassetteFy Collection'}
              </div>
              <div className="text-xs text-gray-500">
                Side A • Stereo • High Quality
              </div>
            </div>
          </div>

          {/* Cassette details */}
          <div className="absolute top-4 left-4 text-xs text-orange-100 font-mono opacity-70 z-10">
            C-90
          </div>
          <div className="absolute top-4 right-4 text-xs text-orange-100 font-mono opacity-70 z-10">
            CHROME
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8">
          <PlayerControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            isShuffling={isShuffling}
            setIsShuffling={setIsShuffling}
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
          />

          {/* Volume control */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <Volume2 size={20} className="text-gray-400" />
            <div className="w-64 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all" 
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
            <span className="text-gray-400 text-sm w-8">{Math.round(volume * 100)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return isFullscreen ? <FullscreenPlayer /> : <CompactPlayer />;
};

export default CassettePlayer;