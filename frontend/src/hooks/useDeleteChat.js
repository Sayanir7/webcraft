import { toast } from "sonner";

const useDeleteChat = (setChats, navigate, location) => {
  const handleDeleteChat = async (chatId) => {
    try {
      const res = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      // Remove the chat from the list
      setChats(prevChats => prevChats.filter(chat => chat._id !== chatId));

      // Check if the current path matches the deleted chat's path
      if (location.pathname === `/chat/${chatId}`) {
        navigate("/"); // Redirect to home page
      }

      toast.success("Chat deleted successfully!");
    } catch (error) {
      console.error("Delete chat error:", error.message);
      toast.error(`Failed to delete chat: ${error.message}`);
      throw error;
    }
  };

  return { handleDeleteChat };
};

export default useDeleteChat;