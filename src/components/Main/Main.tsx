import React from 'react';

import css from './Main.module.css';
import SettingsQRCode from 'components/SettingsQRCode';

const Main: React.FC = () => {
  return (
    <main className={css.main}>
      <SettingsQRCode />
    </main>
  );
};

export default Main;
