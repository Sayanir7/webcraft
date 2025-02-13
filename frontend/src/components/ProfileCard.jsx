import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  EnvelopeIcon,
  CalendarIcon,
  PencilIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const ProfileCard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-72 bg-primary rounded-lg shadow-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="h-20 bg-gradient-to-r from-accent via-hover_accent to-accent relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-4 -mt-12">
        {/* Avatar */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-full h-full rounded-full border-4 border-primary overflow-hidden group relative">
            <img
              src={currentUser?.profilePicture || "/userphoto.jpg"}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/userphoto.jpg";
                e.target.onerror = null;
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PencilIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-primary_text mb-1">
            {currentUser?.username || "User"}
          </h3>
          <div className="flex items-center justify-center gap-2 text-secondary_text text-sm">
            <UserIcon className="w-4 h-4" />
            <span>WebCraft User</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-secondary_text hover:text-primary_text transition-colors p-2 rounded-md hover:bg-tertiary">
            <EnvelopeIcon className="w-4 h-4 mr-3 text-accent" />
            <span className="text-sm truncate">{currentUser?.email || "email@example.com"}</span>
          </div>
          <div className="flex items-center text-secondary_text hover:text-primary_text transition-colors p-2 rounded-md hover:bg-tertiary">
            <CalendarIcon className="w-4 h-4 mr-3 text-accent" />
            <span className="text-sm">Joined {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <Link
          to="/profile"
          className="block w-full py-2 px-4 text-sm text-center bg-accent hover:bg-hover_accent text-white rounded-md transition-colors"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;