import { useEffect, useState } from "react";
import { discoverMovies, getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_names?: string[];
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showTopRated = params.get("topRated") === "true";
  const selectedGenres = params.get("genres")?.split(",") || [];

  useEffect(() => {
    const fetchMovies = async () => {
      if (showTopRated || selectedGenres.length > 0) {
        const data = await discoverMovies({
          genres: selectedGenres,
          topRated: showTopRated,
        });
        setMovies(data);
      } else {
        const data = await getPopularMovies();
        setMovies(data);
      }
    };
    fetchMovies();
  }, [showTopRated, selectedGenres]);

  return (
    <div className="min-h-screen p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-white dark:bg-black">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
