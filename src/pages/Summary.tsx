import { useEffect } from "react";
import Heading from "../components/Heading1";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { RootState } from "../store";
import QuestionAnswer from "../components/QuestionAnswer";
import endpoints from "../endpoints";
import { handleAuthError } from "../utils";
import { flushCache } from "../features/quiz";


function Summary(){
    const { quiz } = useSelector((state: RootState) => state.quiz);

    const { state } = useLocation();
    const fromHistory = state?.fromHistory;

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
            dispatch(flushCache());
            navigate("/history");
        } catch(e: any){
            console.error(e);
            toast.error("Something went wrong while reporting.");
        }
    }

    return(
        <div className="bg-background min-h-screen px-4 py-10 flex flex-col items-center gap-8">
            <Heading label={`You scored ${score}/${quiz.questions.length}`} customStyle="text-3xl text-primary font-bold text-center" />
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-3xl p-6 flex flex-col gap-6">
                {quiz.questions.map((q,idx) => <QuestionAnswer key={`${q.question}-${idx}`} explanation={q.explanation} questionNumber={idx + 1} options={q.options} correctAnswerIdx={q.correctAnswerIdx} selectedAnswerIdx={q.selectedAnswerIdx}/> )}
            </div>
            {!fromHistory && <Button customCallback={reportQuiz} label="Report Quiz" customStyles="bg-wrong text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-red-600 transition w-full max-w-3xl"/>}
        </div>
    )
}

export default Summary;