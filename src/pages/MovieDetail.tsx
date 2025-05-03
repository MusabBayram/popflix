import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails, getSimilarMovies } from "../services/tmdb";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
}

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieDetail[]>([]);

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

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await getMovieDetails(id);
        setMovie(data);
        const similar = await getSimilarMovies(id);
        setSimilarMovies(similar);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-lg font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-yellow-400 text-lg mb-2">
            ⭐ {movie.vote_average}
          </p>
          <p className="italic text-gray-300 mb-4">
            📅 Released: {movie.release_date}
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-4 text-white">Benzer Filmler</h2>
        {similarMovies.length > 0 ? (
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
              {similarMovies.map((movie) => (
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
          <p className="text-white">Benzer film bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
