import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DropdownProps } from '@/types/components';

export default function Dropdown({
  items,
  className,
  trigger,
  align,
  itemClassName,
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={className}
      >
        {items.map(
          ({ icon, label, iconAlign = 'start', disabled, onClick }) => (
            <DropdownMenuItem
              key={label}
              className={itemClassName}
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
