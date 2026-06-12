import manipulateDB from '../apprite/config'
import { Link } from 'react-router-dom'

function BlogCard({$id, title, featuredImage}){
    return (
        <Link to={`/blog/${$id}`} className="block h-full group">
            <div className="w-full h-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 group-hover:border-violet-500/30 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-violet-500/5 transition-all duration-300 flex flex-col">
                {/* Image Wrapper */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                    <img 
                        src={manipulateDB.getFileView(featuredImage)} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        loading="lazy"
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200 line-clamp-2 leading-snug">
                        {title}
                    </h2>
                    
                    {/* Read More link/arrow */}
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:text-violet-500 dark:group-hover:text-violet-300 transition-colors duration-200">
                        <span>Read Article</span>
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard;