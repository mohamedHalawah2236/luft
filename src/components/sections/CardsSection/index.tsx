import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import CardItem from './CardItem';

import { CardsSectionRes } from '@/types/page';

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
          className='line-clamp-3 text-[1.75rem] font-medium leading-9 text-grayish-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.5rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[7] whitespace-pre-wrap text-grayish-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      <Carousel className='flex w-full items-center gap-1 pb-12 [&>.overflow-hidden]:flex-1'>
        <CarouselPrevious className='static translate-x-0 translate-y-0 border-0 border-transparent hover:bg-grayish-30' />

        <CarouselContent className='-ms-4 flex-1 lg:-ms-6'>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className='ps-4 lg:ps-6'
            >
              <CardItem
                key={'card' + item.id}
                {...item}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className='static translate-x-0 translate-y-0 border-0 border-transparent hover:bg-grayish-30' />
      </Carousel>
    </div>
  );
}
