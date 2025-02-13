import { useEffect, useState } from "react";

const useFetchCodeByVersion = (chatId, version) => {
  const [code, setCode] = useState({ html: "", css: "", script: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId || version === "") return;

    setLoading(true);
    setError(null);

    fetch(`/api/chat/${chatId}/code/${version}`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCode(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [chatId, version]);

  return { code, setCode, loading, error };
};

export default useFetchCodeByVersion;