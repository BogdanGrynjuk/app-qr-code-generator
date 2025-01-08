import React, { useState } from 'react';

import css from './Main.module.css';
import SettingsQRCode from 'components/SettingsQRCode';
import DisplayQRCode from 'components/DisplayQRCode';

const Main: React.FC = () => {
  const [urlQrCode, setUrlQrCode] = useState<string>('');

  return (
    <main className={css.main}>
      <SettingsQRCode setUrlQrCode={setUrlQrCode} />
      {urlQrCode && <DisplayQRCode urlQrCode={urlQrCode} />}
    </main>
  );
};

export default Main;
