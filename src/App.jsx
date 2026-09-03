import { Routes, Route } from 'react-router-dom';

// Importamos las pantallas
import Home from './Home';
import Favoritos from './Favoritos';
import MovieDetails from './MovieDetails'; // <-- Aquí está el nuevo ingrediente

const App = () => {
  return (
    <Routes>
      {/* Cuando la ruta sea la raíz ("/"), sirve el Home */}
      <Route path="/" element={<Home />} />
      
      {/* Cuando le den clic al botón y la ruta cambie, sirve Favoritos */}
      <Route path="/favoritos" element={<Favoritos />} />

      {/* ¡La nueva ruta para ver los detalles y reseñas de la película! */}
      <Route path="/pelicula/:id" element={<MovieDetails />} />
    </Routes>
  );
};

export default App;