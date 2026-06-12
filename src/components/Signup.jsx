import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../apprite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authSlice";
import { useState } from "react";
import { Logo, Input, Button } from './index';

export default function Signup() {
    const [error, seterror] = useState('');
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (data) => {
        seterror('');
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const result = await authService.authStatus();
                if (result) {
                    dispatch(authlogin(result))
                }
                navigate("/");
            }
        } catch (e) {
            seterror(e.message);
        }
    }

    return (
        <div className="flex items-center justify-center w-full px-4 py-8">
            <div className="w-full max-w-md bg-white dark:bg-slate-900/45 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 p-8 md:p-10 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/60 transition-all duration-200">
                <div className="flex justify-center mb-6">
                    <span className="inline-block">
                        <Logo />
                    </span>
                </div>
                
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-2">
                    Create your account
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 font-semibold transition-colors duration-150 underline decoration-violet-500/30 underline-offset-4">
                        Log In
                    </Link>
                </p>

                {error && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium px-4 py-3 rounded-lg mb-6 flex items-start gap-2.5 animate-shake">
                        <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit(signup)} className="space-y-5">
                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => 
                                    /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    
                    <Input
                        label="Password"
                        placeholder="Choose a password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                    />

                    <Button type="submit" className="w-full py-3 mt-2 font-semibold tracking-wide">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    )
}