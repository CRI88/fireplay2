'use client';

import { withAuth } from '../../lib/withAuth';
import React from 'react';

const FavoritesPage = () => {
  return (
    <div>
      <h1>Favoritos</h1>
      {/* El contenido de la página de favoritos */}
    </div>
  );
};

export default withAuth(FavoritesPage);
