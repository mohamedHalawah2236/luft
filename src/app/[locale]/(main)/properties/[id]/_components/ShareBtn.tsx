import { useTranslations } from 'next-intl';

import { Upload } from 'lucide-react';

export default function ShareBtn() {
  const t = useTranslations('pages.propertyDetails.actions');

  return (
    <div className='flex items-center gap-2'>
      <Upload className='size-6 text-grayish-400' />
      <span className='text-grayish-900 max-xl:hidden'>{t('share')}</span>
    </div>
  );
}
