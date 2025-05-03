import React from "react"

type Option = {id: number, label: string};

type Options = {id: number, label: string}[]

type SelectProps = {
    options: Options,
    customStyles?: string,
    onChange?: (value : number) => void,
    placeholder?: string
}

function Select({options, customStyles="", onChange, placeholder} : SelectProps){

    const handleChange = (value) => {
        if(onChange)
            onChange(value);
    }

    return (<select onChange={handleChange} className={`bg-dropdown border-2 border-dropdown-border p-4 rounded-2xl w-80 md:w-150 lg:w-200 text-xl font-bold cursor-pointer ${customStyles}`} defaultValue="">
        {placeholder && <option value="" hidden disabled>{placeholder}</option>}
        {
            options.map(({id,label} : Option) => <option value={id}>{label}</option>)
        }
    </select>)
}

export default Select