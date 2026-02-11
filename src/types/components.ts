import type { ReactNode } from 'react';

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  toggle?: (open: boolean) => void;
  trigger?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  forceModal?: boolean;
  headerClassName?: string;
  footerClassName?: string;
};

export type DropDownItem = {
  label: string;
  icon?: ReactNode;
  iconAlign?: 'start' | 'end';
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export type DropdownProps = {
  items: DropDownItem[];
  trigger: ReactNode;
  className?: string;
  itemClassName?: string;
  align?: 'start' | 'end' | 'center';
};
