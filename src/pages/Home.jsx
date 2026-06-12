import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import manipulateDB from "../apprite/config";
import Container from "../components/container/Container";
import { BlogCard, Button } from "../components";

export default function Home() {
    const [blogs, setblogs] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        manipulateDB.getAllBlogs()
            .then((blogs) => {
                if (blogs) {
                    setblogs(blogs.documents);
                }
            })
    }, []);

    // Extract user initials for avatar
    const getInitials = (name) => {
        if (!name) return "?";
        return name.trim().charAt(0).toUpperCase();
    };

    // Smooth scroll to the blogs section
    const scrollToBlogs = () => {
        const element = document.getElementById("blogs-feed");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="py-12 min-h-[70vh] flex flex-col justify-center space-y-12">
            <Container>
                {/* Greeting Section for Authenticated Users */}
                {authStatus && userData ? (
                    <div className="max-w-xl mx-auto text-center bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-100/40 dark:shadow-slate-950/20 space-y-6 transition-all duration-200">
                        {/* Circle Initials Avatar */}
                        <div className="w-24 h-24 rounded-full bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20 border-4 border-white dark:border-slate-950">
                            <span className="text-white text-4xl font-extrabold tracking-tight">
                                {getInitials(userData.name)}
                            </span>
                        </div>
                        
                        {/* Name and Greeting message */}
                        <div className="space-y-2">
                            <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Welcome Back</p>
                            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                Hello, {userData.name}!
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                                We are thrilled to have you here. Ready to write your next big hit or discover tech logs from creators worldwide?
                            </p>
                        </div>

                        {/* See All Blogs Button / Write Blog Link */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-900/60">
                            <Link to="/all-blog">
                                <Button 
                                    className="px-6 py-2.5 font-semibold w-full sm:w-auto"
                                >
                                    See All Blogs
                                </Button>
                            </Link>
                            <Link to="/add-blog" className="w-full sm:w-auto">
                                <Button 
                                    bgColor="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-850"
                                    className="px-6 py-2.5 font-semibold w-full"
                                >
                                    Write an Article
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Hero Banner for Guests */
                    <div className="text-center max-w-2xl mx-auto space-y-5">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-violet-400 bg-clip-text text-transparent transition-all duration-200">
                            Welcome to StorySync
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed transition-colors duration-200">
                            The collaborative blog platform built for creators to synchronize, write, and share deep-dives with the community.
                        </p>
                        <div className="pt-2 flex justify-center gap-3">
                            <Link to="/login">
                                <Button className="px-6 py-3 font-semibold">Join the Feed</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Container>            
        </div>
    )
}