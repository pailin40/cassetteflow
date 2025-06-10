import React from 'react';
import { songs } from '../../data/songs';
import { playlists } from '../../data/playlists';
import { artists } from '../../data/artists';
import SongCard from '../UI/SongCard';
import PlaylistCard from '../UI/PlaylistCard';
import ArtistCard from '../UI/ArtistCard';

// Let's assume you have a dedicated list for "Made for You" playlists
const madeForYouPlaylists = playlists.slice(4, 9); // Example data

const HomePage = () => (
  <div className="space-y-10">
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Good evening</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.slice(0, 4).map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} layout="horizontal" />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {songs.slice(0, 8).map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
    
    {/* --- NEW SECTION SUGGESTION (see Part 2 below) --- */}
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Made For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {madeForYouPlaylists.map(playlist => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
        </div>
    </div>

    <div>
      <h2 className="text-xl font-bold text-white mb-4">Featured Artists</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {/* MODIFIED: Showing more items to fill the wider grid */}
        {artists.slice(0, 8).map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;