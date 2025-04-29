'use client';

import { withAuth } from '../../lib/withAuth';
import React, { useEffect, useState } from 'react';
import { getUserProfile, getCartItems, getFavorites, getMessages } from '../../lib/firebaseFunctions';
import { motion } from 'framer-motion';

const DashboardPage = ({ user }: { user: any }) => {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userProfile = await getUserProfile(user.uid);
        const favs = await getFavorites(user.uid);
        const cartItems = await getCartItems(user.uid);
        const msgs = await getMessages(user.uid);

        setProfile(userProfile);
        setFavorites(favs || []);
        setCart(cartItems || []);
        setMessages(msgs || []);
      };

      fetchData();
    }
  }, [user]);

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-200 to-yellow-100 p-6">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-6 mb-6">
          <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-full border border-gray-300" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile?.name || 'Nombre no disponible'}</h2>
            <p className="text-gray-600">{profile?.email || user?.email}</p>
          </div>
        </div>

        {/* Secciones */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Favoritos */}
          <Section title="Favoritos" items={favorites} emptyMsg="No tienes juegos favoritos." />

          {/* Carrito */}
          <Section title="Carrito" items={cart} emptyMsg="Tu carrito está vacío." />

          {/* Mensajes */}
          <Section title="Mensajes enviados" items={messages} emptyMsg="No has enviado ningún mensaje." />
        </div>
      </motion.div>
    </div>
  );
};

// Componente reutilizable para cada sección
const Section = ({ title, items, emptyMsg }: { title: string; items: any[]; emptyMsg: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
    {items.length === 0 ? (
      <p className="text-sm text-gray-500">{emptyMsg}</p>
    ) : (
      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item.gameName || item.message || 'Elemento'}</li>
        ))}
      </ul>
    )}
  </div>
);

export default withAuth(DashboardPage);
