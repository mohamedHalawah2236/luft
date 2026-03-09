import z from 'zod';

import { nameSchema } from '@/types/sharedSchemas';

import { TFunction } from '@/constants';

export const profileFormQueryKey = 'user-profile';
export const profileFormSchema = (tRoot: TFunction) =>
  z.object({
    firstName: nameSchema(tRoot),
    lastName: nameSchema(tRoot),
    email: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
    file: z.instanceof(File).nullable(),
  });
