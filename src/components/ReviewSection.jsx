import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const ReviewSection = ({ movieId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Traer las reseñas y el nombre del perfil unido mágicamente por SQL
  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select(`id, calificacion, texto, created_at, profiles(nombre)`)
      .eq('movie_id', String(movieId))
      .order('created_at', { ascending: false });

    if (data) setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Inicia sesión para opinar.');
    
    setLoading(true);
    const { error } = await supabase.from('reviews').insert([
      { user_id: user.id, movie_id: String(movieId), calificacion: rating, texto: text }
    ]);

    setLoading(false);
    if (!error) {
      setText('');
      setRating(5);
      fetchReviews(); // Recargamos para ver la nueva reseña
    }
  };

  // Lógica de optimización para el promedio general
  const average = reviews.length > 0 
    ? (reviews.reduce((acc, current) => acc + current.calificacion, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between rounded-lg bg-gray-700 p-4">
        <h3 className="text-xl font-bold text-white">Comunidad Cinescope</h3>
        <div className="text-right">
          <span className="text-3xl font-black text-yellow-400">⭐ {average}</span>
          <span className="block text-sm text-gray-400">basado en {reviews.length} reseñas</span>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 rounded-lg bg-gray-800 p-4 shadow-inner border border-gray-700">
          <div className="flex items-center gap-4">
            <label className="text-gray-300">Tu calificación:</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded bg-gray-700 p-2 text-white"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Estrellas</option>
              ))}
            </select>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder="¿Qué te pareció esta película?"
            className="h-24 w-full rounded bg-gray-700 p-3 text-white focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button 
            type="submit" 
            disabled={loading}
            className="self-end rounded bg-blue-600 px-6 py-2 font-bold text-white transition hover:bg-blue-500 disabled:bg-blue-800"
          >
            {loading ? 'Guardando...' : 'Publicar Reseña'}
          </button>
        </form>
      ) : (
        <p className="mb-8 rounded bg-gray-800 p-4 text-center text-gray-400">Inicia sesión para dejar tu reseña.</p>
      )}

      <div className="flex flex-col gap-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="rounded-lg bg-gray-800 p-4 border border-gray-700">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-bold text-blue-400">{rev.profiles?.nombre || 'Usuario Anónimo'}</span>
              <span className="text-yellow-400">{'⭐'.repeat(rev.calificacion)}</span>
            </div>
            <p className="text-gray-200">{rev.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;