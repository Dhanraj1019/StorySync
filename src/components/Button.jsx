export default function Button({
    children,
    type="button",
    bgColor='bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-900/25 hover:shadow-indigo-500/25',
    textColor='text-white',
    className="",
    ...props
}){
    return (
        <button 
            type={type} 
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 active:scale-[0.98] cursor-pointer ${bgColor} ${textColor} ${className}`}  
            {...props}
        >
           {children}
        </button>
    )
}