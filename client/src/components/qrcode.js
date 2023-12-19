import React, { useState } from 'react';
import QRCode from 'qrcode';

function QRCodeGenerator() {
  const [qrContent, setQrContent] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const generateQrCode = async (content) => {
    try {
      const generatedQRCode = await QRCode.toDataURL(content);
      setQrCode(generatedQRCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (qrCode === null) {
      generateQrCode(qrContent);
    } else {
      generateQrCode(qrContent);
    }
  };

  return (
    <div>
      <header>
        <h1>GeeksforGeeks</h1>
        <h3>QR code generator using qrcode.js</h3>
        <h3>Enter QR code content and generate QR</h3>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={qrContent}
            onChange={(e) => setQrContent(e.target.value)}
            placeholder="Enter QR content"
            autoComplete="off"
          />
          <input type="submit" value="Generate QR Code" />
        </form>
        <br />
        <div id="qr-code">
          {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
      </main>
    </div>
  );
}

export default QRCodeGenerator;
