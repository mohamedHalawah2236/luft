import {
  GetPropertyApiResponse,
  RecommendedPropertiesApiRes,
} from '@/types/properties';

import { getAllData } from '@/utils/api';

export const getRecommendedProperties =
  (): Promise<RecommendedPropertiesApiRes> =>
    getAllData(`api/Property/get-all-recommended-properties`);

export const getProperty = (id: string): Promise<GetPropertyApiResponse> =>
  getAllData(`api/Property/website/get-by-id?id=${id}`);
