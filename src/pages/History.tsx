import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router';
import Heading from '../components/Heading1';
import QuizCard from '../components/QuizCard';
import { setQuizData } from '../features/quiz';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import { DifficultyFilter } from '../components/DifficultyFilter';
import { QuizWithId } from '../types';
import useGetHistory from '../hooks/useGetHistory';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

const filerOptions = [
  { label: 'all', value: '' },
  { label: 'easy', value: 'easy' },
  { label: 'medium', value: 'medium' },
  { label: 'hard', value: 'hard' },
];

function History() {
  const [searchParams, setSearchParams] = useSearchParams({
    topic: '',
    difficulty: '',
    pageNumber: '1',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get('topic') || '');

  const { data, isLoading, isError } = useGetHistory({
    queryParams: searchParams,
  });

  const handleQuizCardClick = (quiz: QuizWithId) => {
    dispatch(setQuizData(quiz));
    navigate('/summary', { state: { fromHistory: true } });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); //Or Just use debounce here!!!!!
  };

  const handleSetSearchParams = ({
    paramLabel,
    paramValue,
    resetPageNumber = false,
  }: {
    paramLabel: 'topic' | 'difficulty' | 'pageNumber';
    paramValue: string;
    resetPageNumber?: boolean;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramLabel, paramValue);
    if (resetPageNumber) newParams.set('pageNumber', '1');
    setSearchParams(newParams);
  };

  const handleSearchBlur = () => {
    handleSetSearchParams({
      paramLabel: 'topic',
      paramValue: search,
      resetPageNumber: true,
    });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetSearchParams({
      paramLabel: 'difficulty',
      paramValue: e.target.value,
      resetPageNumber: true,
    });
  };

  if (isLoading)
    return (
      <div className="h-screen bg-background flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <p className="font-semibold text-2xl">Your Quiz History is Loading</p>
        </div>
      </div>
    );

  if (isError) return <ErrorMessage onRetry={() => window.location.reload()} />;

  return (
    <div className="bg-background px-4 min-h-screen">
      <header className="py-8 flex justify-center relative">
        <Heading label="Quiz History" customStyle="py-4" />
        <Link
          to="/"
          className="absolute top-4 right-8 text-primary underline font-medium hover:text-secondary transition"
        >
          New Quiz
        </Link>
      </header>
      <section className="flex flex-col items-center gap-12">
        <div className="flex flex-col gap-3 w-full max-w-3xl">
          <Input
            onBlur={handleSearchBlur}
            onChange={handleSearchChange}
            value={search}
            type="text"
            name="search"
            placeholder="Search by Topic"
            customStyle="w-full max-w-3xl"
          />
          <p className="font-semibold mb-2 text-xl">Filter By Difficulty</p>
          <DifficultyFilter
            name="difficulty"
            filterItems={filerOptions}
            selectedValue={searchParams.get('difficulty') as string | undefined}
            onChange={handleDifficultyChange}
          />
        </div>
        {!data?.quizzes.length && (
          <div className="flex flex-col items-center gap-4">
            <p className="font-semibold text-2xl">
              You have not taken any Quizzes yet!
            </p>
          </div>
        )}
        {Boolean(data?.quizzes.length) &&
          data?.quizzes.map(quiz => (
            <QuizCard
              questions={quiz.questions}
              customCallback={handleQuizCardClick}
              score={quiz.score}
              topic={quiz.topic}
              genre={quiz.genre}
              difficulty={quiz.difficulty}
              _id={quiz['_id']}
            />
          ))}
      </section>

      {Boolean(data?.quizzes.length) && (
        <div className="py-4">
          <Pagination
            current={Number(searchParams.get('pageNumber')) || 1}
            total={data?.pagination.totalItems}
            pageSize={5}
            onChange={page =>
              handleSetSearchParams({
                paramLabel: 'pageNumber',
                paramValue: page.toString(),
              })
            }
          />
        </div>
      )}
    </div>
  );
}

export default History;
