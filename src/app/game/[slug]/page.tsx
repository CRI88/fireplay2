'use client';

import { use, useState, useEffect } from 'react';
import { getGameDetails } from '../../../lib/requests';
import { GameDetails } from '../../../types/game-details.types';
import GameMainInfo from '../../../components/game-main-info';
import GameMainImages from '../../../components/game-main-images';
import Rating from '../../../components/rating';
import { toast } from 'react-hot-toast';
import { addToCart, addToFavorites } from '../../../lib/firebaseFunctions';
import { withAuth } from '../../../lib/withAuth';

export default function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [game, setGame] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [price] = useState(Math.floor(Math.random() * 50) + 10);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const data: GameDetails = await getGameDetails(slug);
      setGame(data);
      setLoading(false);
    };
    fetchGameDetails();
  }, [slug]);

  const handleAddToFavorites = () => {
    if (game) {
      addToFavorites(game.id.toString());
      toast.success('Juego añadido a favoritos');
    }
  };

  const handleAddToCart = () => {
    if (game) {
      addToCart(game.id.toString(), price);
      toast.success('Juego añadido al carrito');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!game) return <p>No se encontró el juego.</p>;
  console.log(game);

  return (
    <div className="mx-auto p-6 space-y-8 bg-gradient-to-r from-blue-100 via-purple-300 to-pink-500 shadow-md">
      <br></br>
      <GameMainImages game={game} />
      <div className="flex-row">
        <Rating rating={game.rating} />
        <div className="text-lg font-bold text-gray-900">${price}</div>
      </div>
      <br></br>
      <GameMainInfo game={game} />
      <br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
        <div>
          <h3 className="text-xl font-semibold mb-2">Desarrolladores</h3>
          <p>{game.developers?.map((d) => d.name).join(', ') || 'No disponible'}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Géneros</h3>
          <p>{game.genres?.map((g) => g.name).join(', ') || 'No disponible'}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Plataformas</h3>
          <p>
            {game.platforms
              ?.map((p) => p.platform?.name || p.name)
              .join(', ') || 'No disponible'}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Tiendas</h3>
          <p>{game.stores?.map((s) => s.store?.name || s.name).join(', ') || 'No disponible'}</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Etiquetas</h3>
          <div className="flex flex-wrap gap-2">
            {game.tags?.length ? (
              game.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <p>No disponible</p>
            )}
          </div>
        </div>
      </div>
      <br></br>
      <div className="flex gap-4 mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </button>
      </div>
      <br></br>
    </div>
  );
}
