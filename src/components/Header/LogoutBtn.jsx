import React from 'react'
import { useDispatch } from 'react-redux'
import  authService  from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
            toast.success('Logout successful');
            navigate('/login')
        })
    }
    return (
        <button className ='inline-bock px-6 py-2 duration-200  rounded-full hover:font-semibold w-full bg-gray-100 hover:bg-blue-200'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
