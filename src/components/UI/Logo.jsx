import React from 'react';

const Logo = ({ collapsed = false, className = '' }) => (
  <div className={`text-xl font-semibold text-orange-400 flex items-center ${className}`}>
    <div className="w-6 h-4 bg-orange-400 rounded-sm mr-2 relative">
      <div className="absolute inset-1 bg-black rounded-sm"></div>
      <div className="absolute top-1 left-1 w-1 h-1 bg-orange-400 rounded-full"></div>
      <div className="absolute top-1 right-1 w-1 h-1 bg-orange-400 rounded-full"></div>
    </div>
    {!collapsed && 'CassetteFlow'}
  </div>
);

export default Logo;
