import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import store from './store/store.js'
import { AuthLayout, Login, SignUp, Verify, MealForm } from './components'
import Home from './pages/Home.jsx'
import MealDetails from './pages/MealDetails.jsx'
import AllMeals from './pages/AllMeals.jsx' 
import UpdatePass from './pages/UpdatePass.jsx'
import ForgotPas from './pages/ForgotPass.jsx'
import Recovery from './pages/Recovery.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element:(
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/forgot-password',
        element:<ForgotPas />
      },
      {
        path: '/recovery',
        element:
             <Recovery />
      },
      {
        path:"/verify",
        element: <Verify/>
      },
      {
        path:"/meals",
        element: (
          <AuthLayout authentication={true}>
            <AllMeals/>
          </AuthLayout>
        )
      },
      {
        path: "/update-password",
        element: (
          <AuthLayout authentication={true}>
            <UpdatePass/>
          </AuthLayout>
        )
      },
      {
        path:"/meal/:id",
        element: <MealDetails/>
      },
      {
        path:"/meal/edit/:id",
        element: (
          <AuthLayout authentication={true}>
            <MealForm/>
          </AuthLayout>
        )
      },
      {
        path:"/meal/add",
        element: (
          <AuthLayout authentication={true}>
            <MealForm/>
          </AuthLayout>
        )
      },
      
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
