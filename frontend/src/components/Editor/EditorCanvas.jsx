import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import useUpdateCodeByVersion from "../../hooks/useUpdateCodeByVersion";
import "./editorStyles.css";

const EditorCanvas = ({ code }) => {
  const editorRef = useRef(null);
  const { chatId, version } = useParams();
  const { updateCode, loading } = useUpdateCodeByVersion();
  const navigate = useNavigate();

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: "#editor",
        fromElement: false,
        height: "100vh",
        width: "auto",
        storageManager: false,
        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet", width: "768px", widthMedia: "768px" },
            { name: "Mobile", width: "320px", widthMedia: "320px" },
          ],
        },
        plugins: [gjsBlockBasic, gjsPresetWebpage],
        pluginsOpts: { gjsBlockBasic: {}, gjsPresetWebpage: {} },
      });

      if (code) {
        editor.setComponents(code.html || "");
        editor.setStyle(code.css || "");
      }

      editorRef.current = editor;
      window.editor = editor;

      // Add "Save" button to GrapesJS panel
      editor.Panels.addButton("options", {
        id: "save-button",
        className: "gjs-save-btn",
        label: `<span class="text-xs font-medium">Save</span>`,
        command: () => handleSave(),
        attributes: { title: "Save changes" },
      });

      // Add "Back to Chat" button to GrapesJS panel
      editor.Panels.addButton("options", {
        id: "back-button",
        className: "gjs-back-btn",
        label: `<span class="text-xs font-medium">Back to Chat</span>`,
        command: () => navigate(`/chat/${chatId}`),
        attributes: { title: "Go back to chat" },
      });

      return () => {
        editor.destroy();
        editorRef.current = null;
      };
    }

    if (editorRef.current && code) {
      editorRef.current.setComponents(code.html || "");
      editorRef.current.setStyle(code.css || "");
    }
  }, [code]);

  // Save function
  const handleSave = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();

    updateCode(chatId, version, html, css);
  };

  return <div id="editor" className="h-screen w-screen" />;
};

export default EditorCanvas;