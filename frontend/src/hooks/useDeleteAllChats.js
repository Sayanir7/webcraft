import { toast } from "sonner";
import API_URL from "../endpoint";

const useDeleteAllChats = () => {
  const deleteAllChats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      toast.success("All chats deleted successfully!");
    } catch (error) {
      console.error("Delete all chats error:", error.message);
      toast.error(`Failed to delete all chats: ${error.message}`);
      throw error;
    }
  };

  return { deleteAllChats };
};

export default useDeleteAllChats;