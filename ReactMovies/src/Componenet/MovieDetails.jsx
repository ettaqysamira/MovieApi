import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'

const MovieDetails = ({ movie, trailerUrl }) => {
  const title = movie?.title || "Titre inconnu"
  const overview = movie?.overview || "Aucune description."

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white flex flex-col justify-center items-center p-4 rounded-xl z-40">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 mb-2">
        {overview.length > 100
          ? overview.substring(0, 100) + "..."
          : overview}
      </p>
      {trailerUrl ? (
        <div className="w-full h-36 relative">
          <ReactPlayer
            url={trailerUrl}
            width="100%"
            height="100%"
            controls 
            className="rounded-lg"
          />
        </div>
      ) : (
        <p className="text-gray-400">Aucun trailer trouvé</p>
      )}
    </div>
  )
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
  trailerUrl: PropTypes.string,
}

export default MovieDetails
