import React from 'react';
import { Play } from 'lucide-react';

const ArtistCard = ({ artist }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div className="relative mb-3">
        <img src={artist.image} alt={artist.name} className="w-full aspect-square rounded-full mx-auto" />
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play size={24} className="text-white" />
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{artist.name}</h3>
      <p className="text-gray-400 text-xs">{artist.followers} followers</p>
    </div>
  );
};

export default ArtistCard;