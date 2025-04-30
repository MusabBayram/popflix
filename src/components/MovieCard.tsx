import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-gray-900 text-white rounded overflow-hidden shadow-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{movie.title}</h3>
          <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
