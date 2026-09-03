import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import { useFavorites } from './context/FavoritesContext';

import { fetchPopularMovies } from './services/api';

import { LoginForm } from './components/LoginForm';

const Home = () => {
  const [movies, setMovies] = useState([]);

  const { isAuthenticated, logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (isAuthenticated) {
      fetchPopularMovies().then(setMovies);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">🎬 Explorador</h1>

        <div className="space-x-4">
          <Link
            to="/favoritos"
            className="text-blue-400 hover:underline"
          >
            Ir a Favoritos
          </Link>

          <button
            onClick={logout}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {movies.slice(0, 4).map((movie) => {
          const isFav = favorites.find(
            (favorite) => favorite.id === movie.id
          );

          return (
            <div 
              key={movie.id} 
              className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Imagen de la película con el Link correcto */}
              <div className="aspect-[2/3] w-full overflow-hidden bg-gray-900">
                {movie.poster_path ? (
                  <Link to={`/pelicula/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                ) : (
                  <Link to={`/pelicula/${movie.id}`} className="flex h-full items-center justify-center text-gray-500 hover:text-white">
                    Sin imagen
                  </Link>
                )}
              </div>

              {/* Contenido (Título y Botón) */}
              <div className="flex flex-grow flex-col justify-between p-4">
                <p className="mb-3 truncate text-center text-lg font-bold text-white">
                  {movie.title}
                </p>
                
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`w-full rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                    isFav
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                  }`}
                >
                  {isFav ? '⭐ Quitar' : '🤍 Favorito'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;