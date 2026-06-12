import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import manipulateDB from "../apprite/config";
import Container from "../components/container/Container";
import { BlogCard, Button } from "../components";

export default function Home() {
    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        manipulateDB.getAllBlogs()
            .then((blogs) => {
                if (blogs) {
                    setblogs(blogs.documents);
                }
            })
    }, []);

    return (
        <div className="py-12 min-h-[70vh] flex flex-col justify-center">
            <Container>
                {blogs && blogs.length > 0 ? (
                    <div className="space-y-10">
                        {/* Hero Section */}
                        <div className="text-center max-w-2xl mx-auto space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-violet-400 bg-clip-text text-transparent transition-all duration-200">
                                Discover Stories & Tech Logs
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg transition-colors duration-200">
                                Read articles from developers around the globe, covering coding, system design, and product updates.
                            </p>
                        </div>
                        
                        {/* Grid list of blogs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-6">
                            {blogs.map((blog) => (
                                <div key={blog.$id} className="h-full">
                                    <BlogCard {...blog} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Elegant Empty State */
                    <div className="max-w-md mx-auto text-center space-y-6 bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-10 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/20 transition-all duration-200">
                        <div className="w-16 h-16 rounded-full bg-violet-600/5 dark:bg-violet-600/10 border border-violet-500/10 dark:border-violet-500/20 flex items-center justify-center mx-auto text-violet-600 dark:text-violet-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No articles published</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Our creative minds are still working. Be the first to share your thoughts, stories, and code insights.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link to="/add-blog">
                                <Button className="px-6 py-3 font-semibold">
                                    Write the First Article
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}