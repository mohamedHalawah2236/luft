import { Button } from '@/components/ui/button';

export default function AddDatesForPrices() {
  return (
    <div
      style={{ boxShadow: '0px 4px 20px 0px #1B1B1B12' }}
      className='flex h-fit w-[15.7rem] flex-col gap-4 rounded-2xl bg-white p-4 max-sm:hidden lg:w-[26rem]'
    >
      <div className='flex flex-col gap-1'>
        <h6 className='text-2xl font-medium'>Add dates for prices</h6>
        <p className='leading-5 text-grayish-400'>
          Choose your dates and guests to secure this stay.
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='text-grayish-400'>
          <span className='text-[2rem] font-medium leading-10 text-grayish-900'>
            $120
          </span>
          &nbsp; for 2 nights
        </div>
        {/* Reservations form */}
        <ReservationForm />
      </div>
    </div>
  );
}

function ReservationForm() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex h-16 w-full justify-between rounded-full border border-grayish-100'>
        <div className='flex flex-col px-6 py-2.5'>
          <span className='text-sm leading-6 text-grayish-900'>Check-in</span>
          <span className='leading-5 text-grayish-400'>Add Date</span>
        </div>
        <span className='h-full w-px bg-grayish-50' />
        <div className='flex flex-col px-6 py-2.5'>
          <span className='text-sm leading-6 text-grayish-900'>Check-out</span>
          <span className='leading-5 text-grayish-400'>Add Date</span>
        </div>
      </div>
      {/* Guests selection */}
      <div className='flex h-16 w-full justify-between rounded-full border border-grayish-100'>
        <div className='flex flex-col px-6 py-2.5'>
          <span className='text-sm leading-6 text-grayish-900'>Check-in</span>
          <span className='leading-5 text-grayish-400'>Add Date</span>
        </div>
        <span className='h-full w-px bg-grayish-50' />
        <div className='flex flex-col px-6 py-2.5'>
          <span className='text-sm leading-6 text-grayish-900'>Check-out</span>
          <span className='leading-5 text-grayish-400'>Add Date</span>
        </div>
      </div>
      <Button className='h-14 text-base text-grayish-50'>Reserve</Button>
    </div>
  );
}
