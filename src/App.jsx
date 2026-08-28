import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from './services/api';
import { LoginForm } from './components/LoginForm';

// --- PÁGINAS SIMULADAS --- //
const Home = () => {
  const [movies, setMovies] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🎬 Explorador</h1>
        <div className="space-x-4">
          <Link to="/favoritos" className="text-blue-400 hover:underline">Ir a Favoritos</Link>
          {isAuthenticated && (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded text-white font-bold">Cerrar Sesión</button>
          )}
        </div>
      </div>
      
      {!isAuthenticated && <LoginForm />}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {movies.slice(0, 4).map(movie => {
          const isFav = favorites.find(f => f.id === movie.id);
          return (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex flex-col justify-between h-32">
              <p className="font-bold truncate text-center">{movie.title}</p>
              
              {/* Botón de favorito, solo visible si hay sesión iniciada */}
              {isAuthenticated && (
                <button 
                  onClick={() => toggleFavorite(movie)}
                  className={`mt-2 py-1 px-2 rounded font-bold text-sm ${isFav ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'}`}
                >
                  {isFav ? '⭐ Quitar' : '🤍 Favorito'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Favoritos = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-400">⭐ Mis Favoritos</h2>
        <Link to="/" className="text-blue-400 hover:underline">Volver al Inicio</Link>
      </div>

      {favorites.length === 0 ? (
        <p className="text-xl text-center mt-10">Aún no tienes películas favoritas guardadas.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map(movie => (
            <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow border border-yellow-500 flex flex-col justify-between h-32">
              <p className="font-bold truncate text-center">{movie.title}</p>
              <button 
                onClick={() => toggleFavorite(movie)}
                className="mt-2 py-1 px-2 rounded font-bold text-sm bg-red-500 text-white"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- APP PRINCIPAL --- //
function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/favoritos" 
                element={
                  <ProtectedRoute>
                    <Favoritos />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;