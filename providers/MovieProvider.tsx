"use client";

import { MovieData } from "@/definitions/movie.interface";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface MovieContextType {
  movies: MovieData[];
  setMovies: React.Dispatch<React.SetStateAction<MovieData[]>>;
  favorites: MovieData[];
  setFavorites: React.Dispatch<React.SetStateAction<MovieData[]>>;
  isMobile: boolean;
}

const MovieContext = createContext<MovieContextType | null>(null);

export default function MovieProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [favorites, setFavorites] = useState<MovieData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const value = useMemo(
    () => ({ movies, setMovies, favorites, setFavorites, isMobile }),
    [movies, setMovies, favorites, setFavorites, isMobile]
  );

  const getFavourites = () => {
    const res = localStorage.getItem("favourites");
    if (res) {
      const favourites = JSON.parse(res);
      setFavorites(favourites);
    }
  };

  useEffect(() => {
    getFavourites();

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  }, []);

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovieProvider() {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovieProvider must be used within MovieProvider");
  return context;
}
