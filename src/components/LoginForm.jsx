import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validación de campos vacíos
    if (!email) {
      newErrors.email = 'El correo es obligatorio';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      newErrors.email =
        'Ingresa un correo válido (ejemplo@correo.com)';
    }

    // Validación de contraseña
    if (password && password.length < 6) {
      newErrors.password =
        'La contraseña debe tener al menos 6 caracteres';
    }

    // Mostrar errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Iniciar sesión
    login();
    navigate('/favoritos');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[560px]">

        {/* Logo y encabezado */}
        <div className="text-center mb-10">

          {/* Icono de película */}
          <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-[22px] bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-9 w-9 text-gray-900"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
              />
              <path d="M7 4v16" />
              <path d="M17 4v16" />

              <path d="M3 8h4" />
              <path d="M3 12h4" />
              <path d="M3 16h4" />

              <path d="M17 8h4" />
              <path d="M17 12h4" />
              <path d="M17 16h4" />
            </svg>
          </div>

          {/* Nombre */}
          <h1 className="text-5xl font-black tracking-[0.12em] text-white">
            CINESCOPE
          </h1>

          {/* Descripción */}
          <p className="mt-3 text-base text-gray-400">
            Descubre, califica y guarda tus películas y series favoritas.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[22px] border border-gray-800 bg-[#181818] p-7 shadow-2xl"
        >

          {/* Correo */}
          <div className="mb-6">
            <label className="mb-2 block text-base font-semibold">
              Correo electrónico
            </label>

            <div className="relative">

              {/* Icono correo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              >
                <rect
                  width="20"
                  height="16"
                  x="2"
                  y="4"
                  rx="2"
                />
                <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
              </svg>

              <input
                type="email"
                value={email}
                placeholder="tu@correo.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({
                    ...errors,
                    email: '',
                  });
                }}
                className={`h-[52px] w-full rounded-xl border bg-[#090909] pl-12 pr-4 text-white placeholder-gray-600 outline-none transition ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-700 focus:border-gray-400'
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <label className="mb-2 block text-base font-semibold">
              Contraseña
            </label>

            <div className="relative">

              {/* Icono candado */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              >
                <rect
                  width="16"
                  height="12"
                  x="4"
                  y="10"
                  rx="2"
                />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: '',
                  });
                }}
                className={`h-[52px] w-full rounded-xl border bg-[#090909] pl-12 pr-12 text-white placeholder-gray-600 outline-none transition ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-700 focus:border-gray-400'
                }`}
              />

              {/* Mostrar / ocultar contraseña */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                aria-label={
                  showPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                    <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.16 4.19" />
                    <path d="M6.61 6.61C3.5 8.83 2 12 2 12a18.5 18.5 0 0 0 10 7c1.17 0 2.27-.2 3.28-.55" />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="h-[52px] w-full rounded-xl bg-gray-200 font-bold text-gray-900 transition hover:bg-white active:scale-[0.99]"
          >
            Iniciar sesión
          </button>

          {/* Texto inferior */}
          <p className="mt-5 text-center text-sm text-gray-400">
            Demo visual: usa cualquier correo y contraseña para entrar.
          </p>
        </form>
      </div>
    </div>
  );
};