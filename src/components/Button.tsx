import React from "react";
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
    customCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    customStyles?: string,
    label?: string,
}

function Button({customStyles="",label="",customCallback} : ButtonProps): React.ReactElement{

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(customCallback)
            customCallback(e);
    }


    return <button onClick={handleClick} className={twMerge("cursor-pointer bg-primary text-white w-80 md:w-150  lg:w-200 rounded-full p-4 text-xl font-bold", customStyles)}>{label}</button>
}

export default Button;