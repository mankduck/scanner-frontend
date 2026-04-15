import Scanner from "../components/Scanner";
import { socket } from "../services/socket";

function ScanPage() {
  const handleScan = (qrText) => {
    const studentId = qrText.trim();
    socket.emit("scan-qr", studentId);
  };

  return (
    <div style={{ textAlign: "center", padding: "24px" }}>
      <h1>Trang quét QR</h1>
      <Scanner onScan={handleScan} />
      <p>Đưa mã QR vào khung camera để quét</p>
    </div>
  );
}

export default ScanPage;