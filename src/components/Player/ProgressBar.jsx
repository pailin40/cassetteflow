import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full mb-2 relative overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;


