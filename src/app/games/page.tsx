'use client';

import { useEffect, useState } from 'react';
import { getSearchedGames } from '@/lib/requests';
import GameCard from '../../components/card';
import { Game } from '@/types/games.types';
import { motion } from 'framer-motion';
import { getFavorites } from '@/lib/firebaseFunctions';

export default function GamesPage() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'az' | 'za'>('desc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchGames(query);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const sorted = [...games].sort((a, b) => {
      if (sortOrder === 'asc') return a.rating - b.rating;
      if (sortOrder === 'desc') return b.rating - a.rating;
      if (sortOrder === 'az') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setGames(sorted);
  }, [sortOrder]);

  const fetchGames = async (search: string) => {
    setLoading(true);
    const results: Game[] = await getSearchedGames(search);
    const sorted = results.sort((a, b) => {
      if (sortOrder === 'asc') return a.rating - b.rating;
      if (sortOrder === 'desc') return b.rating - a.rating;
      if (sortOrder === 'az') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setGames(sorted);
    setLoading(false);
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-300 to-pink-500 p-8 space-y-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Buscar juegos por nombre..."
          className="w-full lg:w-2/3 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | 'az' | 'za')}
          className="w-full lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Puntuación: Mayor a menor</option>
          <option value="asc">Puntuación: Menor a mayor</option>
          <option value="az">Nombre: A → Z</option>
          <option value="za">Nombre: Z → A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500 animate-pulse">Cargando juegos...</p>
        ) : games.length > 0 ? (
          games.map((game, index) => (
            <motion.div key={game.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <GameCard game={game} isFavorite={favorites.some((f) => f.id === game.id)} />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No se encontraron juegos.</p>
        )}
      </div>
    </section>
  );
}
