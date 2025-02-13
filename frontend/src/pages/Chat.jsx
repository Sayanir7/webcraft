import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import CodeDisplay from "../components/CodeDisplay";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetchChatById from "../hooks/useFetchChatById";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Chat = () => {
  const { chatId } = useParams();
  const [codeVersion, setCodeVersion] = useState(null);
  const { chat, setChat, loading } = useFetchChatById(chatId, setCodeVersion);

  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const toggleCodeExpand = () => {
    setIsCodeExpanded(!isCodeExpanded);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header chatTitle={chat?.title} />

      <div className="flex flex-1 bg-primary text-primary_text min-h-0">
        <Sidebar />

        <div className="flex flex-col flex-1 transition-all duration-500">
          {loading ? (
            <LoadingSpinner />
          ) : chat ? (
            <ChatInterface
              chat={chat}
              isExpanded={isCodeExpanded}
              setChat={setChat}
              setCodeVersion={setCodeVersion}
            />
          ) : (
            <div className="flex justify-center items-center flex-1 text-xl font-semibold text-red-500">
              Chat not found.
            </div>
          )}
        </div>

        {!loading && chat && (
          <>
            <div
              onClick={toggleCodeExpand}
              className={`absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${
                isCodeExpanded ? "left-4" : "left-[40%]"
              }`}
            >
              {isCodeExpanded ? (
                <ChevronRightIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
              ) : (
                <ChevronLeftIcon className="w-6 h-6 text-primary_text hover:text-hover_accent" />
              )}
            </div>
            <CodeDisplay chatId={chatId} codeVersion={codeVersion} isExpanded={isCodeExpanded} />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;