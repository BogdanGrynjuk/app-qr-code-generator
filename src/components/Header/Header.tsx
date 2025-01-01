import React from 'react';

import css from './Header.module.css';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className={css.header}>
      <h1 className={css.title}>{title}</h1>
    </header>
  );
};

export default Header;
