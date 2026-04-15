import { motion } from "framer-motion";
import Scanner from "../components/Scanner";
import { socket } from "../services/socket";

function ScanPage() {
  const handleScan = (qrText) => {
    const studentId = qrText.trim();
    socket.emit("scan-qr", studentId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #ede9fe 35%, #fce7f3 70%, #fef3c7 100%)",
        padding: "36px 24px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* nền trang trí */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-80px",
          width: "260px",
          height: "260px",
          background: "rgba(96, 165, 250, 0.18)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "-60px",
          width: "240px",
          height: "240px",
          background: "rgba(244, 114, 182, 0.16)",
          borderRadius: "50%",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "20%",
          width: "280px",
          height: "280px",
          background: "rgba(250, 204, 21, 0.14)",
          borderRadius: "50%",
          filter: "blur(24px)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "32px" }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "46px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #4f46e5, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quét mã QR điểm danh
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#6b7280",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Đưa mã QR vào khung quét để hiển thị thông tin học sinh
          </p>

          <div
            style={{
              marginTop: "18px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.8)",
              padding: "10px 18px",
              borderRadius: "999px",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
              border: "1px solid rgba(255,255,255,0.9)",
              color: "#374151",
              fontWeight: 700,
            }}
          >
            <span>📷</span>
            <span>Sẵn sàng quét mã học sinh</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "32px",
            padding: "28px 24px 30px",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.10)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.85)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
                margin: "0 auto 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
                boxShadow: "0 12px 24px rgba(99,102,241,0.14)",
              }}
            >
              🎓
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "30px",
                color: "#1f2937",
                fontWeight: 800,
              }}
            >
              Khung quét QR
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "16px",
                lineHeight: 1.6,
              }}
            >
              Hãy giữ mã QR ổn định trước camera để hệ thống nhận diện nhanh hơn
            </p>
          </div>

          <div
            style={{
              borderRadius: "28px",
              padding: "18px",
              background: "linear-gradient(135deg, #eef2ff, #fdf2f8)",
              border: "2px solid #e0e7ff",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "18px",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
              }}
            >
              <Scanner onScan={handleScan} />
            </div>
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.84)",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "14px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>✨</div>
              <div
                style={{
                  color: "#374151",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Nhận diện nhanh
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.84)",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "14px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>🪄</div>
              <div
                style={{
                  color: "#374151",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Hiển thị tự động
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.84)",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "14px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>🎉</div>
              <div
                style={{
                  color: "#374151",
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                Đồng bộ với màn hình hiển thị
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ScanPage;