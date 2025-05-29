import React from "react";


function QuestionNavigation({currentNumber, totalNumber, handleNavigation} : {currentNumber: number, totalNumber: number, handleNavigation: () => void}){
    return(
        <>
            {currentNumber > 1 && <button onClick={handleNavigation}><span className="text-2xl cursor-pointer">&#8592;</span> </button>}
            <p className="lg:text-2xl sm:text-4xl">Question {currentNumber} of {totalNumber}</p>
        </>
    )
}

export default QuestionNavigation;