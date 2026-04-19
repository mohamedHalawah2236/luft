'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type PropertyImagesProps = {
  coverImage: string;
  images: string[];
};

export default function PropertyImages({
  coverImage,
  images,
}: PropertyImagesProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className='container mt-[4.5rem] flex gap-4 max-md:hidden md:h-[23.75rem] xl:h-[36.625rem]'>
        <img
          src={coverImage}
          alt=''
          className='min-h-full rounded-2xl object-cover md:w-[24.5rem] xl:w-[39.75rem]'
        />
        <div className='grid flex-1 grid-cols-2 grid-rows-2 gap-4'>
          {Array.from({ length: 4 }).map((_, index) => {
            const image = images[index];
            if (!image) return null;

            return (
              <img
                key={index}
                src={image}
                alt=''
                className='h-full w-full rounded-2xl object-cover'
              />
            );
          })}
        </div>
      </div>
      <Carousel
        setApi={setApi}
        className='relative md:hidden'
      >
        <Link
          href={'/'}
          className='absolute start-4 top-2 z-20 flex size-10 items-center justify-center rounded-full bg-grayish-50'
        >
          <ChevronLeft className='text-grayish-400 rtl:rotate-180' />
        </Link>
        <div className='absolute bottom-2 left-1/2 z-50 mx-auto w-[66px] -translate-x-1/2 rounded-2xl bg-grayish-50 text-center text-lg leading-5 text-grayish-900'>
          {current}/{count}
        </div>
        <CarouselContent className='!-ml-0'>
          <CarouselItem
            className='h-[270px] min-w-full pl-0'
            key={coverImage}
          >
            <img
              src={coverImage}
              alt=''
              className='size-full object-cover'
            />
          </CarouselItem>

          {images.map((image, index) => (
            <CarouselItem
              className='h-[270px] min-w-full pl-0'
              key={image + index}
            >
              <img
                src={image}
                alt=''
                className='size-full object-cover'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
