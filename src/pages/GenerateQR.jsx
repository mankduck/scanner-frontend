import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createStudent } from "../services/api";

function GenerateQRPage() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateStudentAndQR = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!studentId || !name || !className || !avatar) {
        setMessage("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      await createStudent({
        studentId,
        name,
        className,
        avatar,
      });

      setQrValue(studentId.trim());
      setMessage("Tạo học sinh và QR thành công");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById("student-qr");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${studentId || "student"}-qr.png`;
    a.click();
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Tạo học sinh + QR</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "20px",
            background: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Nhập thông tin học sinh</h2>

          <label>Mã học sinh</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="VD: HS001"
            style={inputStyle}
          />

          <label>Họ và tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Nguyễn Văn A"
            style={inputStyle}
          />

          <label>Lớp</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="VD: 5A"
            style={inputStyle}
          />

          <label>Link ảnh</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <button
              onClick={handleCreateStudentAndQR}
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu vào MongoDB + Tạo QR"}
            </button>

            {qrValue && (
              <button onClick={handleDownload} style={buttonStyleSecondary}>
                Tải QR
              </button>
            )}
          </div>

          {message && (
            <p style={{ marginTop: "16px", color: "#333" }}>{message}</p>
          )}
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "20px",
            background: "#fff",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Preview</h2>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  marginBottom: "12px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  margin: "0 auto 12px",
                  borderRadius: "16px",
                  background: "#f2f2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                Chưa có ảnh
              </div>
            )}

            <h3 style={{ margin: "8px 0" }}>{name || "Họ và tên"}</h3>
            <p style={{ margin: "4px 0", color: "#666" }}>
              Mã: {studentId || "HS001"}
            </p>
            <p style={{ margin: "4px 0", color: "#666" }}>
              Lớp: {className || "5A"}
            </p>
          </div>

          {qrValue ? (
            <div>
              <QRCodeCanvas
                id="student-qr"
                value={qrValue}
                size={220}
                includeMargin={true}
              />
              <p style={{ marginTop: "12px", color: "#555" }}>
                Nội dung QR: <b>{qrValue}</b>
              </p>
            </div>
          ) : (
            <p style={{ color: "#888" }}>Chưa tạo QR</p>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "14px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "10px",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const buttonStyleSecondary = {
  padding: "12px 18px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};

export default GenerateQRPage;