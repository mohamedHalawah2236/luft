export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h4 className='text-2xl font-medium text-grayish-900 md:text-[1.75rem] md:leading-9 xl:text-[2rem] xl:leading-10'>
      {children}
    </h4>
  );
}
