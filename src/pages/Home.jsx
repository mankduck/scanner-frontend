import { useState } from "react";
import Scanner from "../components/Scanner";

function Home() {
  const [data, setData] = useState("");

  const handleScan = (text) => {
    console.log("QR:", text);
    setData(text);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>QR Check-in</h1>

      <Scanner onScan={handleScan} />

      <h2>Kết quả: {data}</h2>
    </div>
  );
}

export default Home;