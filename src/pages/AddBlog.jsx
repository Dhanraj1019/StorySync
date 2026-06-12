import manipulateDB from '../apprite/config'
import Blogform from '../components/BlogForm/BlogForm'
import Container from '../components/container/Container'

export default function AddBlog(){
    const data = manipulateDB.getAllBlogs();
    return (
        <div className="py-10">
            <Container>
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="border-b border-slate-200 dark:border-slate-900 pb-5 transition-colors duration-200">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
                            Write a New Article
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-200">
                            Share your developer updates, ideas, or tutorials with the community.
                        </p>
                    </div>
                    <Blogform />
                </div>
            </Container>
        </div>
    )
}