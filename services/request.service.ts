import axios from "axios";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

//& Getting different movie types
export const TMDB_Endpoints = {
  baseURL: "https://api.themoviedb.org/3",
  img_url: "https://image.tmdb.org/t/p/original",
  fetchPopular: `/movie/popular?language=en-US`,
  fetchMovie: `/movie`,
};

//& axios instance for consuming api
export const TMDB_Request = axios.create({
  baseURL: TMDB_Endpoints.baseURL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
});
