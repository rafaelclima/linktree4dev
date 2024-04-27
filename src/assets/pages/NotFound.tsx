import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary-dark to-primary-light">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-lg text-gray-200">
          A página que você está procurando não foi encontrada.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-8 py-4 bg-primary-light border border-primary-dark rounded-full text-primary-dark font-semibold hover:bg-primary-medium hover:border-primary-medium hover:text-primary-light transition duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
