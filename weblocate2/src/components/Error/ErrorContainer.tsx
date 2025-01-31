interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white border-4 border-red-700 text-red-900 text-center rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-red-700">Error</h1>
        {message ? (
          <p className="text-lg">{message}</p>
        ) : (
          <>
            <p className="text-lg">Weblocate has encountered an error.</p>
            <p className="text-lg">Please renter details and try again.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
