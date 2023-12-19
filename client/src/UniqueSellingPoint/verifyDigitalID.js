import React from 'react';
import jsQR from 'jsqr';

const QRCodeDecoder = () => {
  const verifyDigitalID = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        // const imageUrl = "https://i.ibb.co/YfPkbGY/Screenshot.png";
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            console.log('QR Code value:', code.data);
          } else {
            console.log('No QR code found.');
          }
        };
      } catch (error) {
        console.error('Error decoding QR code:', error);
      }
    }
  };

  return (
    <div>
      <h1>QR Code Decoder</h1>
      <input type="file" accept="image/*" onChange={verifyDigitalID} />
      <p>Select an image file to decode QR code.</p>
      <p>Check the console for QR code value.</p>
    </div>
  );
};

export default QRCodeDecoder;