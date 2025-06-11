import React, { useEffect, useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

const ReactPreview = () => {
  const initialCode = {
   "/ep.js": `
  export default function Ep() {
    return (
      <div style={{ color: "blue" }}>
        <p>I am from Ep component!</p>
      </div>
    );
  }
`,

    "/App.js": `
  import React, { useEffect } from "react";
import Ep from "/ep.js";

export default function App() {
  useEffect(() => {
    const clickHandler = (e) => {
      e.stopPropagation();
      const props = {
        tag: e.target.tagName,
        id: e.target.id,
        className: e.target.className,
        text: e.target.innerText,
        style: e.target.getAttribute("style") || "",
      };
      window.parent.postMessage({ type: "COMPONENT_CLICKED", props }, "*");
    };

    // Attach click listeners to all elements
    const attachListeners = () => {
      const all = document.body.querySelectorAll("*");
      all.forEach((el) => el.addEventListener("click", clickHandler));
    };

    attachListeners();

    return () => {
      const all = document.body.querySelectorAll("*");
      all.forEach((el) => el.removeEventListener("click", clickHandler));
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Hello React 18!</h1>
      <p>This is running inside Sandpack.</p>
      <Ep />
    </div>
  );
}

`,

    "/index.js": `
      import React from "react";
      import { createRoot } from "react-dom/client";
      import App from "./App";

      const container = document.getElementById("root");
      const root = createRoot(container);
      root.render(<App />);
    `,
    "/style.css": `
      body {
        margin: 0;
        font-family: sans-serif;
        background: #f4f4f4;
      }
    `,
  };

  const [code, setCode] = useState(initialCode);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === "COMPONENT_CLICKED") {
        setSelectedComponent(e.data.props);
        setSidebarVisible(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="relative h-[90vh] w-full">
      <Sandpack
        template="react"
        files={code}
        options={{
          showLineNumbers: true,
          showTabs: true,
          showNavigator: true,
          showConsole: false,
          editorHeight: 500,
        }}
        theme="dark"
      />

      {sidebarVisible && selectedComponent && (
        <div className="fixed right-0 top-0 w-72 h-full bg-white text-black p-4 shadow-lg z-50">
          <h2 className="text-lg font-bold mb-4">Edit Component</h2>

          <label className="block mb-2">
            Text
            <input
              type="text"
              className="w-full border p-2"
              value={selectedComponent.text}
              onChange={(e) => {
                const newText = e.target.value;
                const updatedAppJs = code["/App.js"].replace(
                  selectedComponent.text,
                  newText
                );
                setCode({ ...code, "/App.js": updatedAppJs });
                setSelectedComponent({ ...selectedComponent, text: newText });
              }}
            />
          </label>

          <label className="block mb-2">
            Color
            <input
              type="color"
              className="w-full"
              onChange={(e) => {
                const newColor = e.target.value;
                const updatedAppJs = code["/App.js"].replace(
                  selectedComponent.style,
                  `${selectedComponent.style}; color: ${newColor};`
                );
                setCode({ ...code, "/App.js": updatedAppJs });
                setSelectedComponent({
                  ...selectedComponent,
                  style: `${selectedComponent.style}; color: ${newColor};`,
                });
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ReactPreview;
