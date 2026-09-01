import { Link } from 'react-router-dom';
import { useFavorites } from './context/FavoritesContext'; 

const Favoritos = () => {
  // Traemos la lista de favoritos y la función para quitarlos
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">🤍 Tus Favoritos</h1>
        <Link
          to="/"
          className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500 transition-colors"
        >
          Volver al Menú Principal
        </Link>
      </div>

      {/* Si no hay favoritos, mostramos un mensaje vacío */}
      {favorites.length === 0 ? (
        <div className="mt-20 text-center text-xl text-gray-400">
          Aún no has guardado ninguna película en tu lista.
        </div>
      ) : (
        /* Si hay favoritos, los mostramos con el mismo Grid del Home */
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="aspect-[2/3] w-full overflow-hidden bg-gray-900">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-500">Sin imagen</div>
                )}
              </div>
              <div className="flex flex-col flex-grow justify-between p-4">
                <p className="truncate text-center text-lg font-bold text-white mb-3">
                  {movie.title}
                </p>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-400 transition-colors"
                >
                  🗑️ Quitar de Favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;