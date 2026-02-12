import React, { ReactNode } from 'react';

type SocialMediaItemProps = {
  icon: ReactNode;
  link: string;
};

export default function SocialMediaItem({ icon, link }: SocialMediaItemProps) {
  return (
    <a
      href={link}
      className='flex size-8 items-center justify-center rounded-full bg-white'
    >
      {icon}
    </a>
  );
}
