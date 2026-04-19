type PropertyImagesProps = {
  coverImage: string;
  images: string[];
};
export default function PropertyImages({
  coverImage,
  images,
}: PropertyImagesProps) {
  return (
    <div className='flex gap-4 md:h-[23.75rem] xl:h-[36.625rem]'>
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
  );
}
