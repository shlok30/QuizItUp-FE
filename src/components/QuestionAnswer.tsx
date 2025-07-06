import React from "react";

type QuestionAnswerProps = {
    questionNumber: number,
    correctAnswerIdx: string,
    selectedAnswerIdx: string,
    explanation: string,
    options: string[]
}

function QuestionAnswer({questionNumber, correctAnswerIdx, selectedAnswerIdx, explanation, options} : QuestionAnswerProps){

    const isMyAnswerWrong = correctAnswerIdx !== selectedAnswerIdx;
    const correctAnswer = options[Number(correctAnswerIdx)];
    const myAnswer = options[Number(selectedAnswerIdx)];

    return(
        <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col gap-3 shadow-sm">
            <p className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col gap-3 shadow-sm">Question {questionNumber}</p>
            {isMyAnswerWrong && <p className="text-wrong bg-red-50 px-4 py-2 rounded-xl">Your Answer : {myAnswer}</p>}
            <p className="text-correct bg-green-50 px-4 py-2 rounded-xl">Correct Answer: {correctAnswer}</p>
            <p>Explanation: {explanation}</p>
        </div>
    )

}

export default QuestionAnswer;