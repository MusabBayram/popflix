import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPersonDetails,
  getPersonCredits,
  getPersonExternalIds,
} from "../services/tmdb";

interface PersonDetail {
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

function PersonDetailPage() {
  const { id } = useParams();
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [credits, setCredits] = useState<Movie[]>([]);
  const [externalIds, setExternalIds] = useState<{ imdb_id?: string } | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const personData = await getPersonDetails(id);
        setPerson(personData);
        const creditsData = await getPersonCredits(id);
        setCredits(creditsData);
        const externalIdsData = await getPersonExternalIds(id);
        setExternalIds(externalIdsData);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const personData = await getPersonDetails(id);
        console.log("Person Data:", personData);
        setPerson(personData);

        const creditsData = await getPersonCredits(id);
        console.log("Person Credits:", creditsData);
        setCredits(creditsData);
      }
    };
    fetchData();
  }, [id]);

  if (!person) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_2fr] gap-10">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            className="rounded-lg shadow-2xl ring-2 ring-yellow-400 w-[250px] hover:scale-105 transition-transform"
          />
          {externalIds?.imdb_id && (
            <a
              href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-yellow-400 text-black dark:text-black dark:bg-yellow-400 rounded hover:bg-yellow-300 transition-colors font-semibold"
            >
              🎥 View on IMDb
            </a>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            🎂 {person.birthday}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            📍 {person.place_of_birth}
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold mb-4">{person.name}</h1>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
            Biography
          </h2>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed max-h-[400px] overflow-y-auto mb-6 custom-scrollbar">
            {person.biography || "No biography available."}
          </p>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            🎬 Known For
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {credits.slice(0, 8).map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="hover:scale-105 transition-transform duration-300 text-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded shadow-lg"
                />
                <p className="text-sm mt-2 text-black dark:text-white">
                  {movie.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetailPage;
