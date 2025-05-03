import React from "react";


function QuestionNavigation({currentNumber, totalNumber} : {currentNumber: number, totalNumber: number}){
    return(
        <>
            <span className="text-2xl cursor-pointer">&#8592;</span> 
            <p className="lg:text-2xl sm:text-4xl">Question {currentNumber} of {totalNumber}</p>
        </>
    )
}

export default QuestionNavigation;