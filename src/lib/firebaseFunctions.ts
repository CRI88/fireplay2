import { db } from '../firebase/firebase';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebase/firebase';

export const addToFavorites = async (gameId: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuario no autenticado');
    return;
  }

  const favoritesRef = collection(db, 'users', user.uid, 'favorites');
  const gameRef = doc(favoritesRef, gameId);

  const docSnap = await getDoc(gameRef);
  if (!docSnap.exists()) {
    await setDoc(gameRef, { gameId });
    console.log('Juego añadido a favoritos');
  } else {
    console.log('El juego ya está en favoritos');
  }
};

export const addToCart = async (gameId: string, price: number) => {
  const user = auth.currentUser;
  if (!user) {
    console.log('Usuario no autenticado');
    return;
  }

  const cartRef = collection(db, 'users', user.uid, 'cart');
  await addDoc(cartRef, { gameId, price, addedAt: new Date() });
  console.log('Juego añadido al carrito');
};
