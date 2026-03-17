import { ApiResponse } from '.';

export enum SECTION_TYPE_ENUM {
  Hero = 0,
  Concierge = 1,
  Promise = 2,
  Banner = 3,
  AboutUs = 4,
  OurValues = 5,
  MediaContentSection = 6,
  HowItWorks = 7,
  PerfectStaySection = 8,
  ContactInformationSection = 9,
}

export enum PageTypeEnum {
  Home = 1,
  AboutUs = 2,
  ForOwners = 3,
  ContactUs = 4,
  Services = 5,
}

export type PageApiResponse = ApiResponse<{
  pageTitle: string;
  pageType: PageTypeEnum;
  sections: {
    aboutUs: AboutUsSection;
    banner: BannerSection;
    ourValues: OurValuesSection;
    mediaContentSection: MediaContentSection;
    howItWorks: HowItWorksSection;
    perfectStaySection: PerfectStaySection;
  };
}>;

type BaseSection = {
  id: string;
  order: number;
  cmsPageId: string;
  sectionType: SECTION_TYPE_ENUM;
};

export type AboutUsSection = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
};

export type BannerSection = BaseSection & {
  title: string;
  description: string;
  mediaUrl: string;
  mediaExtension: string;
};

export type OurValuesSection = BaseSection & {
  title: string;
  items: OurValueItem[];
};

export type OurValueItem = {
  id: string;
  title: string;
  description: string;
};

export type MediaContentSection = BaseSection & {
  mediaUrl: string;
  mediaExtension: string;
  items: MediaContentItem[];
};

export type MediaContentItem = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type HowItWorksSection = BaseSection & {
  title: string;
  description: string;
  items: HowItWorksItem[];
};

export type HowItWorksItem = {
  id: string;
  iconUrl: string;
  title: string;
  description: string;
  mediaExtension: string;
};

export type PerfectStaySection = BaseSection & {
  title: string;
  description: string;
  items: unknown[];
};

export type AboutPageSections = {
  aboutUs: AboutUsSection;
  banner: BannerSection;
  ourValues: OurValuesSection;
  mediaContentSection: MediaContentSection;
  howItWorks: HowItWorksSection;
  perfectStaySection: PerfectStaySection;
};
