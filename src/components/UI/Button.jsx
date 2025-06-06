import React from 'react';

const Button = ({ children, onClick, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;