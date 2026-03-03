'use client';
import { ComponentProps, ReactNode, useState } from 'react';

import { EditIcon } from 'lucide-react';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomInputWithIcon from '@/components/shared/form/CustomInputWithIcon';
import { Modal } from '@/components/shared/Modal';

type EditableFieldProps = ComponentProps<typeof CustomInput> & {
  editForm: ReactNode;
  formTitle: string;
};

export default function EditableField({
  editForm,
  formTitle,
  ...restProps
}: EditableFieldProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isFormOpen}
        toggle={setIsFormOpen}
        onClose={() => setIsFormOpen(false)}
        className='!rounded-3xl bg-white px-6 py-4 lg:w-8/12 [&>button>svg]:text-grayish-900 [&>button]:top-8'
        header={
          <h4 className='py-2 text-[2rem] font-medium leading-10 text-grayish-900'>
            {formTitle}
          </h4>
        }
        headerClassName='pb-6 border-b border-grayish-50 ltr:text-start rtl:text-end'
      >
        {editForm}
      </Modal>

      <CustomInputWithIcon
        {...restProps}
        icon={
          <button
            type='button'
            className=''
            onClick={() => setIsFormOpen(true)}
          >
            <EditIcon className='size-5 text-neutral-900' />
          </button>
        }
        iconAlign={'inline-end'}
        disabled
      />
    </>
  );
}
