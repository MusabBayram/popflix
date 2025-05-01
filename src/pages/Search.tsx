import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        const data = await searchMovies(query);
        setResults(data);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="p-8 bg-white dark:bg-black min-h-screen">
      {results.length === 0 ? (
        <p className="text-black dark:text-white text-center text-xl mt-8">
          Sonuç bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
