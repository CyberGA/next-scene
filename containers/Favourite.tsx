"use client";

import MoviewPreviewCard from "@/components/MoviePreviewCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useMovieProvider } from "@/providers/MovieProvider";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Favourite(): React.ReactNode {
  const { favorites } = useMovieProvider();
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 1000);

  if (favorites.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-5">
        <h1 className="text-4xl font-bold text-center">No Favourites</h1>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-20 z-10 bg-background/90 backdrop-blur-lg mx-auto rounded-b-2xl p-4 w-full max-w-md">
        <div className="flex items-center gap-2 border rounded-full bg-background/90 pr-2">
          <input
            type="text"
            value={searchValue}
            placeholder="Search for movies..."
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-transparent px-4 py-2 text-lg placeholder-black/40 focus:outline-none text-black"
          />
          <Search className="size-6 text-red-base" />
        </div>
      </div>
      <div className="grid grid-cols-1 min-[460px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto place-items-center gap-4 px-6 py-5">
        {favorites
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((movie, index) => (
            <MoviewPreviewCard key={index} movie={movie} />
          ))}
      </div>
    </div>
  );
}
