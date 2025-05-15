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
        <div className="p-8 flex flex-col gap-1.5">
            <p>Question {questionNumber}</p>
            {isMyAnswerWrong && <p className="text-wrong">Your Answer : {myAnswer}</p>}
            <p className="text-correct">Correct Answer: {correctAnswer}</p>
            <p>Explanation: {explanation}</p>
        </div>
    )

}

export default QuestionAnswer;