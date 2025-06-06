import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

const PlayerControls = ({ isPlaying, togglePlayPause, isShuffling, setIsShuffling, repeatMode, setRepeatMode }) => (
  <div className="flex justify-center items-center space-x-4 mb-4">
    <button 
      onClick={() => setIsShuffling(!isShuffling)}
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
      onClick={() => setRepeatMode(repeatMode === 'off' ? 'one' : repeatMode === 'one' ? 'all' : 'off')}
      className={`p-2 rounded-full transition-colors ${repeatMode !== 'off' ? 'text-orange-400 bg-orange-400/20' : 'text-gray-400 hover:text-white'}`}
    >
      <Repeat size={16} />
    </button>
  </div>
);

export default PlayerControls;




