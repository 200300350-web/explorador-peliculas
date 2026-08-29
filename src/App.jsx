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
              className="flex h-32 flex-col justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow"
            >
              <p className="truncate text-center font-bold">
                {movie.title}
              </p>

              <button
                onClick={() => toggleFavorite(movie)}
                className={`mt-2 rounded px-2 py-1 text-sm font-bold ${
                  isFav
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-600 text-white'
                }`}
              >
                {isFav ? '⭐ Quitar' : '🤍 Favorito'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;