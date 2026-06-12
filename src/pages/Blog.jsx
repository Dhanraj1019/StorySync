import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../apprite/config'
import { Button } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";

export default function Blog() {
    const [blog, setblog] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getBlog(slug).then((blog) => {
                if (blog) setblog(blog);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deleteBlog = () => {
        appwriteService.deleteBlog(blog.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(blog.featuredImage);
                navigate("/all-blog");
            }
        });
    };

    const isAuthor = (blog && userData) ? blog.userid === userData.$id : false;

    if (!blog) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
                <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold tracking-wider text-slate-500 uppercase">Fetching post...</p>
            </div>
        )
    }

    return (
        <div className="py-12">
            <Container>
                <article className="max-w-3xl mx-auto space-y-8">
                    {/* Hero Image */}
                    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-900 aspect-[16/9] md:aspect-[21/9] bg-slate-100 dark:bg-slate-950 shadow-2xl transition-all duration-200">
                        <img
                            src={appwriteService.getFileView(blog.featuredImage)}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Author Actions */}
                    {isAuthor && (
                        <div className="flex items-center justify-end gap-3 border-b border-slate-200 dark:border-slate-900 pb-4 transition-colors duration-200">
                            <span className="text-xs text-slate-500 font-medium mr-auto">You are the author of this post</span>
                            <Link to={`/edit-blog/${blog.$id}`}>
                                <Button bgColor="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/30" className="px-4 py-2 text-xs font-semibold">
                                    Edit Post
                                </Button>
                            </Link>
                            <Button bgColor="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 hover:border-rose-300 dark:hover:border-rose-500/40" onClick={deleteBlog} className="px-4 py-2 text-xs font-semibold">
                                Delete Post
                            </Button>
                        </div>
                    )}

                    {/* Title & Metadata */}
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors duration-200">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-500 uppercase">
                            <span>Status: {blog.status}</span>
                            <span>•</span>
                            <span>Category: General</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="browser-css border-t border-slate-200 dark:border-slate-900 pt-8 transition-colors duration-200">
                        {parse(blog.content)}
                    </div>
                </article>
            </Container>
        </div>
    )
}