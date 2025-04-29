'use client';

import { useEffect, useState } from 'react';
import { getFavorites, removeFromFavorites } from '@/lib/firebaseFunctions';
import { Game } from '@/types/games.types';
import { Trash } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) router.push('/login');
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (gameId: string) => {
    await removeFromFavorites(gameId);
    setFavorites((prev) => prev.filter((game) => game.id.toString() !== gameId));
  };

  return (
    <div className="mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-100 via-purple-300 to-pink-500 shadow-md">
      <h1 className="text-3xl font-bold">Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes juegos favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((game) => (
            <div key={game.id} className="relative bg-white rounded-xl shadow p-4">
              <img
                src={game.background_image || '/placeholder.jpg'}
                alt={game.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{game.name}</h3>
              <button
                onClick={() => handleRemove(game.id.toString())}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                title="Quitar de favoritos"
              >
                <Trash className="text-red-500" size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      <br></br>
    </div>
  );
}
