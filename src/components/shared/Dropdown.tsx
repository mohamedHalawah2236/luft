import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DropdownProps } from '@/types/components';

import { cn } from '@/lib/utils';

export default function Dropdown({
  items,
  className,
  trigger,
  align,
  itemClassName,
  triggerClassName,
  isOpen,
  setIsopen,
}: DropdownProps) {
  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsopen}
    >
      <DropdownMenuTrigger className={triggerClassName}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={className}
      >
        {items.map(
          ({
            icon,
            label,
            iconAlign = 'start',
            disabled,
            onClick,
            className,
          }) => (
            <DropdownMenuItem
              key={label}
              className={cn(itemClassName, className)}
              disabled={disabled}
              onClick={onClick}
            >
              {iconAlign === 'start' && icon}
              {label} {iconAlign === 'end' && icon}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
