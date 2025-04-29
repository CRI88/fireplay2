import { db } from '../firebase/firebase';
import { collection, getFirestore, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Game } from '@/types/games.types';

const getUserId = () => {
  const user = getAuth().currentUser;
  return user?.uid;
};

export const addToFavorites = async (game: any) => {
  const uid = getUserId();
  if (!uid) return;

  const ref = doc(db, 'users', uid, 'favorites', game.id.toString());
  await setDoc(ref, game);
};

export const removeFromFavorites = async (gameId: string) => {
  const uid = getUserId();
  if (!uid) return;

  const ref = doc(db, 'users', uid, 'favorites', gameId);
  await deleteDoc(ref);
};

export const getFavorites = async (): Promise<Game[]> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return [];

  const db = getFirestore();
  const favoritesRef = collection(db, 'users', user.uid, 'favorites');
  const snapshot = await getDocs(favoritesRef);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      background_image: data.background_image,
      rating: data.rating,
    } as Game;
  });
};

export const addToCart = async (userId: string, gameId: string, price: number, gameName: string, gameImage: string) => {
  const cartRef = collection(db, 'carts', userId, 'items');
  const gameRef = doc(cartRef, gameId);
  await setDoc(gameRef, {
    gameId,
    price,
    gameName,
    gameImage,
    quantity: 1
  });
};

export const getCartItems = async (userId: string) => {
  const cartRef = collection(db, 'carts', userId, 'items');
  const cartSnapshot = await getDocs(cartRef);
  const cartItems = cartSnapshot.docs.map(doc => doc.data());
  return cartItems;
};

export const removeFromCart = async (userId: string, gameId: string) => {
  const cartRef = doc(db, 'carts', userId, 'items', gameId);
  await deleteDoc(cartRef);
};

export const clearCart = async (userId: string) => {
  const cartRef = collection(db, 'carts', userId, 'items');
  const cartSnapshot = await getDocs(cartRef);
  const deletePromises = cartSnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
};

export const checkout = async (userId: string) => {
  await clearCart(userId);
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const getMessages = async (uid: string) => {
  const snapshot = await getDocs(collection(db, 'users', uid, 'messages'));
  return snapshot.docs.map(doc => doc.data());
};
