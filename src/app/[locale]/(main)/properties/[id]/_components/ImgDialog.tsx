'use client';
import React, { useState } from 'react';

import { Modal } from '@/components/shared/Modal';

type ImgDialogProps = {
  children: React.ReactNode;
  src: string;
};

export default function ImgDialog({ children, src }: ImgDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      closeOnClickOutside
      isOpen={isOpen}
      toggle={setIsOpen}
      onClose={() => setIsOpen(false)}
      trigger={children}
      className='h-[85%] max-h-[85%] max-w-[70%] gap-0 overflow-hidden bg-transparent max-md:hidden [&>#modal-content]:flex [&>#modal-content]:h-full [&>#modal-content]:items-center [&>#modal-content]:justify-center [&>button>svg]:size-7 [&>button>svg]:text-white [&>button]:top-0'
    >
      <img
        src={src}
        alt=''
        className='max-h-full max-w-full'
      />
    </Modal>
  );
}
