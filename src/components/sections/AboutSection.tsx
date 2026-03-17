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
    <div className='flex h-full items-center gap-8 max-sm:flex-col lg:gap-12'>
      <div className='flex w-[24rem] flex-col gap-2 max-lg:flex-1 max-sm:order-2 max-sm:w-auto lg:w-[42.313rem]'>
        {/* Texts */}
        <h3
          title={title}
          className='line-clamp-2 text-[1.75rem] font-medium leading-9 text-neutral-900 md:text-[2rem] md:leading-10 lg:text-5xl lg:leading-[3.625rem]'
        >
          {title}
        </h3>
        <p
          title={description}
          className='line-clamp-[12] text-neutral-400 md:text-lg'
        >
          {description}
        </p>
      </div>

      <img
        src={mediaUrl}
        alt={title}
        className='h-[13.3rem] rounded-3xl max-lg:w-[23rem] max-sm:order-1 max-sm:w-full lg:h-[25.56rem] lg:flex-1'
      />
    </div>
  );
}
