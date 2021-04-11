import React from 'react';
import Title from './Title';
import SearchInput from './SearchInput';

const Header: React.FC = () => {
  return (
    <header>
      <Title />
      <SearchInput />
    </header>
  );
};

export default Header;
