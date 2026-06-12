import { useNavigate, useParams } from "react-router-dom";
import manipulateDB from "../apprite/config";
import { BlogForm } from "../components";
import Container from "../components/container/Container";
import { useEffect, useState } from "react";

export default function EditBlog(){
    const {slug}=useParams();
    const navigate=useNavigate();
    const [blog,setblog]=useState();
    
    useEffect(()=>{
        if(slug){
            manipulateDB.getBlog(slug).then((blog)=>{
                if(blog){
                    setblog(blog);
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug, navigate])
    
    return blog ? (
        <div className="py-10">
            <Container>
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="border-b border-slate-200 dark:border-slate-900 pb-5 transition-colors duration-200">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
                            Edit Article
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-200">
                            Modify the title, content, or publication status of your post.
                        </p>
                    </div>
                    <BlogForm blog={blog}/>
                </div>
            </Container>
        </div>
    ) : null
}