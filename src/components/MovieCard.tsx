import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favs = JSON.parse(stored) as number[];
      setIsFavorite(favs.includes(movie.id));
    }
  }, [movie.id]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem("favorites");
    let favs = stored ? (JSON.parse(stored) as number[]) : [];
    if (favs.includes(movie.id)) {
      favs = favs.filter((id) => id !== movie.id);
      setIsFavorite(false);
    } else {
      favs.push(movie.id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 z-10 text-red-500 text-xl"
      >
        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <Link to={`/movie/${movie.id}`}>
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto md:h-[468px] object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold truncate">{movie.title}</h3>
            <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
