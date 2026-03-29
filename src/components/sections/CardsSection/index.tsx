import { CardsSectionRes } from '@/types/page';
import CardItem from './CardItem';

export default function CardsSection({
  title,
  description,
  items,
}: CardsSectionRes) {
  return (
    <div className='flex w-full flex-col gap-12 text-center'>
      {/* Texts */}
      <div className='flex flex-col gap-2 text-center'>
        <h3
          title={title}
          className='text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.5rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      {/* Work Items */}
      <div className='custom-scrollbar flex max-w-full gap-6 overflow-auto pb-12'>
        {items.map((item) => (
          <CardItem
            key={'card' + item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
