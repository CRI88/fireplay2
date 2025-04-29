'use client'
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';

export default function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white shadow-lg h-18 flex items-center">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-8">
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-wide hover:text-yellow-400 transition-all duration-300"
                >
                    Fireplay
                </Link>

                <nav className="flex items-center gap-8">
                <Link
                        href="/games"
                        className="text-lg font-medium hover:text-yellow-400 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Juegos
                    </Link>
                    <Link
                        href="/favorites"
                        className="text-lg font-medium hover:text-yellow-400 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Favoritos
                    </Link>
                    <Link
                        href="/cart"
                        className="text-lg font-medium hover:text-yellow-400 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Carrito
                    </Link>
                    <Link
                        href="/dashboard"

                        className="text-lg font-medium hover:text-yellow-400 transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Perfil
                    </Link>

                    {user ? (
                        <button
                            onClick={handleSignOut}
                            className="text-lg font-medium bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="text-lg font-medium hover:text-yellow-400 transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
