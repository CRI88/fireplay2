import Link from "next/link";
import type { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
  const stars = Math.round(game.rating);

  return (
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < stars ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="text-gray-500">({game.rating.toFixed(1)})</span>
        </div>
      </div>
  );
}
