import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa"
import MovieDetails from "./MovieDetails"

const API_KEY = "9358d6e4ce985a8bcd7b6f5ba7160bae"
const MAIN_URL = "https://api.themoviedb.org/3"
const API_ALL_MOVIES = `${MAIN_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`
const API_SEARCH_MOVIES = `${MAIN_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=`


const FetchApiTMDB = () => {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [hoveredMovie, setHoveredMovie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchMovies(API_ALL_MOVIES)
  }, [])

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error)
    }
  }

  const searchMovies = (e) => {
    const searchStr = e.target.value;
    setQuery(searchStr)

    if (searchStr.length > 1) {
      fetchMovies(API_SEARCH_MOVIES + encodeURIComponent(searchStr));
    } else {
      fetchMovies(API_ALL_MOVIES)
    }
  }

  const getTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `${MAIN_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      const trailer = data.results.find((vid) => vid.type === "Trailer")

      setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null)
    } catch (error) {
      console.error("Error récupération du trailer :", error)
    }
  }

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId) 
        : [...prev, movieId]
    )
  }

  return (
    <div className="w mx-auto">
      <h1 className="text-center text-2xl font-bold my-4 text-red-700 pt-7">
        Movies
      </h1>

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
            <div key={movie.id} className="relative w-60 h-96 m-3">

              <div
                className="relative w-full h-full cursor-pointer"
                onMouseEnter={() => {
                  setHoveredMovie(movie);
                  getTrailer(movie.id);
                }}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full rounded-xl"
                />

                {hoveredMovie?.id === movie.id && (
                  <MovieDetails
                    movie={movie}
                    trailerUrl={trailerUrl}
                  />
                )}
              </div>

              <button
                onClick={() => toggleFavorite(movie.id)}
                className="absolute bottom-3 left-52 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-full p-2 z-50"
              >
                {favorites.includes(movie.id) ? (
                  <FaHeart className="size-7 text-red-500" />
                ) : (
                  <FaRegHeart className="size-7 text-white" />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun film trouvé</p>
        )}
      </div>
    </div>
  )
}

export default FetchApiTMDB
