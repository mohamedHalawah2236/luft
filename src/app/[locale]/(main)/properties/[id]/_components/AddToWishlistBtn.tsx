import { Heart } from 'lucide-react';

export default function AddToWishlistBtn() {
  return (
    <div className='flex items-center gap-2'>
      <Heart className='size-6 fill-grayish-400 stroke-grayish-400' />
      <span className='text-grayish-900 max-xl:hidden'>Wishlist</span>
    </div>
  );
}
