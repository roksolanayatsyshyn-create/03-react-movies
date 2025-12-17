import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import {MovieGrid} from "./MovieGrid/MovieGrid";
import  MovieModal from "./MovieModal/MovieModal";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import fetchMovies from "./services/movieServices.ts";
import type { Movie } from "./types/movies";

function App() {
   const [movies, setMovies] = useState<Movie[]>([]);
   const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);



  const handleSearch = async (query: string) => {
  setMovies([]);
  setIsLoading(true);
  setIsError(false);

  try {
    const data = await fetchMovies(query);

    if (!data || !Array.isArray(data.results)) {
      toast("Something went wrong. Please try again.");
      return;
    }

    if (data.results.length === 0) {
      toast("No movies found for your request.");
      return;
    }

    setMovies(data.results);
  } catch (error) {
    console.error( error);
    setIsError(true);}
    finally{
      setIsLoading(false)
    }
};

  return (
    
  <div className={css.app}>
    <SearchBar onSubmit={handleSearch} />
    <Toaster position="top-right" />

    {isLoading && <Loader/>}
    {isError && <ErrorMessage />}

    {!isLoading && !isError && movies.length > 0 && (
      <MovieGrid
        movies={movies}
        onSelect={(movie) => setSelectedMovie(movie)}
      />
    )}

    {selectedMovie && (
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    )}
  </div>
);
}
export default App;
