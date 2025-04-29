'use client'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 px-4">
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl p-8 rounded-3xl w-full max-w-md text-white animate-fade-in"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">Iniciar sesión</h2>

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

        <div className="mb-6">
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

        {error && <p className="text-red-200 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-300 text-black font-semibold py-2 rounded-xl hover:bg-yellow-400 transition duration-300 shadow-lg hover:scale-105"
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <div className="h-4 w-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
              Entrando...
            </div>
          ) : (
            'Entrar'
          )}
        </button>

        <p className="text-sm text-white/80 mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <a href="../register" className="text-yellow-300 hover:underline">Regístrate</a>
        </p>
      </form>
    </div>
  );
}
