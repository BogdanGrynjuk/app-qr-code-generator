import React, { useState } from 'react';

import css from './SettingsQRCode.module.css';

const SettingsQRCode: React.FC = () => {
  interface Data {
    data: string;
    fgColor: string;
    bgColor: string;
    size: string;
    border: string;
  }

  const [formData, setFormData] = useState<Data>({
    data: '',
    fgColor: '#000000',
    bgColor: '#ffffff',
    size: '100',
    border: '0',
  });

  const isDisabled = !formData.data;
  const counter = formData.data.length;

  const prepareParameters = (params: Data) => {
    const prepared = {
      data: params.data,
      size: `${params.size}x${params.size}`,
      color: params.fgColor.replace('#', ''),
      bgcolor: params.bgColor.replace('#', ''),
      qzone: params.border,
    };

    return prepared;
  };

  const getQrCode = async (parameters: Record<string, string>) => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();
    const fullUrl = `${baseUrl}?${urlParams}`;

    try {
      const response = await fetch(fullUrl);
      if (response.status === 200) {
        console.log(fullUrl);
      } else {
        console.error('Не вдалося згенерувати QR-код');
      }
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getQrCode(prepareParameters(formData));
  };

  return (
    <section className={css.container}>
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
