import { BulletRes } from '@/types/page';

export default function BulletCard({ data }: { data: BulletRes }) {
  const iconUrl = data?.iconUrl;
  const title = data?.title;
  const description = data?.description;

  return (
    <div className='flex gap-2 xl:flex-col'>
      {iconUrl && (
        <img
          src={iconUrl}
          alt='title'
          className='size-6 md:size-8 xl:size-10'
        />
      )}

      {/* Texts */}
      <div className='flex flex-col gap-1'>
        <h6
          className='line-clamp-1 text-lg font-medium text-grayish-900 md:text-xl xl:text-2xl'
          title={title}
        >
          {title}
        </h6>
        <p
          className='line-clamp-2 whitespace-pre-wrap text-grayish-400 md:text-lg'
          title={description}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
