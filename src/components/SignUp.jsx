import React from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import Loader from './Loader'       
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {fetchMeals} from '../store/mealSlice'
import toast from 'react-hot-toast'
import showpass from '../assets/showpass.svg'
import hidepass from '../assets/hidepass.svg'


function SignUp() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false)
   
    const {register, handleSubmit} = useForm();

    
    // const create = async(data) => {
    //     try {
    //         const userData = await authService.createAccount(data)
    //         if(userData) {
    //             const userData = await authService.getCurrentUser()
    //             if(userData) {
    //             dispatch(login(userData));
    //             dispatch(fetchMeals());
    //             toast.success('Account created successfully.');
    //             setTimeout(() => {
    //                  navigate('/')
    //             },2000)
    //             }
    //         }
    //     } catch (error) {
    //         console.log("sign up error", error);
    //          if (error?.code === 409) {
    //                 toast.error("User already exists. Please log in instead.");
    //             } else {
    //                 toast.error(error?.message || "Something went wrong. Please try again.");
    //             }
           
    //     }
    // }

    const create = async (data) => {
    try {
        const userData = await authService.createAccount(data);
        if (userData) {
             const currentUser = await authService.getCurrentUser();
            if (currentUser) {
                dispatch(login(currentUser));
                dispatch(fetchMeals());
                toast.success("Account created successfully. Please verify your email.");

            // Send verification email
            await authService.sendVerificationEmail();
            setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/verify"); // or "/"
                }, 2000);
            
        
        }}
    } catch (error) {
        console.log("sign up error", error);
        if (error?.code === 409) {
            toast.error("User already exists. Please log in instead.");
        } else {
            toast.error(error?.message || "Something went wrong. Please try again.");
        }
    }
};


    return loading ? <Loader /> : (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] text-center">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                     <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input 
                         label="Username:"
                         placeholder="Enter your username"
                         {...register("username", {required: true})}
                        />
                        <Input 
                         label="Email:"
                         placeholder="Enter your email"
                         type="email"
                         {...register("email", {
                            required:true,
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                        })}
                        />
                        <div className="relative">
                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { 
                                required: true,
                                validate: {
                                    minLength: (value) =>
                                        value.length >= 8 || "Password must be at least 8 characters",
                                    },
                            })}
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
                         type = "submit"
                         className="w-full"
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
