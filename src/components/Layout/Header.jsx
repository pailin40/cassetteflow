import React from 'react';
import Logo from '../UI/Logo';

const Header = () => (
  <header className="px-8 py-4 border-b border-gray-800 bg-black/40 backdrop-blur-sm flex items-center">
    <Logo />
  </header>
);

export default Header;
