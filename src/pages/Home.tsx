import { useEffect, useState } from "react";
import {
  discoverMovies,
  getPopularMovies,
  getPopularTVShows,
  getUpcomingMovies,
} from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import CarouselSection from "../components/CarouselSection";
import { useLocation } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_names?: string[];
}

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showTopRated = params.get("topRated") === "true";
  const selectedGenres = params.get("genres")?.split(",") || [];
  const minRatingParam = params.get("minRating");
  const minRating = minRatingParam ? parseFloat(minRatingParam) : 0;

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);

    const fetchExtraSections = async () => {
      const tv = await getPopularTVShows();
      const upcoming = await getUpcomingMovies();
      setTvShows(tv);
      setUpcomingMovies(upcoming);
    };

    fetchExtraSections();
  }, [location.search]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      const fetchFn =
        showTopRated || selectedGenres.length > 0 || minRating > 0
          ? discoverMovies
          : getPopularMovies;

      const data = await fetchFn({
        genres: selectedGenres,
        topRated: showTopRated,
        minRating,
      });

      setMovies((prev: Movie[]): Movie[] => {
        const newMovies = page === 1 ? data : [...prev, ...data];
        const uniqueMovies = Array.from(
          new Map(newMovies.map((movie: Movie) => [movie.id, movie])).values()
        );
        return uniqueMovies as Movie[];
      });
      setHasMore(data.length >= 10);
      setIsLoading(false);
    };

    fetchMovies();
  }, [showTopRated, selectedGenres, location.search, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className="bg-white dark:bg-black">
      {selectedGenres.length === 0 && !showTopRated && minRating === 0 && (
        <>
          <CarouselSection title="Upcoming Movies" items={upcomingMovies} />
          <CarouselSection title="Popular TV Shows" items={tvShows} />
        </>
      )}
      {selectedGenres.length === 0 && !showTopRated && minRating === 0 && (
        <h2 className="text-2xl font-bold px-8 pt-6  text-black dark:text-white">
          Popular Movies
        </h2>
      )}

      <div className="min-h-screen p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-white dark:bg-black">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
