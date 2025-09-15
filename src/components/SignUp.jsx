import React from 'react'
import authService from '../appwrite/auth'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Input, Logo} from './index'
import Loader from './Loader'       
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function SignUp() {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
   
    const {register, handleSubmit} = useForm();

    const create = async (data) => {
    try {
        const userData = await authService.createAccount(data);
        if (userData) {
             // Send verification email
            await authService.login({email: data.email, password: data.password});
            await authService.sendVerificationEmail();
            toast.success("Account created successfully. Please verify your email.");
      
            setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/verify"); // or "/"
                }, 1000);
            
        }
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
                <h2 className="text-center text-2xl font-bold leading-tight font-tinos">Sign up to create account</h2>

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
                         label="Name:"
                         placeholder="Enter your username"
                         {...register("name", {required: true})}
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
                            type= "password"
                            {...register('password', { 
                                required: true,
                                validate: {
                                    minLength: (value) =>
                                        value.length >= 8 || "Password must be at least 8 characters",
                                    },
                            })}
                            />
                        </div>               
                         
                        <Button 
                         type = "submit"
                         className="w-full hover:bg-gradient-to-r from-pink-400/50 via-purple-500/50 to-indigo-500/50 transition disabled:opacity-50 duration"
                         disabled={loading}
                        >{loading ? (<Loader />) : "Create Account"}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
