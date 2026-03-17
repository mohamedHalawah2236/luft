import { useTranslations } from 'next-intl';
import Spinner from './Spinner';

export default function Loader() {
  const t = useTranslations('common');

  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center gap-4'>
      <Spinner />
      <p className='font-semibold text-grayish-700 md:text-lg xl:text-xl'>
        {t('loading')}
      </p>
    </div>
  );
}
