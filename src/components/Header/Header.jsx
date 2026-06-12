import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from 'react-router-dom'
import { Logo, Button } from "../index"
import Container from "../container/Container"
import { logout as statlogout } from "../../store/authSlice";
import authService from "../../apprite/auth";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    
    // Initialize theme state from localStorage or default to dark
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    // Synchronize HTML class on mount and theme change
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const navItems = [
        {
            title: "Home",
            slug: "/",
            active: true
        },
        {
            title: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            title: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            title: "All Blogs",
            slug: "/all-blog",
            active: authStatus
        },
        {
            title: "Add Blog",
            slug: "/add-blog",
            active: authStatus
        }
    ]

    const logout = async () => {
        const result = await authService.logout();
        if (result) {
            dispatch(statlogout());
            navigate("/login");
        } else {
            navigate("/");
        }
    }

    return (
        <header style={{position:"fixed", top:0}} className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/75 border-b border-slate-200 dark:border-slate-900/60 shadow-lg shadow-slate-100/40 dark:shadow-slate-950/20 transition-colors duration-200">
            <Container>
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                            <Logo className="rounded-full" />
                        </Link>
                    </div>
                    
                    {/* Menu and Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Desktop Navigation Links */}
                        <ul className="hidden md:flex items-center gap-1.5 md:gap-3">
                            {
                                navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.title}>
                                            <button 
                                                onClick={() => navigate(item.slug)} 
                                                className="cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white px-3.5 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-all duration-200"
                                            >
                                                {item.title}
                                            </button>
                                        </li>
                                    ) : null
                                )
                            }

                            {authStatus && (
                                <li>
                                    <Button 
                                        onClick={logout} 
                                        bgColor="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                                        className="cursor-pointer px-4 py-1.5 text-xs font-semibold"
                                    >
                                        Logout
                                    </Button>
                                </li>
                            )}
                        </ul>

                        {/* Theme Toggle Button */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-lg cursor-pointer transition-all duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>

                        {/* Mobile Hamburger Menu Button */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 rounded-lg focus:outline-none cursor-pointer transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Dropdown Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-200 dark:border-slate-900 bg-white/95 dark:bg-slate-950/95 py-3 px-4 shadow-xl space-y-1 transition-colors duration-200">
                    <ul className="flex flex-col gap-1">
                        {
                            navItems.map((item) =>
                                item.active ? (
                                    <li key={item.title}>
                                        <button 
                                            onClick={() => {
                                                navigate(item.slug);
                                                setIsOpen(false);
                                            }} 
                                            className="w-full text-left cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-150"
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ) : null
                            )
                        }

                        {authStatus && (
                            <li className="pt-2 border-t border-slate-200 dark:border-slate-900 mt-2">
                                <Button 
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }} 
                                    bgColor="bg-salt-300 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-400 w-full"
                                    className="cursor-pointer py-2.5 text-sm font-semibold"
                                >
                                    Logout
                                </Button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    )
}