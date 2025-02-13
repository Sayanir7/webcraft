import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useFetchChatTitles from "../hooks/useFetchChatTitles";
import useDeleteChat from "../hooks/useDeleteChat";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { chats, setChats } = useFetchChatTitles();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleDeleteChat } = useDeleteChat(setChats, navigate, location);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative group">
      <div className="absolute top-0 left-0 h-full bg-primary text-primary_text transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 z-10 w-64 overflow-y-auto">
        <div className="p-4">
          <Link to="/new" className="flex items-center bg-accent hover:bg-hover_accent p-2 rounded-md mb-4">
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>New Chat</span>
          </Link>
          <input
            type="text"
            placeholder="Search chats"
            className="w-full p-2 mb-4 rounded-md border border-border bg-tertiary text-primary_text placeholder-secondary_text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredChats.map((chat) => {
              const isSelected = location.pathname === `/chat/${chat._id}`;

              return (
                <li
                  key={chat._id}
                  className={`flex justify-between items-center p-2 rounded-md cursor-pointer group transition-all duration-200 hover:bg-tertiary
                  ${isSelected ? "bg-secondary text-accent" : "text-primary_text"}`}
                >
                  <Link to={`/chat/${chat._id}`} className="flex-1">
                    {chat.title}
                  </Link>
                  <button
                    onClick={() => handleDeleteChat(chat._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-full w-4 group-hover:w-64 z-0" />
    </div>
  );
};

export default Sidebar;