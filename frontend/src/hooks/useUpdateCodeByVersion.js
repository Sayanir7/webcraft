import { useState } from "react";
import { toast } from "sonner";

const useUpdateCodeByVersion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCode = (chatId, version, html, css) => {
    if (!chatId || version === "") return;

    setLoading(true);
    setError(null);

    fetch(`/api/chat/${chatId}/code/${version}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        toast.success("Code saved successfully!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Failed to save code: " + err.message);
      })
      .finally(() => setLoading(false));
  };

  return { updateCode, loading, error };
};

export default useUpdateCodeByVersion;