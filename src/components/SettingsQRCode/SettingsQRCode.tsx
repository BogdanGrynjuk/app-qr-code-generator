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
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
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
        setQrCodeUrl(fullUrl);
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
      <header>
        <h2>Generate your QR code</h2>
      </header>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css['form-field']}>
          <label htmlFor="data">Text / URL</label>
          <span className="sub-label">
            Include text or a URL you want the QR code to lead to
          </span>
          <input
            name="data"
            id="data"
            placeholder="Your text or URL"
            maxLength={900}
            onChange={handleChangeInput}
            required
          />
          <span className="sub-label">{`${counter}/900`}</span>
        </div>

        <div className={css['form-field']}>
          <label htmlFor="fgColor">Foreground Color</label>
          <input
            name="fgColor"
            id="fgColor"
            type="color"
            value={formData.fgColor}
            onChange={handleChangeInput}
          />
          <span className="sub-label">{formData.fgColor}</span>
        </div>

        <div className={css['form-field']}>
          <label htmlFor="bgColor">Background Color</label>
          <input
            name="bgColor"
            id="bgColor"
            type="color"
            value={formData.bgColor}
            onChange={handleChangeInput}
          />
          <span className="sub-label">{formData.bgColor}</span>
        </div>

        <div className={css['form-field']}>
          <label htmlFor="size">Size</label>
          <div className="slider">
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
          </div>
          <span className="sub-label">
            {`${formData.size}px * ${formData.size}px`}
          </span>
        </div>

        <div className={css['form-field']}>
          <label htmlFor="border">Border</label>
          <div className="slider">
            <input
              type="range"
              name="border"
              id="border"
              min="0"
              max="10"
              value={formData.border}
              onChange={handleChangeInput}
            />
          </div>
          <span className="sub-label">{`${formData.border} px`}</span>
        </div>

        <button
          className={css.cta}
          id="cta"
          type="submit"
          disabled={isDisabled}
        >
          Generate QR code
        </button>
      </form>
      {qrCodeUrl && (
        <div>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
    </section>
  );
};

export default SettingsQRCode;
