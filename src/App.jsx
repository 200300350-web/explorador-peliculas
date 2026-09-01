import { Routes, Route } from 'react-router-dom';


// Importamos las pantallas (ajusta la ruta si las metiste en carpetas)
import Home from './Home'; 
// Asumo que tienes o vas a crear un archivo para los Favoritos:
import Favoritos from './Favoritos'; 

const App = () => {
  return (
    <Routes>
      {/* Cuando la ruta sea la raíz ("/"), sirve el Home */}
      <Route path="/" element={<Home />} />
      
      {/* Cuando le den clic al botón y la ruta cambie, sirve Favoritos */}
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
};

export default App;