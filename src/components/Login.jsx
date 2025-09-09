import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Logo, Input, Button, Loader} from '../components'
import authService from '../appwrite/auth'
import {login as authLogin} from '../store/authSlice'
import {useForm} from 'react-hook-form'
import {fetchMeals} from '../store/mealSlice'
import showpass from '../assets/showpass.svg'
import hidepass from '../assets/hidepass.svg'
import toast from 'react-hot-toast'


function Login() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {register, handleSubmit} = useForm()
   const [loading, setLoading] = React.useState(false)
   const [showPassword, setShowPassword] = React.useState(false) 

   const login = async (data) =>{
        setLoading(true);
    try {
        const session = await authService.login(data);
        if(session){
            const userData = await authService.getCurrentUser();
            console.log(userData);
           if(userData) {
            dispatch(authLogin(userData));
            dispatch(fetchMeals());
            toast.success('Login successful');
            setTimeout(() => {
                        navigate("/");
                    }, 2000);
            }
        } 
            
    } catch (error) {
        console.log("login error", error)
        const message =  "Something went wrong. Please check Email & Password";
        toast.error(message);
        
    }finally{
        setLoading(false)
    }
   }
   
    return (
        <div className=' w-full '>
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className='mb-2 flex justify-center items-center'>
                <span className='inline-block w-full max-w-[100px]'>
                        <Logo  />
                    </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                  <div className='space-y-5'>
                    <Input 
                     label = "Email:"
                     placeholder = "Enter your email"
                     type = "email"
                     {...register('email',{
                        required: true,
                        validate: {
                            matchPattern: (value) =>
                                 /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                .test(value) || "Invalid Email address"
                        }
                     })}
                    />  
                    <div className="relative">
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: true })}
                            />
                        <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-600 hover:text-black"
                        >
                                {showPassword ? (
                            <div>
                                <img src={showpass} alt="showpass" className='w-6 h-6' />
                            </div>
                            ) : (
                            <div>
                                <img src={hidepass} alt="hidepass" className='w-6 h-6' />
                            </div>
                            )}
                        </span>
                    </div>
                    <Button
                     type = 'submit'
                     className = 'py-2 rounded-md hover:bg-red-500 transition disabled:opacity-50'   
                     disabled = {loading}
                    >
                       {loading ? "Signing in..." : "Sign in"}     
                    </Button>
                  </div>  
                </form>
            </div>
        </div>
    )
}

export default Login
