import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Question from '../components/Heading1';
import Button from '../components/Button';
import QuestionNavigation from '../components/QuestionNavigation';
import useFetch from '../hooks/useFetch';
import endpoints from '../endpoints';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizData } from '../features/quiz';
import { RootState } from '../store';
import ErrorMessage from '../components/ErrorMessage';
import { handleAuthError } from '../utils';

type QuizSessionEntity = {
  selectedAnswerIdx: string;
  correctAnswerIdx?: string;
};

type QuizResponse = {
  data: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

function Quiz() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [quizSession, setQuizSession] = useState<QuizSessionEntity[]>([]);
  const location = useLocation();
  const queryParams = location.search;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quiz } = useSelector((state: RootState) => state.quiz);

  const fetchParams = useMemo(
    () => ({
      endpoint: `${endpoints.getQuizes}${queryParams}`,
      options: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      onError: (response: Response) =>
        handleAuthError(response.status, dispatch, navigate),
    }),
    [queryParams, dispatch, navigate]
  );

  const { isLoading, data, isError } = useFetch<QuizResponse>(fetchParams);

  const handleOptionClick = (optionIdx: number) => {
    setQuizSession(prevState => {
      const session = [...prevState];
      const currentQuestion = { ...session[activeIdx] };
      currentQuestion.selectedAnswerIdx = optionIdx.toString();
      if (!('correctAnswerIdx' in currentQuestion))
        currentQuestion.correctAnswerIdx = quiz.questions[activeIdx]?.options
          .indexOf(quiz.questions[activeIdx]?.correctAnswer)
          .toString();
      session[activeIdx] = currentQuestion;
      return [...session];
    });
  };

  const handleNavigation = () => {
    if (activeIdx) setActiveIdx(prevIdx => prevIdx - 1);
  };

  const handleSubmit = () => {
    if (activeIdx < 2)
      //Hardcoding for now will need to fix soon
      setActiveIdx(prev => prev + 1);
    else {
      //Sync local state with redux and navigate to summary page
      const updatedQuizSession = quiz.questions.map((question, idx) => ({
        ...question,
        ...quizSession[idx],
      }));
      dispatch(setQuizData({ ...quiz, questions: [...updatedQuizSession] }));
      navigate('/summary');
    }
  };

  useEffect(() => {
    if (!queryParams) navigate('/create-quiz');
  }, [navigate, queryParams]);

  useEffect(() => {
    if (data) dispatch(setQuizData(data?.data));
  }, [data]);

  if (isLoading || !quiz.questions.length)
    return (
      <div className="h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-semibold text-2xl">Your Quiz is Loading</p>
        </div>
      </div>
    );

  if (isError) return <ErrorMessage onRetry={() => window.location.reload()} />;

  const currentQuestionMeta = quiz.questions[activeIdx];

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl flex items-center justify-between mb-8">
        <QuestionNavigation
          handleNavigation={handleNavigation}
          currentNumber={activeIdx + 1}
          totalNumber={quiz.questions.length}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex justify-center items-center w-full max-w-3xl mb-6">
          <Question
            label={currentQuestionMeta?.question}
            customStyle="text-center text-xl sm:text-2xl font-semibold text-neutral-900"
          />
        </div>
        <div className="w-full max-w-3xl flex flex-col gap-4 py-6">
          {currentQuestionMeta.options.map((option, idx) => (
            <Button
              key={`${option}-${idx}`}
              customCallback={() => handleOptionClick(idx)}
              label={option}
              customStyles={`w-full text-left px-6 py-3 rounded-2xl border font-medium transition-colors duration-200 ${quizSession[activeIdx]?.selectedAnswerIdx === idx.toString() ? 'bg-primary text-white border-transparent' : 'bg-white text-neutral-800 border border-gray-300 hover:bg-primary/10'}`}
            />
          ))}
        </div>
        <div className="w-full max-w-3xl py-6">
          <Button
            customCallback={handleSubmit}
            label="Submit"
            customStyles={
              Number(quizSession[activeIdx]?.selectedAnswerIdx) >= 0
                ? 'bg-secondary px-6 py-2 text-white rounded-xl font-semibold w-full'
                : 'cursor-not-allowed pointer-events-none bg-gray-400 px-6 py-2 text-white rounded-xl w-full'
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
