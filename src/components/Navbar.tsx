import FilterModal from "./FilterModal";
import { useNavigate, Link } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuery = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState(currentQuery);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [hasFavorites, setHasFavorites] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showTopRated, setShowTopRated] = useState(false);
  const [includeRecent, setIncludeRecent] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favs = JSON.parse(stored) as number[];
      setHasFavorites(favs.length > 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  // Custom handlers to update state and URL for filters
  const handleToggleTopRated = () => {
    const newVal = !showTopRated;
    setShowTopRated(newVal);
    const params = new URLSearchParams(location.search);
    if (newVal) {
      params.set("topRated", "true");
    } else {
      params.delete("topRated");
    }
    navigate(`/?${params.toString()}`);
  };

  const handleToggleRecent = () => {
    const newVal = !includeRecent;
    setIncludeRecent(newVal);
    const params = new URLSearchParams(location.search);
    if (newVal) {
      params.set("recent", "true");
    } else {
      params.delete("recent");
    }
    navigate(`/?${params.toString()}`);
  };

  const handleGenreChange = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);

    const params = new URLSearchParams(location.search);
    if (updatedGenres.length) {
      params.set("genres", updatedGenres.join(","));
    } else {
      params.delete("genres");
    }
    navigate(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="flex items-center gap-2 absolute top-8 -translate-y-1/2 right-4 z-50">
        <span
          onClick={() =>
            location.pathname === "/favorites"
              ? navigate("/")
              : navigate("/favorites")
          }
          className="cursor-pointer text-2xl text-black dark:text-white hover:scale-110 transition"
        >
          {location.pathname === "/favorites" ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
        </span>
        <span
          onClick={() => setIsFilterOpen(true)}
          className="cursor-pointer text-2xl text-black dark:text-white hover:scale-110 transition"
          title="Filter"
        >
          <BiFilter />
        </span>
        <label className="inline-flex items-center cursor-pointer relative self-center">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-400 peer-checked:bg-yellow-400 relative after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-6">
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] text-yellow-500 z-10">
              ☀️
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white z-10">
              🌙
            </span>
          </div>
        </label>
      </div>
      <nav className="relative bg-[#f8f9fa] dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 text-black dark:text-white px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto relative">
          {/* Flex Row for Desktop, Column for Mobile */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Logo & Favoriler Link */}
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold tracking-wide">
                🎬 Popflix
              </Link>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto"
            >
              <input
                type="text"
                placeholder={
                  currentQuery
                    ? `"${currentQuery}" search results...`
                    : "Search for a movie..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring focus:ring-yellow-400 w-full md:w-[400px]"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition w-full sm:w-auto"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        showTopRated={showTopRated}
        includeRecent={includeRecent}
        onToggleTopRated={handleToggleTopRated}
        onToggleRecent={handleToggleRecent}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
        minRating={minRating}
        onMinRatingChange={(value) => {
          const params = new URLSearchParams(location.search);
          if (value > 0) {
            params.set("minRating", value.toString());
          } else {
            params.delete("minRating");
          }
          navigate(`/?${params.toString()}`);
          setMinRating(value);
        }}
      />
    </>
  );
};

export default Navbar;
