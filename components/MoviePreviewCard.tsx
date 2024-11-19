"use client";

import { MovieData } from "@/definitions/movie.interface";
import { useMovieProvider } from "@/providers/MovieProvider";
import { TMDB_Endpoints } from "@/services/request.service";
import { Expand, Heart, Rocket, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useState } from "react";

const MoviewPreviewCard = forwardRef<HTMLDivElement, { movie: MovieData }>(
  ({ movie }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const { favorites, setFavorites, isMobile } = useMovieProvider();

    const isFavourite = favorites.some((fav) => fav.id === movie.id);

    const handleToggleFavourite = () => {
      if (isFavourite) {
        const newFavourites = favorites.filter((fav) => fav.id !== movie.id);
        setFavorites(newFavourites);
        localStorage.setItem("favourites", JSON.stringify(newFavourites));
      } else {
        setFavorites([...favorites, movie]);
        localStorage.setItem(
          "favourites",
          JSON.stringify([...favorites, movie])
        );
      }
    };

    return (
      <div
        ref={ref}
        className="min-w-[200px] h-fit rounded-lg relative hover:shadow-md duration-300 overflow-hidden group/preview"
      >
        {!loaded && (
          <div className="absolute z-[1] w-[300px] h-[450px] bg-gray-300 animate-pulse rounded-lg"></div>
        )}

        <Image
          src={`${TMDB_Endpoints.img_url}${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={200}
          className="relative group-hover/preview:scale-105 duration-300"
          onLoad={() => setLoaded(true)}
        />
        <button
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          onClick={handleToggleFavourite}
          className={`absolute top-3 right-3 focus-visible:outline-none group-hover/preview:block animate-fadeInZoomFast rounded-full p-2 bg-white ${
            isMobile ? "block" : "hidden"
          }`}
        >
          <Heart
            className={`size-6 text-red-base ${
              isFavourite ? "fill-red-base" : ""
            }`}
          />
        </button>
        <Link href={`/movie/${movie.id}`}>
          <button
            title="View details"
            className={`absolute top-3 left-3 focus-visible:outline-none group-hover/preview:block animate-fadeInZoomFast rounded-full p-2 bg-white ${
              isMobile ? "block" : "hidden"
            }`}
          >
            <Expand className="size-5 text-red-base" />
          </button>
        </Link>
        <div
          className={`absolute z-[1] bottom-3 inset-x-2 h-fit max-h-[80%] text-white p-2  bg-black/20 backdrop-blur-xl backdrop-invert rounded-xl ease-in-out group-hover/preview:translate-y-0 duration-300 ${
            isMobile ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="text-center max-w-60 font-bold text-white mx-auto">
            {movie.title}
          </p>
          <p className="text-center text-sm font-medium mx-auto line-clamp-3 mt-2">
            {movie.overview}
          </p>
          <div className="flex justify-end items-center gap-1 mt-3 text-white">
            <Rocket className="size-4" />
            <p className="text-sm">Released on {movie.release_date}</p>
          </div>
          <div className="flex justify-end items-center gap-1 mt-0.5 text-white">
            <Star className="size-4 text-yellow-400" />
            <p className="text-sm">Rating {movie.vote_average}</p>
          </div>
        </div>
      </div>
    );
  }
);
MoviewPreviewCard.displayName = "MoviewPreviewCard";
export default MoviewPreviewCard;
