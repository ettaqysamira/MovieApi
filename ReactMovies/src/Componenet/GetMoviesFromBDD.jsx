import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa"
import axios from 'axios'
import ReactPlayer from 'react-player'

const GetMoviesFromBDD = () => {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null); 

  useEffect(() => {
    fetchMovies();
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies')
      setMovies(response.data);
    } catch (error) {
      console.error("Erreur get movie :", error)
    }
  }

  const ClickFavorite = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/movies/favorite/${id}`)
      fetchMovies()
    } catch (error) {
      console.error("Erreur update favori:", error)
    }
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold my-4">Movies Added</h2>

      <div className="flex flex-wrap justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="w-60 h-80 m-3 relative group"
              onMouseEnter={() => setHoveredMovie(movie._id)} 
              onMouseLeave={() => setHoveredMovie(null)} 
            >

              {movie.imageUrl && (
                <img
                  src={movie.imageUrl}
                  alt={movie.title || "Movie Image"}
                  className="w-full h-full rounded-xl transition-opacity duration-300"
                />
              )}

              <div
                className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-4 rounded-xl transition-opacity duration-300`}
              >
                <h3 className="text-lg font-bold text-white">{movie.title || "No title"}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  {movie.description && movie.description.length > 100
                    ? movie.description.substring(0, 100) + "..."
                    : movie.description || "No description available"}
                </p>
                {movie.trailerUrl && (
                  <div className="w-full h-36 relative">

                    <ReactPlayer
                      url={movie.trailerUrl}
                      width="100%"
                      height="100%"
                      controls
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div onClick={() => ClickFavorite(movie._id)}>
                <FaHeart
                  className={`size-7 float-right my-4 cursor-pointer ${
                    movie.MovieIsFavorite ? 'text-red-700' : 'text-white'
                  }`}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun film trouvé</p>
        )}
      </div>
    </>
  );
};

export default GetMoviesFromBDD
