import { useState } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";


const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      if (!res.ok) throw new Error("Failed to fetch response from Gemini");

      const data = await res.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";

      return textResponse;
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, loading, error };
};

export default useGemini;