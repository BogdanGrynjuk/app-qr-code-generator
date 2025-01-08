import React from 'react';

import css from './DisplayQRCode.module.css';
import { downloadQRCode } from 'utils/qrCodeUtils';

interface Props {
  urlQrCode: string;
}

const DisplayQRCode: React.FC<Props> = ({ urlQrCode }) => {
  const formats = ['svg', 'gif', 'png', 'eps', 'jpeg'];

  return (
    <section className={css.container}>
      <header className={css.header}>
        <h2 className={css.header__title}>Your QR code is ready!</h2>
        <h3 className={css['header__sub-title']}>
          Scan this image to see it in action
        </h3>
      </header>
      <div className={css['image-wrapper']}>
        <img src={urlQrCode} alt="QR Code" />
      </div>
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
      <button type="button" className={css.cta}>
        <span>Go back</span>
      </button>
    </section>
  );
};

export default DisplayQRCode;
