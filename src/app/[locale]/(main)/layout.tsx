import React, { ReactNode } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import RatedByGuests from '@/components/shared/RatedByGuests';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex size-full flex-col overflow-auto'>
      <div className='flex flex-col items-center justify-center bg-grayish-50 py-4'>
        <RatedByGuests
          textClassName='leading-5'
          color='var(--ps-neutral-900)'
        />
      </div>
      <Navbar />
      <div className='flex flex-1 items-center justify-center'>{children}</div>
      <Footer />
    </div>
  );
}
