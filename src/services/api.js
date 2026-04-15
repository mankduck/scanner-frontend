const API_URL = "http://localhost:5000";

export async function createStudent(studentData) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  const rawText = await response.text();
  console.log("RAW RESPONSE:", rawText);
  console.log("STATUS:", response.status);
  console.log("URL:", response.url);

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    throw new Error(
      `Response không phải JSON. Status: ${response.status}. URL: ${response.url}`
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Tạo học sinh thất bại");
  }

  return data;
}