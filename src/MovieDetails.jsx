import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Usamos la misma llave de TMDB que ya tienes configurada
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX`);
      const data = await response.json();
      setMovie(data);
    };
    
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="mt-20 text-center text-white">Cargando platillo...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <Link to="/" className="mb-6 inline-block text-blue-400 hover:underline">
        &larr; Volver al explorador
      </Link>
      
      {/* Sección Superior: Detalles de la Película */}
      <div className="flex flex-col gap-8 rounded-xl bg-gray-800 p-6 shadow-2xl md:flex-row">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className="w-full rounded-lg shadow-lg md:w-1/3"
        />
        <div className="flex-1">
          <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
          <p className="mb-6 text-lg text-gray-300">{movie.overview}</p>
          
          <div className="mb-6">
            <span className="text-2xl font-bold text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="ml-2 text-gray-400">/ 10 (Puntuación TMDB)</span>
          </div>
        </div>
      </div>

      {/* Sección Inferior: El Sistema de Reseñas (Nuestro próximo paso) */}
      <div className="mt-12 rounded-xl bg-gray-800 p-6 shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold">Reseñas de la Comunidad 🍿</h2>
        <p className="text-gray-400"><ReviewSection movieId={movie.id} /></p>
      </div>
    </div>
  );
};

export default MovieDetails;