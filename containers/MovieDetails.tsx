"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TMDB_Endpoints } from "@/services/request.service";
import { Heart, Presentation, Rocket, Star } from "lucide-react";
import { MovieData, MovieDetailsData } from "@/definitions/movie.interface";
import axios, { AxiosError } from "axios";
import { useMovieProvider } from "@/providers/MovieProvider";

export default function MovieDetails({ id }: { id: string }): React.ReactNode {
  const [details, setDetails] = useState<MovieDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { favorites, setFavorites } = useMovieProvider();

  const isFavourite = favorites.some((fav) => fav.id.toString() === id);

  const handleToggleFavourite = () => {
    if (isFavourite) {
      const newFavourites = favorites.filter((fav) => fav.id.toString() !== id);
      setFavorites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    } else {
      const movie: MovieData = {
        id: Number(id),
        title: details?.title ?? "",
        poster_path: details?.poster_path ?? "",
        overview: details?.overview ?? "",
        release_date: details?.release_date ?? "",
        vote_average: details?.vote_average ?? 0,
        backdrop_path: details?.backdrop_path ?? "",
        genre_ids: details?.genres.map((genre) => genre.id) ?? [],
        vote_count: details?.vote_count ?? 0,
        adult: details?.adult ?? false,
        original_language: details?.original_language ?? "",
        original_title: details?.original_title ?? "",
        popularity: details?.popularity ?? 0,
        video: details?.video ?? false,
      };
      setFavorites([...favorites, movie]);
      localStorage.setItem("favourites", JSON.stringify([...favorites, movie]));
    }
  };

  const getMovieDetails = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/movies/?movie_id=${id}`);
      if (result) {
        setDetails(result.data as MovieDetailsData);
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
    getMovieDetails();
  }, []);

  if (loading || !details) {
    return (
      <div className="px-4 pt-5">
        <div className="flex items-center lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
          <div className="w-[500px] h-[700px] bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="flex-grow space-y-3 py-4">
            <div className="w-full h-16 bg-gray-300 animate-pulse rounded"></div>
            <div className="mt-3 w-full h-40 bg-gray-300 animate-pulse rounded"></div>
            <div className="mt-0.5 w-full h-40 bg-gray-300 animate-pulse rounded"></div>
            <div className="mt-0.5 w-80 h-7 bg-gray-300 animate-pulse rounded"></div>
            <div className="mt-0.5 w-80 h-7 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-5">
      <div className="flex items-center lg:flex-row flex-col gap-8 max-w-7xl mx-auto">
        <Image
          src={`${TMDB_Endpoints.img_url}${details?.poster_path}`}
          alt={details?.title ?? "Movie title"}
          width={500}
          height={100}
          className="max-w-[500px] w-full h-auto object-cover rounded-lg"
        />
        <div className="space-y-3 py-4 w-full max-w-[500px] lg:max-w-full">
          <div className="flex justify-end">
            <button
              title={
                isFavourite ? "Remove from favourites" : "Add to favourites"
              }
              onClick={handleToggleFavourite}
              className="flex items-center gap-1 focus-visible:outline-none"
            >
              <Heart
                className={`size-6 text-red-base ${
                  isFavourite ? "fill-red-base" : ""
                }`}
              />
              <span>
                {isFavourite ? "Remove from favourites" : "Add to favourites"}
              </span>
            </button>
          </div>
          <h1 className="text-4xl sm:text-7xl font-bold">{details?.title}</h1>
          <p className="text-lg">{details?.overview}</p>
          <div className="flex items-center gap-1 mt-3">
            <Rocket className="size-6" />
            <p className="text-lg">Released on {details?.release_date}</p>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="size-6 text-yellow-400" />
            <p className="text-lg">Rating {details?.vote_average}</p>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Presentation className="size-6 text-red-base" />
            <p className="text-lg">{details?.runtime} mins</p>
          </div>
          <div className="mt-3">
            <h2 className="text-xl sm:text-3xl font-bold">Genres</h2>
            <div className="flex gap-2">
              {details?.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-2 py-1 bg-gray-200 text-black rounded-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <h2 className="text-xl sm:text-3xl font-bold">
                Production Companies
              </h2>
              <div className="flex gap-2 flex-wrap">
                {details?.production_companies.map((company) => (
                  <span
                    key={company.id}
                    className="px-2 py-1 bg-gray-200 text-black rounded-md"
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-xl sm:text-3xl font-bold">
                Spoken Languages
              </h2>
              <div className="flex gap-2 flex-wrap">
                {details?.spoken_languages.map((language) => (
                  <span
                    key={language.iso_639_1}
                    className="px-2 py-1 bg-gray-200 text-black rounded-md"
                  >
                    {language.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
