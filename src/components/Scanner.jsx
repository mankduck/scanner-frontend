import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

function Scanner({ onScan }) {
  const scannedRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        if (!scannedRef.current) {
          scannedRef.current = true;
          onScan(decodedText);

          setTimeout(() => {
            scannedRef.current = false;
          }, 2000);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan]);

  return <div id="reader" style={{ maxWidth: "420px", margin: "0 auto" }} />;
}

export default Scanner;