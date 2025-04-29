'use client';

import { withAuth } from '../../lib/withAuth';
import React from 'react';

const DashboardPage = () => {
    return (
      <div>
        <h1>Perfil</h1>
        <p>Aquí estará el perfil</p>
      </div>
    );
  }
  
  export default withAuth(DashboardPage);