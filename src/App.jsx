import { useEffect, useState } from 'react'
import { fetchPopularMovies } from './services/api'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies()
      setMovies(popularMovies)
      console.log("✅ Datos del Backend:", popularMovies)
    }
    getMovies()
  }, [])

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">🎬 Explorador de Películas</h1>
      <p className="text-green-400 mb-8 font-semibold">✅ Comunicación Backend - Frontend exitosa.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.slice(0, 4).map(movie => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <p className="font-bold truncate text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App