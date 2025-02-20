import { useState, useEffect } from "react";

const API_KEY = "9358d6e4ce985a8bcd7b6f5ba7160bae";
const MAIN_URL = "https://api.themoviedb.org/3";
const API_ALL_MOVIES = `${MAIN_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`;
const API_SEARCH_MOVIES = `${MAIN_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`;

const FetchApiTMDB = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMovies(API_ALL_MOVIES)
  }, []);

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error)
    }
  }

  const searchMovies = (e) => {
    const searchStr = e.target.value
    setQuery(searchStr)

    if (searchStr.length > 1) {
      fetchMovies(API_SEARCH_MOVIES + encodeURIComponent(searchStr))
    } else {
      fetchMovies(API_ALL_MOVIES)
    }
  }

  return (
    <div className="w mx-auto">
      <h1 className="text-center text-2xl font-bold my-4">Movies</h1>

      
      <div className="text-center mb-4">
        <input
          type="text"
          value={query}
          onChange={searchMovies}
          placeholder="Rechercher un film..."
          className="border border-gray-400 rounded px-4 py-2 w-1/2"
        />
      </div>

      
      <div className="flex flex-wrap justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="w-52 m-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-xl"
              />
              <h3 className="text-center mt-2">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun film trouvé</p>
        )}
      </div>
    </div>
  );
};

export default FetchApiTMDB
