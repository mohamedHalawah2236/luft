import FormServerError from '@/components/shared/FormServerError';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

type FieldFormLayoutProps = {
  children: ReactNode;
  submitBtnLabel: string;
  serverError?: string;
  title?: string;
  description?: string;
  className?: string;
};

export default function FieldFormLayout({
  children,
  submitBtnLabel,
  serverError,
  title,
  description,
  className,
}: FieldFormLayoutProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='flex flex-col gap-2'>
        {title && (
          <h6 className='text-2xl font-medium text-grayish-900'>{title}</h6>
        )}
        {description && (
          <p className='text-xl text-grayish-500'>{description}</p>
        )}
      </div>
      <div className='relative flex flex-col gap-4'>{children}</div>
      <div className='flex flex-col gap-2'>
        {serverError && <FormServerError>{serverError}</FormServerError>}

        <Button
          variant={'default'}
          className='h-12 py-3.5'
          type='submit'
          disabled={isSubmitting}
        >
          {submitBtnLabel}
        </Button>
      </div>
    </div>
  );
}
