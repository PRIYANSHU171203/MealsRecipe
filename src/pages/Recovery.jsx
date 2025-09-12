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
      <div className="flex justify-center items-center min-h-screen bg-pink-500">
        <div className="grid gap-4 p-7 bg-amber-400 w-full max-w-lg rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Reset Your Password</h2>

          <Input
            type="password"
            label="New Password:"
            placeholder="Enter new password"
            className="mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Confirm Password:"
            placeholder="Confirm new password"
            className="mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="button" onClick={handleReset}>
            Update Password
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Recovery;
