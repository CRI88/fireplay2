'use client';

import React, { useState, useEffect } from 'react';
import { withAuth } from '../../lib/withAuth';
import { addToCart, getCartItems, removeFromCart, clearCart, checkout } from '../../lib/firebaseFunctions';
import { toast } from 'react-hot-toast';
import { GameDetails } from '../../types/game-details.types';

const CartPage = ({ user }: { user: any }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const items = await getCartItems(user.uid);
        setCartItems(items);
        setTotalPrice(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
      };
      fetchCart();
    }
  }, [user]);

  const handleAddToCart = (game: GameDetails) => {
    const price = Math.floor(Math.random() * 50) + 10;
    addToCart(user.uid, game.id.toString(), price, game.name, game.background_image);
    toast.success('Juego añadido al carrito');
  };

  const handleRemoveItem = async (gameId: string) => {
    if (user) {
      await removeFromCart(user.uid, gameId);
      toast.success('Juego eliminado del carrito');
      setCartItems(cartItems.filter(item => item.gameId !== gameId));
    }
  };

  const handleClearCart = async () => {
    if (user) {
      await clearCart(user.uid);
      toast.success('Carrito vaciado');
      setCartItems([]);
    }
  };

  const handleCheckout = async () => {
    if (user) {
      await checkout(user.uid);
      setShowModal(true);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gradient-to-r from-blue-100 via-purple-300 to-pink-500">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Tu carrito</h1>

      {/* Mostrar juegos en el carrito */}
      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.gameId} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <img src={item.gameImage} alt={item.gameName} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{item.gameName}</h3>
                  <p className="text-gray-500">Precio: ${item.price}</p>
                  <p className="text-gray-500">Cantidad: {item.quantity}</p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(item.gameId)}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No tienes juegos en tu carrito.</p>
        )}
      </div>

      {/* Precio total y botones de acción */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-lg font-semibold">Precio Total: ${totalPrice}</div>
        <div className="space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full"
            onClick={handleClearCart}
          >
            Vaciar carrito
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full"
            onClick={handleCheckout}
          >
            Finalizar compra
          </button>
        </div>
      </div>

      {/* Modal de Compra Exitoso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold text-green-600 mb-2">¡Compra realizada con éxito!</h2>
            <p className="text-gray-700 mb-4">Gracias por tu compra. ¡Nos pondremos en contacto pronto!</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-6">
        <div className="flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
            onClick={() => handleAddToCart({
              id: '1',
              name: 'Juego de Ejemplo',
              background_image: 'https://via.placeholder.com/150',
              rating: 4.5,
              developers: [],
              genres: [],
              platforms: [],
              stores: [],
              tags: [],
            })}
          >
            Añadir Juego de Ejemplo al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CartPage);
