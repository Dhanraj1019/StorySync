import { useEffect, useState } from "react";
import manipulateDB from "../apprite/config";
import { BlogCard } from "../components";
import Container from "../components/container/Container";

export default function AllBlogs() {
    const [allblogs, setallblogs] = useState([]);
    
    useEffect(() => {
        try {
            manipulateDB.getAllBlogs()
                .then((data) => {
                    if (data) {
                        setallblogs(data.rows);
                    }
                })
        } catch (e) {
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
                        <p className="text-slate-550 dark:text-slate-400 text-sm mt-1 transition-colors duration-200">
                            Browse through our full library of articles, logs, and guides.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    {allblogs && allblogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {allblogs.map((blog) => (
                                <div key={blog.$id} className="h-full">
                                    <BlogCard {...blog} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-2xl transition-all duration-200">
                            <p className="text-slate-500 font-medium">No articles are currently available.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}