import { SetState } from '@/types';
import { createContext } from 'react';

export type EditableContextArgs = {
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
};

export const EditableFieldContext = createContext<EditableContextArgs>({
  isOpen: false,
  setIsOpen: () => {},
});
