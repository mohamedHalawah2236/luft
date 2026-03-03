import React, { ComponentProps, ReactNode } from 'react';

import { EditIcon } from 'lucide-react';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomInputWithIcon from '@/components/shared/form/CustomInputWithIcon';

type EditableFieldProps = ComponentProps<typeof CustomInput> & {
  editForm: ReactNode;
};

export default function EditableField({
  editForm,
  ...restProps
}: EditableFieldProps) {
  return (
    <CustomInputWithIcon
      {...restProps}
      icon={
        <button
          type='button'
          className=''
        >
          <EditIcon className='size-5 text-neutral-900' />
        </button>
      }
      iconAlign={'inline-end'}
      disabled
    />
  );
}
