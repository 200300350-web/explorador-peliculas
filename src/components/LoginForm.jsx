import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const LoginForm = () => {
  // Manejo de estado con ES6+
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, nombre);
      }
    } catch (err) {
      // Supabase devuelve mensajes de error que podemos mostrar al usuario
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-white">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold">
          {isLogin ? '🎬 Bienvenido a Cinescope' : '🍿 Crea tu Cuenta'}
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-center text-sm text-red-400 border border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm text-gray-400">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required={!isLogin}
                className="w-full rounded-lg bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej. Diego"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-gray-400">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 p-3 font-bold text-white transition-colors hover:bg-blue-500 disabled:bg-blue-800"
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="font-bold text-blue-400 hover:underline"
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};