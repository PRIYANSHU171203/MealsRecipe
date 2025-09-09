import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import toast from "react-hot-toast";

function Verify() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (userId && secret) {
      authService.confirmVerification(userId, secret)
        .then(() => {
          toast.success("✅ Email verified successfully! You can now log in.");
          navigate("/login");
        })
        .catch(() => {
          toast.error("❌ Verification failed. The link may have expired.");
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("Invalid verification link.");
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? <p>Verifying your email...</p> : <p>Check your login page.</p>}
    </div>
  );
}

export default Verify;
