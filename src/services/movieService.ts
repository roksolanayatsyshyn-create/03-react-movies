import axios from "axios";
import type { Movie } from "../types/movie.ts";

export interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
async function fetchMovies(movie: string) {
  const url = "https://api.themoviedb.org/3/search/movie?";
  const options = {
    params: {
      query: movie,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };
  const res = await axios.get<FetchMoviesResponse>(url, options);
  return res.data;
}

export default fetchMovies;
