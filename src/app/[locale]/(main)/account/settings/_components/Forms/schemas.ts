import z from 'zod';

import { nameSchema } from '@/types/sharedSchemas';

import { TFunction } from '@/constants';

export const profileFormQueryKey = 'user-profile';
export const profileFormSchema = (tRoot: TFunction) =>
  z.object({
    firstName: nameSchema(tRoot)
      .min(2, tRoot('common.validations.firstName.min', { min: 2 }))
      .max(50, tRoot('common.validations.firstName.max', { max: 50 })),
    lastName: nameSchema(tRoot)
      .min(2, tRoot('common.validations.lastName.min', { min: 2 }))
      .max(50, tRoot('common.validations.lastName.max', { max: 50 })),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string(),
    file: z.instanceof(File).nullable(),
  });
