import { Upload } from 'lucide-react';

export default function ShareBtn() {
  return (
    <div className='flex items-center gap-2'>
      <Upload className='size-6 text-grayish-400' />
      <span className='text-grayish-900 max-xl:hidden'>Share</span>
    </div>
  );
}
