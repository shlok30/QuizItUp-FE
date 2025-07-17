const BASE_URL = 'http://localhost:3001/api';

const endpoints = {
  getQuizes: `${BASE_URL}/quizzes`,
  addQuiz: `${BASE_URL}/users/quiz`,
  getAllQuizzes: `${BASE_URL}/users/quizzes`,
  login: `${BASE_URL}/users/login`,
  getAuthResolved: `${BASE_URL}/users/verify-token`,
};

export default endpoints;
