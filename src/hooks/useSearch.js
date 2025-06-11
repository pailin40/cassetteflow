// src/hooks/useSearch.js
import { useState, useEffect } from 'react';

const useSearch = (searchTerm, allSongs, allArtists, allPlaylists) => {
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSongs([]);
      setFilteredArtists([]);
      setFilteredPlaylists([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    setFilteredSongs(
      allSongs.filter(song =>
        song.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        song.artist.toLowerCase().includes(lowerCaseSearchTerm) ||
        (song.album && song.album.toLowerCase().includes(lowerCaseSearchTerm)) // Added check for album existence
      )
    );

    setFilteredArtists(
      allArtists.filter(artist =>
        artist.name.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );

    setFilteredPlaylists(
      allPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, allSongs, allArtists, allPlaylists]);

  return { filteredSongs, filteredArtists, filteredPlaylists };
};

export default useSearch;