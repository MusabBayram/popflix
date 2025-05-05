import { useSearchParams } from "react-router-dom";
import { searchMovies, searchPeople } from "../services/tmdb";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface Person {
  id: number;
  name: string;
  profile_path: string;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);
  const [peopleResults, setPeopleResults] = useState<Person[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        const movies = await searchMovies(query);
        const people = await searchPeople(query);
        setResults(movies);
        setPeopleResults(people);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="p-8 bg-white dark:bg-black min-h-screen">
      {peopleResults.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-black dark:text-white my-4">
            Actors & Actresses
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
            {peopleResults
              .filter((person) => person.profile_path)
              .map((person) => (
                <Link key={person.id} to={`/person/${person.id}`}>
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                          : "/default-profile.png"
                      }
                      alt={person.name}
                      className="rounded-full w-28 h-28 object-cover mb-2 border-2 border-yellow-400"
                    />
                    <span className="text-center text-sm text-black dark:text-white">
                      {person.name}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      {results.length === 0 ? (
        <p className="text-black dark:text-white text-center text-xl mt-8">
          No results found.
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
