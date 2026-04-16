import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';
export default function Input(props){
    const [openEye, setOpenEye] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    return(
        <div className="w-full relative">
            {props.haveEye 
            ? 
            <input 
                onChange={props.onChange}
                autoComplete='off' 
                type={isPassword ? 'password' : 'text'}
                name={props.name}
                placeholder={props.placeholder}  
                className="p-2 px-2.5 text-sm text-white h-10 w-full bg-charcol-darker rounded outline-none caret-brand-primary placeholder-charcol-lighter placeholder:font-[300] placeholder:text-[13px]"
                required={props.required}
            />
            :
            <input 
                onChange={props.onChange} 
                autoComplete='off'
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}  
                required={props.required}
                className="p-2 px-2.5 text-sm text-white h-10 w-full bg-charcol-darker rounded outline-none caret-brand-primary placeholder-charcol-lighter placeholder:font-[300] placeholder:text-[13px]"
            />
            }
            {props.haveEye ? 
                <div onClick={()=>{setOpenEye(!openEye); setIsPassword(!isPassword)}} className="absolute cursor-pointer right-2 top-[calc(50%-7.5px)]">
                    {openEye ? <Eye color='gray' size={15}/> : <EyeOff color='gray' size={15}/>}
                </div>
            : ''
            }
        </div>
    )
}