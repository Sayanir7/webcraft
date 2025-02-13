import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon, FolderArrowDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import useFetchCodeByVersion from "../hooks/useFetchCodeByVersion";
import { downloadCodeFiles } from "../utils/downloadCodeFiles";
import { Link } from "react-router-dom";

const CodeDisplay = ({ chatId, codeVersion, isExpanded }) => {
  const { code, loading } = useFetchCodeByVersion(chatId, codeVersion);
  const [selectedTab, setSelectedTab] = useState("preview");
  const [selectedCodeType, setSelectedCodeType] = useState("html");

  const handleDownload = () => {
    if (code) {
      downloadCodeFiles(code);
    }
  };

  const ActionButtons = () => (
    <>
      <Link
        to={`edit/${codeVersion}`}
        state={{ code }}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700 text-gray-300 hover:bg-accent transition-colors"
        title="Edit code"
      >
        <PencilSquareIcon className="w-5 h-5" />
      </Link>
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-700 text-gray-300 hover:bg-accent transition-colors disabled:opacity-50 disabled:hover:bg-gray-700"
        onClick={handleDownload}
        disabled={loading || !code}
        title="Download code"
      >
        <FolderArrowDownIcon className="w-5 h-5" />
      </button>
    </>
  );

  return (
    <div
      className={`transition-all duration-500 bg-gradient-to-b from-secondary to-background flex min-h-0 ${
        isExpanded ? "w-full" : "w-3/5"
      }`}
    >
      {isExpanded ? (
        <div className="w-full flex min-h-0">
          <div className="w-1/2 flex flex-col min-h-0 border-r border-border">
            <div className="flex items-center space-x-2 bg-tertiary p-2 rounded-lg m-4 flex-shrink-0">
              <div className="flex space-x-2 flex-1">
                {["html", "css", "script"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                      selectedCodeType === type
                        ? "bg-accent text-primary_text"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedCodeType(type)}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <ActionButtons />
              </div>
            </div>
            <div className="flex-1 bg-tertiary m-4 mt-0 rounded-lg text-primary_text custom-scrollbar overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                </div>
              ) : (
                <pre className="p-4 whitespace-pre-wrap">
                  <code>{code?.[selectedCodeType]}</code>
                </pre>
              )}
            </div>
          </div>
          <div className="w-1/2 flex flex-col min-h-0 p-4">
            <iframe
              title="Preview"
              className="flex-1 w-full bg-white rounded-lg shadow-lg"
              srcDoc={`<html><head><style>${code?.css || ''}</style></head><body>${code?.html || ''}<script>${code?.script || ''}</script></body></html>`}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col min-h-0">
          <div className="flex items-center space-x-2 bg-tertiary p-2 rounded-lg m-4 flex-shrink-0">
            <div className="flex space-x-2 flex-1">
              <button
                className={`flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                  selectedTab === "code"
                    ? "bg-accent text-primary_text"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedTab("code")}
              >
                <CodeBracketIcon className="w-5 h-5 mr-2" />
                Code
              </button>
              <button
                className={`flex items-center px-4 py-2 text-sm rounded-lg focus:outline-none transition-colors ${
                  selectedTab === "preview"
                    ? "bg-accent text-primary_text"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => setSelectedTab("preview")}
              >
                <EyeIcon className="w-5 h-5 mr-2" />
                Preview
              </button>
            </div>
            <div className="flex space-x-2">
              <ActionButtons />
            </div>
          </div>

          <div className="flex-1 min-h-0 m-4 mt-0">
            {selectedTab === "code" ? (
              <div className="flex flex-col h-full">
                <select
                  className="w-full bg-tertiary text-primary_text p-2 rounded-lg mb-2 flex-shrink-0 border border-border focus:ring-2 focus:ring-accent"
                  value={selectedCodeType}
                  onChange={(e) => setSelectedCodeType(e.target.value)}
                >
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="script">Script</option>
                </select>
                <div className="flex-1 bg-tertiary rounded-lg text-primary_text custom-scrollbar overflow-y-auto">
                  <pre className="p-4 whitespace-pre-wrap">
                    <code>{code?.[selectedCodeType] || ''}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  title="Preview"
                  className="w-full h-full"
                  srcDoc={`<html><head><style>${code?.css || ''}</style></head><body>${code?.html || ''}<script>${code?.script || ''}</script></body></html>`}
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;