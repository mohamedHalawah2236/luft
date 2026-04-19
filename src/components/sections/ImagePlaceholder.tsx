import ImageIcon from '@/components/icons/ImageIcon';

export default function ImagePlaceholder({ label }: { label?: string }) {
  return (
    <div className='flex flex-col items-center gap-3'>
      <ImageIcon />
      <span className='text-xl font-medium text-grayish-400'>
        {label || 'No media uploaded'}
      </span>
    </div>
  );
}
