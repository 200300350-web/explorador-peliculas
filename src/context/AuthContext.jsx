import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Tu puente de conexión

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Revisar si ya hay una sesión activa al cargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Escuchar cambios (cuando inician o cierran sesión)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  // Función para registrar un nuevo usuario y guardar su perfil
  const signup = async (email, password, nombre) => {
    // A. Registrar en el sistema de autenticación
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    
    // B. Guardar el nombre en nuestra tabla pública de perfiles
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, nombre: nombre, correo: email }]);
        
      if (profileError) throw profileError;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);