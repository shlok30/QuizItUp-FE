import React, { useEffect } from "react";
import Heading from "../components/Heading1";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import QuestionAnswer from "../components/QuestionAnswer";
import { useNavigate } from "react-router";

function Summary(){
    const { quiz } = useSelector((state: RootState) => state.quiz);

    const navigate = useNavigate();

    useEffect(() => {
        if(!quiz.length)
            navigate("/");
    },[quiz, navigate])

    const score = quiz.reduce((acc,curr) => {
        if(curr.correctAnswerIdx === curr.selectedAnswerIdx)
            return acc + 1;
        return acc;
    } ,0)

    return(
        <div className="bg-primary h-screen flex justify-center items-center flex-col gap-6 py-8">
            <Heading label={`You scored ${score}/${quiz.length}`} />
            <div className="bg-dropdown h-160 w-60 sm:w-120 rounded-3xl overflow-y-auto">
                {quiz.map((q,idx) => <QuestionAnswer explanation={q.explanation} questionNumber={idx + 1} options={q.options} correctAnswerIdx={q.correctAnswerIdx} selectedAnswerIdx={q.selectedAnswerIdx}/> )}
            </div>
            <Button label="Home" customStyles="bg-wrong w-60 lg:w-120"/>
        </div>
    )
}

export default Summary;