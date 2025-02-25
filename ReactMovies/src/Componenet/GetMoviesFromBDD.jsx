import React, { useState, useEffect } from 'react'
import { FaRegHeart } from "react-icons/fa"
import axios from 'axios'

const GetMoviesFromBDD = () => {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:5000/api/movies')
      setMovies(response.data)
    }

    fetchMovies()

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(savedFavorites)
  }, [])

  const clickFavorite = (movie) => {
    let ModifierFavorites = favorites.slice()  
    if (favorites.some(fav => fav._id === movie._id)) {
      ModifierFavorites = ModifierFavorites.filter(fav => fav._id !== movie._id)
    } else {
      ModifierFavorites.push(movie)
    }
    setFavorites(ModifierFavorites)
    localStorage.setItem('favorites', JSON.stringify(ModifierFavorites))
  }
  

  return (
    <>
      <h2 className="text-center text-2xl font-bold my-4">Movies Added</h2>
      

      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <div key={movie._id} className="w-60 h-96 m-3">
            <img src={movie.imageUrl} alt={movie.title} className="w-full h-5/6 rounded-xl"/>
            <div onClick={() => clickFavorite(movie)}>
        <FaRegHeart 
                className={`size-7 float-right my-4 cursor-pointer ${favorites.some(fav => fav._id === movie._id) ? 'text-red-700' : 'text-white'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default GetMoviesFromBDD
              