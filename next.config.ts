import { withNextVideo } from "next-video/process";
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
};

export default withNextVideo(withNextIntl(nextConfig));