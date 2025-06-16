import React, { useEffect } from "react";
import Heading from "../components/Heading1";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { RootState } from "../store";
import QuestionAnswer from "../components/QuestionAnswer";
import endpoints from "../endpoints";
import { handleAuthError } from "../utils";


function Summary(){
    const { quiz } = useSelector((state: RootState) => state.quiz);

    console.log("Inside Summary",quiz);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        try{
            const rawResponse = await fetch(endpoints.addQuiz,{method: "POST", body: JSON.stringify({...quiz, score}) ,headers: {"Content-Type": "application/json",authorization: `Bearer ${localStorage.getItem("token")}`}});
            if(rawResponse.status === 403){
                handleAuthError(403, dispatch, navigate);
                return;
            }
            await rawResponse.json();
            toast.success("Quiz reported successfully!");
            navigate("/history");
        } catch(e: any){
            console.error(e);
            toast.error("Something went wrong while reporting.");
        }
    }

    return(
        <div className="bg-primary h-screen flex justify-center items-center flex-col gap-6 py-8">
            <Heading label={`You scored ${score}/${quiz.questions.length}`} />
            <div className="bg-dropdown h-160 w-60 sm:w-120 rounded-3xl overflow-y-auto">
                {quiz.questions.map((q,idx) => <QuestionAnswer explanation={q.explanation} questionNumber={idx + 1} options={q.options} correctAnswerIdx={q.correctAnswerIdx} selectedAnswerIdx={q.selectedAnswerIdx}/> )}
            </div>
            <Button customCallback={reportQuiz} label="Report Quiz" customStyles="bg-wrong w-60 lg:w-120"/>
        </div>
    )
}

export default Summary;