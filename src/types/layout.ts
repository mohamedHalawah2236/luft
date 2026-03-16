import { ApiResponse } from '.';

export type LayoutDataResponse = ApiResponse<{
  pages: Page[];
  contactInfo: ContactInfo;
}>;

export type Page = {
  id: string;
  title: string;
  pageType: number;
};

export type ContactInfo = {
  items: ContactItem[];
  socials: Social[];
};

export type ContactItem = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
};

export type Social = {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
};
