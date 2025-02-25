import React, { useState, useEffect } from 'react'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(savedFavorites)
  }, [])

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
          <p className="text-center">Aucun film en favoris.</p>
        )}
      </div>
    </>
  )
}

export default Favorites
