import { useState } from "react";
import { toast } from "sonner";
import API_URL from "../endpoint";
  

const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const readApiResponse = async (res) => {
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return res.json();
    }

    const text = await res.text();
    throw new Error(
      text.trim().startsWith("<!DOCTYPE")
        ? "API request returned the frontend HTML. Check the deployed API URL/rewrite configuration."
        : text || "Unexpected server response"
    );
  };

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

      const data = await readApiResponse(res);

      if (!res.ok) {
        const message = typeof data.message === "string" ? data.message : "Failed to fetch response from Gemini";
        throw new Error(message);
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
