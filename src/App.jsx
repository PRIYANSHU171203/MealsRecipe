import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header, Loader } from './components'
import { Outlet } from 'react-router-dom'
import {fetchMeals, clearMeals} from './store/mealSlice'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  
  useEffect(() => {
    const init = async () => {
      await authService.getCurrentUser()
      .then((userData) => {
            if (userData) {
              dispatch(login({ userData }))
              dispatch(fetchMeals())
            } else {
              dispatch(logout())
              dispatch(clearMeals())
            }
      })
      .finally(() => setLoading(false))
      }
      init();
  }, [dispatch])


  
  

  return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between ">
    <div className='min-h-screen w-full flex flex-col '>
      <Header />
      <main className='flex-grow'>
      <Outlet />
      </main>
      <Footer />
    </div>
    </div>) : (<Loader />);
 
}

export default App
