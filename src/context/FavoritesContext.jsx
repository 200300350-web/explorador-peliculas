import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const FavoritesContext = createContext();

// 2. Proveedor que guarda la lista de películas favoritas
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Función para agregar o quitar de la lista
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFav = prevFavorites.find((fav) => fav.id === movie.id);
      if (isAlreadyFav) {
        // Si ya está, la quitamos
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        // Si no está, la agregamos
        return [...prevFavorites, movie];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook para usarlo fácilmente
export const useFavorites = () => useContext(FavoritesContext);