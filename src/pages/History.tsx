import React from "react";
import Heading from "../components/Heading1";
import QuizCard from "../components/QuizCard";
import useFetch from "../hooks/useFetch";
import endpoints from "../endpoints";
import { Quiz } from "../features/quiz";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

type QuizWithId = Quiz & { _id: string };
type Quizzes = {quizzes: QuizWithId[]}

const options = {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM2MDA3MWNiNDQ2MmI1NTJjMzk4MGIiLCJpYXQiOjE3NDg2MzEzNDksImV4cCI6MTc0ODYzNDk0OX0.-8MG3t-ySLibw8WdWJLlcoy_ILmWwMdlvTSzbTXTpb8"}};

function History(){

    const {data, isLoading, isError} = useFetch<Quizzes>({endpoint: endpoints.getAllQuizzes, options});

    if(isLoading)
        return (
          <div className="h-screen bg-background flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <p className="font-semibold text-2xl">Your Quiz History is Loading</p>
            </div>
          </div>
        )
    
    if (isError) 
        return <ErrorMessage onRetry={() => window.location.reload()} />;

    if(!data?.quizzes.length)
        return (
          <div className="h-screen bg-background flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <p className="font-semibold text-2xl">You have not taken any Quizzes yet!</p>
            </div>
          </div>
        )

    return(
        <div className="bg-background h-screen">
            <header className="py-8 flex justify-center">
                <Heading label="Quiz History" />
            </header>
            <section className="flex flex-col items-center gap-3">
                {data?.quizzes?.map(quiz => <QuizCard score={quiz.score} topic={quiz.topic} genre={quiz.genre} difficulty={quiz.difficulty} id={quiz["_id"]}/>)}
            </section>
        </div>
    )
}

export default History;
