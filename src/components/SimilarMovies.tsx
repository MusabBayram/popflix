import { Link } from "react-router-dom";
import { useRef } from "react";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
}

interface SimilarMoviesProps {
  movies: MovieDetail[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-bold mb-4 text-white">Similar TV Shows</h2>
      {movies.length > 0 ? (
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
          >
            ◀
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-2 custom-scrollbar"
          >
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="min-w-[150px] max-w-[150px] bg-white dark:bg-gray-800 rounded shadow overflow-hidden flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[225px] object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-xs font-semibold truncate text-black dark:text-white">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
          >
            ▶
          </button>
        </div>
      ) : (
        <p className="text-white">No similar TV shows found.</p>
      )}
    </div>
  );
};

export default SimilarMovies;
