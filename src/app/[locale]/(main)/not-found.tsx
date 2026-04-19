import StatusLayout from '@/components/shared/StatusLayout';
import { getTranslations } from 'next-intl/server';

const NotFound = async () => {
  const t = await getTranslations('emptyStates.notFound');

  return (
    <StatusLayout
      title={t('title')}
      paragraph={t('description')}
      mainImageSrc='/svg/notFound.svg'
    />
  );
};

export default NotFound;
