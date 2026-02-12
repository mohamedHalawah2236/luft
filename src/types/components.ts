import type { ReactNode } from 'react';

import { SetState } from '.';

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
  align?: 'start' | 'end' | 'center';
  trigger: ReactNode;
  className?: string;
  triggerClassName?: string;
  itemClassName?: string;
  isOpen?: boolean;
  setIsopen?: SetState<boolean>;
};

export type NavLinkProps = {
  title: string;
  href: string;
};
