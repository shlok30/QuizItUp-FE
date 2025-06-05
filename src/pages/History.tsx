import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import Heading from "../components/Heading1";
import QuizCard from "../components/QuizCard";
import useFetch from "../hooks/useFetch";
import endpoints from "../endpoints";
import { setQuizData } from "../features/quiz";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Input from "../components/Input";
import { DifficultyFilter } from "../components/DifficultyFilter";
import { QuizWithId, Quizzes } from "../types";

const filerOptions = [{ id: 'easy', value: 'easy' }, { id: 'medium', value: 'medium' }, { id: 'hard', value: 'hard' }];

const options = {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODM2MDA3MWNiNDQ2MmI1NTJjMzk4MGIiLCJpYXQiOjE3NDg5ODAxOTgsImV4cCI6MTc0ODk4Mzc5OH0.5WhCOinbG012Qs2GE1Az_uNWux7E9NcZxxeh_0q7Ni8"}};

function History(){

    const [searchParams, setSearchParams] = useSearchParams({topic: "", difficulty: ""});

    const { search: queryParams } = useLocation();

    const [search, setSearch] = useState(searchParams.get("topic") || '');
    
    const {data, isLoading, isError} = useFetch<Quizzes>({endpoint: `${endpoints.getAllQuizzes}${queryParams}`, options});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleQuizCardClick = (quiz: QuizWithId) => {
      dispatch(setQuizData(quiz));
      navigate("/summary");
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value); //Or Just use debounce here!!!!!
    }

    const handleSetSearchParams = ({paramLabel, paramValue} : {paramLabel: 'topic' | 'difficulty', paramValue: string}) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(paramLabel, paramValue);
      setSearchParams(newParams);
    }

    const handleSearchBlur = () => {
      handleSetSearchParams({paramLabel: "topic", paramValue: search})
    }

    const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSetSearchParams({paramLabel: "difficulty",paramValue: e.target.value})
    }

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
            <section className="flex flex-col items-center gap-12">
              <div className="flex flex-col gap-3">
                <Input onBlur={handleSearchBlur} onChange={handleSearchChange} value={search} type="text" name="search" placeholder="Search by Topic" customStyle="w-3"/>
                <p className="font-semibold mb-2 text-xl">Filter By Difficulty</p>
                <DifficultyFilter
                  name="difficulty"
                  filterItems={filerOptions}
                  selectedValue={searchParams.get("difficulty") as string | undefined}
                  onChange={handleDifficultyChange}
                />
              </div>
                {data?.quizzes?.map(quiz => <QuizCard questions={quiz.questions} customCallback={handleQuizCardClick} score={quiz.score} topic={quiz.topic} genre={quiz.genre} difficulty={quiz.difficulty} _id={quiz["_id"]}/>)}
            </section>
        </div>
    )
}

export default History;
