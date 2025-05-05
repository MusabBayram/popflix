import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getSimilarMovies,
  getMovieTrailer,
  getMovieCredits,
} from "../services/tmdb";
import SimilarMovies from "../components/SimilarMovies";
import RecentMovies from "../components/RecentMovies";

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
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieDetail[]>([]);
  const [recentMovies, setRecentMovies] = useState<MovieDetail[]>([]);
  const [credits, setCredits] = useState<{ cast: any[]; crew: any[] } | null>(
    null
  );

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await getMovieDetails(id);
        setMovie(data);
        const trailer = await getMovieTrailer(id);
        setTrailerKey(trailer);
        const similar = await getSimilarMovies(id);
        setSimilarMovies(similar);
        const creditsData = await getMovieCredits(id);
        setCredits(creditsData);
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      const visitedMovies = JSON.parse(
        localStorage.getItem("visitedMovies") || "[]"
      );
      const existingIndex = visitedMovies.findIndex(
        (m: MovieDetail) => m.id === movie.id
      );
      if (existingIndex !== -1) {
        visitedMovies.splice(existingIndex, 1);
      }
      visitedMovies.unshift(movie);
      if (visitedMovies.length > 10) {
        visitedMovies.pop();
      }
      localStorage.setItem("visitedMovies", JSON.stringify(visitedMovies));
    }
  }, [movie]);

  useEffect(() => {
    const visitedMovies = JSON.parse(
      localStorage.getItem("visitedMovies") || "[]"
    );
    setRecentMovies(visitedMovies);
  }, [movie]);

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
          <p className="text-lg font-medium">Loading...</p>
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
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <p className="italic text-gray-300 mb-4">
            📅 Released: {movie.release_date}
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            {movie.overview}
          </p>
          {credits && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                🎭 Cast & Crew
              </h2>
              <p className="text-gray-300 mb-1">
                <span className="font-semibold text-white">Director:</span>{" "}
                {credits.crew.find((member) => member.job === "Director")
                  ?.name || "N/A"}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Cast:</span>{" "}
                {credits.cast.slice(0, 5).map((actor, index) => (
                  <span key={actor.id}>
                    <Link
                      to={`/person/${actor.id}`}
                      className="text-yellow-400 hover:underline"
                    >
                      {actor.name}
                    </Link>
                    {index < 4 && ", "}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>
      {trailerKey && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">🎬 Trailer</h2>
          <div className="w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
      <SimilarMovies movies={similarMovies} />
      <RecentMovies movies={recentMovies} />
    </div>
  );
}

export default MovieDetail;
