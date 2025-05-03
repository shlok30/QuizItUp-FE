import React from "react";

type InputProps = {
    type?: "text" | "number",
    placeholder?: string,
    customStyle?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({type =  "text", placeholder = "", customStyle= "", onChange} : InputProps){

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(onChange)
            onChange(e)
    }

    return <input onChange={handleChange} type={type} placeholder={placeholder} className={`bg-input p-4 rounded-2xl w-80 md:w-150  lg:w-200 border-2 border-amber-700 text-xl font-bold ${customStyle}`} />
}

export default Input;