'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          router.push('/login');
        } else {
          setUser(firebaseUser);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return <Component {...props} user={user} />;
  };
};
