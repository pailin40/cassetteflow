import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { usePlayer } from '../../context/PlayerContext';
import SongCard from '../UI/SongCard';

const PlaylistDetailPage = ({ playlistId }) => {
  const { playlists } = useLibrary();
  const { playSong } = usePlayer();

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <div className="text-white p-8">Playlist not found.</div>;
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{playlist.name}</h2>
          <p className="text-gray-400">{playlist.songs.length} songs</p>
        </div>
      </div>

      {/* Songs */}
      {playlist.songs.length === 0 ? (
        <div className="text-gray-400">No songs in this playlist.</div>
      ) : (
        <div className="space-y-2">
          {playlist.songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              layout="list"
              showDuration
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
