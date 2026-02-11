import StatusLayout from '@/components/shared/StatusLayout';
import { Locale } from '@/i18n/i18n.config';

type WishlistProps = {
    params: { locale: Locale };
    searchParams?: { tab?: 'suites' | 'workspaces' };
};

const Wishlist = async ({ params, searchParams }: WishlistProps) => {
    const { locale } = params;
    const isEnglish = locale === 'en';

    const NoWishlist = true;

    return NoWishlist ? (
        <StatusLayout
            className="pt-[10%]"
            title={isEnglish ? "Your wishlist is empty" : "قائمة الأمنيات الخاصة بك فارغة"}
            paragraph={isEnglish ? "Browse our homes and save your favorites for later." : ".تصفح منازلنا واحفظ المفضلة لديك لوقت لاحق"}
            mainImageSrc="/svg/emptyWishlist.svg"
        />
    ) : (
        <div>My Wishlist</div>
    );
};

export default Wishlist;
