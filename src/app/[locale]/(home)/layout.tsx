import React, { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar/Navbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
