import React, { ReactNode } from 'react';

import css from './Layout.module.css';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <div className={css.content}>{children}</div>;
};

export default Layout;
