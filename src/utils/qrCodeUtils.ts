export interface QRCodeParams {
  data: string;
  fgColor: string;
  bgColor: string;
  size: string;
  border: string;
  format?: string;
}

export enum QRCodeFormat {
  SVG = 'svg',
  GIF = 'gif',
  PNG = 'png',
  EPS = 'eps',
  JPEG = 'jpeg',
}

export const prepareParameters = (
  params: QRCodeParams
): Record<string, string> => {
  const prepared = {
    data: params.data,
    size: `${params.size}x${params.size}`,
    color: params.fgColor.replace('#', ''),
    bgcolor: params.bgColor.replace('#', ''),
    qzone: params.border,
    format: params.format || 'svg',
  };

  return prepared;
};

export const getQrCode = async (
  parameters: Record<string, string>
): Promise<string | null> => {
  const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
  const urlParams = new URLSearchParams(parameters).toString();
  const fullUrl = `${baseUrl}?${urlParams}`;

  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      return fullUrl;
    } else {
      console.error('Failed to generate QR code');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const downloadQRCode = async (format: string, urlQrCode: string) => {
  const downloadUrl = new URL(urlQrCode);
  downloadUrl.searchParams.set('format', format);

  try {
    const response = await fetch(downloadUrl.toString());
    if (!response.ok) {
      throw new Error('Failed to download QR code');
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `qr-code.${format}`;
    link.click();
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading the QR code:', error);
  }
};
