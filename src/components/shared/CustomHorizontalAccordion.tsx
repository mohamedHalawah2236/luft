'use client';
import * as React from 'react';

import { useLocale } from 'next-intl';

import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export type HorizontalAccordionItem = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
};

type CustomHorizontalAccordionProps = {
  items: HorizontalAccordionItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  className?: string;
  itemClassName?: string;
  heightClassName?: string;
  widthClassName?: string;
  expandedWidth?: string;
  collapsedWidth?: string;
  showToggleButton?: boolean;
  variant?: 'default' | 'bordered' | 'elevated' | 'minimal';
  fixedHeight?: boolean | string; // New prop for fixed height
};

function useControllableValue<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as T) : internalValue;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}

const variantStyles = {
  default: 'bg-neutral-100',
  bordered: 'border-2 border-neutral-200 bg-white',
  elevated: 'bg-white shadow-lg shadow-neutral-200/50',
  minimal: 'bg-transparent border border-neutral-200',
};

const CustomHorizontalAccordion = ({
  items,
  value,
  defaultValue,
  onValueChange,
  collapsible = true,
  className,
  itemClassName,
  heightClassName,
  expandedWidth = 'flex-1',
  collapsedWidth = '',
  showToggleButton = true,
  variant = 'default',
  fixedHeight = true,
}: CustomHorizontalAccordionProps) => {
  const fallbackDefault = defaultValue ?? items[0]?.id ?? '';
  const [openValue, setOpenValue] = useControllableValue<string>({
    value,
    defaultValue: fallbackDefault,
    onChange: onValueChange,
  });
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const toggle = React.useCallback(
    (nextValue: string, disabled?: boolean) => {
      if (disabled) return;
      if (collapsible && openValue === nextValue) {
        setOpenValue('');
        return;
      }
      setOpenValue(nextValue);
    },
    [collapsible, openValue, setOpenValue],
  );

  if (!items.length) return null;

  // Determine height class
  const getHeightClass = () => {
    if (heightClassName) return heightClassName;
    if (fixedHeight) {
      // If fixedHeight is a string, use it, otherwise use default fixed height
      return typeof fixedHeight === 'string'
        ? fixedHeight
        : 'h-[400px] md:h-[450px] lg:h-[500px]'; // Fixed height for all cards
    }
    return 'min-h-[300px] md:min-h-[360px] lg:min-h-[400px]'; // Original responsive min-height
  };

  const containerHeightClass = getHeightClass();

  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center gap-4 md:flex-row',
        containerHeightClass,
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openValue === item.id;
        const displayNumber = String(index + 1).padStart(2, '0');
        return (
          <Card
            key={item.id}
            data-state={isOpen ? 'open' : 'closed'}
            role='button'
            tabIndex={item.disabled ? -1 : 0}
            aria-expanded={isOpen}
            aria-disabled={item.disabled}
            onClick={() => toggle(item.id, item.disabled)}
            onKeyDown={(e) => {
              if (item.disabled) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(item.id, item.disabled);
              }
            }}
            className={cn(
              'relative flex h-full w-[241px] flex-col justify-between overflow-hidden rounded-xl p-6 text-left',
              `${isEnglish ? 'text-left' : 'text-right'}`,
              'transition-all duration-500 ease-in-out motion-reduce:transition-none',
              '!bg-[#ECECEC] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              variantStyles[variant],
              isOpen ? cn(expandedWidth) : cn(collapsedWidth),
              item.disabled && 'cursor-not-allowed opacity-60',
              itemClassName,
              item.className,
            )}
          >
            <div className='flex h-full min-w-0 flex-col'>
              {/* Added flex column and h-full */}
              {/* Header with icon and number */}
              <div className='flex items-start justify-between gap-2'>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    {item.icon && (
                      <div className='shrink-0 text-neutral-600'>
                        {item.icon}
                      </div>
                    )}
                    <div
                      dir={isEnglish ? 'rtl' : 'ltr'}
                      className={cn(
                        'break-words text-[32px] font-medium leading-tight text-neutral-900',
                      )}
                    >
                      {displayNumber}
                    </div>
                    {item.badge && isOpen && (
                      <div className='ml-auto shrink-0'>{item.badge}</div>
                    )}
                  </div>
                  <div
                    className={cn(
                      'break-words font-medium leading-tight text-neutral-900',
                      isOpen ? 'text-[32px]' : 'text-2xl',
                    )}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
              {/* Description and content - Always visible but with opacity transition */}
              {(item.description || item.content) && (
                <div
                  className={cn(
                    'transition-all duration-300 ease-out motion-reduce:transition-none',
                    isOpen
                      ? 'mt-4 flex-1 opacity-100' // Added flex-1 to take available space
                      : 'mt-0 opacity-0',
                  )}
                >
                  {/* Description always visible but faded when closed */}
                  <div
                    className={cn(
                      'text-lg text-neutral-400 transition-opacity',
                      !isOpen && 'h-0 overflow-hidden opacity-0', // Hide when closed
                    )}
                  >
                    {item.description}
                  </div>

                  {/* Content always present but hidden when closed */}
                  {item.content && (
                    <div
                      className={cn(
                        'mt-4 transition-opacity',
                        isOpen
                          ? 'opacity-100'
                          : 'h-0 overflow-hidden opacity-0',
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Toggle button - Fixed at bottom */}
            {showToggleButton && (
              <div className='mt-auto flex justify-center pt-6'>
                {' '}
                {/* Changed mt-6 to mt-auto pt-6 */}
                <Button
                  type='button'
                  size='icon'
                  aria-label={isOpen ? 'Collapse' : 'Expand'}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(item.id, item.disabled);
                  }}
                  className={cn(
                    'h-10 w-10 rounded-full shadow-none transition-transform hover:scale-110 hover:shadow',
                    'bg-transparent text-neutral-900 hover:border-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

                    'sm:h-12 sm:w-12',
                  )}
                >
                  {isOpen ? (
                    <Minus className='size-6 sm:size-5' />
                  ) : (
                    <Plus className='size-6 sm:size-5' />
                  )}
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default CustomHorizontalAccordion;
