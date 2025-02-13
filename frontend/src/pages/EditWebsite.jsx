import React from "react";
import { useParams } from "react-router-dom";
import EditorCanvas from "../components/Editor/EditorCanvas";
import useFetchCodeByVersion from "../hooks/useFetchCodeByVersion";
import LoadingSpinner from "../components/LoadingSpinner";

const EditWebsite = () => {
  const { chatId, version } = useParams();
  const { code, loading } = useFetchCodeByVersion(chatId, version);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-secondary flex items-center justify-center">
        <div className="text-primary_text"><LoadingSpinner /></div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="h-screen w-screen bg-secondary flex items-center justify-center">
        <div className="text-primary_text">No Data Available</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <EditorCanvas code={code} />
    </div>
  );
};

export default EditWebsite;