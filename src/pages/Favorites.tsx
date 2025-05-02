import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const stored = localStorage.getItem("favorites");
      const ids = stored ? (JSON.parse(stored) as number[]) : [];
      if (ids.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }
      const results = await Promise.all(
        ids.map((id) => getMovieDetails(id.toString()))
      );
      setFavoriteMovies(results);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Favori Filmlerim</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : favoriteMovies.length === 0 ? (
        <p>Henüz favori film eklenmedi.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
