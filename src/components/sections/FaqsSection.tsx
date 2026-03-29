import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FaqsSectionRes } from '@/types/page';

export default function FaqsSection({
  title,
  description,
  items,
}: FaqsSectionRes) {
  return (
    <div className='mx-auto flex w-full max-w-[71.875rem] flex-col gap-0 md:gap-2 lg:gap-6'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.625rem]'>
          {title}
        </h3>
        <p className='text-lg text-grayish-400'>{description}</p>
      </div>

      <Accordion
        type='single'
        collapsible
        className=''
        defaultValue={items[0]?.id}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className='border-grayish-100'
          >
            <AccordionTrigger className='py-6 text-start text-xl font-medium text-grayish-900 hover:no-underline md:text-2xl lg:text-[1.75rem] lg:leading-10'>
              {item.title}
            </AccordionTrigger>
            <AccordionContent className='pt-2 text-base font-medium text-grayish-400 md:pb-6 md:text-lg lg:text-xl'>
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
