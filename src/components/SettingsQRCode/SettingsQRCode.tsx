import React, { useState } from 'react';

import css from './SettingsQRCode.module.css';
import { prepareParameters, getQrCode, QRCodeParams } from 'utils/qrCodeUtils';

interface Props {
  setUrlQrCode: (url: string) => void;
  isFlipped: boolean;
  setIsFlipped: () => void;
}

const SettingsQRCode: React.FC<Props> = ({
  setUrlQrCode,
  isFlipped,
  setIsFlipped,
}) => {
  const [formData, setFormData] = useState<QRCodeParams>({
    data: '',
    fgColor: '#000000',
    bgColor: '#ffffff',
    size: '100',
    border: '0',
  });

  const isDisabled = !formData.data.trim();
  const counter = formData.data.length;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const params = prepareParameters(formData);
      const url = await getQrCode(params);
      if (url) {
        setUrlQrCode(url);
      } else {
        alert('Something went wrong');
        return null;
      }
    } catch (error) {
      console.error(error);
    }
    setIsFlipped();
  };

  return (
    <section className={`${css.container} ${isFlipped && css['is-flipped']}`}>
      <header className={css.header}>
        <h2 className={css.header__title}>Generate your QR code</h2>
        <h3 className={css['header__sub-title']}>
          Adjust the settings below to make your QR code look as you want
        </h3>
      </header>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.field}>
          <label className={css.field__label} htmlFor="data">
            Text / URL:
          </label>
          <span className={css['field__sub-label']}>
            Include text or a URL you want the QR code to lead to
          </span>
          <input
            name="data"
            id="data"
            type="text"
            placeholder="Your text or URL"
            maxLength={900}
            onChange={handleChangeInput}
            required
          />
          <p className={css.field__value}>{`${counter}/900`}</p>
        </div>

        <div className={css.fieldset}>
          <span className={css.fieldset__legend}>Colors:</span>
          <div className={css.field}>
            <label className={css.field__label} htmlFor="fgColor">
              Foreground
            </label>
            <input
              name="fgColor"
              id="fgColor"
              type="color"
              value={formData.fgColor}
              onChange={handleChangeInput}
            />
            <span className={css.field__value}>{formData.fgColor}</span>
          </div>

          <div className={css.field}>
            <label className={css.field__label} htmlFor="bgColor">
              Background
            </label>
            <input
              name="bgColor"
              id="bgColor"
              type="color"
              value={formData.bgColor}
              onChange={handleChangeInput}
            />
            <span className={css.field__value}>{formData.bgColor}</span>
          </div>
        </div>

        <div className={css.field}>
          <label className={css.field__label} htmlFor="size">
            Size:
          </label>
          <input
            type="range"
            name="size"
            id="size"
            value={formData.size}
            min="100"
            max="1000"
            step="50"
            onChange={handleChangeInput}
          />
          <span className={css.field__value}>
            {`${formData.size}px * ${formData.size}px`}
          </span>
        </div>

        <div className={css.field}>
          <label className={css.field__label} htmlFor="border">
            Border:
          </label>

          <input
            type="range"
            name="border"
            id="border"
            min="0"
            max="10"
            value={formData.border}
            onChange={handleChangeInput}
          />

          <span className={css.field__value}>{`${formData.border} px`}</span>
        </div>

        <button className={css.cta} type="submit" disabled={isDisabled}>
          <span>Generate QR code</span>
        </button>
      </form>
    </section>
  );
};

export default SettingsQRCode;
