import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScanPage from "./pages/ScanPage";
import DisplayPage from "./pages/DisplayPage";
import GenerateQRPage from "./pages/GenerateQR";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "18px",
            padding: "16px 22px",
            borderRadius: "14px",
            fontWeight: "500",
          },
        }}
      />

      <div style={{ padding: "16px", textAlign: "center" }}>
        <Link to="/" style={{ marginRight: "12px" }}>
          Trang quét
        </Link>
        <Link to="/display" style={{ marginRight: "12px" }}>
          Trang hiển thị
        </Link>
        <Link to="/generate-qr">Tạo QR</Link>
      </div>

      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/display" element={<DisplayPage />} />
        <Route path="/generate-qr" element={<GenerateQRPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;