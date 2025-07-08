import { QuizWithId } from "../types";

function QuizCard({topic, genre, difficulty, _id='', score, customCallback, questions} : (QuizWithId & {customCallback: (quizObject: QuizWithId) => void})){

    const handleClick = () => {
        customCallback({
            topic,
            genre,
            difficulty,
            _id,
            score,
            questions
        });
    }

    return(
        <button onClick={handleClick} className="p-4 w-full max-w-3xl flex gap-4 justify-between border rounded-3xl cursor-pointer text-left bg-transparent">
            <div className="flex flex-col gap-1">
                <p className="text-2xl break-all">{topic}</p>
                <p className="text-zinc-400">Difficulty: {difficulty} | Genre: {genre}</p>
            </div>
            <div className="self-center">
                <p className="text-xl">{score}/{questions.length}</p>
            </div>
        </button>
    )
}

export default QuizCard;