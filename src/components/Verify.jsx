import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { fetchMeals } from "../store/mealSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";

function Verify() {
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    const checkVerification = async () => {
      setChecking(true);
      try {
        const user = await authService.getCurrentUser();
        if (user?.emailVerification) {
          clearInterval(intervalId);
          dispatch(authLogin(user));
          dispatch(fetchMeals());
          toast.success("Email verified successfully!");
          navigate("/");
        }
      } catch (error) {
        console.log("Verification check failed:", error);
      } finally {
        setChecking(false);
      }
    };

    intervalId = setInterval(checkVerification, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 text-center bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
          Waiting for verification…
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
