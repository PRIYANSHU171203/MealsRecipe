import React, { useId } from 'react'

const Input = React.forwardRef(({
    label ="",
    type = "text",
    className = "",
    ...props
    
},ref) => {
    const id = useId()
    
    return(
        <div className='w-full'>
           {label && <label className='inline-block mb-1 pl-1 '
        htmlFor={id}>{label}
            </label>
            }
            <input 
            type={type}
            className={` border border-gray-200 rounded-lg px-4 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-300 w-full ${className}`}
            ref={ref}
            id={id}
            {...props}
            />
        </div>
    )

}) 

export default Input
