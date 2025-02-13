import { useState } from "react";

const API_URL = "/api/chat/anthropic";

const useAnthropic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to fetch response from Anthropic");

      const data = await res.json();
      return data.message;
    } catch (err) {
      console.error("Anthropic API Error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, loading, error };
};

export default useAnthropic;