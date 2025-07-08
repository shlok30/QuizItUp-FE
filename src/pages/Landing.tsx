import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        QuizMaster
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
        Sharpen your skills with quizzes tailored to your knowledge level.
        Select topics, track your progress, and improve with every attempt.
      </p>
      <button
        onClick={() => navigate('/create-quiz')}
        className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition cursor-pointer"
      >
        Get Started
      </button>
    </section>
  );
};

export default LandingPage;
