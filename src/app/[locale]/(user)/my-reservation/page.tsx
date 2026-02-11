import StatusLayout from '@/components/shared/StatusLayout';
import { Locale } from '@/i18n/i18n.config';

type MyReservationProps = {
    params: { locale: Locale };
    searchParams?: { tab?: 'suites' | 'workspaces' };
};

const MyReservation = async ({ params, searchParams }: MyReservationProps) => {
    const { locale } = params;
    const isEnglish = locale === 'en';

    const noReservations = true;

    return noReservations ? (
        <StatusLayout
            className="pt-[12%]"
            title={isEnglish ? "No Reservation Yet" : "ليس لديك أي حجوزات بعد"}
            paragraph={isEnglish ? "It looks like you haven't made any bookings yet. Ready to start planning?" : "يبدو أنك لم تقم بأي حجوزات بعد. هل أنت مستعد لبدء التخطيط؟"}
            mainImageSrc="/svg/noReservation.svg"
        />
    ) : (
        <div>My Reservations</div>
    );
};

export default MyReservation;
