import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../features/quiz';
import authReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
