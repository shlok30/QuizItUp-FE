import React from "react";

type QuizCardProps = {
    topic: string,
    genre: string,
    difficulty: "easy" | "medium" | "difficult",
    id: string,
    score: number
}

function QuizCard({topic, genre, difficulty, id='', score} : QuizCardProps){

    return(
        <div className="p-4 w-4/5 lg:w-1/3 flex gap-4 justify-between cursor-pointer border rounded-3xl">
            <div className="flex flex-col gap-1">
                <p className="text-2xl break-all">{topic}</p>
                <p className="text-zinc-400">Difficulty: {difficulty} | Genre: {genre}</p>
            </div>
            <div className="self-center">
                <p className="text-xl">{score}/10</p>
            </div>
        </div>
    )
}

export default QuizCard;