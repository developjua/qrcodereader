import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRCodeScanner({ onScan }) {
  useEffect(() => {
    const html5QrCode = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 350,
        height: 350,
      },
      fps: 10,
    });

    html5QrCode.render(success, error);

    function success(result) {
      html5QrCode.clear();
      onScan(result);
    }

    function error(params) {
      console.warn(error);
    }
  }, []);

  return (
    <div>
      <div
        id="reader"
        className="bg-white rounded-lg shadow-lg p-4"
      ></div>
    </div>
  );
}

export default QRCodeScanner;
