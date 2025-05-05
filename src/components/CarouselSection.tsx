// src/components/CarouselSection.tsx
import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselSectionProps {
  title: string;
  items: any[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="px-8 overflow-h-auto py-6 relative bg-white dark:bg-black custom-scrollbar">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        {title}
      </h2>
      <button
        onClick={scrollLeft}
        className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10 bg-black/50 dark:bg-white/20 text-white dark:text-black p-2 rounded-full hover:bg-black/70 dark:hover:bg-white/40 left-2"
      >
        <FaChevronLeft />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide px-1 sm:px-0"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px]"
          >
            <MovieCard movie={item} type={item.name ? "tv" : "movie"} />
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="hidden sm:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-10 bg-black/50 dark:bg-white/20 text-white dark:text-black p-2 rounded-full hover:bg-black/70 dark:hover:bg-white/40 right-2"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CarouselSection;
