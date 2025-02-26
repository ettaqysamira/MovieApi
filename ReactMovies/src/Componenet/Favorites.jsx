import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/movies/favorites')
      setFavorites(response.data)
    } catch (error) {
      console.error("Error get favoris :", error)
    }
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold my-4">Movies Favoris</h2>
      <div className="flex flex-wrap justify-center">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie._id} className="w-60 h-96 m-3">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-5/6 rounded-xl"/>
            </div>
          ))
        ) : (
          <p className="text-center">Aucun film en favoris</p>
        )}
      </div>
    </>
  );
};

export default Favorites
