import React, { useId, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
const Input = React.forwardRef(({
    label ="",
    type = "text",
    className = "",
    ...props
    
},ref) => {
    const id = useId()
    const [showPassword, setShowPassword] = useState(false)

    const inputType = type === "password" && showPassword ? "text" : type
    
    return(
        <div className='w-full'>
           {label && <label className='inline-block mb-1 pl-1 font-bold font-[tinos] '
        htmlFor={id}>{label}
            </label>
            }
            <input 
            type={inputType}
            className={` border border-gray-200 rounded-lg px-4 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-300 w-full ${className}`}
            ref={ref}
            id={id}
            {...props}
            />
            {type ==="password" &&(
                <span 
                className='absolute right-3 top-9 cursor-pointer text-gray-600 hover:text-black'
                onClick={() => { setShowPassword(prev => !prev)}} >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="sm"/>
                </span>
            )
            }
        </div>
    )

}) 

export default Input
