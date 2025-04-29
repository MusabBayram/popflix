import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Home;
