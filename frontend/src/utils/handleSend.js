import getSystemPrompt, { extractJsonFromResponse } from "./systemPrompt";
import { updateHtmlContent } from "./addImage";
import { toast } from "sonner";

export const handleSend = async ({ 
  prompt, 
  chat, 
  setChat, 
  setCodeVersion, 
  updateChat, 
  generateResponse 
}) => {
  if (!prompt.trim()) return;

  try {
    // Fetch last code version
    const lastVersion = chat.promptsAndResponses.length - 1;
    let lastCodeVersion = null;

    if (lastVersion >= 0) {
      try {
        const response = await fetch(`/api/chat/${chat._id}/code/${lastVersion}`, {
          credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch code");
        lastCodeVersion = await response.json();
      } catch (error) {
        console.warn("Failed to fetch last code version:", error);
        // Continue without last code version if fetch fails
      }
    }

    // Generate system prompt with context & last code version
    const formattedPrompt = getSystemPrompt(prompt, chat.context, lastCodeVersion);

    // Optimistic update - Show loading message
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: [
        ...(prevChat?.promptsAndResponses || []),
        {
          prompt,
          response: { textOverview: "Generating response..." }
        }
      ]
    }));

    // Generate and process response
    const responseText = await generateResponse(formattedPrompt);
    if (!responseText) {
      throw new Error("Failed to generate response");
    }

    const responseData = extractJsonFromResponse(responseText);
    if (!responseData) {
      throw new Error("Invalid response format");
    }
    console.log("responseData", responseData);

    // Process HTML with images
    // const htmlWithImage = await updateHtmlContent(responseData.html);
    const htmlWithImage = responseData.html;

    // Update local state with final response
    setChat((prevChat) => ({
      ...prevChat,
      context: responseData.context || prevChat.context,
      promptsAndResponses: [
        ...(prevChat?.promptsAndResponses || []).slice(0, -1),
        {
          prompt,
          response: { textOverview: responseData.textOverview || "No overview provided." }
        }
      ]
    }));

    // Send to backend
    await updateChat(chat._id, {
      context: responseData.context || chat.context,
      prompt,
      response: {
        textOverview: responseData.textOverview || "No overview provided.",
        html: htmlWithImage || "",
        css: responseData.css || "",
        script: responseData.script || ""
      }
    }, setCodeVersion);

  } catch (error) {
    // Revert optimistic update
    setChat((prevChat) => ({
      ...prevChat,
      promptsAndResponses: (prevChat?.promptsAndResponses || []).slice(0, -1)
    }));
    
    // Show error toast
    toast.error(error.message || "Failed to process your request");
    console.error("Error handling message:", error);
  }
};