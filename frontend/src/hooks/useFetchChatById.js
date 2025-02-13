import { useEffect, useState } from "react";

const useFetchChatById = (chatId, dispatch, setCode) => {
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

        // Ensure promptsAndResponses exists before using it
        if (data.promptsAndResponses && data.promptsAndResponses.length > 0) {
          const lastResponse = data.promptsAndResponses[data.promptsAndResponses.length - 1];
          dispatch(setCode(lastResponse));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [chatId, dispatch, setCode]); // Added missing dependencies

  return { chat, setChat, loading, error };
};

export default useFetchChatById;
