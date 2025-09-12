import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header, Loader } from './components'
import { Outlet, useNavigate } from 'react-router-dom'
import { clearMeals } from './store/mealSlice'
import { Toaster, toast } from 'react-hot-toast'
import { fetchMeals } from './store/mealSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ✅ 1. Initial user fetch
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({
          id: userData.$id,
          email: userData.email,
          name: userData.name,
          labels: userData.labels || [],
        }))
          dispatch(fetchMeals());
        } else {
          dispatch(logout())
          dispatch(clearMeals())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  // ✅ 2. Listen for verification complete (from VerifyComplete.jsx postMessage)
  useEffect(() => {
    const handler = async (event) => {
      if (event.origin !== window.location.origin) return

      if (event.data === "VERIFIED") {
        try {
          const user = await authService.getCurrentUser()
          if (user?.emailVerification) {
            dispatch(login({ userData: user }))
            toast.success("Email verified successfully 🎉")
            navigate("/")
          }
        } catch (error) {
          console.error("Error refreshing user after verification:", error)
        }
      }
    }

    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [dispatch, navigate])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="min-h-screen w-full flex flex-col ">
        <Header />
        <main className="flex-grow">
          <Outlet />
          <Toaster position="bottom-center" reverseOrder={false} />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default App
