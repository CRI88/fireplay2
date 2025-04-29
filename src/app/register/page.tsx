'use client'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User } from 'lucide-react';

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación simple de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError('Hubo un error al registrarte');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 px-4">
      <form
        onSubmit={handleRegister}
        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl p-8 rounded-3xl w-full max-w-md text-white animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">Regístrate</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Nombre completo</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 ring-1 ring-white/30 focus-within:ring-2 focus-within:ring-yellow-300 transition">
            <User className="w-5 h-5 text-yellow-300" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              className="ml-3 bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Correo electrónico</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 ring-1 ring-white/30 focus-within:ring-2 focus-within:ring-yellow-300 transition">
            <Mail className="w-5 h-5 text-yellow-300" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@email.com"
              className="ml-3 bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Contraseña</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 ring-1 ring-white/30 focus-within:ring-2 focus-within:ring-yellow-300 transition">
            <Lock className="w-5 h-5 text-yellow-300" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="ml-3 bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium">Confirmar contraseña</label>
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 ring-1 ring-white/30 focus-within:ring-2 focus-within:ring-yellow-300 transition">
            <Lock className="w-5 h-5 text-yellow-300" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="ml-3 bg-transparent outline-none w-full placeholder-white/70"
            />
          </div>
        </div>

        {error && <p className="text-red-200 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-300 text-black font-semibold py-2 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-lg hover:scale-105"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-4 w-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
              Registrando...
            </div>
          ) : (
            'Registrarme'
          )}
        </button>

        <p className="text-sm text-white/80 mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <a href="../login" className="text-yellow-300 hover:underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}
