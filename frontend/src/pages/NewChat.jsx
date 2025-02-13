import React, { useEffect, useState } from "react";
import { 
  DocumentTextIcon, 
  SparklesIcon,
  CommandLineIcon,
  PaintBrushIcon,
  CursorArrowRaysIcon
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { handleChatCreation } from "../utils/handleChatCreation";
import useCreateChat from "../hooks/useCreateChat";
import useAnthropic from "../hooks/useAnthropic";

const SuggestedPrompt = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col gap-2 p-4 bg-tertiary/50 rounded-lg hover:bg-tertiary transition-all duration-300 border border-border group text-left"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-accent group-hover:text-hover_accent transition-colors" />
      <h3 className="font-medium text-primary_text">{title}</h3>
    </div>
    <p className="text-sm text-secondary_text line-clamp-2">{description}</p>
  </button>
);

const NewChat = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { createChat, loading, setLoading } = useCreateChat();
  const { generateResponse } = useAnthropic();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening");
  }, []);

  const handleSendMessage = async () => {
    setLoading(true);
    if (!userPrompt.trim() && !file) {
      toast.warning("Please enter a prompt or upload a file.");
      setLoading(false);
      return;
    }

    await handleChatCreation({
      prompt: userPrompt,
      file,
      createChat,
      generateResponse,
    });

    setUserPrompt("");
    setFile(null);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.type !== "text/plain") {
        toast.error("Only .txt files are supported.");
        return;
      }
      setFile(uploadedFile);
    }
  };

  const suggestedPrompts = [
    {
      icon: CommandLineIcon,
      title: "AI-Generated Website",
      description: "Generate a modern website layout with hero section, features, and contact form",
      prompt: "Generate a modern website layout with hero section, features, and contact form"
    },
    {
      icon: PaintBrushIcon,
      title: "Portfolio Site",
      description: "Create a professional portfolio website with project showcase and contact information",
      prompt: "Create a portfolio site with a contact form and project showcase sections"
    },
    {
      icon: CursorArrowRaysIcon,
      title: "Landing Page",
      description: "Build a responsive landing page with call-to-action and testimonials",
      prompt: "Build a responsive landing page with hero, features, and testimonials sections"
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-secondary to-background text-primary_text">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex flex-col items-center px-6 pt-16 pb-8 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-hover_accent bg-clip-text text-transparent">
                {greeting}, {currentUser.username}
              </h1>
              <p className="text-lg text-secondary_text">
                What kind of website would you like to create today?
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-primary_text">Suggested Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestedPrompts.map((prompt, index) => (
                  <SuggestedPrompt
                    key={index}
                    icon={prompt.icon}
                    title={prompt.title}
                    description={prompt.description}
                    onClick={() => setUserPrompt(prompt.prompt)}
                  />
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-tertiary/30 rounded-xl p-6 border border-border backdrop-blur-sm">
              <div className="mb-6">
                {/* <h2 className="text-xl font-semibold mb-2">Describe Your Website</h2> */}
                <p className="text-secondary_text">
                  Tell us about your website idea, and we'll help you bring it to life.
                </p>
              </div>

              <div className="bg-primary/30 rounded-lg p-4 backdrop-blur-sm">
                <textarea
                  placeholder="Describe your website idea in detail..."
                  className="w-full bg-transparent outline-none text-lg resize-none overflow-y-auto custom-scrollbar min-h-[120px] text-primary_text placeholder:text-secondary_text"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors text-secondary_text">
                    <DocumentTextIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {file ? file.name : "Upload .txt file"}
                    </span>
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>

                  <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-hover_accent text-white rounded-lg transition-colors disabled:bg-accent/50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-5 h-5" />
                        <span>Generate Website</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;