'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { Matcher } from 'react-day-picker'
import type { RegisterOptions } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type DateRangePickerProps = {
  fieldName: string
  label: string
  placeholder: string
  className?: string
  disabled?: Matcher | Matcher[] | undefined
  rules?: RegisterOptions
  requiredMessage?: string
}

function FieldBubble({
  show,
  text,
}: {
  show: boolean
  text?: string
}) {
  if (!show || !text) return null

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-3 top-full z-[50] mt-2',
        'rounded-[4px] bg-[#E61B2C] px-3 py-2 text-[13px] leading-none text-white',
        'shadow-[0_10px_25px_rgba(0,0,0,0.25)]'
      )}
      role="alert"
    >
      {/* Arrow */}
      <span className="absolute -top-[6px] left-4 h-3 w-3 rotate-45 bg-[#E61B2C]" />
      {text}
    </div>
  )
}

export default function DateRangePicker({
  fieldName,
  label,
  placeholder,
  className,
  disabled,
  rules,
  requiredMessage,
}: DateRangePickerProps) {
  const form = useFormContext()
  const { isSubmitting, isSubmitted, submitCount } = form.formState

  const isDesktop = useMediaQuery('(min-width: 768px)')
  const monthsToShow = isDesktop ? 2 : 1

  // Disable all dates before tomorrow by default
  const tomorrow = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Combine default disabled (before tomorrow) with any custom disabled prop
  const disabledDates = React.useMemo(() => {
    const defaultDisabled = { before: tomorrow }
    if (!disabled) return defaultDisabled
    if (Array.isArray(disabled)) return [defaultDisabled, ...disabled]
    return [defaultDisabled, disabled]
  }, [disabled, tomorrow])

  return (
    <FormField
      control={form.control}
      name={fieldName}
      rules={rules}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message
        const hasValue = !!field.value?.from

        // show ONLY after submit attempt
        const triedSubmit = isSubmitted || submitCount > 0

        // required bubble: only when empty, no error, after submit
        const showRequiredBubble =
          triedSubmit && !!requiredMessage && !hasValue && !errorMessage

        // error bubble: only after submit
        const showErrorBubble = triedSubmit && !!errorMessage

        return (
          <FormItem className="group relative mb-2">
            {/* Label */}
            <FormLabel
              className={cn(
                'absolute left-4 z-[2] -top- text-lg font-normal capitalize',
                'text-text-neutral-900 group-focus-within:text-primary',
                className
              )}
            >
              {label}
            </FormLabel>

            {/* Bubble like screenshot */}
            <FieldBubble show={showRequiredBubble} text={requiredMessage} />
            <FieldBubble show={showErrorBubble} text={errorMessage} />

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="link"
                    disabled={isSubmitting}
                    className={cn(
                      '!mt-2 h-fit w-full cursor-pointer rounded-none border-b-2 border-t-transparent border-l-transparent border-r-transparent py-3 px-0 text-sm leading-6 shadow-none xs:p-4 xs:text-base',
                      !field.value ? 'text-neutral-100 border-white/80' : 'text-white border-white',
                      showErrorBubble && 'border-red-500/70',
                      'relative'
                    )}
                  >
                    {field.value?.from ? (
                      field.value.to ? (
                        <span className="text-white">
                          {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                        </span>
                      ) : (
                        <span className="text-white">{format(field.value.from, 'LLL dd, y')}</span>
                      )
                    ) : (
                      <span className="text-white">{placeholder}</span>
                    )}

                    <CalendarIcon className="ml-auto h-4 w-4 text-white" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent
                className={cn(
                  'w-auto rounded-md border border-neutral-700 bg-neutral-50 p-0',
                  'shadow-[0px_1px_3px_#B498550D,0px_6px_6px_#B498550A,0px_13px_8px_#B4985508,0px_24px_9px_#B4985503,0px_37px_10px_#B4985500]',
                  !isDesktop && 'max-w-[calc(100vw-24px)]'
                )}
                align="start"
                sideOffset={8}
              >
                <Calendar
                  min={1}
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={monthsToShow}
                  disabled={disabledDates}
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )
      }}
    />
  )
}
