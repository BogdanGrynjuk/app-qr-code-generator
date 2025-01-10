import React, { useState } from 'react';

import css from './Main.module.css';
import SettingsQRCode from 'components/SettingsQRCode';
import DisplayQRCode from 'components/DisplayQRCode';

const Main: React.FC = () => {
  const [urlQrCode, setUrlQrCode] = useState<string>('');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toggleIsFlipped = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <main className={css.main}>
      <SettingsQRCode
        setUrlQrCode={setUrlQrCode}
        isFlipped={isFlipped}
        setIsFlipped={toggleIsFlipped}
      />

      <DisplayQRCode
        urlQrCode={urlQrCode}
        isFlipped={isFlipped}
        setIsFlipped={toggleIsFlipped}
      />
    </main>
  );
};

export default Main;
