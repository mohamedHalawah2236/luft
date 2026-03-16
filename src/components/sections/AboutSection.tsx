type AboutSectionProps = {
  title: string;
  description: string;
  mediaUrl: string;
};

export default function AboutSection({
  title,
  description,
  mediaUrl,
}: AboutSectionProps) {
  return (
    <div className='flex h-full items-center gap-12'>
      <div className='flex w-[42.313rem] flex-col gap-2'>
        {/* Texts */}
        <h3
          title={title}
          className='line-clamp-2 text-5xl font-medium leading-[3.625rem] text-neutral-900'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[12] text-lg text-neutral-400'
        >
          {description}
        </p>
      </div>

      <img
        src={mediaUrl}
        alt={title}
        className='h-[25.56rem] flex-1 rounded-3xl'
      />
    </div>
  );
}
