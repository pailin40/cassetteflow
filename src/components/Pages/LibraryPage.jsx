import React from 'react';
import { songs } from '../../data/songs';
import { playlists } from '../../data/playlists';
import SongCard from '../UI/SongCard';
import PlaylistCard from '../UI/PlaylistCard';

const LibraryPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Your Library</h2>
        
        {/* Recently Played Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Recently Played</h3>
          <div className="space-y-2">
            {songs.slice(0, 5).map(song => (
              <SongCard key={song.id} song={song} layout="list" showDuration={true} />
            ))}
          </div>
        </div>

        {/* Made For You Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Made For You</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;




// import React from 'react';

// const LibraryPage = () => <div className="text-white">📚 Library Page</div>;

// export default LibraryPage;
