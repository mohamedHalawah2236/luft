import CustomHorizontalAccordion from '@/components/shared/CustomHorizontalAccordion';

type OurValuesData = {
  id: string;
  number?: string;
  title: string;
  description: string;
};

type OurValuesSectionProps = {
  title: string;
  items: OurValuesData[];
};

const OurValuesSection = ({ title, items }: OurValuesSectionProps) => {
  const SectionTitle = title;

  return (
    <div>
      <h2 className='mb-12 text-center text-5xl font-medium text-neutral-900'>
        {SectionTitle}
      </h2>
      <CustomHorizontalAccordion
        items={items}
        fixedHeight='h-[411px]'
      />
    </div>
  );
};

export default OurValuesSection;
