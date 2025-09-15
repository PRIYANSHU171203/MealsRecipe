import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Input, Container, Button } from "../components";
import { toast } from "react-hot-toast";

function Recovery() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    // Extract from URL after clicking email link
    const url = new URL(window.location.href);
    setUserId(url.searchParams.get("userId"));
    setSecret(url.searchParams.get("secret"));
  }, []);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await authService.completeRecovery(userId, secret, newPassword);
      toast.success("Password reset successful 🎉 Please login again.");
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Try again.");
    }
  };

  return (
    <Container>
  <div className="flex justify-center items-center min-h-screen ">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        🔒 Reset Your Password
      </h2>

      {/* New Password */}
      <div className=" mb-4">
        <Input
          type="text"
          label="New Password:"
          placeholder="Enter new password"
          className="w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="relative mb-6">
        <Input
          type="password"
          label="Confirm Password:"
          placeholder="Confirm new password"
          className="w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* Reset Button */}
      <Button
        type="button"
        onClick={handleReset}
        className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Update Password
      </Button>

      {/* Extra note */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Make sure your new password is strong and unique 🔑
      </p>
    </div>
  </div>
</Container>

  );
}

export default Recovery;
