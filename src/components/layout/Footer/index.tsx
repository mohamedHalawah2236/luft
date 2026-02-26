import React, { ReactNode } from 'react';

import { getTranslations } from 'next-intl/server';

import FacebookIcon from '@/components/icons/FacebookIcon';
import InstgramIcon from '@/components/icons/InstgramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import Logo from '@/components/icons/Logo';
import XIcon from '@/components/icons/XIcon';
import RatedByGuests from '@/components/shared/RatedByGuests';

import ContactItem from './ContactItem';
import FooterLink from './FooterLink';
import SocialMediaItem from './SocialMediaItem';

import { getNavLinks } from '@/constants/nav';

type SocialLink = {
  icon: ReactNode;
  link: string;
};

export default async function Footer() {
  const t = await getTranslations();
  const socialLinks: SocialLink[] = [
    {
      icon: <InstgramIcon />,
      link: '',
    },
    {
      icon: <FacebookIcon />,
      link: '',
    },
    {
      icon: <LinkedInIcon />,
      link: '',
    },
    {
      icon: <XIcon />,
      link: '',
    },
  ];

  const navLinks = getNavLinks(t);

  return (
    <div className='flex flex-col gap-6 bg-grayish-900 px-6 py-10 text-grayish-100 md:gap-16 lg:py-11 xl:gap-[7.5rem] xl:px-[4.5rem]'>
      <div className='flex flex-wrap justify-between gap-4 max-sm:flex-col max-sm:gap-6'>
        {/* First Column */}
        <div className='flex flex-col gap-6'>
          <Logo className='h-[3.75rem] w-[8.75rem] fill-white' />
          <p className='text-lg text-grayish-100 md:max-w-[21rem]'>
            Stays made special — curated homes, thoughtful service, and
            concierge care when you need it.
          </p>
          <div className='flex flex-col gap-6 max-sm:hidden'>
            <RatedByGuests
              textClassName='text-lg'
              color='var(--ps-neutral-100)'
            />
            <div className='flex items-center gap-5'>
              {socialLinks.map(({ icon, link }, i) => (
                <SocialMediaItem
                  key={link + i}
                  {...{ icon, link }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className='flex flex-col gap-2'>
          <span className='text-sm leading-6'>Menu</span>
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, href }) => (
              <FooterLink
                key={title}
                {...{ title, href }}
              />
            ))}
          </div>
        </div>

        {/* Third Column */}
        <div className='flex flex-col gap-4 max-sm:mt-6'>
          <ContactItem
            label='Contact Us'
            value='+02 123 432 9955'
          />
          <ContactItem
            label='Email'
            value='luftstay@email.com'
          />
        </div>

        <div className='mt-6 flex flex-col gap-6 sm:hidden'>
          <RatedByGuests
            textClassName='text-lg'
            color='var(--ps-neutral-100)'
          />
          <div className='flex items-center gap-5'>
            {socialLinks.map(({ icon, link }, i) => (
              <SocialMediaItem
                key={link + i}
                {...{ icon, link }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between border-t border-grayish-600 pt-7 text-sm leading-6'>
        <p>Terms of service</p>
        <p>All Rights Reserved © 2025 Luft Stay .</p>
      </div>
    </div>
  );
}
