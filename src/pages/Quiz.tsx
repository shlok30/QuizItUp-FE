import React from "react";
import Question from "../components/Heading1";
import Button from "../components/Button";
import QuestionNavigation from "../components/QuestionNavigation";

function Quiz(){
    return(
        <div className="bg-background h-screen flex flex-col">
            <div className="flex gap-2 p-6 items-center">
                <QuestionNavigation currentNumber={2} totalNumber={5}/>
            </div>
            <div className="py-20 flex-1 flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                    <Question label="What is the primary purpose of docker?" customStyle="text-center"/>
                </div>
                <div className="flex justify-center items-center flex-col gap-6 py-8">
                    <Button label="Managing Databases" customStyles="bg-dropdown-border text-neutral-900"/>
                    <Button label="Managing Databases" customStyles="bg-selected-option text-neutral-900"/>
                    <Button label="Managing Databases" customStyles="bg-dropdown-border text-neutral-900"/>
                    <Button label="Managing Databases" customStyles="bg-dropdown-border text-neutral-900"/>
                </div>
                <div className="flex justify-center py-4">
                    <Button label="Submit" customStyles="bg-secondary"/>
                </div>
            </div>
        </div>
    )
}

export default Quiz