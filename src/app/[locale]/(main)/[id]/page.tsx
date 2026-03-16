import AboutPage from '@/pages/AboutPage';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AboutPage />;
}
