import React from "react";

function QuizCard(){
    return(
        <div className="p-4 w-4/5 lg:w-1/3 flex gap-4 justify-between cursor-pointer border rounded-3xl">
            <div className="flex flex-col gap-1">
                <p className="text-2xl break-all">AI-Generated Quiz on REST APIs</p>
                <p className="text-zinc-400">Taken on February 20, 2025</p>
            </div>
            <div className="self-center">
                <p className="text-xl">7/10</p>
            </div>
        </div>
    )
}

export default QuizCard;