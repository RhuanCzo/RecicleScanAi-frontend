const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export async function scanImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Falha ao analisar a imagem.");
  }

  return response.json();
}

export async function fetchHistory(limit = 12) {
  const response = await fetch(`${API_URL}/history?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Falha ao carregar o histórico.");
  }
  return response.json();
}
