'use client';

import { withAuth } from '../../lib/withAuth';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-300 to-pink-500 flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Contáctanos</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              name="name"
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <br></br>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <br></br>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Mensaje</label>
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <br></br>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Enviar mensaje
          </motion.button>
        </form>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2 text-green-600">¡Mensaje enviado!</h2>
              <p className="text-gray-700 mb-4">Gracias por contactarnos. Te responderemos pronto.</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default withAuth(ContactPage);
