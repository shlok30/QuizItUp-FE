import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Question from "../components/Heading1";
import Button from "../components/Button";
import QuestionNavigation from "../components/QuestionNavigation";
import useFetch from "../hooks/useFetch";
import endpoints from "../endpoints";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setQuizData } from "../features/quiz";
import { RootState } from "../store";
import ErrorMessage from "../components/ErrorMessage";
import { handleAuthError } from "../utils";

type QuizSessionEntity = {
    selectedAnswerIdx: string,
    correctAnswerIdx?: string,
}

type QuizResponse = {
  data: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

function Quiz(){

    const [activeIdx, setActiveIdx] = useState(0);
    const [quizSession, setQuizSession] = useState<QuizSessionEntity[]>([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quiz } = useSelector((state : RootState) => state.quiz);

    const {isLoading, data, isError} = useFetch<QuizResponse>({endpoint: `${endpoints.getQuizes}${location.search}`, options: {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}, onError: (response) => handleAuthError(response.status, dispatch, navigate)});

    console.log("QUIZ",quiz);

    const handleOptionClick = (optionIdx: number) => {
        setQuizSession(prevState => {
            const session = [...prevState];
            const currentQuestion = {...session[activeIdx]};
            currentQuestion.selectedAnswerIdx = optionIdx.toString();
            if(!('correctAnswerIdx' in currentQuestion))
                currentQuestion.correctAnswerIdx = quiz.questions[activeIdx]?.options.indexOf(quiz.questions[activeIdx]?.correctAnswer).toString()
            session[activeIdx]= currentQuestion;
            return [...session];
        })
    }

    const handleNavigation = () => {
        if(activeIdx)
            setActiveIdx(prevIdx => prevIdx - 1);
    }

    const handleSubmit = () => {
        if(activeIdx < 2) //Hardcoding for now will need to fix soon
            setActiveIdx(prev => prev + 1);
        else{ //Sync local state with redux and navigate to summary page
            const updatedQuizSession = quiz.questions.map((question,idx) => ({...question, ...quizSession[idx]}));
            dispatch(setQuizData({...quiz, questions: [...updatedQuizSession]}));
            navigate("/summary");
        }
    }

    useEffect(() => {
        if(data)
            dispatch(setQuizData(data?.data));
    },[data])

    if(isLoading || !quiz.questions.length)
        return (
          <div className="h-screen bg-background flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <p className="font-semibold text-2xl">Your Quiz is Loading</p>
            </div>
          </div>
        )
    
    if (isError) 
        return <ErrorMessage onRetry={() => window.location.reload()} />;


    const currentQuestionMeta = quiz.questions[activeIdx];

    return(
        <div className="bg-background h-screen flex flex-col">
            <div className="flex gap-2 p-6 items-center">
                <QuestionNavigation handleNavigation={handleNavigation} currentNumber={activeIdx + 1} totalNumber={5}/>
            </div>
            <div className="py-20 flex-1 flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                    <Question label={currentQuestionMeta?.question} customStyle="text-center"/>
                </div>
                <div className="flex justify-center items-center flex-col gap-6 py-8">
                    {currentQuestionMeta.options.map((option, idx) => <Button customCallback={() => handleOptionClick(idx)} label={option} customStyles={`text-neutral-900 rounded-3xl ${quizSession[activeIdx]?.selectedAnswerIdx === idx.toString() ? 'bg-primary' : 'bg-dropdown-border'}`}/>)}
                </div>
                <div className="flex justify-center py-4">
                    <Button customCallback={handleSubmit} label="Submit" customStyles={Number(quizSession[activeIdx]?.selectedAnswerIdx) >= 0 ? 'bg-secondary' : 'cursor-none pointer-events-none bg-gray-400'}/>
                </div>
            </div>
        </div>
    )
}

export default Quiz