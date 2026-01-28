const TestURL = 'https://luft-stay-web.vercel.app';
// const LiveURL = 'https://passresidency.com';
export const siteConfig = {
  name: 'Pass Residency',
  url: TestURL,
  ogImage: TestURL + '/web-app-manifest-512x512.png',
  description:
    'Pass Residency is a platform that helps you get residency in the country of your choice.',
};

export type SiteConfig = typeof siteConfig;
