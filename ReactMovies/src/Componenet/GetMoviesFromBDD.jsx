import React, { useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa"
import axios from 'axios'

const GetMoviesFromBDD = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies')
      setMovies(response.data)
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
        {movies.map((movie) => (
          <div key={movie._id} className="w-60 h-96 m-3">
            <img src={movie.imageUrl} alt={movie.title} className="w-full h-5/6 rounded-xl"/>
            <div onClick={() => ClickFavorite(movie._id)}>
              <FaRegHeart 
                className={`size-7 float-right my-4 cursor-pointer ${movie.MovieIsFavorite ? 'text-red-700' : 'text-white'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default GetMoviesFromBDD;
