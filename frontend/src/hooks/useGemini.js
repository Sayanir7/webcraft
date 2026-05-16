import { useState } from "react";
import { toast } from "sonner";
import API_URL from "../endpoint";
  

const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/chat/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch response from Gemini");
      }

      const textResponse = data?.message || "No response received";

      return textResponse;
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError(err.message);
      toast.error(err.message);
      setLoading(false); 
      // return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateResponse, loading, error,setLoading };
};

export default useGemini;
