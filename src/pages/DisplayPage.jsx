import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const STORAGE_KEY = "checkedInStudents";
const STORAGE_EXPIRE_MS = 60 * 60 * 1000; // 1 giờ

function DisplayPage() {
  const [students, setStudents] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return [];

      const parsed = JSON.parse(savedData);
      const { data, savedAt } = parsed;

      const now = Date.now();
      const isExpired = !savedAt || now - savedAt > STORAGE_EXPIRE_MS;

      if (isExpired) {
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Lỗi đọc localStorage:", error);
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });

  function speak(text) {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    // 🔥 chọn giọng tiếng Việt
    const vietnameseVoice =
      voices.find((v) => v.lang === "vi-VN") ||
      voices.find((v) => v.lang.includes("vi"));

    if (vietnameseVoice) {
      utterance.voice = vietnameseVoice;
    }

    utterance.lang = "vi-VN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const [highlightId, setHighlightId] = useState(null);
  const highlightTimerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: students,
          savedAt: Date.now(),
        })
      );
    } catch (error) {
      console.error("Lỗi lưu localStorage:", error);
    }
  }, [students]);

  useEffect(() => {
    const handleStudentFound = (data) => {
      if (data.success && data.student) {
        const student = data.student;
        speak(data.message);

        setStudents((prev) => {
          const exists = prev.find((s) => s.studentId === student.studentId);
          if (exists) return prev;

          // Quét trước ở bên trái, quét sau thêm sang phải
          return [...prev, student];
        });

        setHighlightId(student.studentId);

        if (highlightTimerRef.current) {
          clearTimeout(highlightTimerRef.current);
        }

        highlightTimerRef.current = setTimeout(() => {
          setHighlightId(null);
        }, 2500);

        toast.success(data.message || `Chào mừng ${student.name}`, {
          duration: 4000,
        });
      } else {
        toast.error(data.message || "Học sinh không tồn tại", {
          duration: 3500,
        });
        speak(data.message);
      }
    };

    socket.on("student-found", handleStudentFound);

    return () => {
      socket.off("student-found", handleStudentFound);

      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

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
      {/* bóng màu nền trang trí */}
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
          maxWidth: "1440px",
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
            Danh sách học sinh đã điểm danh
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#6b7280",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Học sinh quét trước sẽ nằm bên trái, học sinh quét sau sẽ thêm dần sang phải
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
            <span>🎉</span>
            <span>Tổng số đã điểm danh: {students.length}</span>
          </div>
        </motion.div>

        {students.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              maxWidth: "600px",
              margin: "90px auto 0",
              background: "rgba(255,255,255,0.88)",
              borderRadius: "32px",
              padding: "44px 30px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(15, 23, 42, 0.10)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.85)",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "52px",
              }}
            >
              📚
            </div>

            <h2
              style={{
                margin: "0 0 12px",
                color: "#1f2937",
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              Chưa có học sinh nào
            </h2>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "17px",
                lineHeight: 1.6,
              }}
            >
              Khi quét QR thành công, học sinh sẽ xuất hiện tại đây
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <AnimatePresence>
              {students.map((student, index) => {
                const isHighlight = highlightId === student.studentId;

                return (
                  <motion.div
                    key={student.studentId}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isHighlight ? 1.04 : 1,
                      boxShadow: isHighlight
                        ? "0 22px 50px rgba(79, 70, 229, 0.18)"
                        : "0 12px 30px rgba(15, 23, 42, 0.08)",
                    }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{
                      duration: 0.35,
                      delay: index < 10 ? index * 0.02 : 0,
                    }}
                    whileHover={{ y: -4 }}
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      borderRadius: "30px",
                      padding: "22px 18px 20px",
                      textAlign: "center",
                      border: isHighlight
                        ? "2px solid #6366f1"
                        : "2px solid #e0e7ff",
                      position: "relative",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {isHighlight && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "#22c55e",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 800,
                          padding: "7px 11px",
                          borderRadius: "999px",
                          boxShadow: "0 8px 16px rgba(34,197,94,0.28)",
                        }}
                      >
                        Mới
                      </motion.div>
                    )}

                    <motion.div
                      animate={isHighlight ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 0.7 }}
                      style={{
                        width: "136px",
                        height: "136px",
                        margin: "0 auto 16px",
                        borderRadius: "50%",
                        border: isHighlight
                          ? "6px solid #6366f1"
                          : "5px solid #a5b4fc",
                        overflow: "hidden",
                        background: "#f3f4f6",
                        boxShadow: "0 12px 24px rgba(99,102,241,0.10)",
                      }}
                    >
                      <img
                        src={student.avatar}
                        alt={student.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </motion.div>

                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "21px",
                        lineHeight: 1.35,
                        color: "#1f2937",
                        fontWeight: 800,
                      }}
                    >
                      {student.name}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Lớp: {student.className}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayPage;