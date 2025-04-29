const GameMainInfo = ({ game }: { game: { name: string, description: string } }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{game.name}</h2>
      <p className="text-gray-700">{game.description_raw}</p>
    </div>
  );
};

export default GameMainInfo;
