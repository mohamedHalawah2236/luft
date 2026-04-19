import { RecommendedPropertiesApiRes } from '@/types/properties';

import { getAllData } from '@/utils/api';

export const getRecommendedProperties =
  (): Promise<RecommendedPropertiesApiRes> =>
    getAllData(`api/Property/get-all-recommended-properties`);
