import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../appwrite/auth"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"

function VerifyComplete() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const completeVerification = async () => {
      try {
        const url = new URL(window.location.href)
        const userId = url.searchParams.get("userId")
        const secret = url.searchParams.get("secret")

        // ✅ confirm verification
        await authService.account.updateVerification(userId, secret)

        // ✅ fetch updated user
        const user = await authService.getCurrentUser()

        if (user?.emailVerification) {
          dispatch(login({
            id: user.$id,
            email: user.email,
            name: user.name,
            labels: user.labels || []
          }))
          // 🔹 Notify opener tab (if it exists)
          if (window.opener) {
            window.opener.postMessage("VERIFIED", window.location.origin)
          }

          // 🔹 Auto login in this tab also
          toast.success("Email verified successfully 🎉")
          navigate("/")
        }
      } catch (error) {
        console.error("Verification error:", error)
        toast.error("Verification failed. Try again.")
      }
    }

    completeVerification()
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl font-semibold">Completing verification...</p>
    </div>
  )
}

export default VerifyComplete
