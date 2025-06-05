import React from "react"
import { twMerge } from "tailwind-merge";

type Option = {id: number, label: string};

type Options = {id: number, label: string}[]

type SelectProps = {
    options: Options,
    customStyles?: string,
    onChange?: (value : React.ChangeEvent<HTMLSelectElement>) => void,
    placeholder?: string,
    name: string,
    error: string,
    value: string,
    onBlur?: (value : React.ChangeEvent<HTMLSelectElement>) => void,
    onFocus?: (value : React.ChangeEvent<HTMLSelectElement>) => void,
}

function Select({options, customStyles="", onChange, placeholder, name, error, value, onBlur, onFocus} : SelectProps){

    const handleChange = (value : React.ChangeEvent<HTMLSelectElement>) => {
        if(onChange)
            onChange(value);
    }

    const handleBlur = (value : React.ChangeEvent<HTMLSelectElement>) => {
        if(onBlur)
            onBlur(value);
    }

    const handleFocus =  (value : React.ChangeEvent<HTMLSelectElement>) => {
        if(onFocus)
            onFocus(value);
    }

    return (
    <div className="flex flex-col gap-4">
        <select name={name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={twMerge("bg-dropdown border-2 border-dropdown-border p-4 rounded-2xl w-80 md:w-150 lg:w-200 text-xl font-bold cursor-pointer",customStyles)} value={value} defaultValue="">
            {placeholder && <option value="" hidden disabled>{placeholder}</option>}
            {options.map(({id,label} : Option) => <option value={id}>{label}</option>)}
        </select>
        {error && <p className="text-wrong">{error}</p>}
    </div>
    
    )
}

export default Select