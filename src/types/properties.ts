import { ApiResponse } from '.';

export type PropertyApiRes = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  coverImageUrl: string;
  images: string[];
};

export type RecommendedPropertiesApiRes = ApiResponse<PropertyApiRes[]>;
