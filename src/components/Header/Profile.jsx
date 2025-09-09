import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn"; // your logout button component

function Profile() {
  const [open, setOpen] = useState(false);
  const profileRef = useRef(null);

  // Get user data from redux
  const user = useSelector((state) => state.auth.userData);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)){
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="bg-amber-200 p-2 mx-2 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer font-bold text-gray-700"
      >
        {user?.name? user.name.charAt(0).toUpperCase() : "U"} {/* First letter of name */}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 z-50">
          {/* User Info */}
          <div className="mb-3">
            <p className="font-bold text-lg">{user?.name || "Guest User"}</p>
            <p className="text-sm text-gray-500">{user?.email || "No Email"}</p>
          </div>

          {/* Update Password */}
          <button
            onClick={() => alert("Redirect to update password page")}
            className="w-full px-4 py-2 text-left text-sm bg-gray-100 hover:bg-gray-200 rounded-md mb-2"
          >
            Update Password
          </button>

          {/* Logout Button */}
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}

export default Profile;
