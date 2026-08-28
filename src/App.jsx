import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from './services/api';
import { LoginForm } from './components/LoginForm';

// --- PÁGINAS SIMULADAS --- //
const Home = () => {
  const [movies, setMovies] = useState([]);
  const { isAuthenticated, logout } = useAuth(); // Ya no necesitamos 'login' aquí, lo maneja LoginForm

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
      
      {/* Si no está logueado, mostramos el formulario */}
      {!isAuthenticated && <LoginForm />}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {movies.slice(0, 4).map(movie => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            <p className="font-bold truncate text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Favoritos = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">⭐ Mis Películas Favoritas</h2>
      <p className="text-xl">¡Felicidades! Si estás viendo esto, es porque tienes una cuenta válida y pasaste el candado de seguridad.</p>
      <div className="mt-8">
        <Link to="/" className="text-blue-400 hover:underline">Volver al Inicio</Link>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL --- //
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* RUTA PROTEGIDA */}
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
    </AuthProvider>
  );
}

export default App;