import React, { useEffect } from "react";
import Heading from "../components/Heading1";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import QuestionAnswer from "../components/QuestionAnswer";
import { useNavigate } from "react-router";
import endpoints from "../endpoints";

function Summary(){
    const { quiz } = useSelector((state: RootState) => state.quiz);

    console.log("Inside Summary",quiz);

    const navigate = useNavigate();

    useEffect(() => {
        if(!quiz?.questions.length)
            navigate("/");
    },[quiz, navigate])

    const score = quiz.score ||  quiz.questions.reduce((acc,curr) => {
        if(curr.correctAnswerIdx === curr.selectedAnswerIdx)
            return acc + 1;
        return acc;
    } ,0)

    const reportQuiz = async () => {
        const rawResponse = await fetch(endpoints.addQuiz,{method: "POST", body: JSON.stringify({...quiz, score}) ,headers: {"Content-Type": "application/json",authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM2MDA3MWNiNDQ2MmI1NTJjMzk4MGIiLCJpYXQiOjE3NDg5NDIwNTgsImV4cCI6MTc0ODk0NTY1OH0.hy00u3KozB9VvOFbOJhyMgPVbTBk_XgZJNGkl6AGn0g"}});
        const response = await rawResponse.json();
        console.log(response);
    }

    return(
        <div className="bg-primary h-screen flex justify-center items-center flex-col gap-6 py-8">
            <Heading label={`You scored ${score}/${quiz.questions.length}`} />
            <div className="bg-dropdown h-160 w-60 sm:w-120 rounded-3xl overflow-y-auto">
                {quiz.questions.map((q,idx) => <QuestionAnswer explanation={q.explanation} questionNumber={idx + 1} options={q.options} correctAnswerIdx={q.correctAnswerIdx} selectedAnswerIdx={q.selectedAnswerIdx}/> )}
            </div>
            <Button customCallback={reportQuiz} label="Home" customStyles="bg-wrong w-60 lg:w-120"/>
        </div>
    )
}

export default Summary;