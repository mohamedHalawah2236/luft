import AboutPage from '@/components/About/AboutPage';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AboutPage />;
}
