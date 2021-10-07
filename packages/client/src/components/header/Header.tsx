import React from 'react';

import NavPanel from '../nav/Nav';

import HeaderTop from './HeaderTop';

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />
      <NavPanel />
    </header>
  );
};

export default Header;
