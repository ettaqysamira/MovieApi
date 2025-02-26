import React, { useState } from 'react';
import axios from 'axios'

const AddMovieForm = () => {
    const [movie, setMovie] = useState({ title: '', imageUrl: '', description: '', trailerUrl: '' })

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/movies', movie)
            if (response.status === 200) {
                alert('Movie added')
                setMovie({ title: '', imageUrl: '', description: '', trailerUrl: '' })
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error')
        }
    };

    return (
        <form className="w-1/2 mx-auto my-12 p-6 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    placeholder="Enter movie title"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={movie.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Description:</label>
                <textarea
                    name="description"
                    value={movie.description}
                    onChange={handleChange}
                    placeholder="Enter movie description"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold text-white">Trailer URL:</label>
                <input
                    type="text"
                    name="trailerUrl"
                    value={movie.trailerUrl}
                    onChange={handleChange}
                    placeholder="Enter trailer URL (YouTube link)"
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 mt-5">
                Add Movie
            </button>
        </form>
    );
};

export default AddMovieForm
