import Image from 'next/image';

function Loading() {
  return (
    <div className='absolute top-0 z-50 block h-screen w-full overflow-clip bg-primary-500 text-center'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3'>
        <Image
          src='/gifs/loading.gif'
          alt='Loading...'
          width={400}
          height={400}
          quality={100}
          className='object-contain max-xs:size-60'
        />
      </div>
    </div>
  );
}
export default Loading;
