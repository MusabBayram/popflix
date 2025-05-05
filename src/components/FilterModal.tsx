import React, { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  showTopRated: boolean;
  includeRecent: boolean;
  onToggleTopRated: () => void;
  onToggleRecent: () => void;
  selectedGenres: string[];
  onGenreChange: (genre: string) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  showTopRated,
  includeRecent,
  onToggleTopRated,
  onToggleRecent,
  selectedGenres,
  onGenreChange,
  minRating,
  onMinRatingChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-50`}
      onClick={onClose}
    >
      <div
        className={`h-full w-80 bg-white dark:bg-gray-900 text-black dark:text-white p-6 shadow-xl border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button for small screens */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-4 text-2xl text-gray-700 dark:text-white sm:hidden"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="space-y-2 mb-4">
          <label className="flex items-center text-sm cursor-pointer space-x-2">
            <input
              type="checkbox"
              id="checkbox-top-rated"
              className="peer hidden"
              checked={showTopRated}
              onChange={onToggleTopRated}
            />
            <div className="w-5 h-5 rounded border-2 border-gray-400 peer-checked:bg-gray-700 peer-checked:border-gray-700 dark:border-white dark:peer-checked:border-white dark:peer-checked:bg-white flex items-center justify-center transition-colors duration-200"></div>
            <span>Show only top-rated movies</span>
          </label>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Genres</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"].map(
              (genre) => (
                <label
                  key={genre}
                  className="flex items-center text-sm cursor-pointer space-x-2"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${genre}`}
                    className="peer hidden"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => onGenreChange(genre)}
                  />
                  <div className="w-5 h-5 rounded border-2 border-gray-400 peer-checked:bg-gray-700 peer-checked:border-gray-700 dark:border-white dark:peer-checked:border-white dark:peer-checked:bg-white flex items-center justify-center transition-colors duration-200"></div>
                  <span>{genre}</span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Minimum Rating</h4>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => onMinRatingChange(rating)}
                onMouseEnter={() => setHoverRating(rating)}
                onMouseLeave={() => setHoverRating(0)}
                className={`text-xl group hover:text-yellow-500 transition-transform duration-150 focus:outline-none relative`}
                aria-label={`Minimum rating ${rating}`}
              >
                <span
                  className={`block transition-transform duration-150 ${
                    hoverRating
                      ? rating <= hoverRating
                        ? "text-yellow-500 scale-125"
                        : "text-gray-400"
                      : rating <= minRating
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-200 font-medium">
            Selected Minimum Rating: {minRating > 0 ? minRating : "Not set"}
          </p>
          {minRating > 0 && (
            <button
              onClick={() => onMinRatingChange(0)}
              className="mt-2 text-xs text-red-500 hover:underline transition duration-150"
            >
              Reset Rating Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
