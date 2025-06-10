import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { usePlayer } from '../../context/PlayerContext';
import { Play, Heart, Trash2, MoreHorizontal } from 'lucide-react';

const PlaylistDetailPage = ({ playlistId }) => {
  const { playlists, removeFromPlaylist, deletePlaylist, toggleLike, isLiked } = useLibrary();
  const { playSong } = usePlayer();

  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <div className="text-white p-8">Playlist not found.</div>;
  }

  const handleRemoveSong = (songId, e) => {
    e.stopPropagation();
    removeFromPlaylist(playlistId, songId);
  };

  const handleDeletePlaylist = () => {
    if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      deletePlaylist(playlistId);
      // You might want to navigate back to library here
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wide">Playlist</p>
            <h2 className="text-5xl font-bold text-white mb-2">{playlist.name}</h2>
            <p className="text-gray-400">
              {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {/* Delete Playlist Button */}
        <button
          onClick={handleDeletePlaylist}
          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
          title="Delete Playlist"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Controls */}
      {playlist.songs.length > 0 && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => playSong(playlist.songs[0])}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            <Play size={20} />
            <span>Play</span>
          </button>
        </div>
      )}

      {/* Songs */}
      {playlist.songs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-white mb-2">Your playlist is empty</h3>
          <p className="text-gray-400">Add some songs to get started!</p>
        </div>
      ) : (
        <div className="space-y-1">
          {/* Headers */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm font-medium border-b border-gray-800">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-3">Actions</div>
          </div>

          {/* Song List */}
          {playlist.songs.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              onClick={() => playSong(song)}
              className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
            >
              {/* Track Number */}
              <div className="col-span-1 text-gray-400 text-sm">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block text-white" />
              </div>

              {/* Song Info */}
              <div className="col-span-6 flex items-center space-x-3">
                <img src={song.cover} alt={song.title} className="w-10 h-10 rounded" />
                <div className="min-w-0">
                  <h4 className="text-white font-medium truncate">{song.title}</h4>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="col-span-2 text-gray-400 text-sm">
                {song.duration}
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song);
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-white'
                  }`}
                  title={isLiked(song.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={16} fill={isLiked(song.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Remove from Playlist Button */}
                <button
                  onClick={(e) => handleRemoveSong(song.id, e)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-full transition-colors"
                  title="Remove from playlist"
                >
                  <Trash2 size={16} />
                </button>

                {/* More Options */}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
                  title="More options"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetailPage;