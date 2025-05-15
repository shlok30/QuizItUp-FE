import { createSlice } from '@reduxjs/toolkit';
import Quiz from '../pages/Quiz';

type QuizElement = {
    question : string,
    options: string[],
    correctAnswer: string,
    explanation: string,
    correctAnswerIdx: string,
    selectedAnswerIdx: string,
}

type Quiz = QuizElement[]

type InitialState = {
    quiz: Quiz,
}

const initialState : InitialState = {
    quiz: [],
}

const quizSlice = createSlice({
    name : "quiz",
    initialState,
    reducers: {
        setQuizData: (state, action) => {
            console.log("Came here");
            state.quiz = action.payload
        },
    }
})

export const {setQuizData} = quizSlice.actions

export default quizSlice.reducer;