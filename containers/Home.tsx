"use client";

import MoviewPreviewCard from "@/components/MoviePreviewCard";
import { MovieData } from "@/definitions/movie.interface";
import { useDebounce } from "@/hooks/useDebounce";
import { useMovieProvider } from "@/providers/MovieProvider";
import axios, { AxiosError } from "axios";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home(): React.ReactNode {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean | "end">(false);
  const { movies, setMovies } = useMovieProvider();
  const moviesRef = useRef<MovieData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchQuery = useDebounce(searchValue, 1000);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementObserver = useCallback(
    (node: HTMLDivElement) => {
      if (searchQuery.length > 0 || loading === true || loading === "end")
        return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchPopularMovies();
          }
        },
        {
          threshold: 1.0,
        }
      );

      if (node) observer.current.observe(node);
    },
    [[page, loading]]
  );

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/movies/popular?page=${page}`);
      if (result) {
        if ((result.data as MovieData[]).length === 0) {
          setLoading("end");
          return;
        }
        setMovies([...movies, ...(result.data as MovieData[])]);
        moviesRef.current = [
          ...moviesRef.current,
          ...(result.data as MovieData[]),
        ];
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error: AxiosError = err;
        if (error.response) {
          alert(error.response.data);
        } else {
          alert(error.message);
        }
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      fetchPopularMovies();
    } else {
      moviesRef.current = movies;
      setPage(movies.length / 20 + 1);
    }
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      if (movies.length === moviesRef.current.length) return;
      setMovies(moviesRef.current);
      return;
    }
    const filteredMovies = moviesRef.current.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMovies(filteredMovies);
  }, [searchQuery, moviesRef.current]);

  if (movies.length === 0) {
    return (
      <div className="grid grid-cols-1 min-[460px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto place-items-center gap-4 px-6 py-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="w-full max-w-[300px] h-[350px] bg-gray-300 animate-pulse rounded-lg"
          ></div>
        ))}
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
        {movies.map((movie, index) => (
          <MoviewPreviewCard
            key={index}
            ref={index === movies.length - 1 ? lastElementObserver : null}
            movie={movie}
          />
        ))}
      </div>

      {loading && movies.length > 0 && (
        <p className="mb-5 mx-auto shadow-lg px-6 py-3 border bg-white text-black/70 text-center w-fit rounded-lg">
          Loading more...
        </p>
      )}
    </div>
  );
}
