import React from 'react';
import { formatTime } from '../../utils/formatTime'; // Keep if you use it to parse/display duration

const SongListItem = ({ song }) => {
  const { title, artist, album, duration, cover } = song;

  // Assuming 'duration' is a string like "3:45" and formatTime can handle it,
  // or you're simply displaying the string as is.
  // If formatTime expects seconds, you'll need to parse "3:45" into seconds first.
  const displayDuration = duration; // Or call formatTime(parseDurationToSeconds(duration))

  const displayArtist = artist || 'Unknown Artist';
  const displayAlbum = album || 'Unknown Album';

  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
      {/* Album Cover */}
      <div className="w-12 h-12 flex-shrink-0 mr-4">
        <img
          src={cover || '/path/to/default-album-cover.png'} // Use 'cover' directly from song object
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Song Info (Title, Artist, Album) */}
      <div className="flex-grow">
        <p className="text-white text-base font-semibold truncate">{title}</p>
        <p className="text-gray-400 text-sm truncate">
          {displayArtist} {displayAlbum && `• ${displayAlbum}`}
        </p>
      </div>

      {/* Duration (right-aligned) */}
      <div className="flex items-center text-gray-400 text-sm ml-4">
        {duration && <span>{displayDuration}</span>}
      </div>
    </div>
  );
};

export default SongListItem;