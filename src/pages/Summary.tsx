import React from "react";
import Heading from "../components/Heading1";
import Button from "../components/Button";

function Summary(){
    return(
        <div className="bg-primary h-screen flex justify-center items-center flex-col gap-6 py-8">
            <Heading label="You scored 3/5" />
            <div className="bg-dropdown h-160 w-60 sm:w-120 rounded-3xl overflow-y-auto">
                <div className="p-8">
                    <p>Question 1</p>
                    <p className="text-wrong">Your Answer : A</p>
                    <p className="text-correct">Correct Answer: B</p>
                </div>
                <div className="p-8">
                    <p>Question 1</p>
                    <p className="text-wrong">Your Answer : A</p>
                    <p className="text-correct">Correct Answer: B</p>
                </div>
                <div className="p-8">
                    <p>Question 1</p>
                    <p className="text-wrong">Your Answer : A</p>
                    <p className="text-correct">Correct Answer: B</p>
                </div>
                <div className="p-8">
                    <p>Question 1</p>
                    <p className="text-wrong">Your Answer : A</p>
                    <p className="text-correct">Correct Answer: B</p>
                </div>
                <div className="p-8">
                    <p>Question 1</p>
                    <p className="text-wrong">Your Answer : A</p>
                    <p className="text-correct">Correct Answer: B</p>
                </div>
            </div>
            <Button label="Home" customStyles="bg-wrong w-60 lg:w-120"/>
        </div>
    )
}

export default Summary;