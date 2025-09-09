import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { fetchMeals } from "../store/mealSlice";
import toast from "react-hot-toast";

function VerifyComplete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userId");
      const secret = params.get("secret");

      try {
        await authService.confirmVerification(userId, secret);

        const user = await authService.getCurrentUser();
        if (user?.emailVerification) {
          dispatch(login(user));
          dispatch(fetchMeals());
          toast.success("Email verified successfully!");
          navigate("/");
        }
      } catch (err) {
        toast.error("Verification failed. Try again.");
        console.log(err);
      }
    };

    verify();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Verifying your email, please wait...</p>
    </div>
  );
}

export default VerifyComplete;
