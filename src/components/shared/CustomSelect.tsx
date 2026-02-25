import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectItemType = { label: string; value: string };

import { cn } from '@/lib/utils';

type CustomSelectProps = {
  fieldName: string;
  label: string;
  items: SelectItemType[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

const CustomSelect = ({
  fieldName,
  label,
  placeholder,
  className,
  items,
  disabled,
  onChange,
}: CustomSelectProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='group relative'>
          <FormLabel
            className={cn(
              'absolute left-4 z-[2] text-neutral-900 font-normal -top-2 text-lg capitalize',
              ' group-focus-within:text-primary',
              disabled && 'text-white',
              className
            )}>
            {label}
          </FormLabel>

          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            defaultValue={field.value}
            disabled={isSubmitting || disabled}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  '!mt-2 h-fit rounded-none border-b-2 border-white shadow-none border-t-transparent border-l-transparent border-r-transparent py-3 px-0 text-sm leading-6 xs:p-4 xs:text-base',
                  'text-white data-[placeholder]:text-white'
                )}>
                <SelectValue
                  placeholder={placeholder}
                />
              </SelectTrigger>
            </FormControl>

            <SelectContent className='rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm '>
              {items?.map(({ label, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='cursor-pointer '>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
