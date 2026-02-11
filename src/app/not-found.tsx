
import StatusLayout from '@/components/shared/StatusLayout';
import { Locale } from '@/i18n/i18n.config';

type NotFoundProps = {
  params: { locale: Locale };
  searchParams?: { tab?: 'suites' | 'workspaces' };
};

const NotFound = ({ params, searchParams }: NotFoundProps) => {
  const { locale } = params;
  const isEnglish = locale === 'en';
  return (
    <StatusLayout title={isEnglish ? "Well… this is awkward" : "عذراً، هذه الصفحة غير موجودة"} paragraph={isEnglish ? "The page you’re looking for isn’t here anymore." : "الصفحة التي تبحث عنها غير موجودة الآن."} mainImageSrc="/svg/notFound.svg" />
  );
};

export default NotFound;
