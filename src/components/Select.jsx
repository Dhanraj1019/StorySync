import { useId, forwardRef } from "react"

function Select({
    label,
    options = [],
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full text-left">
            {label && (
                <label 
                    htmlFor={id} 
                    className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200"
                >
                    {label}
                </label>
            )}
            <select 
                id={id}
                className={`px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 duration-200 w-full text-sm cursor-pointer transition-colors ${className}`}
                {...props}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)