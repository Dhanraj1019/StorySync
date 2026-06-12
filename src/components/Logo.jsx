export default function Logo({width="100px",className=''}){
    return (
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight select-none">
            {/* Logo Icon */}
            <div className={`w-8 h-8  flex items-center justify-center`}>
                <img className={className} src="../public/logo.png"></img>
            </div>
            {/* Logo Text */}
            <span className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent transition-all duration-200">
                Story<span className="bg-linear-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Sync</span>
            </span>
        </div>
    )
}