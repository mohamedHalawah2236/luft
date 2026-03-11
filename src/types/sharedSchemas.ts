import z from 'zod';

import { TFunction } from '@/constants';
import {
  NO_NUMBERS,
  NO_SCRIPTS,
  NO_SPECIAL_CHARS,
  NOT_SPACES_ONLY,
} from '@/constants/regex';

export const nameSchema = (tRoot: TFunction) =>
  z
    .string()
    .min(1, tRoot('common.validations.required'))
    .regex(NOT_SPACES_ONLY, tRoot('common.validations.required'))
    .regex(NO_SPECIAL_CHARS, tRoot('common.validations.lettersOnly'))
    .regex(NO_NUMBERS, tRoot('common.validations.lettersOnly'))
    .regex(NO_SCRIPTS, tRoot('common.validations.lettersOnly'));
