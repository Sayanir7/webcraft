const useUpdateChat = () => {
  const updateChat = async (chatId, updatedData, setCodeVersion) => {
    try {
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      const result = await res.json();
      setCodeVersion(result.length - 1);
      return result;
      
    } catch (error) {
      console.error("Update chat error:", error.message);
      throw error;
    }
  };

  return { updateChat };
};

export default useUpdateChat;