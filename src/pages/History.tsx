import React from "react";
import Heading from "../components/Heading1";
import QuizCard from "../components/QuizCard";

function History(){
    return(
        <div className="bg-background h-screen">
            <header className="py-8 flex justify-center">
                <Heading label="Quiz History" />
            </header>
            <section className="flex flex-col items-center gap-3">
                <QuizCard />
                <QuizCard />
                <QuizCard />
                <QuizCard />
                <QuizCard />
            </section>
        </div>
    )
}

export default History;
