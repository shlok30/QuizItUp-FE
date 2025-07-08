type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

function ErrorMessage({ message = "Something went wrong. Please try again.", onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center text-red-600">
      <p className="text-xl font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
