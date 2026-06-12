import { Button, Input, Select, RTE } from '../index'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import appwriteService from '../../apprite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BlogForm({ blog }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || '',
            slug: blog?.slug || '',
            content: blog?.content || '',
            status: blog?.status || "active",
        }
    });

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null
        if (blog) {
            if (file) {
                await appwriteService.deleteFile(blog.featuredImage)
            }
            const dbBlog = await appwriteService.updateBlog(blog.$id, { ...data, featuredImage: file ? file.$id : blog.featuredImage })
            if (dbBlog) {
                navigate(`/blog/${dbBlog.$id}`)
            }
        } else {
            const dbBlog = await appwriteService.createBlog({ ...data, featuredImage: file ? file.$id : null, userId: userData.$id })
            if (dbBlog) {
                navigate(`/blog/${dbBlog.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == 'string')
            return value.trim().toLowerCase().replace(/\s/g, '-')
        else return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
            {/* Left Column (Main content: Title, Slug, RTE) */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-6 rounded-2xl space-y-5 transition-colors duration-200">
                    <Input
                        lable="Title"
                        placeholder="Enter blog title"
                        {...register("title", { required: true })}
                    />
                    
                    <Input
                        lable="Slug / URL Path"
                        placeholder="blog-post-slug"
                        {...register("slug", { required: true })}
                        onChange={(e) => {
                            setValue("slug", slugTransform(e.target.value, { shouldValidate: true }))
                        }}
                    />
                </div>

                <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-6 rounded-2xl transition-colors duration-200">
                    <RTE
                        label="Article Content" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            {/* Right Column (Side settings: Image, Status, Action) */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900/35 border border-slate-200 dark:border-slate-900 p-6 rounded-2xl space-y-6 transition-colors duration-200">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/gif"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-violet-600/10 dark:file:bg-violet-600/20 file:text-violet-700 dark:file:text-violet-300 hover:file:bg-violet-600/20 dark:hover:file:bg-violet-600/30 file:cursor-pointer"
                        {...register("featuredImage", { required: !blog })}
                    />
                    
                    {blog && (
                        <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                            <div className="text-xs text-slate-500 font-semibold px-4 py-2 border-b border-slate-200 dark:border-slate-800">Current Image</div>
                            <div className="p-3">
                                <img 
                                    src={appwriteService.getFileView(blog.featuredImage)} 
                                    alt={blog.title} 
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Publish Status"
                        {...register("status", { required: true })}
                    />
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-900">
                        <Button
                            type="submit" 
                            bgColor={blog ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/20" : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-950/20"}
                            className="w-full py-3 font-semibold tracking-wide"
                        >
                            {blog ? "Update Article" : "Publish Article"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}