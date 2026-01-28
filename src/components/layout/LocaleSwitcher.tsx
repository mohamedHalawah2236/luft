'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Icon from '../shared/Icon';

import { Locale } from '@/i18n/i18n.config';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Language = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const LANGUAGES: Language[] = [
  { label: 'English', value: 'en', icon: <Icon name='english' /> },
  {
    label: 'العربية',
    value: 'ar',
    icon: (
      <Image
        src='/svgs/arabic.svg'
        width={32}
        height={24}
        alt='arabic flag'
      />
    ),
  },
];
export default function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const changeLocale = (newLocale: Locale) => {
    router.replace(pathname + `${searchParams ? `?${searchParams}` : ''}`, {
      locale: newLocale,
    });
  };

  return (
    <Select
      defaultValue={locale}
      onValueChange={changeLocale}
    >
      <SelectTrigger
        className={cn(
          'hidden w-[130px] border-none text-grayish-50 md:flex',
          className,
        )}
      >
        <SelectValue placeholder='Select Language' />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
          >
            <div className='flex items-center gap-2'>
              {lang.icon}
              {lang.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
