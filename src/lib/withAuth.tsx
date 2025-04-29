'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (isMounted) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push('/login');
          }
          setLoading(false);
        });

        return () => unsubscribe();
      }
    }, [router, isMounted]);

    if (loading || !isMounted) return <div>Loading...</div>;

    return <Component {...props} />;
  };
};
