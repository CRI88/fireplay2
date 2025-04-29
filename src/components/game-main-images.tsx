const GameMainImages = ({ game }: { game: { images?: string } }) => {
  /*   if (!game.images || game.images.length === 0) {
      return (
        <div className="text-center text-gray-500 mb-6">
          No hay imágenes disponibles para este juego.
        </div>
      );
    } */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 place-items-center">
      {/* {game.images.map((image, index) => ( */}
      <img
        /* key={index} */
        src={game.background_image}
        alt={`Imagen del juego ${1}`}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      {/* ))} */}
    </div>
  );
};

export default GameMainImages;
