import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import manipulateDB from "../apprite/config";
import { BlogCard, Button } from "../components";
import Container from "../components/container/Container";

export default function AllBlogs() {
    const [allblogs, setallblogs] = useState([]);
    
    useEffect(() => {
        try {
            manipulateDB.getAllBlogs()
                .then((data) => {
                    if (data) {
                        setallblogs(data.rows);
                        // console.log(data);
                    }
                })
        } catch (e) {
            console.log("error is in allblogs ");
            
        }
    }, [])

    return (
        <div className="py-12 min-h-[70vh]">
            <Container>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-slate-200 dark:border-slate-900 pb-5 transition-colors duration-200">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
                            All Articles
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-200">
                            Browse through our full library of articles, logs, and guides.
                        </p>
                    </div>

                    {/* Blog Grid or Empty State */}
                    {allblogs && allblogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {allblogs.map((blog) => (
                                <div key={blog.$id} className="h-full">
                                    <BlogCard {...blog} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State with redirect button */
                        <div className="max-w-md mx-auto text-center space-y-6 bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-10 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/20 transition-all duration-200">
                            <div className="w-16 h-16 rounded-full bg-violet-600/5 dark:bg-violet-600/10 border border-violet-500/10 dark:border-violet-500/20 flex items-center justify-center mx-auto text-violet-600 dark:text-violet-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No articles found</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    There are currently no blog posts available. Be the first to share your thoughts, guides, or tutorials!
                                </p>
                            </div>
                            <div className="pt-2">
                                <Link to="/add-blog">
                                    <Button className="px-6 py-3 font-semibold w-full sm:w-auto">
                                        Write the First Article
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}