import { forwardRef, useId } from "react";

const Input = forwardRef(
    function Input({
        label,
        lable, // Fallback for lable typo in BlogForm
        type = "text",
        className = "",
        ...props
    }, ref) {
        const id = useId();
        const displayLabel = label || lable;
        return (
            <div className="w-full text-left">
                {displayLabel && (
                    <label 
                        className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200" 
                        htmlFor={id}
                    >
                        {displayLabel}
                    </label>
                )}
                <input 
                    type={type} 
                    className={`px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/65 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 duration-200 w-full text-sm transition-all ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    }
)

export default Input;