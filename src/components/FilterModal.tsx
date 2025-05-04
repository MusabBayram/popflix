import React from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  showTopRated: boolean;
  includeRecent: boolean;
  onToggleTopRated: () => void;
  onToggleRecent: () => void;
  selectedGenres: string[];
  onGenreChange: (genre: string) => void;
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
}) => {
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
      </div>
    </div>
  );
};

export default FilterModal;
