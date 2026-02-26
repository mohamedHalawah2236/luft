import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Luft Stay's expert team. We're here to help you with all your residency and citizenship queries. Contact us today for personalized assistance.",
};

export default async function Contact() {
  return <div>Contact Us</div>;
}
