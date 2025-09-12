import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { fetchMeals } from "../store/mealSlice";
import toast from "react-hot-toast";


function Verify() {
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    const checkVerification = async () => {
      setChecking(true);
      try {
            const url = new URL(window.location.href);
        const userId = url.searchParams.get("userId");
        const secret = url.searchParams.get("secret");

        let user;
        if (userId && secret) {
          // ✅ Direct verification completion (from link)
          await authService.account.updateVerification(userId, secret);
          user = await authService.getCurrentUser();

          if (user?.emailVerification) {
            dispatch(authLogin(user));
            dispatch(fetchMeals());

            if (window.opener) {
              window.opener.postMessage("VERIFIED", window.location.origin);
            }
            toast.success("Email verified successfully 🎉");
            navigate("/");
            return;
          }
        } else {
          // ✅ Polling check if already verified
          user = await authService.getCurrentUser();
          if (user?.emailVerification) {
            clearInterval(intervalId);
            dispatch(authLogin(user));
            dispatch(fetchMeals());
            toast.success("Email verified successfully 🎉");
            navigate("/");
            return;
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Verification failed. Try again.");
      } finally {
        setChecking(false);
      }
      
    }

    const url = new URL(window.location.href);
    if (url.searchParams.get("userId") && url.searchParams.get("secret")) {
      checkVerification();
    } else {
      // 🔹 Otherwise → keep polling every 5s
      intervalId = setInterval(checkVerification, 5000);
    }

    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 text-center bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
        {checking ? "Completing verification…" : "Waiting for verification…"}
        </h2>
        <p className="text-gray-600 mt-2">
          Please check your email and click the verification link.
          This page will update automatically once you’re verified.
        </p>
        <div className="mt-4 flex flex-col items-center">
          {checking ?(
            <div className="text-gray-500">Still waiting...</div>
          ): (
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-500"></div>
          )  }
        </div>
      </div>
    </div>
  );
}

export default Verify;
