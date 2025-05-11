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

type QuizSessionEntity = {
    selectedAnswerIdx: string,
    correctAnswerIdx: string,
}

function Quiz(){

    const [activeIdx, setActiveIdx] = useState(0);
    const [quizSession, setQuizSession] = useState<QuizSessionEntity[]>([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quiz } = useSelector(state => state.quiz);


    console.log(quizSession);

    console.log("This is Quiz",quiz);

    const {isLoading, data, isError} = useFetch({endpoint: `${endpoints.getQuizes}${location.search}`});

    const handleOptionClick = (optionIdx) => {
        setQuizSession(prevState => {
            const session = [...prevState];
            const currentQuestion = {...session[activeIdx]};
            currentQuestion.selectedAnswerIdx = optionIdx;
            if(!('correctAnswerIdx' in currentQuestion))
                currentQuestion.correctAnswerIdx = quiz[activeIdx]?.options.indexOf(quiz[activeIdx]?.correctAnswer)
            session[activeIdx]= currentQuestion;
            return [...session];
        })
    }

    const handleSubmit = () => {
        if(activeIdx < 2) //Hardcoding for now will need to fix soon
            setActiveIdx(prev => prev + 1);
        else{ //Sync local state with redux and navigate to summary page
            const updatedQuizSession = quiz.map((question,idx) => ({...question, ...quizSession[idx]}));
            dispatch(setQuizData([...updatedQuizSession]));
            navigate("/summary");
        }
    }

    useEffect(() => {
        if(data)
            dispatch(setQuizData(data?.data));
    },[data])

    if(isLoading || !quiz.length)
        return (
          <div className="h-screen bg-background flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <p className="font-semibold text-2xl">Your Quiz is Loading</p>
            </div>
          </div>
        )

    const currentQuestionMeta = quiz[activeIdx];

    return(
        <div className="bg-background h-screen flex flex-col">
            <div className="flex gap-2 p-6 items-center">
                <QuestionNavigation currentNumber={activeIdx + 1} totalNumber={5}/>
            </div>
            <div className="py-20 flex-1 flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                    <Question label={currentQuestionMeta?.question} customStyle="text-center"/>
                </div>
                <div className="flex justify-center items-center flex-col gap-6 py-8">
                    {currentQuestionMeta.options.map((option, idx) => <Button customCallback={() => handleOptionClick(idx)} label={option} customStyles={`text-neutral-900 ${quizSession[activeIdx]?.selectedAnswerIdx === idx ? 'bg-primary' : 'bg-dropdown-border'}`}/>)}
                </div>
                <div className="flex justify-center py-4">
                    <Button customCallback={handleSubmit} label="Submit" customStyles={Number(quizSession[activeIdx]?.selectedAnswerIdx) >= 0 ? 'bg-secondary' : 'cursor-none pointer-events-none bg-gray-400'}/>
                </div>
            </div>
        </div>
    )
}

export default Quiz