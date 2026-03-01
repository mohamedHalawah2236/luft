'use client';
import React, { useState } from 'react';

import ConfirmLogoutModal from '../logout/ConfirmLogoutModal';

import QueryClientProvider from '@/providers/QueryClientProvider';

export default function LogoutBtn({ token }: { token: string }) {
  const [isConfirmOpen, setisConfirmOpen] = useState(false);
  return (
    <QueryClientProvider>
      <button
        className='w-fit text-grayish-900'
        type='button'
        onClick={() => setisConfirmOpen(true)}
      >
        Logout
      </button>
      <ConfirmLogoutModal
        isOpen={isConfirmOpen}
        setIsOpen={setisConfirmOpen}
        token={token}
      />
    </QueryClientProvider>
  );
}
