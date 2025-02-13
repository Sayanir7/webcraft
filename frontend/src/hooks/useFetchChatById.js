import { useEffect, useState } from "react";

const useFetchChatById = (chatId, setCodeVersion) => {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    setError(null);

    fetch(`/api/chat/${chatId}`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setChat(data);
        setCodeVersion(data.promptsAndResponses.length - 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [chatId]);

  return { chat, setChat, loading, error };
};

export default useFetchChatById;