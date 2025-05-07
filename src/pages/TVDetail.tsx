import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTVTrailer,
  getSimilarTVShows,
  getTVReviews,
  getTVCredits,
} from "../services/tmdb";
import SimilarMovies from "../components/SimilarMovies"; // Rename later if needed
import RecentMovies from "../components/RecentMovies";

interface TVDetail {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  backdrop_path: string;
}

function TVDetail() {
  const { id } = useParams();
  const [tv, setTV] = useState<TVDetail | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [similarTV, setSimilarTV] = useState<TVDetail[]>([]);
  const [recentTV, setRecentTV] = useState<TVDetail[]>([]);
  const [credits, setCredits] = useState<{ cast: any[]; crew: any[] } | null>(
    null
  );
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchTV = async () => {
      if (id) {
        const data = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
        ).then((res) => res.json());
        setTV(data);

        const trailer = await getTVTrailer(id);
        setTrailerKey(trailer);

        const similar = await getSimilarTVShows(id);
        setSimilarTV(similar);

        const creditsData = await getTVCredits(id);
        setCredits(creditsData);

        const fetchedReviews = await getTVReviews(id);
        setReviews(fetchedReviews);
      }
    };
    fetchTV();
  }, [id]);

  useEffect(() => {
    if (tv) {
      const visited = JSON.parse(localStorage.getItem("visitedTV") || "[]");
      const index = visited.findIndex((m: TVDetail) => m.id === tv.id);
      if (index !== -1) visited.splice(index, 1);
      visited.unshift(tv);
      if (visited.length > 10) visited.pop();
      localStorage.setItem("visitedTV", JSON.stringify(visited));
    }
  }, [tv]);

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("visitedTV") || "[]");
    setRecentTV(visited);
  }, [tv]);

  if (!tv) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={tv.name}
          className="w-full md:w-[300px] rounded shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{tv.name}</h1>
          <p className="text-yellow-400 text-lg mb-2">
            ⭐ {tv.vote_average.toFixed(1)}
          </p>
          <p className="italic text-gray-300 mb-4">
            📅 First Air Date: {tv.first_air_date}
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">{tv.overview}</p>
          {credits && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                🎭 Cast & Crew
              </h2>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Cast:</span>{" "}
                {credits.cast.slice(0, 5).map((actor, index) => (
                  <span key={actor.id} className="text-yellow-400">
                    {actor.name}
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
              title="TV Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
      {reviews.length > 0 && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">💬 Reviews</h2>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="bg-white/10 p-4 rounded-lg shadow-md"
              >
                <p className="text-yellow-400 font-semibold mb-1">
                  {review.author}
                </p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <SimilarMovies movies={similarTV as any} />
      <RecentMovies movies={recentTV as any} />
    </div>
  );
}

export default TVDetail;
