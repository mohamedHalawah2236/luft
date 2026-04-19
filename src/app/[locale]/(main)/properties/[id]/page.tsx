import PropertyImages from './_components/PropertyImages';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const property = {
    id: '1',
    title: 'Property 1',
    subtitle: 'Subtitle 1',
    price: 100,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 10,
    coverImageUrl: 'https://placehold.co/600x400/red/orange',
    images: [
      'https://placehold.co/600x400/gray/orange',
      'https://placehold.co/600x400/black/orange',
      'https://placehold.co/600x400/blue/orange',
      'https://placehold.co/600x400/green/orange',
    ],
  };

  return (
    <div className='flex flex-col'>
      <PropertyImages
        coverImage={property.coverImageUrl}
        images={property.images}
      />
      <div className='container'></div>
    </div>
  );
}
