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

export type PropertyReview = {
  id: string;
  imageUrl: string;
  name: string;
  city: string;
  reviewText: string;
  lengthOfStay: number;
  daysAgo: number;
  rating: number;
};
