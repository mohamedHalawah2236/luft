import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about For Owners - our mission, values, and how we work to provide exceptional residency services. Discover our team, qualifications, and commitment to excellence.',
};
const About = async () => {
  return (
    <div>
      <h1>About Us</h1>
    </div>
  );
};
export default About;
