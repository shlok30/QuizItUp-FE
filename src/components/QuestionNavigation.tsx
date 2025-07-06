import React from "react";


function QuestionNavigation({currentNumber, totalNumber, handleNavigation} : {currentNumber: number, totalNumber: number, handleNavigation: () => void}){
    return(
        <>
            {currentNumber > 1 && <button onClick={handleNavigation} className="text-2xl text-primary hover:underline"><span className="text-2xl cursor-pointer">&#8592;</span> </button>}
            <p className="text-xl font-semibold text-neutral-800">Question {currentNumber} of {totalNumber}</p>
        </>
    )
}

export default QuestionNavigation;