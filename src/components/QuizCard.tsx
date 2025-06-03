import React from "react";
import { QuizElement } from "../features/quiz";

type QuizCardProps = {
    topic: string,
    genre: string,
    difficulty: "easy" | "medium" | "difficulty",
    id: string,
    score: number,
    questions: QuizElement[]
}

function QuizCard({topic, genre, difficulty, id='', score, customCallback, questions} : (QuizCardProps & {customCallback: (quizObject: QuizCardProps) => void})){

    const handleClick = () => {
        customCallback({
            topic,
            genre,
            difficulty,
            id,
            score,
            questions
        });
    }

    return(
        <button onClick={handleClick} className="p-4 w-4/5 lg:w-1/3 flex gap-4 justify-between border rounded-3xl cursor-pointer text-left bg-transparent">
            <div className="flex flex-col gap-1">
                <p className="text-2xl break-all">{topic}</p>
                <p className="text-zinc-400">Difficulty: {difficulty} | Genre: {genre}</p>
            </div>
            <div className="self-center">
                <p className="text-xl">{score}/10</p>
            </div>
        </button>
    )
}

export default QuizCard;