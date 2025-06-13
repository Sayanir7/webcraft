import { useEffect, useState } from "react";
import API_URL from "../endpoint";

const useFetchChatTitles = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/chat`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setChats(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message)})
      .finally(() => setLoading(false));
  }, []);

  return { chats, setChats, loading, error };
};

export default useFetchChatTitles;