"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TMDB_Endpoints } from "@/services/request.service";
import { Heart, PlayCircle, Presentation, Rocket, Star, X } from "lucide-react";
import {
  MovieData,
  MovieDetailsData,
  MovieTeaserData,
} from "@/definitions/movie.interface";
import axios, { AxiosError } from "axios";
import { useMovieProvider } from "@/providers/MovieProvider";

export default function MovieDetails({ id }: { id: string }): React.ReactNode {
  const [details, setDetails] = useState<MovieDetailsData | null>(null);
  const [teasers, setTeasers] = useState<MovieTeaserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [trailerSrc, setTrailerSrc] = useState<string | null>(null);

  const { favorites, setFavorites, isMobile } = useMovieProvider();

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
      const result = await axios.get(`/movie?movie_id=${id}`);
      if (result) {
        setDetails(result.data as MovieDetailsData);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error: AxiosError = err;
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error(error.message);
        }
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const getMovieTeaser = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/movie/teaser?movie_id=${id}`);
      if (result) {
        const data = result.data as MovieTeaserData[];
        setTeasers(data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error: AxiosError = err;
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error(error.message);
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
    getMovieTeaser();
  }, []);

  useEffect(() => {
    const src = teasers.find((teaser) => teaser.type === "Trailer")?.key;
    if (src) {
      setTrailerSrc(src);
    }
  }, [teasers]);

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
    <div className="relative px-4 py-5">
      <div className="flex items-center lg:flex-row flex-col gap-8 max-w-7xl mx-auto relative z-0">
        <div className="flex justify-center w-full min-h-[350px] max-w-[500px] relative group/image rounded-lg overflow-hidden">
          <Image
            src={`${TMDB_Endpoints.img_url}${details?.poster_path}`}
            alt={details?.title ?? "Movie title"}
            width={500}
            height={100}
            placeholder="blur"
            blurDataURL={`${TMDB_Endpoints.img_url}${details?.poster_path}`}
            className="max-w-[500px] w-full h-auto object-cover rounded-lg relative"
          />
          <div
            className={`items-center justify-center absolute z-[1] inset-0 bg-black/50 group-hover/image:flex animate-fadeInZoomFast ${
              isMobile ? "flex" : "hidden"
            }`}
          >
            <PlayCircle
              className="size-20 text-red-base cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
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

      {open && trailerSrc && (
        <div className="fixed z-20 top-20 inset-0 bg-white/50">
          <X
            className="text-red-base size-12 p-2 cursor-pointer mt-4 ml-auto mr-10 bg-white border rounded-full hover:shadow-md"
            onClick={() => setOpen(false)}
          />
          <div className="rounded-lg mt-5 sm:mt-0">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerSrc}`}
              title="YouTube video player"
              className="w-4/5 max-w-full h-[50vh] sm:h-[70vh] max-h-full mx-auto rounded-xl"
              // frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              // referrerpolicy="strict-origin-when-cross-origin"
              // allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
