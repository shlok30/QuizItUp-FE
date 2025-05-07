import React from "react";

type InputProps = {
    type?: "text" | "number",
    placeholder?: string,
    customStyle?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    name: string,
    error: string,
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function Input({type =  "text", placeholder = "", customStyle= "", onChange, value, name, onBlur, onFocus, error=""} : InputProps){

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(onChange)
            onChange(e)
    }

    const handleBlur = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(onBlur)
            onBlur(e)
    }

    const handleFocus = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(onFocus)
            onFocus(e);
    }

    return(
        <div className="flex flex-col gap-4">
            <input onFocus={handleFocus} onBlur={handleBlur} name={name} value={value} onChange={handleChange} type={type} placeholder={placeholder} className={`bg-input p-4 rounded-2xl w-80 md:w-150  lg:w-200 border-2 border-amber-700 text-xl font-bold ${customStyle}`} />
            {error && <p className="text-wrong">{error}</p>}
        </div>
    )
    
    
}

export default Input;