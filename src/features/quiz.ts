import { createSlice } from '@reduxjs/toolkit';
import Quiz from '../pages/Quiz';
import { QuizWithId } from '../types';

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

export type History = {
    quizzes: QuizWithId[],
    pagination: Record<string,number>
}

type InitialState = {
    quiz: Quiz,
    history: Partial<Record<string, History>>
}

const initialState : InitialState = {
    quiz: {
        topic: "",
        genre: "",
        difficulty: "",
        questions: []
    },
    history: {}
}

const quizSlice = createSlice({
    name : "quiz",
    initialState,
    reducers: {
        setQuizData: (state, action) => {
            state.quiz = action.payload
        },
        setCacheEntry: (state, action) => {
            state.history[action.payload.key] = action.payload.data;
        }
    }
})

export const {setQuizData, setCacheEntry} = quizSlice.actions

export default quizSlice.reducer;