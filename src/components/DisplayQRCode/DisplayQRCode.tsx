import React from 'react';

import css from './DisplayQRCode.module.css';
import { downloadQRCode, QRCodeFormat } from 'utils/qrCodeUtils';

interface Props {
  urlQrCode: string;
  isFlipped: boolean;
  setIsFlipped: () => void;
}

const DisplayQRCode: React.FC<Props> = ({
  urlQrCode,
  isFlipped,
  setIsFlipped,
}) => {
  const formats = Object.values(QRCodeFormat);

  return (
    <section className={`${css.container} ${isFlipped && css['is-flipped']}`}>
      <header className={css.header}>
        <h2 className={css.header__title}>Your QR code is ready!</h2>
        <h3 className={css['header__sub-title']}>
          Scan this image to see it in action
        </h3>
      </header>
      {urlQrCode && (
        <div className={css['image-wrapper']}>
          <img src={urlQrCode} alt="QR Code" />
        </div>
      )}
      <div className={css['download-section']}>
        <p className={css['download-title']}>Download as</p>
        <ul className={css['download-list']}>
          {formats.map(format => (
            <li key={format}>
              <button
                className={css['download-btn']}
                type="button"
                onClick={() => downloadQRCode(format, urlQrCode)}
              >
                {format.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={css.cta} onClick={setIsFlipped}>
        <span>Go back</span>
      </button>
    </section>
  );
};

export default DisplayQRCode;
