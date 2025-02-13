import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCreateChat = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createChat = async (chatData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(chatData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      const { _id } = await res.json();
      navigate(`/chat/${_id}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Create chat error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createChat, loading, setLoading };
};

export default useCreateChat;