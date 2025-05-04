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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow-md w-80 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg">
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={showTopRated}
              onChange={onToggleTopRated}
            />
            Show only top-rated movies
          </label>
          <label className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={includeRecent}
              onChange={onToggleRecent}
            />
            Include recently viewed
          </label>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Genres</h4>
          <div className="grid grid-cols-2 gap-2">
            {["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"].map(
              (genre) => (
                <label key={genre} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => onGenreChange(genre)}
                  />
                  {genre}
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
