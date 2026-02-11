import React, { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar/Navbar';
import RatingByHeader from '@/components/layout/Navbar/RatingByHeader';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex size-full flex-col'>
      <RatingByHeader />
      <Navbar />
      <div className='flex flex-1 items-center justify-center'>{children}</div>
    </div>
  );
}
