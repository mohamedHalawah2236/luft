import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';

type PerfectStaySectionProps = {
  title: string;
  description: string;
};

export default function PerfectStaySection({
  title,
  description,
}: PerfectStaySectionProps) {
  const t = useTranslations('sections.perfectStay');
  return (
    <div className='flex flex-col items-center justify-center gap-2 text-center'>
      <h4 className='text-[1.75rem] font-medium leading-9 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.625rem]'>
        {title}
      </h4>
      <p className='text-grayish-400 md:text-lg'>{description}</p>
      <Button className='mt-2 h-14 w-52 text-base md:mt-4 lg:mt-6'>
        {t('buttons.searchProperties')}
      </Button>
    </div>
  );
}
