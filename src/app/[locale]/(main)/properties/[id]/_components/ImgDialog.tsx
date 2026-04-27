'use client';
import React, { useState } from 'react';

import { X } from 'lucide-react';

import { Modal } from '@/components/shared/Modal';
import { DialogClose, DialogPortal } from '@/components/ui/dialog';

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
      className='h-[85%] max-h-[85%] max-w-[70%] gap-0 overflow-hidden bg-transparent max-md:hidden [&>#modal-content]:flex [&>#modal-content]:h-full [&>#modal-content]:items-center [&>#modal-content]:justify-center [&>button]:!hidden'
    >
      <DialogPortal>
        <DialogClose className='pointer-events-auto fixed start-4 top-4 z-[51] cursor-pointer rounded-sm border border-grayish-30 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
          <X className='size-8 text-white' />
          <span className='sr-only'>Close</span>
        </DialogClose>
      </DialogPortal>
      <img
        src={src}
        alt=''
        className='max-h-full max-w-full'
      />
    </Modal>
  );
}
