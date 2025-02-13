import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSignOut from "../hooks/useSignOut";
import useUpdateUser from "../hooks/useUpdateUser";
import useDeleteUser from "../hooks/useDeleteUser";
import useDeleteAllChats from "../hooks/useDeleteAllChats";
import ConfirmModal from "../components/ConfirmModal";
import Input from "../components/Input";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteChatsModal, setShowDeleteChatsModal] = useState(false);
  const { handleSignout } = useSignOut();
  const { loading, handleChange, handleSubmit } = useUpdateUser();
  const { handleDeleteUser } = useDeleteUser();
  const { deleteAllChats } = useDeleteAllChats();
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    handleChange(e);
  };

  const handleDeleteChats = async () => {
    try {
      await deleteAllChats();
      setShowDeleteChatsModal(false);
    } catch (error) {
      console.error("Error deleting chats:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-secondary to-background">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto p-4 sm:p-6 w-full">
          <div className="bg-tertiary rounded-xl shadow-lg p-6 sm:p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="relative group w-28 h-28 sm:w-32 sm:h-32 self-center cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-accent/20 to-accent/10 animate-gradient" />
                <div className="absolute inset-1 bg-tertiary rounded-full" />
                <img
                  src={currentUser.profilePicture || "/userphoto.jpg"}
                  alt="user"
                  className="relative rounded-full w-full h-full object-cover border-2 border-border group-hover:opacity-90 transition-all duration-300"
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="Username"
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="New Password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-hover_accent text-primary_text font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary_text/30 border-t-primary_text rounded-full animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border space-y-4">
              <button
                onClick={() => setShowDeleteChatsModal(true)}
                className="w-full bg-tertiary hover:bg-primary text-secondary_text font-semibold py-2.5 px-4 border-2 border-border hover:border-red-500 hover:text-red-500 rounded-lg transition-all duration-200 active:scale-[0.98]"
              >
                Delete All Chats
              </button>

              <div className="flex items-center justify-between gap-4 px-2">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-400 font-medium px-3 py-1.5 rounded-md hover:bg-red-500/10 transition-all duration-200"
                >
                  Delete Account
                </button>
                <button
                  onClick={handleSignout}
                  className="flex items-center gap-1.5 text-secondary_text hover:text-primary_text font-medium px-3 py-1.5 rounded-md hover:bg-primary transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeleteUser(currentUser._id)}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText="Delete Account"
      />

      <ConfirmModal
        show={showDeleteChatsModal}
        onClose={() => setShowDeleteChatsModal(false)}
        onConfirm={handleDeleteChats}
        title="Delete All Chats"
        message="Are you sure you want to delete all your chats? This action cannot be undone."
        confirmText="Delete All Chats"
      />

      <Footer />
    </div>
  );
}
