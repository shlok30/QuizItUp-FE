import { createSlice } from '@reduxjs/toolkit';
import Quiz from '../pages/Quiz';

export type QuizElement = {
    question : string,
    options: string[],
    correctAnswer: string,
    explanation: string,
    correctAnswerIdx: string,
    selectedAnswerIdx: string,
}

export type Quiz = {
    topic: string,
    genre: string,
    difficulty: 'easy' | 'medium' | 'difficult' | '',
    score?: number,
    questions: QuizElement[]
}

type InitialState = {
    quiz: Quiz
}

const initialState : InitialState = {
    quiz: {
        topic: "",
        genre: "",
        difficulty: "",
        questions: []
    }
}

const quizSlice = createSlice({
    name : "quiz",
    initialState,
    reducers: {
        setQuizData: (state, action) => {
            console.log("Came here",action.payload);
            state.quiz = action.payload
        },
    }
})

export const {setQuizData} = quizSlice.actions

export default quizSlice.reducer;