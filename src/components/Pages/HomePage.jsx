import React from 'react';
import { songs } from '../../data/songs';
import { playlists } from '../../data/playlists';
import { artists } from '../../data/artists';
import SongCard from '../UI/SongCard';
import PlaylistCard from '../UI/PlaylistCard';
import ArtistCard from '../UI/ArtistCard';

const HomePage = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Good evening</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.slice(0, 6).map(playlist => (
          <PlaylistCard key={playlist.id} playlist={playlist} layout="horizontal" />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {songs.slice(0, 6).map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Featured Artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {artists.map(artist => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;



