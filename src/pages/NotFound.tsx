import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white text-center px-4">
      <h1 className="text-[120px] font-extrabold leading-none mb-2 text-yellow-500">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg max-w-md mb-6">
        Sorry! The page you're looking for doesn't exist. You may have clicked a
        broken link or the page may have been moved.
      </p>
      <Link
        to="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-3 rounded transition"
      >
        Return to Homepage
      </Link>
      <div className="absolute bottom-8 text-sm text-gray-400">
        Popflix &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default NotFound;
