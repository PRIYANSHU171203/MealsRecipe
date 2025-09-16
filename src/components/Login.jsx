import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Logo, Input, Button, Loader} from '../components'
import authService from '../appwrite/auth'
import {login as authLogin} from '../store/authSlice'
import {useForm} from 'react-hook-form'
import {fetchMeals} from '../store/mealSlice'
import toast from 'react-hot-toast'


function Login() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {register, handleSubmit} = useForm()
   const [loading, setLoading] = React.useState(false)

   const login = async (data) =>{
        setLoading(true);
    try {
        const session = await authService.login(data);
        if(session){
            const userData = await authService.getCurrentUser();
            console.log(userData);

            if (!userData) {
                // clear session to avoid stale session without account
                await authService.logout().catch(() => {});
                toast.error("User not found, please signup first.");
                return;
            }

             if (!userData.emailVerification) {
                toast.error("Please verify your email first.");
                await authService.logout(); // logout so session is cleared
                return;
            }

            dispatch(authLogin(userData));
            dispatch(fetchMeals());
            toast.success("Login successful");
            setTimeout(() => navigate("/"), 2000);
        } 
            
    } catch (error) {
        console.log("login error", error)
         if (error?.code === 401) {
            toast.error("Email or password is incorrect.");
        } else {
            toast.error(error?.message || "Something went wrong. Please try again.");
        }
        
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
            <h2 className='text-center text-2xl font-bold leading-tight font-tinos'>Sign in to your account</h2>
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
                        required: "Email is required",
                        validate: {
                            matchPattern: (value) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return emailRegex.test(value) || "Invalid email format";
                            }
                        }
                     })}
                    />  
                    <div className="relative">
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type= "password"
                            {...register('password', { required: "Password is required"})}
                            />
                        <Link to= "/forgot-password" className="text-sm pl-3 text-blue-600 font-semibold underline cursor-pointer">Forgot Password</Link>
                    </div>

                    <Button
                     type = 'submit'
                     className = 'py-2 rounded-md hover:bg-red-500 transition disabled:opacity-50 delay-300 duration-300'   
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
