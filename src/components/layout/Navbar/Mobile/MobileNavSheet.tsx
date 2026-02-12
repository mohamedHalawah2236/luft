import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';

import UserSetting from './UserSetting';

import { getNavLinks } from '@/constants/nav';

async function MobileNavSheet() {
  const t = await getTranslations('');
  const navLinks = getNavLinks(t);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='size-6' />
      </SheetTrigger>
      <SheetContent className='p-0'>
        <div className='flex flex-col gap-4 bg-white px-4 pt-4'>
          <div className='flex flex-col gap-4'>
            {navLinks.map(({ title, href }) => (
              <Link
                href={href}
                key={title + 'mobileSidebar'}
                className='text-grayish-900'
              >
                {title}
              </Link>
            ))}
          </div>
          <hr className='text-grayish-100' />
          <div className='flex flex-col gap-[1.1rem]'>
            <UserSetting />
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavSheet;
