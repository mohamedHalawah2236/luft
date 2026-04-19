'use client';
import StatusLayout from '@/components/shared/StatusLayout';
import { useTranslations } from 'next-intl';

export default function Error() {
  const t = useTranslations('emptyStates.error');

  return (
    <StatusLayout
      title={t('title')}
      paragraph={t('description')}
      mainImageSrc='/svg/emptyState.svg'
    />
  );
}
