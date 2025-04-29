'use client';

import { useEffect, useState } from 'react';
import { Game } from '@/types/games.types';
import { addToFavorites, removeFromFavorites } from '@/lib/firebaseFunctions';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function GameCard({ game, isFavorite: initialFavorite }: { game: Game; isFavorite: boolean }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // evitar navegación
    if (isFavorite) {
      await removeFromFavorites(game.id.toString());
      setIsFavorite(false);
    } else {
      await addToFavorites(game);
      setIsFavorite(true);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <Link href={`/game/${game.slug}`} className="block">
        <img
          src={game.background_image || '/placeholder.jpg'}
          alt={game.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold">{game.name}</h3>
      </Link>
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
        title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        <Heart size={24} className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
      </button>
    </div>
  );
}
