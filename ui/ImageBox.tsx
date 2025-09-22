import Image from 'next/image';

export default function ImageBox({ imageUrl }: { imageUrl?: string | null }) {
  if (!imageUrl) return null;
  return (
    <div className='mt-2 border rounded-lg overflow-hidden relative bg-gray-100 w-full h-60'>
      <Image
        src={imageUrl}
        alt='User preview'
        fill
        className='object-contain'
      />
    </div>
  );
}
